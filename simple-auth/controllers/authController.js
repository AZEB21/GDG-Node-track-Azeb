const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = require('../env'); // ← use env.js

exports.signup = async (req, res) => {
  const { full_name, email, password } = req.body;
  if (!full_name || !email || !password || password.length < 8) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'Email exists' });

  const user = new User({ full_name, email, password });
  await user.save();

  res.status(201).json({ full_name: user.full_name, email: user.email });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  // ✅ Use JWT_SECRET and JWT_EXPIRE from env.js
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
  res.cookie('token', token, { httpOnly: true }).json({ message: 'Logged in' });
};

exports.logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
};

exports.dashboard = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ message: `Welcome ${user.full_name}` });
};