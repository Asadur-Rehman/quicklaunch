'use client';

import { motion } from 'framer-motion';
import { Sparkles, MousePointer, Palette, LayoutGrid, Code, BookTemplate } from 'lucide-react';

const FEATURES = [
  {
    icon:        Sparkles,
    title:       'AI-Powered Generation',
    description: 'From your description to a complete landing page in under 30 seconds. No templates — every page is uniquely generated.',
    gradient:    'from-purple-500/20 to-purple-500/5',
    iconColor:   'text-purple-400',
    iconBg:      'bg-purple-500/15',
  },
  {
    icon:        MousePointer,
    title:       'Visual Section Editor',
    description: 'Click any text to edit inline. Drag sections to reorder. Regenerate any section with one click.',
    gradient:    'from-cyan-500/20 to-cyan-500/5',
    iconColor:   'text-cyan-400',
    iconBg:      'bg-cyan-500/15',
  },
  {
    icon:        Palette,
    title:       'Multiple Themes',
    description: 'Choose from curated color palettes and font pairings. Switch themes instantly and see your page transform.',
    gradient:    'from-pink-500/20 to-pink-500/5',
    iconColor:   'text-pink-400',
    iconBg:      'bg-pink-500/15',
  },
  {
    icon:        LayoutGrid,
    title:       'Section Library',
    description: 'Add, remove, and rearrange sections freely. Hero, features, testimonials, pricing, FAQ — all ready to drop in.',
    gradient:    'from-orange-500/20 to-orange-500/5',
    iconColor:   'text-orange-400',
    iconBg:      'bg-orange-500/15',
  },
  {
    icon:        Code,
    title:       'Clean HTML Export',
    description: 'Download production-ready HTML with zero JavaScript dependencies. Fully responsive and SEO-ready out of the box.',
    gradient:    'from-green-500/20 to-green-500/5',
    iconColor:   'text-green-400',
    iconBg:      'bg-green-500/15',
  },
  {
    icon:        BookTemplate,
    title:       'Template Gallery',
    description: 'Jump-start with proven templates for SaaS, mobile apps, events, portfolios, and open-source projects.',
    gradient:    'from-blue-500/20 to-blue-500/5',
    iconColor:   'text-blue-400',
    iconBg:      'bg-blue-500/15',
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs font-medium uppercase tracking-widest">
            Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4 tracking-tight">
            Everything you need to{' '}
            <span className="gradient-text">ship faster</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            A complete toolkit that takes you from idea to deployed landing page without ever touching a line of code.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`group relative rounded-2xl p-6 glass-card glass-card-hover bg-gradient-to-br ${feature.gradient}`}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${feature.iconBg} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-5 h-5 ${feature.iconColor}`} />
                </div>

                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
