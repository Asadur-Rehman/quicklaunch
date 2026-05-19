export const APP_NAME = 'QuickLaunch';
export const APP_DESCRIPTION = 'AI-powered landing page generator. Describe your product, get a stunning page in seconds.';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export const SECTION_TYPES = ['hero', 'features', 'how-it-works', 'testimonials', 'pricing', 'faq', 'cta', 'footer'] as const;

export const TONES = ['professional', 'playful', 'bold', 'minimal'] as const;

export const GENERATION_RATE_LIMIT = 10; // per hour per user

export const AUTOSAVE_DELAY_MS = 3000;

export const VIEWPORT_WIDTHS = {
  desktop: 1280,
  tablet: 768,
  mobile: 390,
} as const;
