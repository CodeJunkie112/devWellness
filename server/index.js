import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import workoutRoutes from './routes/workouts.js';
import habitRoutes from './routes/habits.js';
import sleepRoutes from './routes/sleep.js';
import mentalHealthRoutes from './routes/mentalHealth.js';
import foodLogRoutes from './routes/foodLog.js';
import hydrationLogRoutes from './routes/hydrationLog.js';
import achievementRoutes from './routes/achievements.js';
import dashboardRoutes from './routes/dashboard.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/sleep', sleepRoutes);
app.use('/api/mental-health', mentalHealthRoutes);
app.use('/api/food-log', foodLogRoutes);
app.use('/api/hydration-log', hydrationLogRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));