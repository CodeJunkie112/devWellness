import express from 'express';
import Habit from '../models/Habit.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create a new habit
router.post('/', auth, async (req, res) => {
  try {
    const habit = new Habit({
      user: req.userId,
      ...req.body
    });
    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all habits for a user
router.get('/', auth, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.userId });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a habit
router.put('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a habit
router.delete('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Log habit completion
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.userId });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    
    const today = new Date().toISOString().split('T')[0];
    if (!habit.completedDates.includes(today)) {
      habit.completedDates.push(today);
      await habit.save();
    }
    res.json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;