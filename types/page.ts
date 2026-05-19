export type SectionType =
  | 'hero'
  | 'features'
  | 'how-it-works'
  | 'testimonials'
  | 'pricing'
  | 'faq'
  | 'cta'
  | 'footer';

export interface Section {
  id: string;
  type: SectionType;
  variant: string;
  content: Record<string, unknown>;
  order: number;
  isVisible: boolean;
}

export interface Theme {
  colorScheme: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontHeading: string;
  fontBody: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export interface Prompt {
  productName: string;
  description: string;
  targetAudience?: string;
  tone: 'professional' | 'playful' | 'bold' | 'minimal';
}

export interface Page {
  _id: string;
  user: string;
  title: string;
  slug: string;
  description: string;
  prompt: Prompt;
  sections: Section[];
  theme: Theme;
  status: 'generating' | 'draft' | 'published';
  templateId?: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}
