import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  phone: string; // ফোন নম্বর ইউনিক আইডি হিসেবে
  name: string; // ইউজার নাম / Username
  password?: string;
  role: 'admin' | 'moderator' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true
  },
  name: {
    type: String,

    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false // ডিফল্টভাবে কুয়েরিতে পাসওয়ার্ড আসবে না
  },
  role: {
    type: String,
    enum: ['admin', 'moderator', 'user'],
    default: 'user'
  }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);
