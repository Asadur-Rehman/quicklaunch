'use client';

import { CheckCircle, Loader2, Circle, AlertCircle } from 'lucide-react';
import { SECTION_TYPES } from '@/lib/constants';
import { useGenerationStore } from '@/stores/generation-store';

const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero Section',
  features: 'Features',
  'how-it-works': 'How It Works',
  testimonials: 'Testimonials',
  pricing: 'Pricing',
  faq: 'FAQ',
  cta: 'Call to Action',
  footer: 'Footer',
};

export function GenerationProgress() {
  const { status, completedSections, currentSection, error } = useGenerationStore();

  return (
    <div className="w-full max-w-xs">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
          {status === 'generating' ? 'Generating your page...' : status === 'complete' ? 'Generation complete!' : status === 'error' ? 'Generation failed' : 'Ready to generate'}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {status === 'generating'
            ? `${completedSections.length} of ${SECTION_TYPES.length} sections`
            : status === 'complete'
            ? 'All sections generated successfully'
            : status === 'error'
            ? error || 'An error occurred'
            : 'Fill in the form to start'}
        </p>
      </div>

      {/* Progress bar */}
      {(status === 'generating' || status === 'complete') && (
        <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-6 overflow-hidden">
          <div
            className="h-full rounded-full bg-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${(completedSections.length / SECTION_TYPES.length) * 100}%` }}
          />
        </div>
      )}

      {/* Section checklist */}
      <div className="space-y-2">
        {SECTION_TYPES.map((type) => {
          const isComplete = completedSections.includes(type);
          const isCurrent = currentSection === type;
          const isError = status === 'error';

          return (
            <div
              key={type}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isComplete
                  ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                  : isCurrent
                  ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                  : 'text-zinc-400 dark:text-zinc-500'
              }`}
            >
              {isComplete ? (
                <CheckCircle className="w-4 h-4 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
              ) : isError ? (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              ) : (
                <Circle className="w-4 h-4 shrink-0" />
              )}
              <span className="font-medium">{SECTION_LABELS[type] || type}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
