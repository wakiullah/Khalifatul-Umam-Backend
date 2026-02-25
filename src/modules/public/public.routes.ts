import express from "express";
import { Request, Response, NextFunction } from "express";
import { protect } from "../../middlewares/auth.middleware";

// Dashboard module imports (GET routes only)
import biographyRouter from "../dashboard/biography/biography.router";
import booksRouter from "../dashboard/books/books.router";
import downloadRouter from "../dashboard/download/download.router";
import forumRouter from "../dashboard/forum/forum.router";
import galleryRouter from "../dashboard/gallery/gallery.router";
import newsRouter from "../dashboard/news/news.router";
import postsRouter from "../dashboard/posts/posts.router";
import saingsRouter from "../dashboard/sayings/sayings.router";
import settingsRouter from "../dashboard/settings/settings.router";
import opinionsRouter from "../dashboard/opinions/opinions.router";
import memberRouter from "../member/member.routes";


const router = express.Router();

// Security middleware - Allow GET for all, allow public POST for opinions, authenticated writes for forum
const flexiblePublicMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Allow all GET requests
  if (req.method === 'GET') {
    return next();
  }
  
  // Allow POST to opinions without authentication (fully public)
  const path = req.path;
  const isOpinions = path.includes('/opinions');
  const isMember = path.includes('/members');
  console.log(path,req.method);
  
  if ((isOpinions || isMember) && req.method === 'POST' ) {
    return next();
  }
  
  // Allow POST/PATCH/DELETE for forum if authenticated
  const isForum = path.includes('/forum');
  if (isForum && (req.method === 'POST' || req.method === 'PATCH' || req.method === 'DELETE')) {
    return protect(req, res, next);
  }
  
  // Block all other non-GET requests
  return res.status(405).json({
    success: false,
    message: `${req.method} method not allowed on public routes. Use /api/v1/dashboard instead with authentication.`
  });
};

router.use(flexiblePublicMiddleware);

// Public GET routes - All accessible without authentication for reading content
router.use("/biography", biographyRouter);
router.use("/books", booksRouter);
router.use("/downloads", downloadRouter);
router.use("/forum", forumRouter);
router.use("/gallery", galleryRouter);
router.use("/news", newsRouter);
router.use("/posts", postsRouter);
router.use("/sayings", saingsRouter);
router.use("/settings", settingsRouter);
router.use("/opinions", opinionsRouter);
router.use("/members", memberRouter);

export default router;
