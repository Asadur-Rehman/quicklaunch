'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Zap, Crown } from 'lucide-react';

const PLANS = [
  {
    icon:       Zap,
    name:       'Free',
    tagline:    'For side projects and validation',
    price:      '$0',
    period:     'forever',
    cta:        'Get Started Free',
    ctaHref:    '/register',
    ctaStyle:   'border border-white/15 bg-white/5 hover:bg-white/10',
    highlighted: false,
    features: [
      '5 page generations / month',
      'All section types',
      'Visual editor',
      'HTML export',
      '3 color themes',
      'Community support',
    ],
  },
  {
    icon:       Crown,
    name:       'Pro',
    tagline:    'For founders who ship constantly',
    price:      '$19',
    period:     'per month',
    badge:      'Coming Soon',
    cta:        'Join Waitlist',
    ctaHref:    '/register',
    ctaStyle:   'bg-gradient-to-r from-purple-600 to-cyan-600 glow-button hover:opacity-90',
    highlighted: true,
    features: [
      'Unlimited page generations',
      'All templates + new monthly',
      'Priority AI model',
      'Custom color palettes',
      'Font pair customization',
      'ZIP export with assets',
      'Early access to new features',
      'Priority support',
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 px-4">
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-600/8 blur-3xl rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs font-medium uppercase tracking-widest">
            Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4 tracking-tight">
            Simple,{' '}
            <span className="gradient-text">honest pricing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Start free. Stay free for side projects. Upgrade when you&apos;re ready to scale.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'gradient-border-card'
                    : 'glass-card'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs font-semibold whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.highlighted ? 'bg-gradient-to-br from-purple-500 to-cyan-500' : 'bg-white/8'}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-gray-500">{plan.tagline}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-white font-display">{plan.price}</span>
                  <span className="text-gray-500 text-sm ml-2">/ {plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaHref}
                  className={`block w-full py-3 rounded-xl text-white text-sm font-semibold text-center transition-all ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
