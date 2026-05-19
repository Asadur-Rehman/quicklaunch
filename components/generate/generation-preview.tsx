'use client';

import { SectionRenderer } from '@/components/editor/section-renderer';
import { useGenerationStore } from '@/stores/generation-store';
import type { Theme } from '@/types/page';

const DEFAULT_THEME: Theme = {
  colorScheme: 'dark',
  primaryColor: '#7c3aed',
  secondaryColor: '#06b6d4',
  accentColor: '#ec4899',
  backgroundColor: '#030712',
  textColor: '#f9fafb',
  fontHeading: 'Inter',
  fontBody: 'Inter',
  borderRadius: 'md',
};

export function GenerationPreview() {
  const { parsedSections, parsedTheme, status } = useGenerationStore();

  const theme: Theme = {
    ...DEFAULT_THEME,
    ...(parsedTheme || {}),
  } as Theme;

  if (parsedSections.length === 0 && status === 'generating') {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
            <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Waiting for AI to generate sections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden">
      {/* Browser mockup frame */}
      <div className="h-full flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-900">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-zinc-200 dark:bg-zinc-700 rounded-md px-3 py-1 text-xs text-zinc-400 max-w-sm mx-auto text-center">
              preview.quicklaunch.app
            </div>
          </div>
        </div>

        {/* Preview content */}
        <div className="flex-1 overflow-y-auto">
          {parsedSections.map((section) => (
            <div key={section.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <SectionRenderer section={section} theme={theme} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
