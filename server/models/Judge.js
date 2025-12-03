import mongoose from 'mongoose';

// Note: Judges are now Users with role='judge'
// This model is kept for backward compatibility but will be deprecated
// Use User model with role='judge' instead

const judgeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  assignedToProjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    default: null,
  },
}, {
  timestamps: true,
});

const Judge = mongoose.model('Judge', judgeSchema);

export default Judge;

