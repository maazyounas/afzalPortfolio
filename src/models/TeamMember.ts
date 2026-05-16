import mongoose, { Schema, Document } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  order: number;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
}

const TeamMemberSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String },
    image: { type: String },
    order: { type: Number, default: 0 },
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.models.TeamMember || mongoose.model<ITeamMember>("TeamMember", TeamMemberSchema);
