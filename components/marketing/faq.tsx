'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Is QuickLaunch actually free?',
    a: 'Yes — the Free plan is genuinely free, forever. You get 5 AI-generated pages per month, the full visual editor, and HTML export. No credit card required to sign up.',
  },
  {
    q: 'How good is the AI-generated content?',
    a: 'It\'s powered by Anthropic\'s Claude — one of the best language models for structured, high-quality copywriting. The system prompt is engineered to produce benefit-driven headlines, authentic testimonials, and conversion-focused copy. Every page is unique to your product description.',
  },
  {
    q: 'Can I edit the generated page after creation?',
    a: 'Absolutely. The visual editor lets you click any text to edit it inline, drag and drop sections to reorder them, swap color themes and font pairs, add or remove sections from the library, and regenerate any individual section you\'re not happy with.',
  },
  {
    q: 'What does the HTML export look like?',
    a: 'The exported file is a single, self-contained HTML file with inline CSS. It\'s fully responsive, semantic HTML5, SEO-ready with proper meta tags, and works when opened directly in a browser — no server needed. The only external dependency is Google Fonts.',
  },
  {
    q: 'Do I need to know how to code?',
    a: 'Not at all. QuickLaunch is designed for founders, indie hackers, and makers who want to move fast without wrestling with design tools or hiring a developer. If you can type, you can use QuickLaunch.',
  },
  {
    q: 'What\'s the difference between Free and Pro?',
    a: 'Free gives you everything you need to validate ideas. Pro (coming soon) adds unlimited generations, all premium templates, priority AI, custom color palettes, and ZIP export. The Pro tier is designed for founders who launch multiple products per month.',
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs font-medium uppercase tracking-widest">
            FAQ
          </div>
          <h2 className="text-4xl font-bold font-display text-white mb-3 tracking-tight">
            Questions &amp; Answers
          </h2>
          <p className="text-gray-400">Everything you need to know before you start building.</p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                aria-expanded={open === i}
              >
                <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
