import mongoose, { Schema, Document } from 'mongoose';

export interface IForumComment extends Document {
  postId: mongoose.Types.ObjectId;
  content: string;
  author: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: Date;
}

const ForumCommentSchema = new Schema({
  postId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ForumPost', 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['approved', 'pending', 'rejected'],
    default: 'approved' 
  }
}, { 
  timestamps: true 
});

export default mongoose.model<IForumComment>('ForumComment', ForumCommentSchema);
