import { Request, Response } from "express";
import Member from "./member.model";


export const createMemberApplication = async (req: Request, res: Response) => {
  const {
    full_name,
    father_name,
    mother_name,
    date_of_birth,
    gender,
    religion,
    nationality,
    nid_number,
    phone,
    email,
    present_address,
    permanent_address,
    occupation,
    education,
    blood_group,
    reason_to_join,
    reference_name,
    reference_phone,
  } = req.body;

  try {
    // Basic validation
    if (
      !full_name ||
      !father_name ||
      !mother_name ||
      !date_of_birth ||
      !gender ||
      !phone ||
      !present_address ||
      !permanent_address
    ) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const newMember = new Member({
      full_name,
      father_name,
      mother_name,
      date_of_birth,
      gender,
      religion,
      nationality,
      nid_number,
      phone,
      email,
      present_address,
      permanent_address,
      occupation,
      education,
      blood_group,
      reason_to_join,
      reference_name,
      reference_phone,
    });

    const savedMember = await newMember.save();

    res
      .status(201)
      .json({
        success: true,
        message: "Member application submitted successfully!",
        member: savedMember,
      });
  } catch (error: any) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((el: any) => el.message);
      return res
        .status(400)
        .json({ message: "Validation Error", errors: errors });
    }
    console.error("Error creating member application:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getMemberApplications = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const { search, status, gender, blood_group } = req.query;
    const query: any = {};

    if (search) {
      const searchRegex = new RegExp(search as string, "i");
      query.$or = [
        { full_name: searchRegex },
        { phone: searchRegex },
        { email: searchRegex },
        { nid_number: searchRegex },
      ];
    }

    if (status) query.status = status;
    if (gender) query.gender = gender;
    if (blood_group) query.blood_group = blood_group;

    const members = await Member.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Member.countDocuments(query);

    res.status(200).json({
      data: members,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching member applications:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
