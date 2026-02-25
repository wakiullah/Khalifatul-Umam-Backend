import { Request, Response } from 'express';
import GalleryItem from './gallery.model';

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
export const getGalleryItems = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let query: any = {};

    // যদি নির্দিষ্ট ক্যাটাগরি চাওয়া হয় এবং সেটা 'all' বা 'সব' না হয়
    if (category && category !== 'all' && category !== 'সব') {
      query.category = category;
    }

    // নতুন আইটেম আগে দেখাবে
    const items = await GalleryItem.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
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

// @desc    Create a gallery item
// @route   POST /api/gallery
// @access  Private/Admin
export const createGalleryItem = async (req: Request, res: Response) => {
  try {
    const item = await GalleryItem.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Gallery item created successfully',
      data: item
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

// @desc    Update a gallery item
// @route   PATCH /api/gallery/:id
// @access  Private/Admin
export const updateGalleryItem = async (req: Request, res: Response) => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item updated successfully',
      data: item
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

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryItem = async (req: Request, res: Response) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully',
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
