import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  avatar?: string;
  passwordHash?: string;
  githubId?: string;
  googleId?: string;
  preferences: {
    defaultTone: 'professional' | 'playful' | 'bold' | 'minimal';
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    name:  { type: String, required: true, trim: true },
    avatar:       { type: String },
    passwordHash: { type: String },
    githubId:     { type: String, sparse: true },
    googleId:     { type: String, sparse: true },
    preferences: {
      defaultTone: {
        type: String,
        enum: ['professional', 'playful', 'bold', 'minimal'],
        default: 'professional',
      },
    },
  },
  { timestamps: true }
);

export const UserModel: Model<IUser> =
  (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', userSchema);
