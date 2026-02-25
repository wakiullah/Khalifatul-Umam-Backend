import { Request, Response } from 'express';
import Download from './download.model';

// @desc    Get all downloads
// @route   GET /api/downloads
// @access  Public
export const getDownloads = async (req: Request, res: Response) => {
  try {
    // নতুন ফাইল আগে দেখাবে
    const downloads = await Download.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: downloads.length,
      data: downloads
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

// @desc    Create a new download item
// @route   POST /api/downloads
// @access  Private/Admin
export const createDownload = async (req: Request, res: Response) => {
  try {
    const download = await Download.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Download item created successfully',
      data: download
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

// @desc    Update a download item
// @route   PATCH /api/downloads/:id
// @access  Private/Admin
export const updateDownload = async (req: Request, res: Response) => {
  try {
    const download = await Download.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // আপডেটেড ডাটা রিটার্ন করবে
        runValidators: true
      }
    );

    if (!download) {
      return res.status(404).json({
        success: false,
        message: 'Download item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Download item updated successfully',
      data: download
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

// @desc    Delete a download item
// @route   DELETE /api/downloads/:id
// @access  Private/Admin
export const deleteDownload = async (req: Request, res: Response) => {
  try {
    const download = await Download.findByIdAndDelete(req.params.id);

    if (!download) {
      return res.status(404).json({
        success: false,
        message: 'Download item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Download item deleted successfully',
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

// @desc    Increment download count
// @route   PATCH /api/downloads/:id/count
// @access  Public
export const incrementDownloadCount = async (req: Request, res: Response) => {
  try {
    const download = await Download.findByIdAndUpdate(
      req.params.id,
      { $inc: { download_count: 1 } }, // ১ বাড়াবে
      { new: true }
    );

    if (!download) {
      return res.status(404).json({
        success: false,
        message: 'Download item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { download_count: download.download_count }
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
