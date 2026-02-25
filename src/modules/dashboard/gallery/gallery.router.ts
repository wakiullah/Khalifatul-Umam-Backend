import express from 'express';
import { protect } from '../../../middlewares/auth.middleware';
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from './gallery.controller';

const router = express.Router();

router.route('/')
  .get(getGalleryItems)
  .post(protect, createGalleryItem);

router.route('/:id')
  .patch(protect, updateGalleryItem)
  .delete(protect, deleteGalleryItem);

export default router;
