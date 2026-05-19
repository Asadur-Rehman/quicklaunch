import { SECTION_DEFAULTS } from './section-defaults';
import { COLOR_PALETTES } from './color-palettes';
import { FONT_PAIRS } from './font-pairs';
import { nanoid } from 'nanoid';

function createTemplateSections(types: (keyof typeof SECTION_DEFAULTS)[]) {
  return types.map((type, i) => ({
    id: nanoid(),
    type,
    variant: SECTION_DEFAULTS[type].variant,
    content: SECTION_DEFAULTS[type].content as unknown as Record<string, unknown>,
    order: i,
    isVisible: true,
  }));
}

export const TEMPLATES = [
  {
    id: 'saas-starter',
    title: 'SaaS Starter',
    description: 'A clean, modern layout perfect for B2B SaaS products.',
    theme: {
      colorScheme: COLOR_PALETTES[0].scheme,
      primaryColor: COLOR_PALETTES[0].primary,
      secondaryColor: COLOR_PALETTES[0].accent,
      accentColor: COLOR_PALETTES[0].accent,
      backgroundColor: COLOR_PALETTES[0].bg,
      textColor: COLOR_PALETTES[0].text,
      fontHeading: FONT_PAIRS[0].heading,
      fontBody: FONT_PAIRS[0].body,
      borderRadius: 'md' as const,
    },
    sections: createTemplateSections(['hero', 'features', 'how-it-works', 'pricing', 'faq', 'footer']),
  },
  {
    id: 'creator-portfolio',
    title: 'Creator Portfolio',
    description: 'Showcase your work and collect leads with this bold design.',
    theme: {
      colorScheme: COLOR_PALETTES[3].scheme,
      primaryColor: COLOR_PALETTES[3].primary,
      secondaryColor: COLOR_PALETTES[3].accent,
      accentColor: COLOR_PALETTES[3].accent,
      backgroundColor: COLOR_PALETTES[3].bg,
      textColor: COLOR_PALETTES[3].text,
      fontHeading: FONT_PAIRS[2].heading,
      fontBody: FONT_PAIRS[2].body,
      borderRadius: 'lg' as const,
    },
    sections: createTemplateSections(['hero', 'features', 'testimonials', 'cta', 'footer']),
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Launch',
    description: 'Drive app downloads with a vibrant, high-contrast landing page.',
    theme: {
      colorScheme: COLOR_PALETTES[1].scheme,
      primaryColor: COLOR_PALETTES[1].primary,
      secondaryColor: COLOR_PALETTES[1].accent,
      accentColor: COLOR_PALETTES[1].accent,
      backgroundColor: COLOR_PALETTES[1].bg,
      textColor: COLOR_PALETTES[1].text,
      fontHeading: FONT_PAIRS[1].heading,
      fontBody: FONT_PAIRS[1].body,
      borderRadius: 'full' as const,
    },
    sections: createTemplateSections(['hero', 'how-it-works', 'features', 'pricing', 'footer']),
  },
];
