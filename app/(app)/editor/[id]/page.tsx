'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useEditorStore } from '@/stores/editor-store';
import { EditorCanvas } from '@/components/editor/editor-canvas';
import { ViewportToggle } from '@/components/editor/viewport-toggle';
import { ThemePanel } from '@/components/editor/panels/theme-panel';
import { SectionsPanel } from '@/components/editor/panels/sections-panel';
import { SectionEditDialog } from '@/components/editor/section-edit-dialog';
import { LayoutDashboard, Layers, Palette, Settings, Download, ArrowLeft, Save, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { Page } from '@/types/page';

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { page, initPage, activePanel, setPanel, hasUnsavedChanges, isSaving, setSaving, markSaved } = useEditorStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch page data on mount
  useEffect(() => {
    async function fetchPage() {
      try {
        const res = await fetch(`/api/pages/${id}`);
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error?.message || 'Failed to fetch page');
        initPage(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }
    fetchPage();
  }, [id, initPage]);

  // Auto-save effect
  useEffect(() => {
    if (!hasUnsavedChanges || !page) return;

    const timeout = setTimeout(async () => {
      setSaving(true);
      try {
        const res = await fetch(`/api/pages/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(page),
        });
        if (!res.ok) throw new Error('Save failed');
        markSaved();
      } catch (err) {
        console.error('Auto-save error:', err);
        setSaving(false); // keep hasUnsavedChanges true so it retries
      }
    }, 3000); // 3 seconds debounce

    return () => clearTimeout(timeout);
  }, [page, hasUnsavedChanges, id, markSaved, setSaving]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-zinc-950">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-white dark:bg-zinc-950 gap-4">
        <p className="text-red-500">{error || 'Page not found'}</p>
        <Link href="/dashboard" className="text-purple-600 hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  const navItems = [
    { id: 'sections', icon: <Layers className="w-5 h-5" />, label: 'Sections' },
    { id: 'theme', icon: <Palette className="w-5 h-5" />, label: 'Theme' },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ] as const;

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden text-zinc-900 dark:text-zinc-100">
      {/* Sidebar Navigation */}
      <div className="w-16 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col items-center py-4 gap-6 shrink-0 z-20">
        <Link href="/dashboard" className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all mb-4" title="Back to Dashboard">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        
        <div className="flex flex-col gap-2 w-full px-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setPanel(activePanel === item.id ? 'none' : item.id)}
              className={`p-3 rounded-xl flex justify-center transition-all ${
                activePanel === item.id 
                  ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
              title={item.label}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Slide-out Panel */}
      <div 
        className={`bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0 transition-all duration-300 ease-in-out overflow-hidden z-10`}
        style={{ width: activePanel === 'none' ? '0px' : '320px', opacity: activePanel === 'none' ? 0 : 1 }}
      >
        <div className="w-[320px] h-full flex flex-col">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
            <h2 className="font-semibold capitalize">{activePanel}</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {activePanel === 'sections' && <SectionsPanel />}
            {activePanel === 'theme' && <ThemePanel />}
            {activePanel === 'settings' && <div className="text-sm opacity-50">Settings panel coming next</div>}
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-zinc-100/50 dark:bg-black/10">
        {/* Topbar */}
        <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="font-medium text-sm truncate max-w-[200px]">{page.title}</h1>
            <div className="flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
              {isSaving ? (
                <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</>
              ) : hasUnsavedChanges ? (
                <><span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Unsaved</>
              ) : (
                <><Save className="w-3 h-3" /> Saved</>
              )}
            </div>
          </div>
          
          <ViewportToggle />

          <div className="flex items-center gap-3">
            <a 
              href={`/api/pages/${page._id}/export`}
              download
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-all"
            >
              <Download className="w-4 h-4" />
              Export HTML
            </a>
          </div>
        </div>

        {/* Canvas */}
        <EditorCanvas />
        <SectionEditDialog />
      </div>
    </div>
  );
}
