/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve, sep } from "path"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const toPosix = (value: string) => value.split(sep).join("/")
const medusaAliasBase = toPosix(
  resolve(__dirname, "../../..", "node_modules", "@medusajs")
)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@/blocks", replacement: "/src/blocks" },
      { find: "@/components", replacement: "/src/components" },
      { find: "@/providers", replacement: "/src/providers" },
      { find: "@/hooks", replacement: "/src/hooks" },
      { find: "@/utils", replacement: "/src/utils" },
      { find: "@/types", replacement: "/src/types" },
      {
        find: /^@medusajs\/([^/]+)$/,
        replacement: `${medusaAliasBase}/$1/src/index.ts`,
      },
      {
        find: /^@medusajs\/([^/]+)\/(.*)$/,
        replacement: `${medusaAliasBase}/$1/src/$2`,
      },
    ],
  },
  test: {
    setupFiles: "./setup-test.ts",
    coverage: {
      all: true,
      reporter: ["lcov", "text"],
      include: ["src/**"],
      exclude: ["**/*.stories.tsx", "**/index.ts"], // exclude stories and index files
    },
    globals: true,
    environment: "jsdom",
    css: false,
  },
})
