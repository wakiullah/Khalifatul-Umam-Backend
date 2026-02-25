import { Request, Response } from 'express';
import ForumPost from './forum.post.model';
import ForumComment from './forum.comment.model';
import ForumCategory from './forum.category.model';

// ==================== STATS ====================

// @desc    Get forum stats
// @route   GET /api/forum/stats
export const getForumStats = async (req: Request, res: Response) => {
  try {
    const totalPosts = await ForumPost.countDocuments();
    const totalComments = await ForumComment.countDocuments();
    const reportedPosts = await ForumPost.countDocuments({ status: 'reported' });
    // এখানে active users এর লজিক আপনার ইউজার মডেল অনুযায়ী হবে, আপাতত ডামি ডাটা
    const activeUsers = 856; 

    res.status(200).json({
      success: true,
      data: {
        totalPosts,
        totalComments,
        reportedPosts,
        activeUsers
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== POSTS ====================

// @desc    Get all posts
// @route   GET /api/forum/posts
// @query   page=1, limit=10, category, search
export const getPosts = async (req: Request, res: Response) => {
  try {
    const { category, search, page = '1', limit = '2' } = req.query;
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * limitNum;
    const userId = (req as any).user?._id?.toString();

    // Check if this is a public request
    const isPublic = req.originalUrl.includes('/public/');
    
    // Only exclude closed posts for public requests
    let query: any = isPublic ? { status: { $ne: 'closed' } } : {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    const totalPosts = await ForumPost.countDocuments(query);
    const posts = await ForumPost.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    // Add user's reaction to each post
    const postsWithUserReaction = posts.map(post => {
      const postObj = post.toObject();
      const userReactionObj = userId 
        ? post.reactions?.find(r => r.userId === userId)
        : null;
      
      // Count likes and dislikes
      const likeCount = post.reactions?.filter(r => r.reactionType === 'like').length || 0;
      const unlikeCount = post.reactions?.filter(r => r.reactionType === 'dislike').length || 0;
      
      return {
        ...postObj,
        likeCount,
        unlikeCount,
        userReaction: userReactionObj?.reactionType || null,
        reactions: undefined // Remove reactions array from response
      };
    });

    res.status(200).json({
      success: true,
      count: posts.length,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalPosts / limitNum),
        totalItems: totalPosts,
        hasMore: pageNum * limitNum < totalPosts
      },
      data: postsWithUserReaction
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a post
// @route   POST /api/forum/posts
export const createPost = async (req: Request, res: Response) => {
  try {
    const postData = {
      ...req.body,
      author: req.body.author || (req as any).user?.phone || 'Anonymous'
    };

    const post = await ForumPost.create(postData);
    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a post (Edit info or Status)
// @route   PATCH /api/forum/posts/:id
export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await ForumPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/forum/posts/:id
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await ForumPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    // পোস্ট ডিলিট হলে তার কমেন্টগুলোও ডিলিট করা উচিত
    await ForumComment.deleteMany({ postId: req.params.id });

    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== COMMENTS ====================

// @desc    Get recent comments (or all)
// @route   GET /api/forum/comments
export const getComments = async (req: Request, res: Response) => {
  try {
    // Check if this is a public request
    const isPublic = req.originalUrl.includes('/public/');

    // Get all comments with their posts
    const comments = await ForumComment.find()
      .sort({ createdAt: -1 })
      .populate('postId', 'title status');

    // For public requests, filter out comments from closed posts
    const filteredComments = isPublic 
      ? comments.filter(comment => {
          const post = comment.postId as any;
          return !post || post.status !== 'closed';
        })
      : comments; // For dashboard, return all comments

    res.status(200).json({
      success: true,
      count: filteredComments.length,
      data: filteredComments
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a comment
// @route   POST /api/forum/comments
export const createComment = async (req: Request, res: Response) => {
  try {
    const commentData = {
      ...req.body,
      author: req.body.author || (req as any).user?.phone || 'Anonymous'
    };

    const comment = await ForumComment.create(commentData);
    
    // পোস্টের কমেন্ট কাউন্ট বাড়ানো
    if (comment.postId) {
      await ForumPost.findByIdAndUpdate(comment.postId, { $inc: { commentsCount: 1 } });
    }

    res.status(201).json({
      success: true,
      data: comment
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update comment status
// @route   PATCH /api/forum/comments/:id
export const updateComment = async (req: Request, res: Response) => {
  try {
    const comment = await ForumComment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    res.status(200).json({
      success: true,
      data: comment
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete comment
// @route   DELETE /api/forum/comments/:id
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await ForumComment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    
    // পোস্টের কমেন্ট কাউন্ট কমানো
    await ForumPost.findByIdAndUpdate(comment.postId, { $inc: { commentsCount: -1 } });

    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== CATEGORIES ====================

// @desc    Get all categories
// @route   GET /api/forum/categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await ForumCategory.find().sort({ name: 1 });
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create category
// @route   POST /api/forum/categories
export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await ForumCategory.create(req.body);
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get comments for a specific post
// @route   GET /api/forum/posts/:id/comments
export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comments = await ForumComment.find({ postId: id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add reaction to a post
// @route   POST /api/forum/posts/:id/react
export const addReaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reactionType } = req.body;
    const userId = (req as any).user._id.toString(); 

    // Validate reaction type
    const validReactions = ['like', 'dislike'];
    if (!validReactions.includes(reactionType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid reaction type. Must be one of: ${validReactions.join(', ')}`
      });
    }

    console.log('reacting ',userId,reactionType);
    

    const post = await ForumPost.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Remove existing reaction from this user
    post.reactions = post.reactions?.filter(r => r.userId !== userId) || [];

    // Add new reaction
    post.reactions?.push({
      userId,
      reactionType,
      createdAt: new Date()
    });

    await post.save();

    res.status(200).json({
      success: true,
      message: 'Reaction added successfully',
      data: post
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
