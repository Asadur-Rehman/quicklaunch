import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IPage extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  prompt: {
    productName: string;
    description: string;
    targetAudience?: string;
    tone: 'professional' | 'playful' | 'bold' | 'minimal';
  };
  sections: Array<{
    id: string;
    type: 'hero' | 'features' | 'how-it-works' | 'testimonials' | 'pricing' | 'faq' | 'cta' | 'footer';
    variant: string;
    content: Record<string, unknown>;
    order: number;
    isVisible: boolean;
  }>;
  theme: {
    colorScheme: 'light' | 'dark';
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontHeading: string;
    fontBody: string;
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  };
  status: 'generating' | 'draft' | 'published';
  templateId?: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}

const sectionSchema = new Schema(
  {
    id:        { type: String, required: true },
    type:      { type: String, required: true, enum: ['hero', 'features', 'how-it-works', 'testimonials', 'pricing', 'faq', 'cta', 'footer'] },
    variant:   { type: String, required: true },
    content:   { type: Schema.Types.Mixed, required: true },
    order:     { type: Number, required: true },
    isVisible: { type: Boolean, default: true },
  },
  { _id: false }
);

const themeSchema = new Schema(
  {
    colorScheme:     { type: String, enum: ['light', 'dark'], default: 'dark' },
    primaryColor:    { type: String, default: '#7c3aed' },
    secondaryColor:  { type: String, default: '#06b6d4' },
    accentColor:     { type: String, default: '#ec4899' },
    backgroundColor: { type: String, default: '#030712' },
    textColor:       { type: String, default: '#f9fafb' },
    fontHeading:     { type: String, default: 'Inter' },
    fontBody:        { type: String, default: 'Inter' },
    borderRadius:    { type: String, enum: ['none', 'sm', 'md', 'lg', 'full'], default: 'md' },
  },
  { _id: false }
);

const promptSchema = new Schema(
  {
    productName:    { type: String, required: true },
    description:    { type: String, required: true },
    targetAudience: { type: String },
    tone:           { type: String, enum: ['professional', 'playful', 'bold', 'minimal'], default: 'professional' },
  },
  { _id: false }
);

const pageSchema = new Schema<IPage>(
  {
    user:        { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title:       { type: String, required: true },
    slug:        { type: String, required: true },
    description: { type: String, required: true },
    prompt:      { type: promptSchema, required: true },
    sections:    { type: [sectionSchema], default: [] },
    theme:       { type: themeSchema, default: () => ({}) },
    status:      { type: String, enum: ['generating', 'draft', 'published'], default: 'draft' },
    templateId:  { type: String },
    thumbnail:   { type: String },
  },
  { timestamps: true }
);

pageSchema.index({ user: 1, createdAt: -1 });
pageSchema.index({ user: 1, slug: 1 }, { unique: true });

export const PageModel: Model<IPage> =
  (mongoose.models.Page as Model<IPage>) || mongoose.model<IPage>('Page', pageSchema);
