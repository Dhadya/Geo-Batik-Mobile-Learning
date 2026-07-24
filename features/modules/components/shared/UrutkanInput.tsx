"use client"

import { useCallback, useMemo } from "react"
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
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { seededShuffle } from "@/features/modules/lib/shuffle"
import { MaterialIcon } from "@/components/common/MaterialIcon"

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

/** A single sortable item — entire row is draggable. */
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
      {...attributes}
      {...listeners}
      className={`flex items-center gap-2 border-2 border-black px-2 py-1.5 bg-white cursor-grab active:cursor-grabbing touch-none select-none shadow-[2px_2px_0_0_black] ${isDragging ? "shadow-[4px_4px_0_0_#000] z-10" : ""}`}
      tabIndex={disabled ? -1 : 0}
    >
      <MaterialIcon className="size-5 text-muted-foreground shrink-0" name="drag_indicator" />
      <span className="text-xs md:text-sm font-medium">{label}</span>
    </div>
  )
}

/** Drag-and-drop sorting list using @dnd-kit. */
export function UrutkanInput({ items, value, onChange, disabled }: UrutkanInputProps) {
  const seed = useMemo(() => {
    let h = 0
    for (let i = 0; i < items.length; i++) {
      h = ((h << 5) - h + i) | 0
    }
    return h
  }, [items])

  const defaultOrder = useMemo(() => seededShuffle(items.map((_, i) => i), seed), [items, seed])

  const orderArr = useMemo(() => {
    if (value) return value.split(",").map(Number).filter((n) => !isNaN(n) && n >= 0 && n < items.length)
    return defaultOrder
  }, [value, items.length, defaultOrder])

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

  const dndId = useMemo(() => `dnd-${items.join("-").slice(0, 30)}`, [items])

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={identifiers} strategy={verticalListSortingStrategy}>
        <div className="space-y-1 md:space-y-1.5">
          {orderArr.map((idx) => (
            <SortableItem
              key={`item-${idx}`}
              id={`item-${idx}`}
              label={items[idx]}
              disabled={disabled}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
