'use client';

import { useEditorStore } from '@/stores/editor-store';
import { COLOR_PALETTES } from '@/data/color-palettes';
import { FONT_PAIRS } from '@/data/font-pairs';
import { Check } from 'lucide-react';
import type { Theme } from '@/types/page';

export function ThemePanel() {
  const { page, updateTheme } = useEditorStore();

  if (!page) return null;
  const { theme } = page;

  return (
    <div className="space-y-8 pb-10">
      {/* Color Palettes */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Color Palette</h3>
        <div className="grid grid-cols-2 gap-3">
          {COLOR_PALETTES.map((palette) => {
            const isActive = theme.primaryColor === palette.primary && theme.backgroundColor === palette.bg;
            return (
              <button
                key={palette.name}
                onClick={() => updateTheme({
                  colorScheme: palette.scheme,
                  primaryColor: palette.primary,
                  secondaryColor: palette.accent,
                  accentColor: palette.accent,
                  backgroundColor: palette.bg,
                  textColor: palette.text,
                })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'border-purple-500 ring-1 ring-purple-500/30'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{palette.name}</span>
                  {isActive && <Check className="w-4 h-4 text-purple-500" />}
                </div>
                <div className="flex rounded-md overflow-hidden h-6 w-full shadow-sm ring-1 ring-black/5">
                  <div className="flex-1" style={{ backgroundColor: palette.bg }} />
                  <div className="flex-1" style={{ backgroundColor: palette.primary }} />
                  <div className="flex-1" style={{ backgroundColor: palette.accent }} />
                  <div className="flex-1" style={{ backgroundColor: palette.text }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Font Pairs */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Typography</h3>
        <div className="space-y-2">
          {FONT_PAIRS.map((font) => {
            const isActive = theme.fontHeading === font.heading && theme.fontBody === font.body;
            return (
              <button
                key={font.name}
                onClick={() => updateTheme({ fontHeading: font.heading, fontBody: font.body })}
                className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                  isActive
                    ? 'border-purple-500 bg-purple-500/5 ring-1 ring-purple-500/30'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="text-left">
                  <p className="text-sm font-medium" style={{ fontFamily: font.heading }}>{font.name}</p>
                  <p className="text-xs opacity-60" style={{ fontFamily: font.body }}>{font.heading} / {font.body}</p>
                </div>
                {isActive && <Check className="w-4 h-4 text-purple-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Border Radius</h3>
        <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg">
          {(['none', 'sm', 'md', 'lg', 'full'] as Theme['borderRadius'][]).map((radius) => (
            <button
              key={radius}
              onClick={() => updateTheme({ borderRadius: radius })}
              className={`flex-1 py-1.5 text-xs font-medium capitalize rounded-md transition-all ${
                theme.borderRadius === radius
                  ? 'bg-white dark:bg-zinc-700 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {radius}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
