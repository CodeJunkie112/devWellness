import express from 'express';
import FoodLog from '../models/FoodLog.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Log food intake
router.post('/', auth, async (req, res) => {
  try {
    const foodLog = new FoodLog({
      user: req.userId,
      ...req.body
    });
    await foodLog.save();
    res.status(201).json(foodLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get food logs
router.get('/', auth, async (req, res) => {
  try {
    const foodLogs = await FoodLog.find({ user: req.userId });
    res.json(foodLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;