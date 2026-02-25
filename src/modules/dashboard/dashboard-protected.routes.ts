import express from "express";
import { protect } from "../../middlewares/auth.middleware";
import { adminOrModerator } from "../../middlewares/roleAuth.middleware";
import biographyRouter from "../dashboard/biography/biography.router";
import booksRouter from "../dashboard/books/books.router";
import downloadRouter from "../dashboard/download/download.router";
import forumRouter from "../dashboard/forum/forum.router";
import galleryRouter from "../dashboard/gallery/gallery.router";
import newsRouter from "../dashboard/news/news.router";
import postsRouter from "../dashboard/posts/posts.router";
import saingsRouter from "../dashboard/sayings/sayings.router";
import settingsRouter from "../dashboard/settings/settings.router";
import usersRouter from "./users/users.router";
import opinionsRouter from "./opinions/opinions.router";

const router = express.Router();

// First: Check if user is authenticated
// Second: Check if user has admin or moderator role
router.use(protect);
router.use(adminOrModerator);

// All routes below require authentication AND admin/moderator role
router.use("/biography", biographyRouter);
router.use("/books", booksRouter);
router.use("/downloads", downloadRouter);
router.use("/forum", forumRouter);
router.use("/gallery", galleryRouter);
router.use("/news", newsRouter);
router.use("/opinions", opinionsRouter);
router.use("/posts", postsRouter);
router.use("/sayings", saingsRouter);
router.use("/settings", settingsRouter);
router.use("/users", usersRouter);

export default router;
