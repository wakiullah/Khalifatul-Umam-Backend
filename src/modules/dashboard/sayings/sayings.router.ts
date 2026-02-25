import express from 'express';
import { protect } from '../../../middlewares/auth.middleware';
import {
  getSayings,
  createSaying,
  updateSaying,
  deleteSaying
} from './sayings.controller';

const router = express.Router();

router.route('/')
  .get(getSayings)
  .post(protect, createSaying);

router.route('/:id')
  .patch(protect, updateSaying)
  .delete(protect, deleteSaying);

export default router;
