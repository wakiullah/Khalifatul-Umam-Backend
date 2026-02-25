import express from 'express';
import { protect, optionalAuth } from '../../../middlewares/auth.middleware';
import {
  getForumStats,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getComments,
  createComment,
  updateComment,
  deleteComment,
  getCategories,
  createCategory,
  getCommentsByPostId,
  addReaction
} from './forum.controller';

const router = express.Router();

// Stats
router.get('/stats', getForumStats);

// Posts
router.route('/posts')
  .get(optionalAuth, getPosts)
  .post(protect, createPost);

router.route('/posts/:id')
  .patch(protect, updatePost)
  .delete(protect, deletePost);

// Get comments for specific post (public)
router.get('/posts/:id/comments', getCommentsByPostId);

// Add reaction to post (authenticated)
router.post('/posts/:id/react', protect, addReaction);

// Comments
router.route('/comments')
  .get(getComments)
  .post(protect, createComment);

router.route('/comments/:id')
  .patch(protect, updateComment)
  .delete(protect, deleteComment);

// Categories
router.route('/categories')
  .get(getCategories)
  .post(protect, createCategory);

export default router;
