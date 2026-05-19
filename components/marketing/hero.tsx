'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

const HEADLINE_WORDS = ['Describe', 'your', 'product.', 'Get', 'a', 'stunning', 'landing', 'page.', 'Ship', 'it.'];

const EXAMPLE_PROMPTS = [
  'A project management tool for remote teams...',
  'An AI writing assistant for content creators...',
  'A fitness tracking app for busy professionals...',
  'A SaaS invoicing tool for freelancers...',
];

function TypingPrompt() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pause' | 'erasing'>('typing');

  useEffect(() => {
    const current = EXAMPLE_PROMPTS[idx];

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 40);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('pause'), 1800);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'pause') {
      const t = setTimeout(() => setPhase('erasing'), 500);
      return () => clearTimeout(t);
    }

    if (phase === 'erasing') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 18);
        return () => clearTimeout(t);
      } else {
        setIdx(i => (i + 1) % EXAMPLE_PROMPTS.length);
        setPhase('typing');
      }
    }
  }, [displayed, phase, idx]);

  return (
    <div className="flex items-center gap-3 w-full max-w-lg mx-auto px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
      <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
      <span className="text-sm text-gray-300 truncate flex-1">
        {displayed}
        <span className="inline-block w-0.5 h-4 bg-purple-400 ml-0.5 animate-pulse align-middle" />
      </span>
    </div>
  );
}

function BrowserMockup() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/15">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/8">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-white/5 border border-white/8 text-xs text-gray-500 truncate">
          quicklaunch.app/p/sparkflow-ai
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/15 border border-green-500/25">
          <Zap className="w-3 h-3 text-green-400" />
          <span className="text-xs text-green-400 font-medium">Live</span>
        </div>
      </div>

      {/* Fake generated page */}
      <div className="bg-gradient-to-b from-[#0c0c1c] to-[#06060f] p-5 sm:p-6 min-h-[300px] sm:min-h-[340px]">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-xs text-purple-300 mb-4">
          <Sparkles className="w-3 h-3" />
          Generated in 9 seconds
        </div>

        {/* Mock hero */}
        <div className="space-y-2.5 mb-5">
          <div className="h-7 w-4/5 rounded-lg bg-gradient-to-r from-purple-400/45 to-cyan-400/35 shimmer" />
          <div className="h-4 w-full rounded-md bg-white/12" />
          <div className="h-4 w-3/4 rounded-md bg-white/8" />
          <div className="flex gap-3 mt-4">
            <div className="h-9 w-32 rounded-lg bg-gradient-to-r from-purple-600/85 to-cyan-600/75" />
            <div className="h-9 w-24 rounded-lg border border-white/15 bg-white/5" />
          </div>
        </div>

        {/* Mock stats row */}
        <div className="flex gap-4 mb-5">
          {['10k+', '4.9★', '99%'].map((val, i) => (
            <div key={i} className="flex-1 rounded-xl bg-white/4 border border-white/6 p-2.5 text-center">
              <div className="text-sm font-bold text-white/80">{val}</div>
              <div className="h-2 w-3/4 mx-auto rounded bg-white/10 mt-1" />
            </div>
          ))}
        </div>

        {/* Mock feature cards */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { color: 'bg-purple-500/30' },
            { color: 'bg-cyan-500/30' },
            { color: 'bg-pink-500/30' },
          ].map((card, i) => (
            <div key={i} className="rounded-xl bg-white/4 border border-white/6 p-3 space-y-2">
              <div className={`w-6 h-6 rounded-lg ${card.color}`} />
              <div className="h-2.5 w-2/3 rounded bg-white/18" />
              <div className="h-2 w-full rounded bg-white/10" />
              <div className="h-2 w-4/5 rounded bg-white/7" />
            </div>
          ))}
        </div>
      </div>

      {/* Fade-out overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-4 overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Floating ambient blobs */}
      <div className="absolute top-1/4 left-[15%] w-80 h-80 rounded-full bg-purple-600/18 blur-3xl animate-float pointer-events-none" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/3 right-[15%] w-64 h-64 rounded-full bg-cyan-500/12 blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2.5s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-pink-500/10 blur-3xl animate-float pointer-events-none" style={{ animationDelay: '4.5s' }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-purple-500/25 bg-purple-500/10 text-purple-300 text-sm font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          AI-powered · From idea to launch in seconds
        </motion.div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight leading-[1.1] mb-6">
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: 'easeOut' }}
              className={`inline-block mr-[0.22em] ${
                ['product.', 'stunning', 'Ship'].includes(word) ? 'gradient-text' : 'text-white'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed px-2"
        >
          QuickLaunch uses AI to generate beautiful, conversion-optimized landing pages in
          seconds — not hours. Edit visually, then export clean HTML.
        </motion.p>

        {/* Live prompt preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mb-8"
        >
          <TypingPrompt />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8"
        >
          <Link
            href="/register"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold text-base glow-button hover:opacity-90 transition-all"
          >
            Start Building Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white font-medium text-base hover:bg-white/10 hover:border-white/25 transition-all backdrop-blur-sm"
          >
            Sign In
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500 mb-16"
        >
          {['No credit card required', 'Free forever plan', 'Export clean HTML'].map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-green-500/80" />
              {item}
            </span>
          ))}
        </motion.div>

        {/* Browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-3xl mx-auto"
        >
          {/* Glow beneath */}
          <div className="absolute -inset-x-10 -bottom-6 h-32 bg-purple-600/20 blur-3xl pointer-events-none" />
          <BrowserMockup />
        </motion.div>
      </div>
    </section>
  );
}
