import express from 'express';
import User from '../models/User.js';
import Project from '../models/Project.js';
import { requireAnyAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all judges (any authenticated user can view)
router.get('/', requireAnyAuth, async (req, res) => {
  try {
    const judges = await User.find({ role: 'judge' })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(judges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get unassigned judges (judges not assigned to any project)
router.get('/unassigned', requireAnyAuth, async (req, res) => {
  try {
    const allJudges = await User.find({ role: 'judge' }).select('-password');
    const projects = await Project.find().select('assignedJudges');
    
    // Get all assigned judge IDs
    const assignedJudgeIds = new Set();
    projects.forEach(project => {
      project.assignedJudges.forEach(judgeId => {
        assignedJudgeIds.add(judgeId.toString());
      });
    });
    
    // Filter out assigned judges
    const unassignedJudges = allJudges.filter(
      judge => !assignedJudgeIds.has(judge._id.toString())
    );
    
    res.json(unassignedJudges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single judge (any authenticated user can view)
router.get('/:id', requireAnyAuth, async (req, res) => {
  try {
    const judge = await User.findOne({ _id: req.params.id, role: 'judge' })
      .select('-password');
    
    if (!judge) {
      return res.status(404).json({ message: 'Judge not found' });
    }
    
    // Get projects assigned to this judge
    const assignedProjects = await Project.find({ assignedJudges: judge._id })
      .select('name category hackathonId');
    
    res.json({
      ...judge.toObject(),
      assignedProjects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new judge (admin only - use /api/admin/judges instead)
// This endpoint is deprecated, kept for backward compatibility
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { email, password, firstName, lastName, specialty, initials } = req.body;
    
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
    
    const judge = new User({
      email,
      password,
      firstName,
      lastName,
      role: 'judge',
      specialty,
      initials: initials.toUpperCase(),
    });
    
    const savedJudge = await judge.save();
    const judgeObj = savedJudge.toObject();
    delete judgeObj.password;
    judgeObj.fullName = `${savedJudge.firstName} ${savedJudge.lastName}`;
    
    res.status(201).json(judgeObj);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a judge (admin can update any, judge can update own profile)
router.put('/:id', requireAnyAuth, async (req, res) => {
  try {
    const judge = await User.findOne({ _id: req.params.id, role: 'judge' });
    
    if (!judge) {
      return res.status(404).json({ message: 'Judge not found' });
    }
    
    // Check permissions: judge can only update their own profile
    if (req.user.role === 'judge' && judge._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only update your own profile' });
    }
    
    const { firstName, lastName, specialty, initials } = req.body;
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (specialty) updateData.specialty = specialty;
    if (initials) updateData.initials = initials.toUpperCase();
    
    const updatedJudge = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json(updatedJudge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a judge (admin only)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const judge = await User.findOne({ _id: req.params.id, role: 'judge' });
    
    if (!judge) {
      return res.status(404).json({ message: 'Judge not found' });
    }
    
    // Remove judge from all projects
    await Project.updateMany(
      { assignedJudges: judge._id },
      { $pull: { assignedJudges: judge._id } }
    );
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Judge deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
