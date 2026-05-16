import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  author: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
  isActive: boolean;
}

const TestimonialSchema: Schema = new Schema(
  {
    author: { type: String, required: true },
    role: { type: String },
    company: { type: String },
    content: { type: String, required: true },
    rating: { type: Number, default: 5 },
    image: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
