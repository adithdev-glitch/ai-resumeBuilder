import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'cvcraft_super_secret_jwt_key_change_in_production_123456';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

function generateToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
}

export async function register(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password || password.length < 6) {
      return res.status(400).json({ message: 'Valid email and password (minimum 6 characters) required.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    const user = await User.create({ email, password });
    const token = generateToken(user._id);

    res.cookie('resumate_token', token, COOKIE_OPTIONS);
    res.cookie('cvcraft_token', token, COOKIE_OPTIONS);
    return res.status(201).json({
      message: 'Account created successfully.',
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create account. Please try again.' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user._id);
    res.cookie('resumate_token', token, COOKIE_OPTIONS);
    res.cookie('cvcraft_token', token, COOKIE_OPTIONS);
    return res.json({
      message: 'Signed in successfully.',
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to sign in. Please try again.' });
  }
}

export async function logout(req, res) {
  res.clearCookie('resumate_token', COOKIE_OPTIONS);
  res.clearCookie('cvcraft_token', COOKIE_OPTIONS);
  return res.json({ message: 'Signed out successfully.' });
}

export async function getMe(req, res) {
  try {
    if (!req.user?.id) {
      return res.json({ user: null });
    }
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.json({ user: null });
    }
    return res.json({ user: { id: user._id, email: user.email } });
  } catch {
    return res.json({ user: null });
  }
}
