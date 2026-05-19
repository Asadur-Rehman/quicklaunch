import { create } from 'zustand';
import type { Section, Theme } from '@/types/page';

interface GenerationState {
  // Status
  status: 'idle' | 'generating' | 'complete' | 'error';
  error: string | null;

  // Streaming progress
  rawText: string;
  completedSections: string[];
  currentSection: string | null;

  // Parsed output
  parsedPageTitle: string;
  parsedPageDescription: string;
  parsedSections: Section[];
  parsedTheme: Partial<Theme> | null;

  // Generated page ID (after save)
  savedPageId: string | null;

  // Actions
  startGeneration: () => void;
  appendText: (text: string) => void;
  addParsedSection: (section: Section) => void;
  setCurrentSection: (type: string | null) => void;
  markSectionComplete: (type: string) => void;
  setPageMeta: (title: string, description: string) => void;
  setTheme: (theme: Partial<Theme>) => void;
  setComplete: () => void;
  setError: (error: string) => void;
  setSavedPageId: (id: string) => void;
  reset: () => void;
}

const initialState = {
  status: 'idle' as const,
  error: null,
  rawText: '',
  completedSections: [] as string[],
  currentSection: null,
  parsedPageTitle: '',
  parsedPageDescription: '',
  parsedSections: [] as Section[],
  parsedTheme: null,
  savedPageId: null,
};

export const useGenerationStore = create<GenerationState>((set) => ({
  ...initialState,

  startGeneration: () =>
    set({
      ...initialState,
      status: 'generating',
    }),

  appendText: (text: string) =>
    set((state) => ({
      rawText: state.rawText + text,
    })),

  addParsedSection: (section: Section) =>
    set((state) => ({
      parsedSections: [...state.parsedSections, section],
    })),

  setCurrentSection: (type: string | null) =>
    set({ currentSection: type }),

  markSectionComplete: (type: string) =>
    set((state) => ({
      completedSections: state.completedSections.includes(type)
        ? state.completedSections
        : [...state.completedSections, type],
      currentSection: null,
    })),

  setPageMeta: (title: string, description: string) =>
    set({
      parsedPageTitle: title,
      parsedPageDescription: description,
    }),

  setTheme: (theme: Partial<Theme>) =>
    set({ parsedTheme: theme }),

  setComplete: () =>
    set({ status: 'complete', currentSection: null }),

  setError: (error: string) =>
    set({ status: 'error', error, currentSection: null }),

  setSavedPageId: (id: string) =>
    set({ savedPageId: id }),

  reset: () => set(initialState),
}));
