'use client';

import { Check } from 'lucide-react';
import type { PricingContent } from '@/data/section-defaults';
import type { Theme } from '@/types/page';

interface PricingSectionProps {
  variant: string;
  content: PricingContent;
  theme: Theme;
  isEditing?: boolean;
  onUpdate?: (content: Partial<PricingContent>) => void;
}

function PricingTwoTier({ content, theme }: { content: PricingContent; theme: Theme }) {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: theme.fontHeading }}>
            {content.headline}
          </h2>
          <p className="text-lg opacity-60 max-w-2xl mx-auto" style={{ fontFamily: theme.fontBody }}>
            {content.subheadline}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {content.tiers.slice(0, 2).map((tier, i) => (
            <div
              key={i}
              className="p-8 rounded-xl relative"
              style={{
                backgroundColor: theme.colorScheme === 'dark'
                  ? 'rgba(255,255,255,0.04)'
                  : 'rgba(0,0,0,0.02)',
                border: tier.highlighted
                  ? `2px solid ${theme.primaryColor}`
                  : `1px solid ${theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              }}
            >
              {tier.highlighted && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full text-white"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: theme.fontHeading }}>
                {tier.name}
              </h3>
              <p className="text-sm opacity-50 mb-4" style={{ fontFamily: theme.fontBody }}>
                {tier.description}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-sm opacity-50 ml-1">/{tier.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feat, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 shrink-0" style={{ color: theme.primaryColor }} />
                    <span className="opacity-70">{feat}</span>
                  </li>
                ))}
              </ul>
              <a
                href={tier.cta.href}
                className="block w-full py-3 text-center text-sm font-semibold rounded-lg transition-all hover:opacity-90"
                style={
                  tier.highlighted
                    ? { backgroundColor: theme.primaryColor, color: '#ffffff' }
                    : {
                        backgroundColor: 'transparent',
                        border: `1px solid ${theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                        color: theme.textColor,
                      }
                }
              >
                {tier.cta.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingThreeTier({ content, theme }: { content: PricingContent; theme: Theme }) {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: theme.fontHeading }}>
            {content.headline}
          </h2>
          <p className="text-lg opacity-60 max-w-2xl mx-auto" style={{ fontFamily: theme.fontBody }}>
            {content.subheadline}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.tiers.slice(0, 3).map((tier, i) => (
            <div
              key={i}
              className={`p-8 rounded-xl relative ${tier.highlighted ? 'md:-mt-4 md:mb-[-1rem]' : ''}`}
              style={{
                backgroundColor: theme.colorScheme === 'dark'
                  ? 'rgba(255,255,255,0.04)'
                  : 'rgba(0,0,0,0.02)',
                border: tier.highlighted
                  ? `2px solid ${theme.primaryColor}`
                  : `1px solid ${theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              }}
            >
              {tier.highlighted && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full text-white"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: theme.fontHeading }}>
                {tier.name}
              </h3>
              <p className="text-sm opacity-50 mb-4" style={{ fontFamily: theme.fontBody }}>
                {tier.description}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-sm opacity-50 ml-1">/{tier.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feat, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 shrink-0" style={{ color: theme.primaryColor }} />
                    <span className="opacity-70">{feat}</span>
                  </li>
                ))}
              </ul>
              <a
                href={tier.cta.href}
                className="block w-full py-3 text-center text-sm font-semibold rounded-lg transition-all hover:opacity-90"
                style={
                  tier.highlighted
                    ? { backgroundColor: theme.primaryColor, color: '#ffffff' }
                    : {
                        backgroundColor: 'transparent',
                        border: `1px solid ${theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                        color: theme.textColor,
                      }
                }
              >
                {tier.cta.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSingleHighlight({ content, theme }: { content: PricingContent; theme: Theme }) {
  const tier = content.tiers.find(t => t.highlighted) || content.tiers[0];
  if (!tier) return null;
  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: theme.fontHeading }}>
          {content.headline}
        </h2>
        <p className="text-lg opacity-60 mb-12" style={{ fontFamily: theme.fontBody }}>
          {content.subheadline}
        </p>
        <div
          className="p-10 rounded-2xl text-center"
          style={{
            border: `2px solid ${theme.primaryColor}`,
            backgroundColor: theme.colorScheme === 'dark'
              ? 'rgba(255,255,255,0.04)'
              : 'rgba(0,0,0,0.02)',
          }}
        >
          <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: theme.fontHeading }}>
            {tier.name}
          </h3>
          <p className="text-sm opacity-50 mb-6" style={{ fontFamily: theme.fontBody }}>
            {tier.description}
          </p>
          <div className="mb-8">
            <span className="text-5xl font-bold">{tier.price}</span>
            <span className="text-lg opacity-50 ml-1">/{tier.period}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left max-w-md mx-auto">
            {tier.features.map((feat, fi) => (
              <div key={fi} className="flex items-center gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0" style={{ color: theme.primaryColor }} />
                <span className="opacity-70">{feat}</span>
              </div>
            ))}
          </div>
          <a
            href={tier.cta.href}
            className="inline-block px-10 py-3.5 text-sm font-semibold rounded-lg text-white transition-all hover:opacity-90"
            style={{ backgroundColor: theme.primaryColor }}
          >
            {tier.cta.text}
          </a>
        </div>
      </div>
    </section>
  );
}

export function PricingSection({ variant, content, theme }: PricingSectionProps) {
  const pricingContent = content as PricingContent;
  switch (variant) {
    case 'three-tier':
      return <PricingThreeTier content={pricingContent} theme={theme} />;
    case 'single-highlight':
      return <PricingSingleHighlight content={pricingContent} theme={theme} />;
    case 'two-tier':
    default:
      return <PricingTwoTier content={pricingContent} theme={theme} />;
  }
}
