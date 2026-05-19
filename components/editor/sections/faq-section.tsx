'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { FaqContent } from '@/data/section-defaults';
import type { Theme } from '@/types/page';

interface FaqSectionProps {
  variant: string;
  content: FaqContent;
  theme: Theme;
  isEditing?: boolean;
  onUpdate?: (content: Partial<FaqContent>) => void;
}

function FaqAccordion({ content, theme }: { content: FaqContent; theme: Theme }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const borderColor = theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const bgCard = theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)';

  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: theme.fontHeading }}>{content.headline}</h2>
          <p className="text-lg opacity-60 max-w-2xl mx-auto" style={{ fontFamily: theme.fontBody }}>{content.subheadline}</p>
        </div>
        <div className="space-y-3">
          {content.questions.map((q, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ backgroundColor: bgCard, border: `1px solid ${borderColor}` }}>
              <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span className="font-semibold text-sm pr-4" style={{ fontFamily: theme.fontHeading }}>{q.question}</span>
                <ChevronDown className={`w-5 h-5 shrink-0 opacity-50 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm opacity-60 leading-relaxed" style={{ fontFamily: theme.fontBody }}>{q.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqTwoColumn({ content, theme }: { content: FaqContent; theme: Theme }) {
  const half = Math.ceil(content.questions.length / 2);
  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: theme.fontHeading }}>{content.headline}</h2>
          <p className="text-lg opacity-60 max-w-2xl mx-auto" style={{ fontFamily: theme.fontBody }}>{content.subheadline}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {[content.questions.slice(0, half), content.questions.slice(half)].map((col, ci) => (
            <div key={ci} className="space-y-8">
              {col.map((q, qi) => (
                <div key={qi}>
                  <h3 className="font-semibold mb-2" style={{ fontFamily: theme.fontHeading }}>{q.question}</h3>
                  <p className="text-sm opacity-60 leading-relaxed" style={{ fontFamily: theme.fontBody }}>{q.answer}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ variant, content, theme }: FaqSectionProps) {
  const faqContent = content as FaqContent;
  switch (variant) {
    case 'two-column':
      return <FaqTwoColumn content={faqContent} theme={theme} />;
    default:
      return <FaqAccordion content={faqContent} theme={theme} />;
  }
}
