import { Request, Response } from 'express';
import Settings from './settings.model';

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public/Private (Depending on needs)
export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await Settings.findOne();
    
    // যদি সেটিংস না থাকে, ডিফল্ট তৈরি করে রিটার্ন করবে
    if (!settings) {
      settings = await Settings.create({});
    }

    res.status(200).json({
      success: true,
      data: settings
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

// @desc    Update site settings
// @route   PATCH /api/settings
// @access  Private/Admin
export const updateSettings = async (req: Request, res: Response) => {
  try {
    // প্রথম ডকুমেন্টটি আপডেট করবে, না থাকলে তৈরি করবে
    const settings = await Settings.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
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
