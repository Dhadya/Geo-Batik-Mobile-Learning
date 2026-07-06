// GeoGebra applet type definition
export interface GGBApplet {
  exists: (objName: string) => boolean
  setVisible: (objName: string, visible: boolean) => void
  setValue: (objName: string, value: boolean) => void
  getAllObjectNames: () => string[]
  getObjectType: (objName: string) => string
  getCaption: (objName: string) => string
  getValueString: (objName: string) => string
  inject: (container: HTMLElement) => void
}

export interface GGBWindow extends Window {
  GGBApplet: new (parameters: Record<string, unknown>, useBrowserForJS: boolean) => GGBApplet
  ggbApplet?: GGBApplet
}

// GeoGebra toggle configuration
export interface GeoGebraToggle {
  label: string
  icon: string
  /** GeoGebra object name(s) to toggle visibility */
  objects: string[]
  /** Key to look up concept description in prerequisiteConcepts */
  conceptKey?: string
}
