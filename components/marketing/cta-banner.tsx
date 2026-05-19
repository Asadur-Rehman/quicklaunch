'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CtaBanner() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center"
          style={{
            background: 'linear-gradient(135deg, #4c1d95 0%, #1e3a5f 50%, #134e4a 100%)',
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
          <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Join 2,000+ makers launching faster
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4 tracking-tight">
              Ready to launch your next idea?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Your next landing page is one description away. No designers, no builders, no waiting.
              Just describe, generate, and ship.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="group flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-gray-900 font-bold text-base hover:bg-gray-100 transition-colors shadow-xl"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-white/50 text-sm">No credit card · Free forever</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
