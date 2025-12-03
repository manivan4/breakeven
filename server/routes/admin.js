import express from 'express';
import User from '../models/User.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Create a judge (admin only)
router.post('/judges', requireAdmin, async (req, res) => {
  try {
    const { email, password, firstName, lastName, specialty, initials } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !specialty || !initials) {
      return res.status(400).json({ 
        message: 'Email, password, firstName, lastName, specialty, and initials are required' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Validate initials length
    if (initials.length > 5) {
      return res.status(400).json({ message: 'Initials must be 5 characters or less' });
    }

    const judge = new User({
      email,
      password,
      firstName,
      lastName,
      role: 'judge',
      specialty,
      initials: initials.toUpperCase(),
    });

    await judge.save();

    res.status(201).json({
      message: 'Judge created successfully',
      user: {
        id: judge._id,
        email: judge.email,
        firstName: judge.firstName,
        lastName: judge.lastName,
        fullName: `${judge.firstName} ${judge.lastName}`,
        role: judge.role,
        specialty: judge.specialty,
        initials: judge.initials,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create an admin (admin only)
router.post('/admins', requireAdmin, async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ 
        message: 'Email, password, firstName, and lastName are required' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const admin = new User({
      email,
      password,
      firstName,
      lastName,
      role: 'admin',
    });

    await admin.save();

    res.status(201).json({
      message: 'Admin created successfully',
      user: {
        id: admin._id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        fullName: `${admin.firstName} ${admin.lastName}`,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users (admin only)
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const { role } = req.query;
    const query = role ? { role } : {};
    
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user (admin only)
router.put('/users/:id', requireAdmin, async (req, res) => {
  try {
    const { firstName, lastName, role, specialty, initials } = req.body;
    
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (role) updateData.role = role;
    if (specialty) updateData.specialty = specialty;
    if (initials) updateData.initials = initials.toUpperCase();

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      role: user.role,
      specialty: user.specialty,
      initials: user.initials,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user (admin only)
router.delete('/users/:id', requireAdmin, async (req, res) => {
  try {
    // Prevent deleting yourself
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

