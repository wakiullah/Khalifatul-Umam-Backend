import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  author_name: string;
  category: string;
  status: 'published' | 'draft' | 'review';
  views: number;
  is_featured: boolean;
  published_at?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    trim: true
  },
  image_url: {
    type: String,
    trim: true
  },
  author_name: {
    type: String,
    default: 'Admin',
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    default: 'General'
  },
  status: {
    type: String,
    enum: ['published', 'draft', 'review'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  },
  is_featured: {
    type: Boolean,
    default: false
  },
  published_at: {
    type: Date
  }
}, {
  timestamps: true
});

// সার্চের জন্য ইনডেক্স
PostSchema.index({ title: 'text', content: 'text', excerpt: 'text' });

export default mongoose.model<IPost>('Post', PostSchema);
