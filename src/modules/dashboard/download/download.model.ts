import mongoose, { Schema, Document } from 'mongoose';

export interface IDownload extends Document {
  title: string;
  description: string;
  file_url: string;
  file_type: string; // যেমন: PDF, MP3, ZIP
  file_size: string; // যেমন: "5 MB"
  category: string; // যেমন: Books, Audio, Software
  language: string;
  download_count: number;
  is_published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DownloadSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  file_url: {
    type: String,
    required: [true, 'File URL is required']
  },
  file_type: {
    type: String,
    required: [true, 'File type is required'],
    trim: true
  },
  file_size: {
    type: String,
    default: 'Unknown'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  language: {
    type: String,
    default: 'Bengali'
  },
  download_count: {
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

export default mongoose.model<IDownload>('Download', DownloadSchema);
