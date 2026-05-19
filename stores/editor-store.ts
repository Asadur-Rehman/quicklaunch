import { create } from 'zustand';
import type { Page, Section, Theme, SectionType } from '@/types/page';
import { nanoid } from 'nanoid';
import { SECTION_DEFAULTS } from '@/data/section-defaults';

export type ViewportSize = 'desktop' | 'tablet' | 'mobile';
export type ActivePanel = 'sections' | 'theme' | 'settings' | 'none';

interface EditorState {
  page: Page | null;
  activeViewport: ViewportSize;
  activePanel: ActivePanel;
  selectedSectionId: string | null;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  lastSavedAt: Date | null;

  // Actions
  initPage: (page: Page) => void;
  setViewport: (viewport: ViewportSize) => void;
  setPanel: (panel: ActivePanel) => void;
  setSelectedSection: (id: string | null) => void;
  
  // Page edits
  updateTheme: (theme: Partial<Theme>) => void;
  updateSection: (id: string, content: Partial<Section['content']>) => void;
  updateSectionVariant: (id: string, variant: string) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
  addSection: (type: SectionType, index?: number) => void;
  removeSection: (id: string) => void;
  
  // Save state tracking
  setSaving: (saving: boolean) => void;
  markSaved: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  page: null,
  activeViewport: 'desktop',
  activePanel: 'sections',
  selectedSectionId: null,
  hasUnsavedChanges: false,
  isSaving: false,
  lastSavedAt: null,

  initPage: (page) => set({ page, hasUnsavedChanges: false, lastSavedAt: new Date(page.updatedAt) }),
  
  setViewport: (activeViewport) => set({ activeViewport }),
  
  setPanel: (activePanel) => set({ activePanel }),
  
  setSelectedSection: (selectedSectionId) => set({ selectedSectionId }),

  updateTheme: (themeUpdate) => set((state) => {
    if (!state.page) return state;
    return {
      page: {
        ...state.page,
        theme: { ...state.page.theme, ...themeUpdate }
      },
      hasUnsavedChanges: true
    };
  }),

  updateSection: (id, contentUpdate) => set((state) => {
    if (!state.page) return state;
    const sections = state.page.sections.map(sec => 
      sec.id === id ? { ...sec, content: { ...sec.content, ...contentUpdate } } : sec
    );
    return { page: { ...state.page, sections }, hasUnsavedChanges: true };
  }),

  updateSectionVariant: (id, variant) => set((state) => {
    if (!state.page) return state;
    const sections = state.page.sections.map(sec => 
      sec.id === id ? { ...sec, variant } : sec
    );
    return { page: { ...state.page, sections }, hasUnsavedChanges: true };
  }),

  reorderSections: (startIndex, endIndex) => set((state) => {
    if (!state.page) return state;
    const sections = Array.from(state.page.sections);
    const [removed] = sections.splice(startIndex, 1);
    sections.splice(endIndex, 0, removed);
    // update order property
    const reordered = sections.map((sec, index) => ({ ...sec, order: index }));
    return { page: { ...state.page, sections: reordered }, hasUnsavedChanges: true };
  }),

  addSection: (type, index) => set((state) => {
    if (!state.page) return state;
    
    const defaults = SECTION_DEFAULTS[type];
    const newSection: Section = {
      id: nanoid(),
      type,
      variant: defaults.variant,
      content: defaults.content as unknown as Record<string, unknown>,
      order: state.page.sections.length,
      isVisible: true
    };

    const sections = Array.from(state.page.sections);
    if (typeof index === 'number') {
      sections.splice(index, 0, newSection);
    } else {
      sections.push(newSection);
    }
    
    const reordered = sections.map((sec, i) => ({ ...sec, order: i }));
    return { 
      page: { ...state.page, sections: reordered }, 
      hasUnsavedChanges: true,
      selectedSectionId: newSection.id 
    };
  }),

  removeSection: (id) => set((state) => {
    if (!state.page) return state;
    const sections = state.page.sections.filter(sec => sec.id !== id).map((sec, i) => ({ ...sec, order: i }));
    return { 
      page: { ...state.page, sections }, 
      hasUnsavedChanges: true,
      selectedSectionId: state.selectedSectionId === id ? null : state.selectedSectionId
    };
  }),

  setSaving: (isSaving) => set({ isSaving }),
  
  markSaved: () => set({ hasUnsavedChanges: false, isSaving: false, lastSavedAt: new Date() }),
}));
