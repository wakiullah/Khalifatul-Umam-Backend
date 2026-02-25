import { Request, Response } from 'express';
import Saying from './sayings.model';

// @desc    Get all sayings
// @route   GET /api/sayings
// @access  Public
export const getSayings = async (req: Request, res: Response) => {
  try {
    // নতুন বাণী আগে দেখাবে
    const sayings = await Saying.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sayings.length,
      data: sayings
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

// @desc    Create a new saying
// @route   POST /api/sayings
// @access  Private/Admin
export const createSaying = async (req: Request, res: Response) => {
  try {
    const saying = await Saying.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Saying created successfully',
      data: saying
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

// @desc    Update a saying (Edit, Toggle Featured/Published)
// @route   PATCH /api/sayings/:id
// @access  Private/Admin
export const updateSaying = async (req: Request, res: Response) => {
  try {
    // যদি এই বাণীটিকে ফিচার্ড করা হয়, তবে অন্য সব বাণীর ফিচার্ড স্ট্যাটাস তুলে দেওয়া হবে
    if (req.body.is_featured === true) {
       await Saying.updateMany({ _id: { $ne: req.params.id } } as any, { is_featured: false });
    }

    const saying = await Saying.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!saying) {
      return res.status(404).json({
        success: false,
        message: 'Saying not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Saying updated successfully',
      data: saying
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

// @desc    Delete a saying
// @route   DELETE /api/sayings/:id
// @access  Private/Admin
export const deleteSaying = async (req: Request, res: Response) => {
  try {
    const saying = await Saying.findByIdAndDelete(req.params.id);

    if (!saying) {
      return res.status(404).json({
        success: false,
        message: 'Saying not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Saying deleted successfully',
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
