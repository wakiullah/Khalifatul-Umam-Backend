import { Request, Response, NextFunction } from 'express';

/**
 * Role-based authorization middleware
 * Checks if user has one of the allowed roles
 * Use after protect middleware
 */
export const roleAuth = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    // This should not happen if protect middleware is applied first
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    // Check if user's role is in allowed roles
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}. Your role: ${user.role}`
      });
    }

    next();
  };
};

/**
 * Convenience middleware for admin-only routes
 */
export const adminOnly = roleAuth(['admin']);

/**
 * Convenience middleware for admin and moderator
 */
export const adminOrModerator = roleAuth(['admin', 'moderator']);
