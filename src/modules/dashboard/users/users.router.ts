import express from 'express';
import {
  getUsers,
  createUser,
  updateUserRole,
  deleteUser
} from './users.controller';

const router = express.Router();

// Note: Authentication (protect) and role-based access (adminOrModerator)
// are applied at the parent level in dashboard-protected.routes.ts
// No need to apply again here

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .patch(updateUserRole)
  .delete(deleteUser);

export default router;
