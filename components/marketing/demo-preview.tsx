'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PREVIEWS = [
  {
    label:    'SaaS Product',
    badge:    'SaaS',
    bg:       'from-purple-900/50 to-indigo-900/50',
    accent:   '#7c3aed',
    headline: 'Scale your workflow with AI automation',
    sub:      'Built for teams that ship fast.',
    features: ['Workflow Automation', 'Team Collaboration', 'Real-time Analytics'],
  },
  {
    label:    'Mobile App',
    badge:    'Mobile App',
    bg:       'from-cyan-900/50 to-blue-900/50',
    accent:   '#06b6d4',
    headline: 'The todo app that actually works',
    sub:      '50,000+ happy users. Available on iOS & Android.',
    features: ['Smart Reminders', 'Cross-device Sync', 'Offline Mode'],
  },
  {
    label:    'Open Source',
    badge:    'Open Source',
    bg:       'from-green-900/50 to-emerald-900/50',
    accent:   '#22c55e',
    headline: 'The fastest state manager for React',
    sub:      '2.4KB gzipped. Zero dependencies.',
    features: ['TypeScript First', 'DevTools Support', 'MIT Licensed'],
  },
  {
    label:    'Personal Brand',
    badge:    'Portfolio',
    bg:       'from-pink-900/50 to-rose-900/50',
    accent:   '#ec4899',
    headline: 'Design that makes people remember you',
    sub:      'Freelance designer available for projects.',
    features: ['UI/UX Design', 'Brand Identity', 'Web Design'],
  },
];

export function DemoPreviewSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => (i - 1 + PREVIEWS.length) % PREVIEWS.length);
  const next = () => setCurrent(i => (i + 1) % PREVIEWS.length);
  const preview = PREVIEWS[current];

  return (
    <section id="templates" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs font-medium uppercase tracking-widest">
            Generated Pages
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4 tracking-tight">
            Every page is{' '}
            <span className="gradient-text">unique to you</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Same tool, completely different pages. See how QuickLaunch adapts to different products and styles.
          </p>
        </motion.div>

        {/* Mockup carousel */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden border border-white/8 shadow-2xl shadow-black/40">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/4 border-b border-white/8">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 mx-3 px-3 py-1 rounded bg-white/5 border border-white/8 text-xs text-gray-500">
                quicklaunch.app/preview/{preview.label.toLowerCase().replace(/\s/g, '-')}
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/20">
                {preview.badge}
              </span>
            </div>

            {/* Page content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`bg-gradient-to-br ${preview.bg} min-h-[380px] p-8 relative overflow-hidden`}
              >
                {/* BG decorative elements */}
                <div
                  className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ background: preview.accent }}
                />

                {/* Mock nav */}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-white/20" />
                    <div className="w-20 h-3 rounded bg-white/30" />
                  </div>
                  <div className="flex gap-4">
                    {[1, 2, 3].map(i => <div key={i} className="w-12 h-3 rounded bg-white/20" />)}
                  </div>
                  <div className="w-24 h-7 rounded-lg" style={{ background: `${preview.accent}80` }} />
                </div>

                {/* Mock hero */}
                <div className="max-w-md">
                  <div className="inline-block px-2 py-0.5 rounded-full bg-white/10 border border-white/15 mb-4">
                    <div className="w-24 h-3 rounded bg-white/40" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 font-display">{preview.headline}</h3>
                  <p className="text-white/60 text-sm mb-6">{preview.sub}</p>
                  <div className="flex gap-3">
                    <div className="h-9 w-32 rounded-lg" style={{ background: `${preview.accent}cc` }} />
                    <div className="h-9 w-24 rounded-lg border border-white/20 bg-white/5" />
                  </div>
                </div>

                {/* Mock feature chips */}
                <div className="absolute bottom-8 left-8 flex flex-wrap gap-2">
                  {preview.features.map((f, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs text-white/70 bg-white/8 border border-white/10">
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {PREVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${i === current ? 'w-6 bg-purple-400' : 'w-1.5 bg-white/20 hover:bg-white/30'}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
