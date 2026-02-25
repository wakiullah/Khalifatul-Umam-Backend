import express from 'express';
import { protect } from '../../../middlewares/auth.middleware';
import {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} from './news.controller';

const router = express.Router();

router.route('/')
  .get(getNews)
  .post(protect, createNews);

router.route('/:id')
  .get(getNewsById)
  .patch(protect, updateNews)
  .delete(protect, deleteNews);

export default router;
