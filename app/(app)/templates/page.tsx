'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, LayoutTemplate, Sparkles, Loader2 } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { toast } from 'sonner';

export default function TemplatesPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState<string | null>(null);

  async function handleUseTemplate(template: typeof TEMPLATES[0]) {
    setIsCreating(template.id);
    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: template.title,
          description: template.description,
          theme: template.theme,
          sections: template.sections,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        toast.success('Template cloned successfully!');
        router.push(`/editor/${json.data._id}`);
      } else {
        throw new Error(json.error?.message || 'Failed to create page from template');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error creating template. Please try again.');
      setIsCreating(null);
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Templates</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Start from a pre-designed layout or generate a custom one with AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Generate Card */}
        <div className="flex flex-col bg-purple-50 dark:bg-purple-900/10 border-2 border-dashed border-purple-200 dark:border-purple-800/50 rounded-2xl overflow-hidden hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300">
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-5">
              <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-xl text-purple-900 dark:text-purple-100 mb-2">
              Generate with AI
            </h3>
            <p className="text-sm text-purple-700/70 dark:text-purple-300/70 mb-6">
              Describe your product and let our AI build a custom, highly-converting layout.
            </p>
            <Link
              href="/generate"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              Start Generating
            </Link>
          </div>
        </div>

        {/* Template Cards */}
        {TEMPLATES.map(template => (
          <div key={template.id} className="group flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div 
              className="h-40 flex flex-col items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: template.theme.backgroundColor }}
            >
              {/* Abstract preview pattern based on primary color */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{ 
                  background: `repeating-linear-gradient(45deg, ${template.theme.primaryColor}, ${template.theme.primaryColor} 10px, transparent 10px, transparent 20px)` 
                }}
              />
              <LayoutTemplate className="w-12 h-12 relative z-10" style={{ color: template.theme.primaryColor }} />
            </div>

            <div className="flex-1 p-6 flex flex-col">
              <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-2">
                {template.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 flex-1">
                {template.description}
              </p>
              
              <button
                onClick={() => handleUseTemplate(template)}
                disabled={isCreating !== null}
                className="mt-6 w-full py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isCreating === template.id ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</>
                ) : (
                  'Use Template'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
