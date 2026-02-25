import express from 'express';
import {
  createOpinion,
  getAllOpinions,
  updateOpinionStatus,
  deleteOpinion
} from '..//..//opinions/opinions.controller';

const router = express.Router();

// Get all opinions (with optional approval status filter)
router.route('/')
  .get(getAllOpinions)
  .post(createOpinion);

// Update opinion approval status and delete
router.route('/:id')
  .patch(updateOpinionStatus)
  .delete(deleteOpinion);

export default router;
