// src/assets/symbols/index.js
// Auto-import all SVG files in this folder as URLs:
// Make sure this file lives directly inside src/assets/symbols/

const modules = import.meta.glob("./*.svg", { eager: true });

export const symbols = Object.entries(modules) // [ [ filename, module ], … ]
  .sort(
    (
      [a],
      [b] // numeric-aware sort on the filename
    ) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
  )
  .map(([, m]) => m.default);
