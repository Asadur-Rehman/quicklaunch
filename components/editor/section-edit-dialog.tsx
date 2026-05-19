'use client';

import { useEditorStore } from '@/stores/editor-store';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

// A simple recursive JSON-like form for editing section content.
// In a full production app, this would use specific Zod forms per section type.
function RecursiveEditor({ data, onChange, path = '' }: { data: any, onChange: (path: string, val: any) => void, path?: string }) {
  if (Array.isArray(data)) {
    return (
      <div className="space-y-4 pl-4 border-l-2 border-zinc-200 dark:border-zinc-800">
        {data.map((item, i) => (
          <div key={i} className="space-y-2">
            <span className="text-xs font-semibold uppercase text-zinc-500">Item {i + 1}</span>
            <RecursiveEditor data={item} onChange={onChange} path={`${path}[${i}]`} />
          </div>
        ))}
      </div>
    );
  }

  if (typeof data === 'object' && data !== null) {
    return (
      <div className="space-y-4">
        {Object.entries(data).map(([key, val]) => (
          <div key={key}>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
            <RecursiveEditor data={val} onChange={onChange} path={path ? `${path}.${key}` : key} />
          </div>
        ))}
      </div>
    );
  }

  if (typeof data === 'boolean') {
    return (
      <input 
        type="checkbox" 
        checked={data} 
        onChange={(e) => onChange(path, e.target.checked)}
        className="rounded border-zinc-300 text-purple-600 focus:ring-purple-600"
      />
    );
  }

  if (typeof data === 'number') {
    return (
      <input 
        type="number" 
        value={data} 
        onChange={(e) => onChange(path, parseFloat(e.target.value))}
        className="w-full px-3 py-2 text-sm rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
      />
    );
  }

  // String
  return (
    <textarea 
      value={data} 
      onChange={(e) => onChange(path, e.target.value)}
      className="w-full px-3 py-2 text-sm rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none min-h-[40px]"
      rows={typeof data === 'string' && data.length > 50 ? 3 : 1}
    />
  );
}

export function SectionEditDialog() {
  const { page, selectedSectionId, setSelectedSection, updateSection } = useEditorStore();
  const [localContent, setLocalContent] = useState<any>(null);

  const section = page?.sections.find(s => s.id === selectedSectionId);

  useEffect(() => {
    if (section) setLocalContent(JSON.parse(JSON.stringify(section.content)));
    else setLocalContent(null);
  }, [section]);

  if (!section || !localContent) return null;

  function handleChange(path: string, val: any) {
    const newContent = { ...localContent };
    
    // Deep update utility
    const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
    let current = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = val;
    
    setLocalContent(newContent);
  }

  function handleSave() {
    updateSection(section!.id, localContent);
    setSelectedSection(null);
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={() => setSelectedSection(null)}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-950 h-full shadow-2xl border-l border-zinc-200 dark:border-zinc-800 flex flex-col animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <h2 className="font-semibold text-lg capitalize">Edit {section.type}</h2>
          <button 
            onClick={() => setSelectedSection(null)}
            className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <RecursiveEditor data={localContent} onChange={handleChange} />
        </div>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 shrink-0 flex gap-3 bg-zinc-50 dark:bg-zinc-900">
          <button 
            onClick={() => setSelectedSection(null)}
            className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
