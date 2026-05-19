'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      "I described my SaaS tool in two sentences and had a production-ready landing page in under a minute. Saved me at least two weeks of back-and-forth with a designer.",
    author:   'Marcus Chen',
    role:     'Founder',
    company:  'Pulseboard',
    avatar:   'MC',
    avatarBg: 'from-purple-500 to-indigo-500',
  },
  {
    quote:
      "As a developer, I\'m allergic to design tools. QuickLaunch actually makes design feel like coding — give it structured input, get structured output. The HTML export is clean enough I\'d ship it as-is.",
    author:   'Priya Nair',
    role:     'Senior Engineer',
    company:  'Indie Hacker',
    avatar:   'PN',
    avatarBg: 'from-cyan-500 to-blue-500',
  },
  {
    quote:
      "I tested 12 ideas last month. With QuickLaunch I had a landing page up for each one in the same day. The visual editor meant I could tweak copy between calls. No-brainer for validating fast.",
    author:   'Jordan Blake',
    role:     'Product Lead',
    company:  'Launchpad Studio',
    avatar:   'JB',
    avatarBg: 'from-pink-500 to-rose-500',
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs font-medium uppercase tracking-widest">
            Testimonials
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4 tracking-tight">
            Makers who{' '}
            <span className="gradient-text">ship faster</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            From indie hackers to startup founders — here&apos;s what builders say about QuickLaunch.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-card rounded-2xl p-6 flex flex-col"
            >
              <Stars />
              <blockquote className="text-gray-300 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.author}</p>
                  <p className="text-xs text-gray-500">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
