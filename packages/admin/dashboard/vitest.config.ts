import { resolve, sep } from "path"
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

const toPosix = (value: string) => value.split(sep).join("/")
const medusaAliasBase = toPosix(
  resolve(__dirname, "../../..", "node_modules", "@medusajs")
)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
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
    environment: "jsdom",
  },
})
