import mongoose, { Schema, type Document } from "mongoose";

export interface IAdminCredential extends Document {
  key: string;
  username: string;
  passwordHash: string;
}

const AdminCredentialSchema = new Schema<IAdminCredential>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "admin",
      trim: true,
      immutable: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AdminCredential ||
  mongoose.model<IAdminCredential>("AdminCredential", AdminCredentialSchema);
