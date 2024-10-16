import express from 'express';
import Sleep from '../models/Sleep.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Log sleep
router.post('/', auth, async (req, res) => {
  try {
    const sleep = new Sleep({
      user: req.userId,
      ...req.body
    });
    await sleep.save();
    res.status(201).json(sleep);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get sleep logs
router.get('/', auth, async (req, res) => {
  try {
    const sleepLogs = await Sleep.find({ user: req.userId });
    res.json(sleepLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update sleep log
router.put('/:id', auth, async (req, res) => {
  try {
    const sleep = await Sleep.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!sleep) return res.status(404).json({ message: 'Sleep log not found' });
    res.json(sleep);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;