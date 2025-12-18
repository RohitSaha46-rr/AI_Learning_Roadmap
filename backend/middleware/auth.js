import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("🔐 Auth middleware - Authorization header:", authHeader ? "Present" : "Missing");

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("❌ Auth failed: No token provided");
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log("🔐 Token extracted:", token ? "Yes" : "No");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified, user ID:", decoded.id);
    req.user = await User.findById(decoded.id).select('-password'); // attach user info
    console.log("✅ User found:", req.user ? req.user.username : "Not found");
    next(); // move to next function (controller)
  } catch (error) {
    console.log("❌ Auth failed:", error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default auth;

