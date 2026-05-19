'use client';

import { useState } from 'react';
import { useEditorStore } from '@/stores/editor-store';
import { Sparkles, Edit2, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import type { Section } from '@/types/page';

export function EditorSectionWrapper({ 
  section, 
  children 
}: { 
  section: Section, 
  children: React.ReactNode 
}) {
  const { page, reorderSections, removeSection, setSelectedSection } = useEditorStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  if (!page) return <>{children}</>;

  const index = page.sections.findIndex(s => s.id === section.id);
  const isFirst = index === 0;
  const isLast = index === page.sections.length - 1;

  async function handleRegenerate() {
    setIsRegenerating(true);
    // placeholder for AI regen
    // await fetch('/api/generate/section', ...)
    setTimeout(() => {
      setIsRegenerating(false);
      alert('AI regeneration coming soon!');
    }, 1000);
  }

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The actual section */}
      <div className={`transition-all ${isRegenerating ? 'opacity-50 blur-sm' : ''}`}>
        {children}
      </div>

      {/* Hover Overlay Outline */}
      <div 
        className={`absolute inset-0 border-2 pointer-events-none transition-all duration-200 z-10 ${
          isHovered ? 'border-purple-500/50' : 'border-transparent'
        }`}
      />

      {/* Toolbar */}
      <div 
        className={`absolute top-4 right-4 flex items-center bg-zinc-900 text-white rounded-lg shadow-xl overflow-hidden transition-all duration-200 z-20 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <button 
          onClick={handleRegenerate}
          className="p-2 hover:bg-zinc-800 transition-colors flex items-center gap-1.5 text-xs font-medium border-r border-zinc-800"
          title="Regenerate with AI"
        >
          {isRegenerating ? <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /> : <Sparkles className="w-4 h-4 text-purple-400" />}
          <span className="hidden md:inline">Regen</span>
        </button>
        
        <button 
          onClick={() => setSelectedSection(section.id)}
          className="p-2 hover:bg-zinc-800 transition-colors border-r border-zinc-800"
          title="Edit Section"
        >
          <Edit2 className="w-4 h-4" />
        </button>

        <button 
          onClick={() => !isFirst && reorderSections(index, index - 1)}
          disabled={isFirst}
          className="p-2 hover:bg-zinc-800 transition-colors border-r border-zinc-800 disabled:opacity-30"
          title="Move Up"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        <button 
          onClick={() => !isLast && reorderSections(index, index + 1)}
          disabled={isLast}
          className="p-2 hover:bg-zinc-800 transition-colors border-r border-zinc-800 disabled:opacity-30"
          title="Move Down"
        >
          <ArrowDown className="w-4 h-4" />
        </button>

        <button 
          onClick={() => {
            if (confirm('Delete this section?')) removeSection(section.id);
          }}
          className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
          title="Delete Section"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
