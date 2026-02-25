import mongoose from 'mongoose';

const opinionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  location: {
    type: String,
    trim: true,
    default: ''
  },
  title: {
    type: String,
    trim: true,
    default: 'Visitor'
  },
  text: {
    type: String,
    required: [true, 'Opinion text is required'],
    trim: true
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Opinion', opinionSchema);
