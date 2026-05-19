import { z } from 'zod';

// ─── CTA Schema ────────────────────────────────────────────────
const ctaLinkSchema = z.object({
  text: z.string().min(1),
  href: z.string().default('#'),
});

// ─── Hero Content ──────────────────────────────────────────────
export const heroContentSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  primaryCta: ctaLinkSchema,
  secondaryCta: ctaLinkSchema.optional(),
  badge: z.string().optional(),
});

// ─── Features Content ──────────────────────────────────────────
const featureItemSchema = z.object({
  icon: z.string().default('Sparkles'),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const featuresContentSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  features: z.array(featureItemSchema).min(3).max(6),
});

// ─── How It Works Content ──────────────────────────────────────
const stepItemSchema = z.object({
  number: z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const howItWorksContentSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  steps: z.array(stepItemSchema).min(3).max(5),
});

// ─── Testimonials Content ──────────────────────────────────────
const testimonialItemSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  avatar: z.string().optional(),
});

export const testimonialsContentSchema = z.object({
  headline: z.string().min(1),
  testimonials: z.array(testimonialItemSchema).min(1).max(5),
});

// ─── Pricing Content ──────────────────────────────────────────
const pricingTierSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  period: z.string().min(1),
  description: z.string().min(1),
  features: z.array(z.string()).min(2),
  cta: ctaLinkSchema,
  highlighted: z.boolean().optional().default(false),
});

export const pricingContentSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  tiers: z.array(pricingTierSchema).min(1).max(4),
});

// ─── FAQ Content ──────────────────────────────────────────────
const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const faqContentSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  questions: z.array(faqItemSchema).min(2).max(8),
});

// ─── CTA Section Content ─────────────────────────────────────
export const ctaSectionContentSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  cta: ctaLinkSchema,
  badge: z.string().optional(),
});

// ─── Footer Content ──────────────────────────────────────────
const footerLinkSchema = z.object({
  text: z.string().min(1),
  href: z.string().default('#'),
});

const footerColumnSchema = z.object({
  title: z.string().min(1),
  links: z.array(footerLinkSchema).min(1),
});

const socialSchema = z.object({
  platform: z.string().min(1),
  href: z.string().default('#'),
});

export const footerContentSchema = z.object({
  companyName: z.string().min(1),
  tagline: z.string().optional(),
  columns: z.array(footerColumnSchema).min(1),
  socials: z.array(socialSchema).default([]),
  copyright: z.string().min(1),
});

// ─── Content Schema Map ──────────────────────────────────────
const CONTENT_SCHEMAS: Record<string, z.ZodType> = {
  hero: heroContentSchema,
  features: featuresContentSchema,
  'how-it-works': howItWorksContentSchema,
  testimonials: testimonialsContentSchema,
  pricing: pricingContentSchema,
  faq: faqContentSchema,
  cta: ctaSectionContentSchema,
  footer: footerContentSchema,
};

// ─── Section Schema ──────────────────────────────────────────
export const sectionSchema = z.object({
  type: z.enum(['hero', 'features', 'how-it-works', 'testimonials', 'pricing', 'faq', 'cta', 'footer']),
  variant: z.string().min(1),
  content: z.record(z.string(), z.unknown()),
});

// ─── Theme Schema ────────────────────────────────────────────
export const generatedThemeSchema = z.object({
  palette: z.string().min(1),
  fontPair: z.string().min(1),
  borderRadius: z.enum(['none', 'sm', 'md', 'lg']).default('md'),
});

// ─── Full Page Generation Schema ─────────────────────────────
export const pageGenerationSchema = z.object({
  pageTitle: z.string().min(1),
  pageDescription: z.string().min(1),
  sections: z.array(sectionSchema).min(6),
  theme: generatedThemeSchema,
});

export type PageGenerationOutput = z.infer<typeof pageGenerationSchema>;
export type GeneratedTheme = z.infer<typeof generatedThemeSchema>;

/**
 * Validate a section's content against its type-specific schema.
 * Returns the validated content or null if validation fails.
 */
export function validateSectionContent(type: string, content: unknown): Record<string, unknown> | null {
  const schema = CONTENT_SCHEMAS[type];
  if (!schema) return content as Record<string, unknown>;

  const result = schema.safeParse(content);
  if (result.success) return result.data as Record<string, unknown>;
  return null;
}

/**
 * Validate and normalize the full AI output.
 * Performs lenient parsing — passes through what it can, returns null for completely invalid output.
 */
export function validateGenerationOutput(data: unknown): PageGenerationOutput | null {
  const result = pageGenerationSchema.safeParse(data);
  if (result.success) return result.data;
  return null;
}
