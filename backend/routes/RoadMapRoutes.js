import express from "express";
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

import { createAIRoadmap, createManualRoadmap, getRoadmaps } from "../controllers/RoadMapController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Optional auth middleware - tries to authenticate but doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  console.log("🔓 Optional auth - Authorization header:", authHeader ? "Present" : "Missing");
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // No token provided, continue without user
    console.log("⚠️ No token, continuing without user");
    req.user = null;
    return next();
  }

  const token = authHeader.split(' ')[1];
  console.log("🔓 Token extracted:", token ? "Yes" : "No");
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Optional auth - Token verified, user ID:", decoded.id);
    req.user = await User.findById(decoded.id).select('-password');
    console.log("✅ Optional auth - User found:", req.user ? req.user.username : "Not found");
    next();
  } catch (error) {
    // Invalid token, continue without user
    console.log("⚠️ Optional auth - Invalid token, continuing without user:", error.message);
    req.user = null;
    next();
  }
};

router.post("/manual", auth, createManualRoadmap);
router.post("/ai", optionalAuth, createAIRoadmap);
router.get("/", auth, getRoadmaps);

export default router;
