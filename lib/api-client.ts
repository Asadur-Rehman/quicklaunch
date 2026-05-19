import type { Page, Section, Theme } from '@/types/page';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: { message: string; code: string };
}

/**
 * Save a generated page to the database.
 */
export async function savePage(data: {
  title: string;
  description: string;
  prompt: {
    productName: string;
    description: string;
    targetAudience?: string;
    tone: string;
  };
  sections: Section[];
  theme: Theme;
}): Promise<Page> {
  const res = await fetch('/api/pages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json: ApiResponse<Page> = await res.json();
  if (!json.success || !json.data) {
    throw new Error(json.error?.message || 'Failed to save page');
  }
  return json.data;
}

/**
 * Fetch all pages for the current user.
 */
export async function fetchPages(): Promise<Page[]> {
  const res = await fetch('/api/pages');
  const json: ApiResponse<Page[]> = await res.json();
  if (!json.success || !json.data) {
    throw new Error(json.error?.message || 'Failed to fetch pages');
  }
  return json.data;
}
