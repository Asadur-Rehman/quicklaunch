'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCompletion } from '@ai-sdk/react';
import { nanoid } from 'nanoid';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PromptForm } from '@/components/generate/prompt-form';
import { GenerationProgress } from '@/components/generate/generation-progress';
import { GenerationPreview } from '@/components/generate/generation-preview';
import { useGenerationStore } from '@/stores/generation-store';
import { savePage } from '@/lib/api-client';
import { validateGenerationOutput } from '@/lib/ai/schemas';
import { COLOR_PALETTES } from '@/data/color-palettes';
import { FONT_PAIRS } from '@/data/font-pairs';
import type { Section, Theme } from '@/types/page';

function resolveTheme(aiTheme: { palette?: string; fontPair?: string; borderRadius?: string }): Theme {
  const palette = COLOR_PALETTES.find(p => p.name === aiTheme.palette) || COLOR_PALETTES[0];
  const fontPair = FONT_PAIRS.find(f => f.name === aiTheme.fontPair) || FONT_PAIRS[0];

  return {
    colorScheme: palette.scheme,
    primaryColor: palette.primary,
    secondaryColor: palette.accent,
    accentColor: palette.accent,
    backgroundColor: palette.bg,
    textColor: palette.text,
    fontHeading: fontPair.heading,
    fontBody: fontPair.body,
    borderRadius: (aiTheme.borderRadius as Theme['borderRadius']) || 'md',
  };
}

export default function GeneratePage() {
  const router = useRouter();
  const [step, setStep] = useState<'prompt' | 'generating' | 'complete'>('prompt');
  const [formData, setFormData] = useState<{
    productName: string;
    description: string;
    targetAudience: string;
    tone: string;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const store = useGenerationStore();

  const { complete, isLoading } = useCompletion({
    api: '/api/generate',
    onFinish: (_prompt: string, completion: string) => {
      try {
        const parsed = JSON.parse(completion);
        const validated = validateGenerationOutput(parsed);

        if (!validated) {
          store.setError('AI returned invalid data. Please try again.');
          return;
        }

        const theme = resolveTheme(validated.theme);
        store.setTheme(theme);
        store.setPageMeta(validated.pageTitle, validated.pageDescription);

        const sections: Section[] = validated.sections.map((s, i) => ({
          id: nanoid(),
          type: s.type,
          variant: s.variant,
          content: s.content as Record<string, unknown>,
          order: i,
          isVisible: true,
        }));

        sections.forEach((section) => {
          store.addParsedSection(section);
          store.markSectionComplete(section.type);
        });

        store.setComplete();
        setStep('complete');
      } catch {
        store.setError('Failed to parse AI response. Please try again.');
      }
    },
    onError: (error: Error) => {
      store.setError(error.message || 'Generation failed. Please try again.');
    },
  });

  useEffect(() => {
    if (!isLoading) return;

    const sectionOrder = ['hero', 'features', 'how-it-works', 'testimonials', 'pricing', 'faq', 'cta', 'footer'];
    let idx = 0;

    const interval = setInterval(() => {
      if (idx < sectionOrder.length) {
        store.setCurrentSection(sectionOrder[idx]);
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isLoading, store]);

  const handleGenerate = useCallback(
    async (data: { productName: string; description: string; targetAudience: string; tone: string }) => {
      setFormData(data);
      setStep('generating');
      store.startGeneration();

      await complete('', {
        body: {
          productName: data.productName,
          description: data.description,
          targetAudience: data.targetAudience || undefined,
          tone: data.tone,
        },
      });
    },
    [complete, store]
  );

  const handleSaveAndEdit = useCallback(async () => {
    if (!formData || store.parsedSections.length === 0) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const theme = store.parsedTheme as Theme;
      const page = await savePage({
        title: store.parsedPageTitle || formData.productName,
        description: store.parsedPageDescription || formData.description,
        prompt: {
          productName: formData.productName,
          description: formData.description,
          targetAudience: formData.targetAudience || undefined,
          tone: formData.tone,
        },
        sections: store.parsedSections,
        theme,
      });

      store.setSavedPageId(page._id);
      router.push(`/editor/${page._id}`);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save page');
    } finally {
      setIsSaving(false);
    }
  }, [formData, store, router]);

  const handleReset = useCallback(() => {
    store.reset();
    setStep('prompt');
    setFormData(null);
    setSaveError(null);
  }, [store]);

  if (step === 'prompt') {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] py-8">
        <PromptForm onSubmit={handleGenerate} isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:h-[calc(100vh-120px)] gap-4 sm:gap-6">
      {/* Progress panel */}
      <div className="md:w-72 shrink-0 flex flex-col">
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex-1">
          <GenerationProgress />
        </div>

        {/* Actions */}
        <div className="mt-4 space-y-2.5">
          {step === 'complete' && (
            <button
              onClick={handleSaveAndEdit}
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-all disabled:opacity-50 shadow-lg shadow-purple-600/25"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Open in Editor
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
          {saveError && <p className="text-red-500 text-xs text-center">{saveError}</p>}
          <button
            onClick={handleReset}
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
            Generate Another
          </button>
        </div>
      </div>

      {/* Preview panel */}
      <div className="flex-1 min-h-[400px] md:min-h-0">
        <GenerationPreview />
      </div>
    </div>
  );
}
