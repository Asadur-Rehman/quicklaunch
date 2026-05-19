'use client';

import { useEditorStore } from '@/stores/editor-store';
import { SectionRenderer } from '@/components/editor/section-renderer';
import { useEffect, useRef, useState } from 'react';

const VIEWPORT_WIDTHS = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

export function EditorCanvas() {
  const { page, activeViewport } = useEditorStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // If mobile or tablet, scale down if container is too narrow
    if (activeViewport === 'desktop' || !containerRef.current) {
      setScale(1);
      return;
    }

    const containerWidth = containerRef.current.clientWidth - 64; // 32px padding on each side
    const targetWidth = parseInt(VIEWPORT_WIDTHS[activeViewport], 10);

    if (containerWidth < targetWidth) {
      setScale(containerWidth / targetWidth);
    } else {
      setScale(1);
    }
  }, [activeViewport]);

  if (!page) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const width = VIEWPORT_WIDTHS[activeViewport];

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto bg-zinc-100 dark:bg-black/20 flex flex-col items-center p-4 md:p-8"
    >
      <div
        className="w-full bg-white dark:bg-zinc-950 transition-all duration-300 origin-top shadow-2xl"
        style={{
          width,
          maxWidth: '100%',
          transform: `scale(${scale})`,
          minHeight: '100%',
          borderRadius: activeViewport !== 'desktop' ? '24px' : '8px',
          overflow: 'hidden',
          border: activeViewport !== 'desktop' ? '8px solid #18181b' : '1px solid var(--color-zinc-200)',
          borderColor: activeViewport !== 'desktop' ? '#18181b' : 'rgba(255,255,255,0.1)',
        }}
      >
        {activeViewport !== 'desktop' && (
          <div className="w-full h-6 bg-zinc-900 flex justify-center items-center">
            <div className="w-16 h-4 bg-black rounded-b-xl" />
          </div>
        )}
        <div className="w-full" style={{ minHeight: 'calc(100% - 24px)' }}>
          {page.sections.filter(s => s.isVisible).map((section) => (
            <SectionRenderer
              key={section.id}
              section={section}
              theme={page.theme}
              isEditing={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
