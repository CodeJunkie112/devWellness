import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  type: {
    type: String,
    required: true,
    enum: ['cardio', 'strength', 'flexibility', 'other']
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number
  }],
  notes: String
});

export default mongoose.model('Workout', workoutSchema);