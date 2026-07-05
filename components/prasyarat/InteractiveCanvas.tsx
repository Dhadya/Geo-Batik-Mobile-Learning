"use client"

import { useEffect, useRef, useState } from "react"
import { MaterialIcon } from "@/components/common/MaterialIcon"

// GeoGebra applet type definition
interface GGBApplet {
  exists: (objName: string) => boolean
  setVisible: (objName: string, visible: boolean) => void
  setValue: (objName: string, value: boolean) => void
  getAllObjectNames: () => string[]
  getObjectType: (objName: string) => string
  getCaption: (objName: string) => string
  getValueString: (objName: string) => string
  inject: (container: HTMLElement) => void
}

interface GGBWindow extends Window {
  GGBApplet: new (parameters: Record<string, unknown>, useBrowserForJS: boolean) => GGBApplet
  ggbApplet?: GGBApplet
}

/* GeoGebra object names that correspond to the checkboxes in the saved material.
   These must match the exact object names defined in the GeoGebra file. */
interface GeoGebraToggle {
  label: string
  icon: string
  /** GeoGebra object name(s) to toggle visibility */
  objects: string[]
}

const toggles: GeoGebraToggle[] = [
  { label: "Sumbu X", icon: "east", objects: ["i"] },
  { label: "Sumbu Y", icon: "north", objects: ["j"] },
  { label: "Kuadran", icon: "grid_view", objects: ["t"] }, // Parent checkbox for all quadrants
  { label: "K1", icon: "grid_view", objects: ["e"] },
  { label: "K2", icon: "grid_view", objects: ["k"] },
  { label: "K3", icon: "grid_view", objects: ["l"] },
  { label: "K4", icon: "grid_view", objects: ["n"] },
  { label: "Titik", icon: "ads_click", objects: ["o"] },
  { label: "Garis", icon: "show_chart", objects: ["p"] }, // Parent checkbox for lines
  { label: "Ruas Garis", icon: "horizontal_rule", objects: ["q"] },
  { label: "Bidang", icon: "view_compact", objects: ["r"] },
  { label: "Bangun", icon: "category", objects: ["s"] },
]

/* Props for the interactive canvas section. */
interface InteractiveCanvasProps {
  /** GeoGebra material ID (e.g., "n3upyysb") */
  materialId: string
  /** Alt text for the embed */
  alt?: string
}

/* Interactive canvas — GeoGebra direct embedding with JavaScript API control.
   Uses deployggb.js for full API access to control object visibility. */
export function InteractiveCanvas({ materialId, alt = "Interactive canvas" }: InteractiveCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const appletRef = useRef<InstanceType<GGBWindow["GGBApplet"]> | null>(null)
  // Default: only Sumbu X is checked, all others unchecked
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>({
    "Sumbu X": true,
    "Sumbu Y": false,
    "Kuadran": false,
    "K1": false,
    "K2": false,
    "K3": false,
    "K4": false,
    "Titik": false,
    "Garis": false,
    "Ruas Garis": false,
    "Bidang": false,
    "Bangun": false,
  })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Load GeoGebra deploy script
    const script = document.createElement("script")
    script.src = "https://www.geogebra.org/apps/deployggb.js"
    script.async = true
    script.onload = () => {
      const ggbWindow = window as unknown as GGBWindow
      if (typeof window !== "undefined" && ggbWindow.GGBApplet) {
        // Define callback to run when applet is ready
        const onAppletLoad = () => {
          const ggbApplet = ggbWindow.ggbApplet
          if (!ggbApplet) return

          console.log('GeoGebra applet loaded, initializing...')

          // Set initial boolean values to match sidebar state
          // Sumbu X (i) = true, all others = false
          try {
            if (ggbApplet.exists('i')) ggbApplet.setValue('i', true)
            if (ggbApplet.exists('j')) ggbApplet.setValue('j', false)
            if (ggbApplet.exists('t')) ggbApplet.setValue('t', false)
            if (ggbApplet.exists('e')) ggbApplet.setValue('e', false)
            if (ggbApplet.exists('k')) ggbApplet.setValue('k', false)
            if (ggbApplet.exists('l')) ggbApplet.setValue('l', false)
            if (ggbApplet.exists('n')) ggbApplet.setValue('n', false)
            if (ggbApplet.exists('o')) ggbApplet.setValue('o', false)
            if (ggbApplet.exists('p')) ggbApplet.setValue('p', false)
            if (ggbApplet.exists('q')) ggbApplet.setValue('q', false)
            if (ggbApplet.exists('r')) ggbApplet.setValue('r', false)
            if (ggbApplet.exists('s')) ggbApplet.setValue('s', false)
            console.log('Initial values set')
          } catch (err) {
            console.log('Error setting initial values:', err)
          }
        }

        const parameters = {
          width: container.clientWidth,
          height: container.clientHeight,
          showToolBar: false,
          showMenuBar: false,
          showAlgebraInput: false,
          showAlgebraView: false,
          showResetIcon: false,
          enableLabelDrags: false,
          enableShiftDragZoom: true,
          enableRightClick: true,
          showToolBarHelp: false,
          showFullscreenButton: true,
          material_id: materialId,
          appletOnLoad: onAppletLoad,
        }

        const applet = new ggbWindow.GGBApplet(parameters, true)
        appletRef.current = applet

        // Inject into container
        applet.inject(container)
      }
    }

    document.body.appendChild(script)

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      container.innerHTML = ""
    }
  }, [materialId])

  const handleToggle = (toggle: GeoGebraToggle) => {
    // Try to get the GeoGebra applet reference
    const ggbWindow = window as unknown as GGBWindow
    const ggbApplet = ggbWindow.ggbApplet || appletRef.current
    
    if (!ggbApplet) {
      console.log('GeoGebra applet not found')
      return
    }

    const currentState = activeToggles[toggle.label] ?? true
    const newState = !currentState

    console.log(`Toggling ${toggle.label} to ${newState}`)

    // Auto-check parent when enabling child checkboxes
    // K1-K4 → auto-check Kuadran
    if (newState && ['K1', 'K2', 'K3', 'K4'].includes(toggle.label)) {
      if (!activeToggles['Kuadran']) {
        ggbApplet.setValue('t', true) // Kuadran parent object
        setActiveToggles(prev => ({ ...prev, 'Kuadran': true }))
        console.log('Auto-checked Kuadran parent')
      }
    }

    // Ruas Garis → auto-check Garis
    if (newState && toggle.label === 'Ruas Garis') {
      if (!activeToggles['Garis']) {
        ggbApplet.setValue('p', true) // Garis parent object
        setActiveToggles(prev => ({ ...prev, 'Garis': true }))
        console.log('Auto-checked Garis parent')
      }
    }

    // Bangun → auto-check Bidang
    if (newState && toggle.label === 'Bangun') {
      if (!activeToggles['Bidang']) {
        ggbApplet.setValue('r', true) // Bidang parent object
        setActiveToggles(prev => ({ ...prev, 'Bidang': true }))
        console.log('Auto-checked Bidang parent')
      }
    }

    // Set the boolean value for each checkbox object
    // This triggers conditional visibility of dependent objects
    for (const objName of toggle.objects) {
      try {
        const exists = ggbApplet.exists(objName)
        
        if (exists) {
          ggbApplet.setValue(objName, newState)
          console.log(`Set ${objName} value to ${newState}`)
        }
      } catch (err) {
        console.log(`Error with ${objName}:`, err)
      }
    }

    setActiveToggles(prev => ({ ...prev, [toggle.label]: newState }))
  }

  return (
    <section className="w-full space-y-6 md:space-y-8">
      {/* Section header */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="size-10 md:size-14 bg-secondary border-4 border-black shadow-md flex items-center justify-center">
          <MaterialIcon name="grid_4x4" className="!text-2xl md:!text-3xl text-secondary-foreground" />
        </div>
        <h2 className="text-lg md:text-2xl font-black uppercase">Interactive Canvas</h2>
      </div>

      {/* Grid: canvas + controls */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8 items-start">
        {/* Canvas area — GeoGebra direct embed */}
        <div className="xl:col-span-3 bg-card border-4 border-black shadow-xl overflow-hidden kawung-pattern aspect-[4/3]">
          <div className="w-full h-full [&>div]:!h-full [&>div]:!w-full">
            <div
              ref={containerRef}
              className="w-full h-full [&>div]:!h-full [&>div]:!w-full"
              title={alt}
            />
          </div>
        </div>

        {/* Control checkboxes panel — interactive */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-primary-dark uppercase text-sm md:text-base mb-1">
            Eksplorasi Konsep
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-2">
            Centang untuk menampilkan/menyembunyikan elemen
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
            {toggles.map((toggle) => {
              const isActive = activeToggles[toggle.label] ?? true
              return (
                <label
                  key={toggle.label}
                  className="bg-card border-2 border-black p-1.5 md:p-2 font-bold text-xs md:text-sm shadow-sm flex items-center gap-2 cursor-pointer hover:bg-primary-container transition-all"
                >
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => handleToggle(toggle)}
                    className="size-3.5 md:size-4 accent-primary cursor-pointer"
                  />
                  <span>{toggle.label}</span>
                </label>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
