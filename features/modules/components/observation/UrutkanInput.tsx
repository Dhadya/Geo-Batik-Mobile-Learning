"use client"

import { useState, useCallback, useMemo } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"

interface UrutkanInputProps {
  items: string[]
  value: string
  onChange: (order: string) => void
  disabled?: boolean
}

interface SortableItemProps {
  id: string
  label: string
  disabled?: boolean
}

/** A single sortable item with grip handle. */
function SortableItem({ id, label, disabled }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled })

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    }),
    [transform, transition, isDragging],
  )

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 md:gap-3 border-2 border-black p-2 md:p-3 bg-white ${isDragging ? "shadow-[4px_4px_0_0_#000] z-10" : "shadow-none"}`}
    >
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing touch-none p-1 hover:bg-muted rounded-none"
        {...attributes}
        {...listeners}
        tabIndex={-1}
      >
        <GripVertical className="size-4 md:size-5 text-muted-foreground" />
      </button>
      <span className="text-xs md:text-sm font-semibold">{label}</span>
    </div>
  )
}

/** Drag-and-drop sorting list using @dnd-kit. */
export function UrutkanInput({ items, value, onChange, disabled }: UrutkanInputProps) {
  const orderArr = useMemo(() => {
    if (!value) return items.map((_, i) => i)
    return value.split(",").map(Number).filter((n) => !isNaN(n) && n >= 0 && n < items.length)
  }, [value, items.length])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const identifiers = useMemo(() => orderArr.map((idx) => `item-${idx}`), [orderArr])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return

      const oldIdx = orderArr.indexOf(Number(String(active.id).replace("item-", "")))
      const newIdx = orderArr.indexOf(Number(String(over.id).replace("item-", "")))
      if (oldIdx === -1 || newIdx === -1) return

      const next = [...orderArr]
      const [moved] = next.splice(oldIdx, 1)
      next.splice(newIdx, 0, moved)

      onChange(next.join(","))
    },
    [orderArr, onChange],
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={identifiers} strategy={verticalListSortingStrategy}>
        <div className="space-y-1.5 md:space-y-2">
          {orderArr.map((idx) => (
            <SortableItem
              key={`item-${idx}`}
              id={`item-${idx}`}
              label={`${idx + 1}. ${items[idx]}`}
              disabled={disabled}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
