import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  siteName: string;
  description: string;
  url: string;
  ogImage?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  mapLocation?: string;
  mapLatitude?: number;
  mapLongitude?: number;
  faq: {
    question: string;
    answer: string;
  }[];
}

const SettingsSchema: Schema = new Schema(
  {
    siteName: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    ogImage: { type: String },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    address: { type: String, required: true },
    mapLocation: { type: String },
    mapLatitude: { type: Number },
    mapLongitude: { type: Number },
    faq: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
