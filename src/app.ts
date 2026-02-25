import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import publicRoutes from "./modules/public/public.routes";
import memberRoutes from "./modules/member/member.routes";
import dashboardProtectedRoutes from "./modules/dashboard/dashboard-protected.routes";
import authRoutes from "./modules/auth/auth.routes";
import opinionsRoutes from "./modules/opinions/opinions.routes";

// Load environment variables
dotenv.config();

const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      process.env.FRONTEND_URL || "http://localhost:3000",
    ], // আপনার ফ্রন্টএন্ডের URL দিন
    credentials: true, // কুকি সেট করার জন্য এটি আবশ্যক
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running with TypeScript & Mongoose! 🚀");
});

// API Version 1 Routes
const apiV1 = express.Router();

// Public Routes - GET operations only (Reading content without authentication)
apiV1.use("/public", publicRoutes);

// Opinions - Public submit & browse

// Protected Routes - Write operations & Admin dashboard (requires authentication)
apiV1.use("/dashboard", dashboardProtectedRoutes);

// Member applications
apiV1.use("/members", memberRoutes);

// Authentication (login, register, logout)
apiV1.use("/auth", authRoutes);

app.use("/api/v1", apiV1);

// 4. Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// 5. Port Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is breathing on http://localhost:${PORT}`);
});

export default app;
