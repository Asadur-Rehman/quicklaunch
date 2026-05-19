export interface GenerationConfig {
  productName: string;
  description: string;
  targetAudience?: string;
  tone: 'professional' | 'playful' | 'bold' | 'minimal';
}

export interface GenerationProgress {
  status: 'idle' | 'generating' | 'complete' | 'error';
  completedSections: string[];
  currentSection: string | null;
  error: string | null;
}
