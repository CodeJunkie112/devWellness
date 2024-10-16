import express from 'express';
import Workout from '../models/Workout.js';
import Habit from '../models/Habit.js';
import Sleep from '../models/Sleep.js';
import MentalHealth from '../models/MentalHealth.js';
import FoodLog from '../models/FoodLog.js';
import HydrationLog from '../models/HydrationLog.js';
import Achievement from '../models/Achievement.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      recentWorkouts,
      habits,
      recentSleep,
      recentMood,
      todayFood,
      todayHydration,
      achievements
    ] = await Promise.all([
      Workout.find({ user: req.userId }).sort({ date: -1 }).limit(5),
      Habit.find({ user: req.userId }),
      Sleep.findOne({ user: req.userId }).sort({ date: -1 }),
      MentalHealth.findOne({ user: req.userId }).sort({ date: -1 }),
      FoodLog.find({ user: req.userId, date: { $gte: today } }),
      HydrationLog.find({ user: req.userId, date: { $gte: today } }),
      Achievement.find({ user: req.userId }).sort({ dateEarned: -1 }).limit(5)
    ]);

    res.json({
      recentWorkouts,
      habits,
      recentSleep,
      recentMood,
      todayFood,
      todayHydration,
      achievements
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;