import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../modules/dashboard/users/user.model';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Check for token in Authorization header (Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.substring(7); // Remove 'Bearer ' prefix
  }
  // Fallback to cookie if no Authorization header
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route. Please provide a valid token.' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    const user = await User.findById(decoded.id);

    if (!user) {
        return res.status(401).json({ success: false, message: 'No user found with this id' });
    }
    console.log('Authenticated user:', user);

    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }
};

// Optional authentication middleware - doesn't fail if user is not authenticated
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Check for token in Authorization header (Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.substring(7); // Remove 'Bearer ' prefix
  }
  // Fallback to cookie if no Authorization header
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // If no token, just continue without user
  if (!token) {
    return next();
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findById(decoded.id);

    if (user) {
      (req as any).user = user;
    }
  } catch (err) {
    // Silently fail - just continue without user
  }

  next();
};