import { Request, Response } from "express";
import opinionsModel from "./opinions.model";

export const createOpinion = async (req:Request, res:Response) => {
  try {
    const { name, email, location, opinion, title } = req.body;

    if (!name || !email || !opinion) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and opinion text'
      });
    }
    console.log('Received opinion submission:', { name, email, location, opinion, title });

    const newOpinion = await opinionsModel.create({
      name,
      email,
      location,
      text: opinion,
      title: title || 'Visitor'
    });

    res.status(201).json({
      success: true,
      message: 'Opinion submitted successfully! Waiting for approval.',
      data: newOpinion
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

// @desc    Get all approved opinions
// @route   GET /api/v1/public/opinions
// @access  Public
export const getOpinions = async (req:Request, res:Response) => {
  try {
    const opinions = await opinionsModel.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .select('-email');

    res.status(200).json({
      success: true,
      count: opinions.length,
      data: opinions
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

// ====== ADMIN/DASHBOARD OPERATIONS ======

// @desc    Get ALL opinions (approved and pending) - Admin only
// @route   GET /api/v1/dashboard/opinions
// @access  Protected/Admin
export const getAllOpinions = async (req:Request, res:Response) => {
  try {
    const { isApproved } = req.query;
    let filter: any = {};

    // Filter by approval status if provided
    if (isApproved !== undefined) {
      filter.isApproved = isApproved === 'true';
    }

    const opinions = await opinionsModel.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: opinions.length,
      data: opinions
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

// @desc    Update opinion approval status
// @route   PATCH /api/v1/dashboard/opinions/:id
// @access  Protected/Admin
export const updateOpinionStatus = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    if (isApproved === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide isApproved status (true/false)'
      });
    }

    const updatedOpinion = await opinionsModel.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true, runValidators: true }
    );

    if (!updatedOpinion) {
      return res.status(404).json({
        success: false,
        message: 'Opinion not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Opinion ${isApproved ? 'approved' : 'rejected'} successfully`,
      data: updatedOpinion
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

// @desc    Delete opinion
// @route   DELETE /api/v1/dashboard/opinions/:id
// @access  Protected/Admin
export const deleteOpinion = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;

    const deletedOpinion = await opinionsModel.findByIdAndDelete(id);

    if (!deletedOpinion) {
      return res.status(404).json({
        success: false,
        message: 'Opinion not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Opinion deleted successfully',
      data: deletedOpinion
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
