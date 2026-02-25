import express from 'express';
import { protect } from '../../../middlewares/auth.middleware';
import { getSettings, updateSettings } from './settings.controller';

const router = express.Router();

router.route('/')
  .get(getSettings)
  .patch(protect, updateSettings);

export default router;
