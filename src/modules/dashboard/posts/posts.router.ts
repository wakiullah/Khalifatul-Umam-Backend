import express from 'express';
import { protect } from '../../../middlewares/auth.middleware';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from './posts.controller';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id')
  .get(getPostById)
  .patch(protect, updatePost)
  .delete(protect, deletePost);

export default router;

