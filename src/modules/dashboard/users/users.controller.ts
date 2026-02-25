import { Request, Response } from 'express';
import User from './user.model';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req: Request, res: Response) => {
  try {
    const { role, search } = req.query;
    let query: any = {};

    // রোল দিয়ে ফিল্টার
    if (role && role !== 'all') {
      query.role = role;
    }

    // সার্চ (phone দিয়ে)
    if (search) {
      query.phone = { $regex: search, $options: 'i' };
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
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

// @desc    Create a new user (Manually)
// @route   POST /api/users
// @access  Private/Admin
export const createUser = async (req: Request, res: Response) => {
  try {
    const { phone, name, password, role } = req.body;

    // ভ্যালিডেশন - শুধু required fields
    if (!phone || typeof phone !== 'string' || phone.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    if (!password || typeof password !== 'string' || password.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    const user = await User.create({
      phone,
      name: name || null,
      password,
      role: role || 'user'
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error: any) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Phone number already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update user role
// @route   PATCH /api/users/:id
// @access  Private/Admin
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;

    if (!role) {
       return res.status(400).json({
        success: false,
        message: 'Please provide a role'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: user
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

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
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
