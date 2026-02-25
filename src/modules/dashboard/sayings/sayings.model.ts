import mongoose, { Schema, Document } from 'mongoose';

export interface ISaying extends Document {
  arabic: string;
  translation: string;
  context?: string;
  is_featured: boolean;
  is_published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SayingSchema = new Schema({
  arabic: {
    type: String,
    required: [true, 'Arabic text is required'],
    trim: true
  },
  translation: {
    type: String,
    required: [true, 'Translation is required'],
    trim: true
  },
  context: {
    type: String,
    trim: true,
    default: ''
  },
  is_featured: {
    type: Boolean,
    default: false
  },
  is_published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<ISaying>('Saying', SayingSchema);
