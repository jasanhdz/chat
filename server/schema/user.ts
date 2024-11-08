// src/models/User.ts

import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  online?: string;
}

export interface IUserDocument extends IUser, Document {
  uid: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    online: {
      type: String,
      required: false,
      default: "offline",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.uid = ret._id.toHexString();
        delete ret._id;
        delete ret.id;
        delete ret.password;
      },
    },
  }
);

UserSchema.virtual('uid').get(function (this: IUserDocument) {
  return (this._id as unknown as any).toHexString();
});

UserSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password, salt);
    this.password = hashed;
    next();
  } catch (err) {
    next(err as any);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default model<IUserDocument>("User", UserSchema);
