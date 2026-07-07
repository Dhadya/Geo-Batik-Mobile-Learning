"use client"

import { useState } from "react"
import { MaterialIcon } from "@/components/common/MaterialIcon"

export function TransformPanel() {
  const [translasiX, setTranslasiX] = useState(3)
  const [translasiY, setTranslasiY] = useState(-2)
  const [customX, setCustomX] = useState("")

  return (
    <div className="bg-surface border-4 border-black p-5 neubrutal-shadow shrink-0">
      <h2 className="font-black text-2xl mb-4 border-b-4 border-black pb-2 flex items-center gap-3 uppercase">
        <MaterialIcon name="gesture" className="text-2xl" />
        TRANSFORMASI
      </h2>
      <div className="space-y-4">
        {/* Translasi */}
        <div className="p-3 border-4 border-black bg-secondary-container">
          <p className="font-black text-xs mb-3 uppercase flex items-center gap-2">
            <MaterialIcon name="east" className="text-sm" />
            Translasi Oleh
          </p>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <input
                type="number"
                value={translasiX}
                onChange={(e) => setTranslasiX(Number(e.target.value))}
                className="w-12 h-10 border-4 border-black text-center font-bold focus:bg-primary-container focus:ring-0 bg-white"
              />
              <input
                type="number"
                value={translasiY}
                onChange={(e) => setTranslasiY(Number(e.target.value))}
                className="w-12 h-10 border-4 border-black border-t-0 text-center font-bold focus:bg-primary-container focus:ring-0 bg-white"
              />
            </div>
            <button className="flex-1 h-20 border-4 border-black bg-white font-black text-sm neubrutal-shadow-sm hover-shift active-shift transition-all uppercase">
              Terapkan
            </button>
          </div>
        </div>

        {/* Refleksi */}
        <div className="p-3 border-4 border-black bg-tertiary-container">
          <p className="font-black text-xs mb-3 uppercase flex items-center gap-2">
            <MaterialIcon name="flip" className="text-sm" />
            Refleksi Terhadap
          </p>
          <div className="flex flex-col gap-2">
            <button className="w-full py-1.5 border-4 border-black bg-white font-black text-xs hover:bg-black hover:text-white transition-all text-left px-3 flex justify-between items-center group">
              <span>SUMBU X</span>
              <MaterialIcon
                name="chevron_right"
                className="text-sm opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>
            <button className="w-full py-1.5 border-4 border-black bg-white font-black text-xs hover:bg-black hover:text-white transition-all text-left px-3 flex justify-between items-center group">
              <span>SUMBU Y</span>
              <MaterialIcon
                name="chevron_right"
                className="text-sm opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center border-4 border-black bg-white px-2 h-10">
                <span className="text-[10px] font-bold mr-1">X=</span>
                <input
                  type="text"
                  value={customX}
                  onChange={(e) => setCustomX(e.target.value)}
                  placeholder="H"
                  className="w-full border-0 p-0 focus:ring-0 text-center font-bold text-sm bg-transparent"
                />
              </div>
              <button className="w-10 h-10 border-4 border-black bg-primary-container neubrutal-shadow-sm flex items-center justify-center hover-shift active-shift">
                <MaterialIcon name="send" className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
