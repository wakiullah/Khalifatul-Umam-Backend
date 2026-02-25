import { Request, Response } from 'express';
import News from './news.model';

// @desc    Get all news/articles with pagination and filtering
// @route   GET /api/news
// @access  Public
export const getNews = async (req: Request, res: Response) => {
  try {
    // পেজিনেশন সেটআপ
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // ফিল্টারিং প্যারামিটার
    const { category, search, is_published, is_featured } = req.query;

    let query: any = {};

    // পাবলিশ স্ট্যাটাস দিয়ে ফিল্টার (যদি রিকোয়েস্টে থাকে)
    if (is_published !== undefined) {
      query.is_published = is_published === 'true';
    }

    // ফিচার্ড স্ট্যাটাস দিয়ে ফিল্টার
    if (is_featured !== undefined) {
      query.is_featured = is_featured === 'true';
    }

    // ক্যাটাগরি দিয়ে ফিল্টার (যদি 'All' না হয়)
    if (category && category !== 'All') {
      query.category = category;
    }

    // সার্চ (টাইটেল অথবা এক্সার্প্ট এর মধ্যে খুঁজবে)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    // ডাটাবেজ থেকে ডাটা আনা
    const news = await News.find(query)
      .sort({ published_at: -1 }) // নতুন নিউজ আগে দেখাবে
      .skip(skip)
      .limit(limit);

    // মোট কতগুলো ডকুমেন্ট আছে তা গণনা করা (পেজিনেশনের জন্য)
    const total = await News.countDocuments(query);

    res.status(200).json({
      success: true,
      count: news.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: news
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

// @desc    Get single news article
// @route   GET /api/news/:id
// @access  Public
export const getNewsById = async (req: Request, res: Response) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }

    res.status(200).json({
      success: true,
      data: news
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

// @desc    Create a new news article
// @route   POST /api/news
// @access  Private/Admin
export const createNews = async (req: Request, res: Response) => {
  try {
    const news = await News.create(req.body);

    res.status(201).json({
      success: true,
      message: 'News article created successfully',
      data: news
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

// @desc    Update a news article
// @route   PATCH /api/news/:id
// @access  Private/Admin
export const updateNews = async (req: Request, res: Response) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'News article updated successfully',
      data: news
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

// @desc    Delete a news article
// @route   DELETE /api/news/:id
// @access  Private/Admin
export const deleteNews = async (req: Request, res: Response) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News article not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'News article deleted successfully',
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
