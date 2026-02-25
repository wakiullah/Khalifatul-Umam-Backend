import mongoose, { Schema, Document } from 'mongoose';

export interface IForumPost extends Document {
  title: string;
  content: string;
  author: string; // ইউজারের নাম বা ID
  category: string;
  views: number;
  status: 'active' | 'reported' | 'closed' | 'pending';
  commentsCount: number;
  reactions: Array<{
    userId: string;
    reactionType: 'like' | 'dislike';
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ForumPostSchema = new Schema({
  title: { 
    type: String, 
    required: [true, 'Post title is required'], 
    trim: true 
  },
  content: { 
    type: String, 
    required: [true, 'Content is required'] 
  },
  author: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  views: { 
    type: Number, 
    default: 0 
  },
  status: { 
    type: String, 
    enum: ['active', 'reported', 'closed', 'pending'],
    default: 'active' 
  },
  commentsCount: {
    type: Number,
    default: 0
  },
  reactions: [
    {
      userId: {
        type: String,
        required: true
      },
      reactionType: {
        type: String,
        enum: ['like', 'love', 'helpful', 'dislike'],
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { 
  timestamps: true 
});

export default mongoose.model<IForumPost>('ForumPost', ForumPostSchema);
