import express from 'express';
import { 
  getBiography, 
  createBiography, 
  updateBiography 
} from './biography.controller';
import { protect } from '../../../middlewares/auth.middleware';

const router = express.Router();

router.get('/', getBiography);
router.post('/', protect, createBiography);
router.patch('/', protect, updateBiography);

export default router;
