import type { SectionType } from '@/types/page';

/**
 * Default content for each section type.
 * Used as fallbacks if AI output is incomplete or for new section creation.
 */

export interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCta: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  badge?: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesContent {
  headline: string;
  subheadline: string;
  features: FeatureItem[];
}

export interface StepItem {
  number: number;
  title: string;
  description: string;
}

export interface HowItWorksContent {
  headline: string;
  subheadline: string;
  steps: StepItem[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface TestimonialsContent {
  headline: string;
  testimonials: TestimonialItem[];
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: { text: string; href: string };
  highlighted?: boolean;
}

export interface PricingContent {
  headline: string;
  subheadline: string;
  tiers: PricingTier[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  headline: string;
  subheadline: string;
  questions: FaqItem[];
}

export interface CtaContent {
  headline: string;
  subheadline: string;
  cta: { text: string; href: string };
  badge?: string;
}

export interface FooterLink {
  text: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  companyName: string;
  tagline?: string;
  columns: FooterColumn[];
  socials: Array<{ platform: string; href: string }>;
  copyright: string;
}

export type SectionContentMap = {
  hero: HeroContent;
  features: FeaturesContent;
  'how-it-works': HowItWorksContent;
  testimonials: TestimonialsContent;
  pricing: PricingContent;
  faq: FaqContent;
  cta: CtaContent;
  footer: FooterContent;
};

export const SECTION_DEFAULTS: Record<SectionType, { variant: string; content: SectionContentMap[SectionType] }> = {
  hero: {
    variant: 'centered',
    content: {
      headline: 'Build something amazing today',
      subheadline: 'The fastest way to go from idea to a stunning landing page. No coding required.',
      primaryCta: { text: 'Get Started Free', href: '#' },
      secondaryCta: { text: 'Learn More', href: '#features' },
    },
  },
  features: {
    variant: 'grid-3',
    content: {
      headline: 'Everything you need',
      subheadline: 'Powerful tools to help you build, launch, and grow.',
      features: [
        { icon: 'Zap', title: 'Lightning Fast', description: 'Built for speed from the ground up.' },
        { icon: 'Shield', title: 'Secure by Default', description: 'Enterprise-grade security built in.' },
        { icon: 'BarChart3', title: 'Analytics', description: 'Deep insights into your performance.' },
        { icon: 'Puzzle', title: 'Integrations', description: 'Connect with your favorite tools.' },
        { icon: 'Users', title: 'Collaboration', description: 'Work together seamlessly.' },
        { icon: 'Globe', title: 'Global Scale', description: 'Deploy worldwide in seconds.' },
      ],
    },
  },
  'how-it-works': {
    variant: 'numbered-steps',
    content: {
      headline: 'How it works',
      subheadline: 'Get started in three simple steps.',
      steps: [
        { number: 1, title: 'Sign Up', description: 'Create your free account in seconds.' },
        { number: 2, title: 'Customize', description: 'Configure your project to match your needs.' },
        { number: 3, title: 'Launch', description: 'Go live and start seeing results immediately.' },
      ],
    },
  },
  testimonials: {
    variant: 'cards-3',
    content: {
      headline: 'Loved by builders',
      testimonials: [
        { quote: 'This completely changed how we build landing pages. Incredible tool.', author: 'Sarah Chen', role: 'Founder', company: 'LaunchPad' },
        { quote: 'The AI generation is genuinely magical. Saved us weeks of work.', author: 'Marcus Johnson', role: 'CTO', company: 'Nexus Labs' },
        { quote: 'Best investment we made this year. The export quality is fantastic.', author: 'Priya Sharma', role: 'Head of Marketing', company: 'GrowthKit' },
      ],
    },
  },
  pricing: {
    variant: 'two-tier',
    content: {
      headline: 'Simple, transparent pricing',
      subheadline: 'Start for free, upgrade when you need more.',
      tiers: [
        {
          name: 'Free',
          price: '$0',
          period: 'forever',
          description: 'Perfect for side projects',
          features: ['3 pages', 'Basic templates', 'HTML export', 'Community support'],
          cta: { text: 'Start Free', href: '#' },
        },
        {
          name: 'Pro',
          price: '$19',
          period: 'per month',
          description: 'For serious builders',
          features: ['Unlimited pages', 'All templates', 'Priority AI', 'Custom themes', 'Priority support'],
          cta: { text: 'Go Pro', href: '#' },
          highlighted: true,
        },
      ],
    },
  },
  faq: {
    variant: 'accordion',
    content: {
      headline: 'Frequently asked questions',
      subheadline: 'Everything you need to know.',
      questions: [
        { question: 'Is it really free?', answer: 'Yes! The free tier includes everything you need to get started. No credit card required.' },
        { question: 'Can I export my pages?', answer: 'Absolutely. Export clean, production-ready HTML that works anywhere — no dependencies.' },
        { question: 'How does AI generation work?', answer: 'Describe your product in a few sentences and our AI generates a complete landing page with sections, copy, and styling.' },
      ],
    },
  },
  cta: {
    variant: 'banner-centered',
    content: {
      headline: 'Ready to get started?',
      subheadline: 'Join thousands of builders who ship faster.',
      cta: { text: 'Start Building Free', href: '#' },
    },
  },
  footer: {
    variant: 'multi-column',
    content: {
      companyName: 'Product',
      tagline: 'Building the future, one page at a time.',
      columns: [
        { title: 'Product', links: [{ text: 'Features', href: '#' }, { text: 'Pricing', href: '#' }, { text: 'Templates', href: '#' }] },
        { title: 'Company', links: [{ text: 'About', href: '#' }, { text: 'Blog', href: '#' }, { text: 'Careers', href: '#' }] },
        { title: 'Legal', links: [{ text: 'Privacy', href: '#' }, { text: 'Terms', href: '#' }] },
      ],
      socials: [
        { platform: 'twitter', href: '#' },
        { platform: 'github', href: '#' },
        { platform: 'linkedin', href: '#' },
      ],
      copyright: '© 2026 Product. All rights reserved.',
    },
  },
};
