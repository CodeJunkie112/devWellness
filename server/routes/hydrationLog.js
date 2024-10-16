import express from 'express';
import HydrationLog from '../models/HydrationLog.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Log hydration
router.post('/', auth, async (req, res) => {
  try {
    const hydrationLog = new HydrationLog({
      user: req.userId,
      ...req.body
    });
    await hydrationLog.save();
    res.status(201).json(hydrationLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get hydration logs
router.get('/', auth, async (req, res) => {
  try {
    const hydrationLogs = await HydrationLog.find({ user: req.userId });
    res.json(hydrationLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;