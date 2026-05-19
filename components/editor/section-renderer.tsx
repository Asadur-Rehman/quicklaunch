'use client';

import type { Section, Theme, SectionType } from '@/types/page';
import { HeroSection } from './sections/hero-section';
import { FeaturesSection } from './sections/features-section';
import { HowItWorksSection } from './sections/how-it-works-section';
import { TestimonialsSection } from './sections/testimonials-section';
import { PricingSection } from './sections/pricing-section';
import { FaqSection } from './sections/faq-section';
import { CtaSection } from './sections/cta-section';
import { FooterSection } from './sections/footer-section';
import { EditorSectionWrapper } from './editor-section-wrapper';

/* eslint-disable @typescript-eslint/no-explicit-any */
const SECTION_COMPONENTS: Record<SectionType, React.ComponentType<any>> = {
  hero: HeroSection,
  features: FeaturesSection,
  'how-it-works': HowItWorksSection,
  testimonials: TestimonialsSection,
  pricing: PricingSection,
  faq: FaqSection,
  cta: CtaSection,
  footer: FooterSection,
};
/* eslint-enable @typescript-eslint/no-explicit-any */

interface SectionRendererProps {
  section: Section;
  theme: Theme;
  isEditing?: boolean;
  onUpdate?: (content: Partial<Section['content']>) => void;
}

export function SectionRenderer({ section, theme, isEditing = false, onUpdate }: SectionRendererProps) {
  const Component = SECTION_COMPONENTS[section.type];
  if (!Component) return null;

  const content = (
    <Component
      variant={section.variant}
      content={section.content}
      theme={theme}
      isEditing={isEditing}
      onUpdate={onUpdate}
    />
  );

  if (isEditing) {
    return <EditorSectionWrapper section={section}>{content}</EditorSectionWrapper>;
  }

  return content;
}
