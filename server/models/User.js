import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  height: {
    type: Number,
    min: 0,
    max: 300
  },
  weight: {
    type: Number,
    min: 0,
    max: 500
  },
  goal: {
    type: String,
    maxlength: 500
  },
  preferences: {
    units: {
      type: String,
      enum: ['metric', 'imperial'],
      default: 'metric'
    },
    breakInterval: {
      type: Number,
      default: 45
    },
    notifications: {
      type: Boolean,
      default: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', userSchema);