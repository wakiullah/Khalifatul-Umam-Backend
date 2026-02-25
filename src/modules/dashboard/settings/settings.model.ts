import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  general: {
    site_name: string;
    tagline: string;
    description: string;
    contact_email: string;
    language: string;
  };
  social_media: {
    facebook: string;
    twitter: string;
    youtube: string;
    instagram: string;
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    primary_color: string;
    rtl_layout: boolean;
    animation: boolean;
  };
  notifications: {
    new_comments: boolean;
    new_members: boolean;
    forum_activity: boolean;
    system_updates: boolean;
    daily_summary: boolean;
    weekly_report: boolean;
  };
  security: {
    two_factor_auth: boolean;
    login_alert: boolean;
    session_timeout: string;
  };
  advanced: {
    api_access: boolean;
  };
}

const SettingsSchema = new Schema({
  general: {
    site_name: { type: String, default: 'ইমাম রব্বানী রহ.' },
    tagline: { type: String, default: 'মুজাদ্দিদ আলফে সানী' },
    description: { type: String, default: 'হযরত মুজাদ্দিদ আলফে সানী শায়খ আহমাদ সিরহিন্দী (রহ.) এর জীবন, শিক্ষা ও অবদান সম্পর্কে জানার প্ল্যাটফর্ম।' },
    contact_email: { type: String, default: 'info@imamrabbani.com' },
    language: { type: String, default: 'bn' }
  },
  social_media: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    youtube: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  appearance: {
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
    primary_color: { type: String, default: '#10b981' },
    rtl_layout: { type: Boolean, default: false },
    animation: { type: Boolean, default: true }
  },
  notifications: {
    new_comments: { type: Boolean, default: true },
    new_members: { type: Boolean, default: true },
    forum_activity: { type: Boolean, default: false },
    system_updates: { type: Boolean, default: true },
    daily_summary: { type: Boolean, default: false },
    weekly_report: { type: Boolean, default: true }
  },
  security: {
    two_factor_auth: { type: Boolean, default: false },
    login_alert: { type: Boolean, default: true },
    session_timeout: { type: String, default: '60' }
  },
  advanced: {
    api_access: { type: Boolean, default: false }
  }
}, { timestamps: true });

export default mongoose.model<ISettings>('Settings', SettingsSchema);
