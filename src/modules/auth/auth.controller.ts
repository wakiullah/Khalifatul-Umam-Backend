import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../dashboard/users/user.model";
import jwt from "jsonwebtoken";
// @desc    Register a new user
// @route   POST /api/v1/auth/signup
// @access  Public
export const signup = async (req: Request, res: Response) => {
  try {
    const { phone, name, password, role } = req.body;

    // ভ্যালিডেশন
    if (!phone || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "Phone, name, and password are required",
      });
    }

    // চেক করুন ইউজার আগে থেকেই আছে কিনা
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number already exists" });
    }

    // পাসওয়ার্ড হ্যাশ করা
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ইউজার তৈরি করা
    const user = await User.create({
      phone,
      name,
      password: hashedPassword,
      role: role || "user", // ডিফল্ট রোল user
    });

    // টোকেন জেনারেট করা
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1d",
      },
    );

    // কুকি অপশন
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // ১ দিন মেয়াদ
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // প্রোডাকশনে true, লোকালহোস্টে false
      sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as
        | "none"
        | "lax"
        | "strict",
    };

    res
      .status(201)
      .cookie("token", token, options)
      .json({
        success: true,
        token,
        data: {
          _id: user._id,
          phone: user.phone,
          name: user.name,
          role: user.role,
        },
      });
  } catch (error: any) {
    console.error(error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`,
      });
    }
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response) => {
  const user = (req as any).user;

  res.status(200).json({
    success: true,
    data: user,
  });
};

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide phone number and password",
        });
    }

    // পাসওয়ার্ডসহ ইউজার খোঁজা (কারণ মডেলে select: false দেওয়া আছে)
    const user = await User.findOne({ phone }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password || ""))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // টোকেন জেনারেট করা
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1d",
      },
    );

    // কুকি অপশন
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // ১ দিন মেয়াদ
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: (process.env.NODE_ENV === "production" ? "none" : "lax") as
        | "none"
        | "lax"
        | "strict",
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      token,
    });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
