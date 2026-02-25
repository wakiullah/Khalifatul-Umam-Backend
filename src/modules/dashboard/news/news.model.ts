import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  excerpt: string;
  image_url?: string;
  author: string;
  category: string;
  read_time?: string;
  is_featured: boolean;
  is_published: boolean;
  published_at: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required']
  },
  image_url: {
    type: String,
    default: null
  },
  author: {
    type: String,
    default: 'Admin'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  read_time: {
    type: String,
    default: '5 min read'
  },
  is_featured: {
    type: Boolean,
    default: false
  },
  is_published: {
    type: Boolean,
    default: true
  },
  published_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// সার্চের জন্য ইনডেক্স তৈরি করা হলো
NewsSchema.index({ title: 'text', excerpt: 'text' });

export default mongoose.model<INews>('News', NewsSchema);
