import { Request, Response } from 'express';
import Book from './books.model';

// @desc    Get all books
// @route   GET /api/books
// @access  Public
export const getBooks = async (req: Request, res: Response) => {
  try {
    // নতুন বই আগে দেখাবে
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: books.length,
      data: books
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

// @desc    Create a new book
// @route   POST /api/books
// @access  Private/Admin
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book
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

// @desc    Update a book (Edit info, Toggle Published/Featured)
// @route   PATCH /api/books/:id
// @access  Private/Admin
export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // আপডেটেড ডাটা রিটার্ন করবে
        runValidators: true // ভ্যালিডেশন চেক করবে
      }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: book
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

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
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
