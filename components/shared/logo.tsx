import Link from 'next/link';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', inner: 'w-3 h-3' },
    md: { icon: 'w-8 h-8', text: 'text-xl', inner: 'w-4 h-4' },
    lg: { icon: 'w-10 h-10', text: 'text-2xl', inner: 'w-5 h-5' },
  };

  return (
    <Link href="/" className={cn('inline-flex items-center gap-2.5 group', className)}>
      <div className={cn(
        sizes[size].icon,
        'rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center',
        'group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-shadow'
      )}>
        <Zap className={cn(sizes[size].inner, 'text-white')} fill="currentColor" />
      </div>
      <span className={cn(sizes[size].text, 'font-bold font-display text-white tracking-tight')}>
        <span className="gradient-text-pc">Quick</span>Launch
      </span>
    </Link>
  );
}
