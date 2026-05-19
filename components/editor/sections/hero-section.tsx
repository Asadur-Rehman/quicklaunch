'use client';

import { ArrowRight } from 'lucide-react';
import type { HeroContent } from '@/data/section-defaults';
import type { Theme } from '@/types/page';

interface HeroSectionProps {
  variant: string;
  content: HeroContent;
  theme: Theme;
  isEditing?: boolean;
  onUpdate?: (content: Partial<HeroContent>) => void;
}

function HeroCentered({ content, theme }: { content: HeroContent; theme: Theme }) {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${theme.primaryColor}40 0%, transparent 60%),
                       radial-gradient(ellipse 60% 40% at 80% 0%, ${theme.accentColor}20 0%, transparent 60%)`,
        }}
      />
      <div className="relative max-w-4xl mx-auto text-center">
        {content.badge && (
          <span
            className="inline-block px-4 py-1.5 text-xs font-medium rounded-full mb-6"
            style={{
              backgroundColor: `${theme.primaryColor}15`,
              color: theme.primaryColor,
              border: `1px solid ${theme.primaryColor}30`,
            }}
          >
            {content.badge}
          </span>
        )}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]"
          style={{ fontFamily: theme.fontHeading }}
        >
          {content.headline}
        </h1>
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-70"
          style={{ fontFamily: theme.fontBody }}
        >
          {content.subheadline}
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href={content.primaryCta.href}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-lg text-white transition-all hover:opacity-90"
            style={{ backgroundColor: theme.primaryColor }}
          >
            {content.primaryCta.text}
            <ArrowRight className="w-4 h-4" />
          </a>
          {content.secondaryCta && (
            <a
              href={content.secondaryCta.href}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-lg border transition-all hover:opacity-80"
              style={{
                borderColor: `${theme.textColor}20`,
                color: theme.textColor,
              }}
            >
              {content.secondaryCta.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function HeroSplitLeft({ content, theme }: { content: HeroContent; theme: Theme }) {
  return (
    <section
      className="relative py-20 px-6 overflow-hidden"
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          {content.badge && (
            <span
              className="inline-block px-4 py-1.5 text-xs font-medium rounded-full mb-6"
              style={{
                backgroundColor: `${theme.primaryColor}15`,
                color: theme.primaryColor,
                border: `1px solid ${theme.primaryColor}30`,
              }}
            >
              {content.badge}
            </span>
          )}
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.1]"
            style={{ fontFamily: theme.fontHeading }}
          >
            {content.headline}
          </h1>
          <p
            className="text-lg mb-8 opacity-70"
            style={{ fontFamily: theme.fontBody }}
          >
            {content.subheadline}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={content.primaryCta.href}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-lg text-white transition-all hover:opacity-90"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {content.primaryCta.text}
              <ArrowRight className="w-4 h-4" />
            </a>
            {content.secondaryCta && (
              <a
                href={content.secondaryCta.href}
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-lg border transition-all hover:opacity-80"
                style={{
                  borderColor: `${theme.textColor}20`,
                  color: theme.textColor,
                }}
              >
                {content.secondaryCta.text}
              </a>
            )}
          </div>
        </div>
        <div
          className="rounded-2xl aspect-[4/3] flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryColor}20 0%, ${theme.accentColor}20 100%)`,
            border: `1px solid ${theme.primaryColor}20`,
          }}
        >
          <div className="text-center opacity-50">
            <div className="text-4xl mb-2">🚀</div>
            <p className="text-sm" style={{ fontFamily: theme.fontBody }}>Product Preview</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSplitRight({ content, theme }: { content: HeroContent; theme: Theme }) {
  return (
    <section
      className="relative py-20 px-6 overflow-hidden"
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div
          className="rounded-2xl aspect-[4/3] flex items-center justify-center order-2 lg:order-1"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryColor}20 0%, ${theme.accentColor}20 100%)`,
            border: `1px solid ${theme.primaryColor}20`,
          }}
        >
          <div className="text-center opacity-50">
            <div className="text-4xl mb-2">✨</div>
            <p className="text-sm" style={{ fontFamily: theme.fontBody }}>Product Preview</p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          {content.badge && (
            <span
              className="inline-block px-4 py-1.5 text-xs font-medium rounded-full mb-6"
              style={{
                backgroundColor: `${theme.primaryColor}15`,
                color: theme.primaryColor,
                border: `1px solid ${theme.primaryColor}30`,
              }}
            >
              {content.badge}
            </span>
          )}
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.1]"
            style={{ fontFamily: theme.fontHeading }}
          >
            {content.headline}
          </h1>
          <p
            className="text-lg mb-8 opacity-70"
            style={{ fontFamily: theme.fontBody }}
          >
            {content.subheadline}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={content.primaryCta.href}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-lg text-white transition-all hover:opacity-90"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {content.primaryCta.text}
              <ArrowRight className="w-4 h-4" />
            </a>
            {content.secondaryCta && (
              <a
                href={content.secondaryCta.href}
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-lg border transition-all hover:opacity-80"
                style={{
                  borderColor: `${theme.textColor}20`,
                  color: theme.textColor,
                }}
              >
                {content.secondaryCta.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroSection({ variant, content, theme }: HeroSectionProps) {
  const heroContent = content as HeroContent;
  switch (variant) {
    case 'split-left':
      return <HeroSplitLeft content={heroContent} theme={theme} />;
    case 'split-right':
      return <HeroSplitRight content={heroContent} theme={theme} />;
    case 'centered':
    default:
      return <HeroCentered content={heroContent} theme={theme} />;
  }
}
