'use client';

import { ArrowRight } from 'lucide-react';
import type { CtaContent } from '@/data/section-defaults';
import type { Theme } from '@/types/page';

interface CtaSectionProps {
  variant: string;
  content: CtaContent;
  theme: Theme;
  isEditing?: boolean;
  onUpdate?: (content: Partial<CtaContent>) => void;
}

function BannerCentered({ content, theme }: { content: CtaContent; theme: Theme }) {
  return (
    <section className="py-20 px-6" style={{ background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.accentColor} 100%)` }}>
      <div className="max-w-3xl mx-auto text-center">
        {content.badge && (
          <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full mb-6 bg-white/20 text-white">{content.badge}</span>
        )}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" style={{ fontFamily: theme.fontHeading }}>{content.headline}</h2>
        <p className="text-lg mb-8 text-white/80" style={{ fontFamily: theme.fontBody }}>{content.subheadline}</p>
        <a href={content.cta.href} className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-lg bg-white transition-all hover:bg-white/90" style={{ color: theme.primaryColor }}>
          {content.cta.text}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

function BannerSplit({ content, theme }: { content: CtaContent; theme: Theme }) {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 p-10 rounded-2xl" style={{ background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.accentColor} 100%)` }}>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: theme.fontHeading }}>{content.headline}</h2>
          <p className="text-white/70" style={{ fontFamily: theme.fontBody }}>{content.subheadline}</p>
        </div>
        <a href={content.cta.href} className="shrink-0 inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-lg bg-white transition-all hover:bg-white/90" style={{ color: theme.primaryColor }}>
          {content.cta.text}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

function BannerMinimal({ content, theme }: { content: CtaContent; theme: Theme }) {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: theme.fontHeading }}>{content.headline}</h2>
        <p className="text-lg opacity-60 mb-8" style={{ fontFamily: theme.fontBody }}>{content.subheadline}</p>
        <a href={content.cta.href} className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-lg text-white transition-all hover:opacity-90" style={{ backgroundColor: theme.primaryColor }}>
          {content.cta.text}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

export function CtaSection({ variant, content, theme }: CtaSectionProps) {
  const ctaContent = content as CtaContent;
  switch (variant) {
    case 'banner-split': return <BannerSplit content={ctaContent} theme={theme} />;
    case 'minimal': return <BannerMinimal content={ctaContent} theme={theme} />;
    default: return <BannerCentered content={ctaContent} theme={theme} />;
  }
}
