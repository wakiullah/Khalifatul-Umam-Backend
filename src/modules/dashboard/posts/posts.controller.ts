import { Request, Response } from 'express';
import Post from './posts.model';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req: Request, res: Response) => {
  try {
    const { status, category, search, is_featured } = req.query;
    let query: any = {};

    // স্ট্যাটাস ফিল্টার (যদি 'all' না হয়)
    if (status && status !== 'all') {
      query.status = status;
    }

    // ক্যাটাগরি ফিল্টার (যদি 'all' না হয়)
    if (category && category !== 'all') {
      query.category = category;
    }

    // ফিচার্ড ফিল্টার
    if (is_featured !== undefined) {
      query.is_featured = is_featured === 'true';
    }

    // সার্চ ফিল্টার
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author_name: { $regex: search, $options: 'i' } }
      ];
    }

    // নতুন পোস্ট আগে দেখাবে
    const posts = await Post.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // ভিউ কাউন্ট বাড়ানো (অপশনাল)
    post.views += 1;
    await post.save();

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private/Admin
export const createPost = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    
    // যদি স্ট্যাটাস published হয়, তাহলে বর্তমান সময় published_at এ সেট হবে
    const postData = {
      ...req.body,
      published_at: status === 'published' ? new Date() : null
    };

    const post = await Post.create(postData);

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post
    });
  } catch (error: any) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map((val: any) => val.message).join(', ')
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update a post
// @route   PATCH /api/posts/:id
// @access  Private/Admin
export const updatePost = async (req: Request, res: Response) => {
  try {
    let updateData = { ...req.body };

    // যদি স্ট্যাটাস পরিবর্তন করে published করা হয় এবং আগে published_at না থাকে
    if (updateData.status === 'published') {
       const existingPost = await Post.findById(req.params.id);
       if (existingPost && existingPost.status !== 'published') {
         updateData.published_at = new Date();
       }
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: post
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      data: {}
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};
