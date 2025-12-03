import express from 'express';
import Hackathon from '../models/Hackathon.js';
import { requireAdmin, requireAnyAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all hackathons (any authenticated user)
router.get('/', requireAnyAuth, async (req, res) => {
  try {
    const hackathons = await Hackathon.find()
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single hackathon (any authenticated user)
router.get('/:id', requireAnyAuth, async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id)
      .populate('createdBy', 'firstName lastName email');
    
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    
    res.json(hackathon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new hackathon (admin only)
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { name, description, startDate, endDate, status } = req.body;

    if (!name || !description || !startDate || !endDate) {
      return res.status(400).json({ 
        message: 'Name, description, startDate, and endDate are required' 
      });
    }

    const hackathon = new Hackathon({
      name,
      description,
      startDate,
      endDate,
      status: status || 'upcoming',
      createdBy: req.user._id,
    });

    const savedHackathon = await hackathon.save();
    const populatedHackathon = await Hackathon.findById(savedHackathon._id)
      .populate('createdBy', 'firstName lastName email');

    res.status(201).json(populatedHackathon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a hackathon (admin only)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { name, description, startDate, endDate, status } = req.body;

    const hackathon = await Hackathon.findByIdAndUpdate(
      req.params.id,
      { name, description, startDate, endDate, status },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    res.json(hackathon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a hackathon (admin only)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndDelete(req.params.id);

    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }

    res.json({ message: 'Hackathon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

