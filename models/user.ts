import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../interfaces';

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const User: Model<IUser> = mongoose.models.User || mongoose.model('User', UserSchema);
