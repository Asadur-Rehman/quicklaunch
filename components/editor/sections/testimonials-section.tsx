'use client';

import { Star } from 'lucide-react';
import type { TestimonialsContent } from '@/data/section-defaults';
import type { Theme } from '@/types/page';

interface TestimonialsSectionProps {
  variant: string;
  content: TestimonialsContent;
  theme: Theme;
  isEditing?: boolean;
  onUpdate?: (content: Partial<TestimonialsContent>) => void;
}

function TestimonialCards3({ content, theme }: { content: TestimonialsContent; theme: Theme }) {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: theme.fontHeading }}>
            {content.headline}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.testimonials.slice(0, 3).map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-xl"
              style={{
                backgroundColor: theme.colorScheme === 'dark'
                  ? 'rgba(255,255,255,0.04)'
                  : 'rgba(0,0,0,0.02)',
                border: `1px solid ${theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-current" style={{ color: theme.primaryColor }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed opacity-80 mb-6" style={{ fontFamily: theme.fontBody }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.author}</p>
                  <p className="text-xs opacity-50">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSingleLarge({ content, theme }: { content: TestimonialsContent; theme: Theme }) {
  const t = content.testimonials[0];
  if (!t) return null;
  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ fontFamily: theme.fontHeading }}>
          {content.headline}
        </h2>
        <div className="flex gap-1 justify-center mb-6">
          {[...Array(5)].map((_, si) => (
            <Star key={si} className="w-5 h-5 fill-current" style={{ color: theme.primaryColor }} />
          ))}
        </div>
        <blockquote
          className="text-xl md:text-2xl leading-relaxed opacity-80 mb-8"
          style={{ fontFamily: theme.fontBody }}
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold text-white"
            style={{ backgroundColor: theme.primaryColor }}
          >
            {t.author.charAt(0)}
          </div>
          <div className="text-left">
            <p className="font-semibold">{t.author}</p>
            <p className="text-sm opacity-50">{t.role}, {t.company}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCarousel({ content, theme }: { content: TestimonialsContent; theme: Theme }) {
  // Static carousel rendering (no JS carousel for export compatibility)
  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: theme.fontHeading }}>
            {content.headline}
          </h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {content.testimonials.map((t, i) => (
            <div
              key={i}
              className="min-w-[320px] md:min-w-[380px] p-8 rounded-xl shrink-0 snap-center"
              style={{
                backgroundColor: theme.colorScheme === 'dark'
                  ? 'rgba(255,255,255,0.04)'
                  : 'rgba(0,0,0,0.02)',
                border: `1px solid ${theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-current" style={{ color: theme.primaryColor }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed opacity-80 mb-6" style={{ fontFamily: theme.fontBody }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.author}</p>
                  <p className="text-xs opacity-50">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection({ variant, content, theme }: TestimonialsSectionProps) {
  const testimonialContent = content as TestimonialsContent;
  switch (variant) {
    case 'single-large':
      return <TestimonialSingleLarge content={testimonialContent} theme={theme} />;
    case 'carousel':
      return <TestimonialCarousel content={testimonialContent} theme={theme} />;
    case 'cards-3':
    default:
      return <TestimonialCards3 content={testimonialContent} theme={theme} />;
  }
}
