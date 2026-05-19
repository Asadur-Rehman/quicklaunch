'use client';

import { getIcon } from '@/lib/icon-map';
import type { FeaturesContent } from '@/data/section-defaults';
import type { Theme } from '@/types/page';

interface FeaturesSectionProps {
  variant: string;
  content: FeaturesContent;
  theme: Theme;
  isEditing?: boolean;
  onUpdate?: (content: Partial<FeaturesContent>) => void;
}

function FeaturesGrid3({ content, theme }: { content: FeaturesContent; theme: Theme }) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features.map((feature, i) => {
            const Icon = getIcon(feature.icon);
            return (
              <div
                key={i}
                className="p-6 rounded-xl transition-all hover:-translate-y-1"
                style={{
                  backgroundColor: theme.colorScheme === 'dark'
                    ? 'rgba(255,255,255,0.04)'
                    : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${theme.primaryColor}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: theme.primaryColor }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: theme.fontHeading }}>
                  {feature.title}
                </h3>
                <p className="text-sm opacity-60 leading-relaxed" style={{ fontFamily: theme.fontBody }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturesGrid2x2({ content, theme }: { content: FeaturesContent; theme: Theme }) {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: theme.fontHeading }}>
            {content.headline}
          </h2>
          <p className="text-lg opacity-60 max-w-2xl mx-auto" style={{ fontFamily: theme.fontBody }}>
            {content.subheadline}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.features.slice(0, 4).map((feature, i) => {
            const Icon = getIcon(feature.icon);
            return (
              <div
                key={i}
                className="p-8 rounded-xl flex gap-5"
                style={{
                  backgroundColor: theme.colorScheme === 'dark'
                    ? 'rgba(255,255,255,0.04)'
                    : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${theme.primaryColor}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: theme.primaryColor }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: theme.fontHeading }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm opacity-60 leading-relaxed" style={{ fontFamily: theme.fontBody }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturesAlternating({ content, theme }: { content: FeaturesContent; theme: Theme }) {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: theme.fontHeading }}>
            {content.headline}
          </h2>
          <p className="text-lg opacity-60 max-w-2xl mx-auto" style={{ fontFamily: theme.fontBody }}>
            {content.subheadline}
          </p>
        </div>
        <div className="space-y-16">
          {content.features.slice(0, 3).map((feature, i) => {
            const Icon = getIcon(feature.icon);
            const isReversed = i % 2 === 1;
            return (
              <div
                key={i}
                className={`flex flex-col md:flex-row gap-8 items-center ${isReversed ? 'md:flex-row-reverse' : ''}`}
              >
                <div
                  className="w-full md:w-1/2 aspect-[16/10] rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primaryColor}15 0%, ${theme.accentColor}15 100%)`,
                    border: `1px solid ${theme.primaryColor}15`,
                  }}
                >
                  <Icon className="w-16 h-16 opacity-40" style={{ color: theme.primaryColor }} />
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: theme.fontHeading }}>
                    {feature.title}
                  </h3>
                  <p className="text-base opacity-60 leading-relaxed" style={{ fontFamily: theme.fontBody }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection({ variant, content, theme }: FeaturesSectionProps) {
  const featuresContent = content as FeaturesContent;
  switch (variant) {
    case 'grid-2x2':
      return <FeaturesGrid2x2 content={featuresContent} theme={theme} />;
    case 'alternating-rows':
      return <FeaturesAlternating content={featuresContent} theme={theme} />;
    case 'grid-3':
    default:
      return <FeaturesGrid3 content={featuresContent} theme={theme} />;
  }
}
