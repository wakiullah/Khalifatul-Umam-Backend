import express from 'express';
import { protect } from '../../../middlewares/auth.middleware';
import {
  getDownloads,
  createDownload,
  updateDownload,
  deleteDownload,
  incrementDownloadCount
} from './download.controller';

const router = express.Router();

// পাবলিক রাউট (সবাই দেখতে পাবে)
router.get('/', getDownloads);
router.patch('/:id/count', incrementDownloadCount); // ডাউনলোড কাউন্ট বাড়ানোর জন্য

// অ্যাডমিন রাউট (তৈরি, আপডেট, ডিলিট)
router.post('/', protect, createDownload);
router.patch('/:id', protect, updateDownload);
router.delete('/:id', protect, deleteDownload);

export default router;
