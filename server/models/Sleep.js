import mongoose from 'mongoose';

const sleepSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 0,
    max: 24
  },
  quality: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  notes: String
});

export default mongoose.model('Sleep', sleepSchema);