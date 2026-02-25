import express from "express";
import { protect } from "../../middlewares/auth.middleware";
import {
  createMemberApplication,
  getMemberApplications,
} from "./member.controller";

const router = express.Router();

// Public route to create a new application
router.post("/", createMemberApplication);

// Protected route to get all applications (admin only)
router.get("/", protect, getMemberApplications);

export default router;
