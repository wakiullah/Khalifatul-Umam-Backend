import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryItem extends Document {
  title: string;
  description?: string;
  image_url: string;
  category: string;
  views: number;
  is_published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image_url: {
    type: String,
    required: [true, 'Image URL is required']
  },
  category: {
    type: String,
    default: 'অন্যান্য', // ফ্রন্টএন্ডের ডিফল্ট ভ্যালু অনুযায়ী
    trim: true
  },
  views: {
    type: Number,
    default: 0
  },
  is_published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
