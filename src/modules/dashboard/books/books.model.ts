import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  arabic_title?: string;
  description: string;
  volumes?: string;
  language?: string;
  is_featured: boolean;
  is_published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema({
  title: { 
    type: String, 
    required: [true, 'Book title is required'], 
    trim: true 
  },
  arabic_title: { 
    type: String, 
    trim: true,
    default: ''
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'] 
  },
  volumes: { 
    type: String, 
    default: '1 Volume' 
  },
  language: { 
    type: String, 
    default: 'Bengali' 
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

export default mongoose.model<IBook>('Book', BookSchema);
