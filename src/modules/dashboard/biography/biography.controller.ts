import { Request, Response } from 'express';
import biographyModel from './biography.model';

export const getBiography = async (req: Request, res: Response) => {
  try {
    // ডাটাবেজ থেকে প্রথম ডকুমেন্টটি আনবে
    const biography = await biographyModel.findOne();

    if (!biography) {
      return res.status(404).json({ 
        success: false, 
        message: 'Biography data not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: biography 
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

// @desc    Create new biography (Initial setup)
// @route   POST /api/biography
// @access  Private/Admin
export const createBiography = async (req: Request, res: Response) => {
  try {
    // চেক করা হচ্ছে আগে থেকে কোনো ডকুমেন্ট আছে কিনা
    const exists = await biographyModel.findOne();
    if (exists) {
      return res.status(400).json({ 
        success: false, 
        message: 'Biography already exists. Use PATCH to update.' 
      });
    }

    const biography = await biographyModel.create(req.body);
    
    res.status(201).json({ 
      success: true, 
      data: biography 
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

// @desc    Update biography data
// @route   PATCH /api/biography
// @access  Private/Admin
export const updateBiography = async (req: Request, res: Response) => {
  try {
    let updateData: any = req.body;

    // যদি নতুন টাইমলাইন আইটেম অ্যারেতে যোগ করতে চান (add_timeline_item কি দিয়ে)
    if (req.body.add_timeline_item) {
      const { add_timeline_item, ...rest } = req.body;
      updateData = {
        $push: { timeline: add_timeline_item }
      };
      // যদি অন্য ফিল্ডও আপডেট করতে চান একই সাথে
      if (Object.keys(rest).length > 0) {
        updateData.$set = rest;
      }
    }

    // প্রথম ডকুমেন্টটি আপডেট করবে, না থাকলে নতুন তৈরি করবে (upsert: true)
    const biography = await biographyModel.findOneAndUpdate(
      {}, 
      updateData, 
      {
        new: true, // আপডেটেড ডাটা রিটার্ন করবে
        upsert: true, // ডাটা না থাকলে তৈরি করবে
        runValidators: true
      }
    );

    res.status(200).json({ 
      success: true, 
      message: 'Biography updated successfully',
      data: biography 
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
