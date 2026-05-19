import Link from 'next/link';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 p-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-6 text-zinc-400">
        <FileQuestion className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">404</h1>
      <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-4">Page not found</h2>
      <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/dashboard"
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
    </div>
  );
}
