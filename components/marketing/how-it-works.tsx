'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Rocket } from 'lucide-react';

const STEPS = [
  {
    icon:     MessageSquare,
    number:   '01',
    title:    'Describe',
    subtitle: 'Your idea in plain English',
    description:
      'Type your product name, a one-sentence description, your target audience, and pick a tone. That\'s all we need.',
    color: 'from-purple-500 to-purple-700',
    glow: 'rgba(124,58,237,0.3)',
  },
  {
    icon:     Sparkles,
    number:   '02',
    title:    'Generate',
    subtitle: 'Watch AI build in real-time',
    description:
      'Claude AI streams a complete landing page section by section — hero, features, pricing, FAQ — right before your eyes.',
    color: 'from-cyan-500 to-cyan-700',
    glow: 'rgba(6,182,212,0.3)',
  },
  {
    icon:     Rocket,
    number:   '03',
    title:    'Launch',
    subtitle: 'Export clean HTML and ship',
    description:
      'Edit any section visually, swap themes, reorder content, then export a self-contained HTML file ready to deploy anywhere.',
    color: 'from-pink-500 to-pink-700',
    glow: 'rgba(236,72,153,0.3)',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 px-4">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/8 blur-3xl rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs font-medium uppercase tracking-widest">
            How It Works
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4 tracking-tight">
            From idea to page in{' '}
            <span className="gradient-text">three steps</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            No design skills. No coding. No waiting. Just a description and a click.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[calc(16.66%-1px)] right-[calc(16.66%-1px)] h-px">
            <div className="w-full h-full bg-gradient-to-r from-purple-500/40 via-cyan-500/40 to-pink-500/40" />
          </div>

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number + icon */}
                <div className="relative mb-6">
                  <div
                    className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl`}
                    style={{ boxShadow: `0 0 40px ${step.glow}` }}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#030712] border border-white/15 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-400">{step.number}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                <p className="text-sm font-medium text-gray-500 mb-3">{step.subtitle}</p>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
