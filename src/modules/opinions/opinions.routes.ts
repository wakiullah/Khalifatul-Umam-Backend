import express from 'express';
import { createOpinion, getOpinions } from './opinions.controller';

const router = express.Router();

router.post('/', createOpinion);
router.get('/', getOpinions);

export default router;
