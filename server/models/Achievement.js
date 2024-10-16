import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  dateEarned: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Achievement', achievementSchema);