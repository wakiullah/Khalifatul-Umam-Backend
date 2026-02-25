import express from "express";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "./books.controller";
import { protect } from "../../../middlewares/auth.middleware";

const router = express.Router();

// পাবলিক রাউট (সবাই দেখতে পাবে)
router.get("/", getBooks);

// অ্যাডমিন রাউট (বই তৈরি, আপডেট, ডিলিট)
router.post("/", protect, createBook);
router.patch("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

export default router;
