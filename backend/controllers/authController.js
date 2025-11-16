import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../utils/hashPassword.js';

// Function to generate token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 🧩 Signup Controller
export const signup = async (req, res) => {
  try {
    const { username,email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = new User({ username,email, password: hashedPassword });
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      id: user._id,
      username: user.username,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during signup' });
  }
};

// 🧩 Login Controller
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      id: user._id,
      username: user.username,
      token,
      
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
};
