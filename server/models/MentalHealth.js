import mongoose from 'mongoose';

const mentalHealthSchema = new mongoose.Schema({
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
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'neutral', 'stressed', 'anxious', 'sad']
  },
  notes: String
});

export default mongoose.model('MentalHealth', mentalHealthSchema);