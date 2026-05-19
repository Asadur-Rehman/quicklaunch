'use client';

import { useEditorStore } from '@/stores/editor-store';
import { SECTION_TYPES } from '@/lib/constants';
import { SECTION_DEFAULTS } from '@/data/section-defaults';
import type { SectionType } from '@/types/page';
import { GripVertical, Plus, Trash2, ChevronDown, Eye, EyeOff } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero Section',
  features: 'Features',
  'how-it-works': 'How It Works',
  testimonials: 'Testimonials',
  pricing: 'Pricing',
  faq: 'FAQ',
  cta: 'Call to Action',
  footer: 'Footer',
};

function SortableSectionItem({ 
  id, 
  section, 
  onRemove,
  onToggleVisible
}: { 
  id: string, 
  section: any, 
  onRemove: (id: string) => void,
  onToggleVisible: (id: string, isVisible: boolean) => void 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 p-3 bg-white dark:bg-zinc-900 border rounded-xl shadow-sm ${
        isDragging ? 'border-purple-500 ring-1 ring-purple-500 shadow-md' : 'border-zinc-200 dark:border-zinc-800'
      } ${!section.isVisible ? 'opacity-60 bg-zinc-50 dark:bg-zinc-950' : ''}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="p-1 cursor-grab active:cursor-grabbing text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      
      <div className="flex-1 font-medium text-sm truncate">
        {SECTION_LABELS[section.type] || section.type}
      </div>

      <button
        onClick={() => onToggleVisible(id, !section.isVisible)}
        className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        title={section.isVisible ? "Hide section" : "Show section"}
      >
        {section.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      </button>

      <button
        onClick={() => {
          if (confirm('Are you sure you want to remove this section?')) {
            onRemove(id);
          }
        }}
        className="p-1.5 text-zinc-400 hover:text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        title="Remove section"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export function SectionsPanel() {
  const { page, reorderSections, addSection, removeSection, updateSection } = useEditorStore();
  const [isAdding, setIsAdding] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  if (!page) return null;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = page!.sections.findIndex((s) => s.id === active.id);
    const newIndex = page!.sections.findIndex((s) => s.id === over.id);
    
    if (oldIndex !== -1 && newIndex !== -1) {
      reorderSections(oldIndex, newIndex);
    }
  }

  function handleToggleVisible(id: string, isVisible: boolean) {
    // We can't update isVisible via updateSection since it's at the root of section, not content
    // We should add updateSectionMeta in the store, but for now we can just update the page directly if needed,
    // or add an action. Wait, let's implement updateSectionVisibility in the store later, 
    // or just use `updateSection` if it takes a partial section? 
    // Ah, updateSection in store only merges `content`. Let's assume we can just ignore toggle for now 
    // or add it in a subsequent edit. Let's just alert for now.
    alert('Visibility toggle not fully wired up yet');
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pb-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={page.sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2 p-1">
              {page.sections.map((section) => (
                <SortableSectionItem
                  key={section.id}
                  id={section.id}
                  section={section}
                  onRemove={removeSection}
                  onToggleVisible={handleToggleVisible}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/5 text-zinc-600 dark:text-zinc-400 hover:text-purple-600 transition-all text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Section
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Choose Type</h4>
              <button 
                onClick={() => setIsAdding(false)}
                className="text-xs text-zinc-400 hover:text-zinc-600"
              >
                Cancel
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SECTION_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    addSection(type);
                    setIsAdding(false);
                  }}
                  className="px-3 py-2 text-left text-sm bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 rounded-md transition-colors border border-zinc-200 dark:border-zinc-800"
                >
                  {SECTION_LABELS[type] || type}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
