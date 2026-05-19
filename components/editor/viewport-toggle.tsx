'use client';

import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { useEditorStore } from '@/stores/editor-store';
import type { ViewportSize } from '@/stores/editor-store';

export function ViewportToggle() {
  const { activeViewport, setViewport } = useEditorStore();

  const options: { id: ViewportSize; icon: React.ReactNode; label: string }[] = [
    { id: 'desktop', icon: <Monitor className="w-4 h-4" />, label: 'Desktop' },
    { id: 'tablet', icon: <Tablet className="w-4 h-4" />, label: 'Tablet' },
    { id: 'mobile', icon: <Smartphone className="w-4 h-4" />, label: 'Mobile' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setViewport(opt.id)}
          className={`flex items-center justify-center p-1.5 rounded-md transition-all ${
            activeViewport === opt.id
              ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10'
              : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50'
          }`}
          title={opt.label}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
}
