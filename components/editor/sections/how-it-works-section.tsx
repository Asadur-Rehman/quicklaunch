'use client';

import type { HowItWorksContent } from '@/data/section-defaults';
import type { Theme } from '@/types/page';

interface HowItWorksSectionProps {
  variant: string;
  content: HowItWorksContent;
  theme: Theme;
  isEditing?: boolean;
  onUpdate?: (content: Partial<HowItWorksContent>) => void;
}

function NumberedSteps({ content, theme }: { content: HowItWorksContent; theme: Theme }) {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div
            className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-0.5 opacity-20"
            style={{ backgroundColor: theme.primaryColor }}
          />
          {content.steps.map((step, i) => (
            <div key={i} className="text-center relative">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold text-white relative z-10"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {step.number}
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: theme.fontHeading }}>
                {step.title}
              </h3>
              <p className="text-sm opacity-60 leading-relaxed" style={{ fontFamily: theme.fontBody }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline({ content, theme }: { content: HowItWorksContent; theme: Theme }) {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: theme.fontHeading }}>
            {content.headline}
          </h2>
          <p className="text-lg opacity-60 max-w-2xl mx-auto" style={{ fontFamily: theme.fontBody }}>
            {content.subheadline}
          </p>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-0.5 opacity-20"
            style={{ backgroundColor: theme.primaryColor }}
          />
          <div className="space-y-12">
            {content.steps.map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 text-lg font-bold text-white relative z-10"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {step.number}
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: theme.fontHeading }}>
                    {step.title}
                  </h3>
                  <p className="text-base opacity-60 leading-relaxed" style={{ fontFamily: theme.fontBody }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Cards({ content, theme }: { content: HowItWorksContent; theme: Theme }) {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.steps.map((step, i) => (
            <div
              key={i}
              className="p-8 rounded-xl text-center"
              style={{
                backgroundColor: theme.colorScheme === 'dark'
                  ? 'rgba(255,255,255,0.04)'
                  : 'rgba(0,0,0,0.02)',
                border: `1px solid ${theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-bold"
                style={{
                  backgroundColor: `${theme.primaryColor}15`,
                  color: theme.primaryColor,
                }}
              >
                {step.number}
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: theme.fontHeading }}>
                {step.title}
              </h3>
              <p className="text-sm opacity-60 leading-relaxed" style={{ fontFamily: theme.fontBody }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection({ variant, content, theme }: HowItWorksSectionProps) {
  const howContent = content as HowItWorksContent;
  switch (variant) {
    case 'timeline':
      return <Timeline content={howContent} theme={theme} />;
    case 'cards':
      return <Cards content={howContent} theme={theme} />;
    case 'numbered-steps':
    default:
      return <NumberedSteps content={howContent} theme={theme} />;
  }
}
