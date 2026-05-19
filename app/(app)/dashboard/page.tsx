'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Sparkles, MoreVertical, Copy, Trash2, Edit2, LayoutTemplate, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

type PageMeta = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  updatedAt: string;
};

const CARD_GRADIENTS = [
  'from-purple-500/20 via-purple-500/5 to-transparent',
  'from-cyan-500/20 via-cyan-500/5 to-transparent',
  'from-pink-500/20 via-pink-500/5 to-transparent',
  'from-orange-500/20 via-orange-500/5 to-transparent',
  'from-green-500/20 via-green-500/5 to-transparent',
  'from-blue-500/20 via-blue-500/5 to-transparent',
];

const CARD_ICON_COLORS = [
  'text-purple-600 dark:text-purple-400',
  'text-cyan-600 dark:text-cyan-400',
  'text-pink-600 dark:text-pink-400',
  'text-orange-600 dark:text-orange-400',
  'text-green-600 dark:text-green-400',
  'text-blue-600 dark:text-blue-400',
];

export default function DashboardPage() {
  const router = useRouter();
  const [pages, setPages] = useState<PageMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    try {
      const res = await fetch('/api/pages');
      const json = await res.json();
      if (json.success) setPages(json.data);
      else throw new Error(json.error?.message);
    } catch {
      toast.error('Failed to load pages');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDuplicate(id: string) {
    try {
      const res = await fetch(`/api/pages/${id}/duplicate`, { method: 'POST' });
      if (res.ok) {
        fetchPages();
        toast.success('Page duplicated');
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Failed to duplicate page');
    }
    setOpenMenuId(null);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this page?')) return;
    try {
      const res = await fetch(`/api/pages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPages(pages.filter(p => p._id !== id));
        toast.success('Page deleted');
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Failed to delete page');
    }
    setOpenMenuId(null);
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white">My Pages</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {pages.length > 0
              ? `${pages.length} page${pages.length !== 1 ? 's' : ''} — click any card to edit`
              : 'Manage your AI-generated landing pages'}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/templates"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-colors"
          >
            <LayoutTemplate className="w-4 h-4" />
            <span className="hidden sm:inline">Templates</span>
          </Link>
          <Link
            href="/generate"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors shadow-sm shadow-purple-600/25"
          >
            <Sparkles className="w-4 h-4 text-purple-200" />
            Generate New
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-52 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : pages.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-20 sm:py-28 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl px-6">
          <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-5 shadow-lg shadow-purple-500/10">
            <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">No pages yet</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-7 leading-relaxed">
            Describe your product and watch AI generate a complete, beautiful landing page in seconds.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors shadow-lg shadow-purple-600/25 group"
          >
            <Sparkles className="w-4 h-4" />
            Generate Your First Page
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {pages.map((page, idx) => {
            const gradient = CARD_GRADIENTS[idx % CARD_GRADIENTS.length];
            const iconColor = CARD_ICON_COLORS[idx % CARD_ICON_COLORS.length];

            return (
              <div
                key={page._id}
                className="group relative flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-black/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Gradient preview strip */}
                <div className={`h-2.5 w-full bg-gradient-to-r ${gradient} opacity-80`} />

                <div className="flex-1 p-5">
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0`}>
                        <LayoutTemplate className={`w-4.5 h-4.5 ${iconColor}`} />
                      </div>
                      <h3 className="font-semibold text-base text-zinc-900 dark:text-white truncate">
                        {page.title}
                      </h3>
                    </div>

                    {/* Overflow menu */}
                    <div className="relative flex-shrink-0">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === page._id ? null : page._id)}
                        className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {openMenuId === page._id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                          <div className="absolute right-0 top-full mt-1.5 w-44 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl shadow-black/10 dark:shadow-black/40 overflow-hidden z-20 py-1">
                            <button
                              onClick={() => handleDuplicate(page._id)}
                              className="w-full text-left px-3.5 py-2.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-2.5 transition-colors"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              Duplicate
                            </button>
                            <button
                              onClick={() => handleDelete(page._id)}
                              className="w-full text-left px-3.5 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2.5 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                    {page.description || 'No description provided.'}
                  </p>
                </div>

                {/* Footer */}
                <div className="px-5 py-3.5 border-t border-zinc-100 dark:border-zinc-800/70 bg-zinc-50/70 dark:bg-zinc-900/30 flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-medium">
                    {new Date(page.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <Link
                    href={`/editor/${page._id}`}
                    className="flex items-center gap-1.5 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group/link"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit Page
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* "New page" card */}
          <Link
            href="/generate"
            className="group flex flex-col items-center justify-center gap-3 h-52 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50/30 dark:hover:bg-purple-950/20 transition-all duration-300 text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400"
          >
            <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40 flex items-center justify-center transition-colors">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium">New Page</span>
          </Link>
        </div>
      )}
    </div>
  );
}
