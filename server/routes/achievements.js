import express from 'express';
import Achievement from '../models/Achievement.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get user achievements
router.get('/', auth, async (req, res) => {
  try {
    const achievements = await Achievement.find({ user: req.userId });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add an achievement (this would typically be called by other parts of your application)
router.post('/', auth, async (req, res) => {
  try {
    const achievement = new Achievement({
      user: req.userId,
      ...req.body
    });
    await achievement.save();
    res.status(201).json(achievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;