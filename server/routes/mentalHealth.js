import express from 'express';
import MentalHealth from '../models/MentalHealth.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Log mental health
router.post('/', auth, async (req, res) => {
  try {
    const mentalHealth = new MentalHealth({
      user: req.userId,
      ...req.body
    });
    await mentalHealth.save();
    res.status(201).json(mentalHealth);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get mental health logs
router.get('/', auth, async (req, res) => {
  try {
    const mentalHealthLogs = await MentalHealth.find({ user: req.userId });
    res.json(mentalHealthLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;