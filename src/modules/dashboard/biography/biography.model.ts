import mongoose, { Schema, Document } from 'mongoose';

// টাইমলাইন আইটেমের জন্য ইন্টারফেস
export interface ITimelineItem {
  year: string;
  title: string;
  description?: string;
  icon_type: string;
}

// বায়োগ্রাফি ডকুমেন্টের জন্য মেইন ইন্টারফেস
export interface IBiography extends Document {
  full_name: string;
  title: string;
  arabic_name: string;
  english_name: string;
  description: string[]; // প্যারাগ্রাফের অ্যারে
  timeline: ITimelineItem[];
}

// টাইমলাইন স্কিমা
const TimelineItemSchema = new Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  icon_type: { type: String, default: 'calendar' }
});

// মেইন বায়োগ্রাফি স্কিমা
const BiographySchema = new Schema({
  full_name: { type: String, required: true },
  title: { type: String, required: true },
  arabic_name: { type: String },
  english_name: { type: String },
  description: [{ type: String }], // একাধিক প্যারাগ্রাফের জন্য
  timeline: [TimelineItemSchema]
}, { 
  timestamps: true 
});

export default mongoose.model<IBiography>('Biography', BiographySchema);
