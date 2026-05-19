'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Sparkles, BookTemplate, Settings, Zap, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Sparkles,        label: 'Generate',  href: '/generate'  },
  { icon: BookTemplate,    label: 'Templates', href: '/templates' },
  { icon: Settings,        label: 'Settings',  href: '/settings'  },
];

interface AppSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AppSidebar({ isOpen = false, onClose }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'flex-shrink-0 bg-white dark:bg-zinc-950 flex flex-col',
        'border-r border-zinc-200 dark:border-zinc-800',
        'fixed inset-y-0 left-0 z-50 w-[264px]',
        'transition-transform duration-300 ease-in-out',
        'md:relative md:w-[220px] md:translate-x-0',
        isOpen ? 'translate-x-0 shadow-2xl shadow-black/20' : '-translate-x-full'
      )}
    >
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-5 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 group"
          onClick={onClose}
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:shadow-purple-500/30 transition-all duration-200">
            <Zap className="w-3.5 h-3.5 text-white" fill="currentColor" />
          </div>
          <span className="text-[15px] font-bold text-zinc-900 dark:text-white font-display tracking-tight">
            <span className="text-purple-600">Quick</span>Launch
          </span>
        </Link>

        <button
          onClick={onClose}
          className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Close navigation"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 hover:text-zinc-900 dark:hover:text-white'
              )}
            >
              <Icon
                className={cn(
                  'w-4 h-4 flex-shrink-0 transition-colors',
                  active
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'
                )}
              />
              <span className="flex-1">{item.label}</span>
              {active && (
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade hint */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="rounded-xl bg-gradient-to-br from-purple-50 to-cyan-50/70 dark:from-purple-950/60 dark:to-cyan-950/40 border border-purple-100 dark:border-purple-800/30 p-3.5">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">Pro is coming</p>
          </div>
          <p className="text-xs text-purple-600/70 dark:text-purple-400/60 leading-relaxed">
            Unlimited pages + priority AI
          </p>
        </div>
      </div>
    </aside>
  );
}
