"use client"

import { useState } from "react"
import { Toggle } from "@/components/retroui/Toggle"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/retroui/Accordion"
import { MaterialIcon } from "@/components/common/MaterialIcon"
import { toggles, accordionGroups, accordionItemLabels } from "../toggles"
import { prerequisiteConcepts } from "../data"
import { ConceptSheet } from "./ConceptSheet"
import type { GeoGebraToggle } from "../types"
import type { PrerequisiteConcept } from "../data"

interface ControlPanelProps {
  activeToggles: Record<string, boolean>
  onToggle: (toggle: GeoGebraToggle) => void
}

/** Control panel with toggles and accordion groups for GeoGebra canvas. */
export function ControlPanel({ activeToggles, onToggle }: ControlPanelProps) {
  const standaloneToggles = toggles.filter(t => !accordionItemLabels.includes(t.label))
  const getToggle = (label: string) => toggles.find(t => t.label === label)

  const [sheetConcept, setSheetConcept] = useState<PrerequisiteConcept | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  function handleToggleClick(toggle: GeoGebraToggle, pressed: boolean) {
    onToggle(toggle)
    if (toggle.conceptKey) {
      const concept = prerequisiteConcepts.find(c => c.title === toggle.conceptKey)
      if (concept) {
        if (pressed) {
          setSheetConcept(concept)
          setSheetOpen(true)
        } else {
          setSheetOpen(false)
        }
      }
    }
  }

  return (
    <div className="xl:col-span-1 space-y-4 md:space-y-6">
      {/* Guide text */}
      <h3 className="font-black uppercase text-base md:text-lg">Eksplorasi Konsep</h3>
      <p className="text-sm md:text-base text-muted-foreground">
        Tekan tombol berikut untuk menampilkan objek geometri
      </p>

      {/* Standalone toggles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-1 gap-2 md:gap-3">
        {standaloneToggles.map(toggle => (
          <ToggleButton
            key={toggle.label}
            toggle={toggle}
            isActive={activeToggles[toggle.label] ?? true}
            onToggle={handleToggleClick}
          />
        ))}
      </div>

      {/* Accordion groups */}
      <Accordion multiple>
        {accordionGroups.map(group => (
          <AccordionItem key={group.label} value={group.label}>
            <AccordionTrigger value={group.label}>
              <MaterialIcon name={group.icon} className="text-sm md:text-base" />
              <span className="flex-1 text-left">{group.label}</span>
            </AccordionTrigger>
            <AccordionContent>
              {group.description && (
                <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">{group.description}</p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 md:gap-3">
                {group.items.map(itemLabel => {
                  const toggle = getToggle(itemLabel)
                  return toggle ? (
                    <ToggleButton
                      key={itemLabel}
                      toggle={toggle}
                      isActive={activeToggles[toggle.label] ?? false}
                      onToggle={handleToggleClick}
                    />
                  ) : null
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <ConceptSheet
        concept={sheetConcept}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </div>
  )
}

function ToggleButton({ toggle, isActive, onToggle }: {
  toggle: GeoGebraToggle
  isActive: boolean
  onToggle: (toggle: GeoGebraToggle, pressed: boolean) => void
}) {
  return (
    <Toggle
      pressed={isActive}
      onPressedChange={(pressed) => onToggle(toggle, pressed)}
      variant="outlined"
      size="sm"
      className="border-2 border-black font-bold text-xs md:text-sm shadow-sm hover:shadow justify-start px-2 md:px-2.5"
    >
      <MaterialIcon name={toggle.icon} className="text-sm md:text-base" />
      <span>{toggle.label}</span>
    </Toggle>
  )
}
