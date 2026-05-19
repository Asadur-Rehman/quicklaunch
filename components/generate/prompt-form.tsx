'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Zap } from 'lucide-react';

interface PromptFormProps {
  onSubmit: (data: {
    productName: string;
    description: string;
    targetAudience: string;
    tone: string;
  }) => void;
  isLoading: boolean;
}

const TONES = [
  { value: 'professional', label: 'Professional', desc: 'Clean and authoritative', emoji: '💼' },
  { value: 'playful',      label: 'Playful',      desc: 'Fun and approachable',   emoji: '🎉' },
  { value: 'bold',         label: 'Bold',         desc: 'Strong and impactful',   emoji: '⚡' },
  { value: 'minimal',      label: 'Minimal',      desc: 'Simple and elegant',     emoji: '✦'  },
];

const EXAMPLES = [
  { name: 'TaskFlow', desc: 'A project management tool that helps remote teams stay aligned with AI-powered task prioritization.' },
  { name: 'NoteGenius', desc: 'An AI writing assistant that turns messy voice memos into polished content for creators.' },
];

export function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const [productName, setProductName]     = useState('');
  const [description, setDescription]     = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [tone, setTone]                   = useState('professional');
  const [errors, setErrors]               = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!productName.trim()) newErrors.productName = 'Product name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (description.trim().length < 20) newErrors.description = 'Description should be at least 20 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ productName: productName.trim(), description: description.trim(), targetAudience: targetAudience.trim(), tone });
  }

  function fillExample(ex: typeof EXAMPLES[0]) {
    setProductName(ex.name);
    setDescription(ex.desc);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto px-2">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/40 mb-4">
          <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Create Your Landing Page
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">
          Describe your product and we&apos;ll generate a complete landing page in seconds.
        </p>
      </div>

      {/* Quick fill examples */}
      <div className="mb-6">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.name}
              type="button"
              onClick={() => fillExample(ex)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-purple-300 dark:hover:border-purple-700 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-950/30 transition-all disabled:opacity-40"
            >
              {ex.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {/* Product Name */}
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Product Name
          </label>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            placeholder="e.g., TaskFlow, NoteGenius, ShipFast"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all"
            disabled={isLoading}
          />
          {errors.productName && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{errors.productName}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Product Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe what your product does, who it's for, and what makes it unique. The more detail you give, the better the result."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all resize-none"
            disabled={isLoading}
          />
          {errors.description && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-1.5">{errors.description}</p>
          )}
        </div>

        {/* Target Audience */}
        <div>
          <label htmlFor="targetAudience" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Target Audience
            <span className="text-zinc-400 font-normal ml-1">(optional)</span>
          </label>
          <input
            id="targetAudience"
            type="text"
            value={targetAudience}
            onChange={e => setTargetAudience(e.target.value)}
            placeholder="e.g., Startup founders, freelance designers, remote teams"
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all"
            disabled={isLoading}
          />
        </div>

        {/* Tone */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Tone
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {TONES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTone(t.value)}
                disabled={isLoading}
                className={`p-3 rounded-xl border text-left transition-all ${
                  tone === t.value
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/50 ring-1 ring-purple-500/25 shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-base">{t.emoji}</span>
                  <p className={`text-sm font-semibold ${
                    tone === t.value ? 'text-purple-700 dark:text-purple-300' : 'text-zinc-700 dark:text-zinc-200'
                  }`}>
                    {t.label}
                  </p>
                </div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 pl-7">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-600/25 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Landing Page
            </>
          )}
        </button>
      </div>
    </form>
  );
}
