import { defineConfig } from "@medusajs/medusa"

import { COLEGIO_MODULE } from "./src/modules/colegio"
import { PRODUCTO_EXTENDIDO_MODULE } from "./src/modules/producto-extendido"
import { TALLA_VARIANTE_MODULE } from "./src/modules/talla-variante"

export default defineConfig({
  projectConfig: {
    databaseUrl: "postgres://postgres.iomfaykudsjzrnjelhzl:xp4.*vS6nw_pZFq@aws-1-sa-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true",
    http: {
      cookieSecret: process.env.COOKIE_SECRET || "super-secret-cookie"
    }
  },
  admin: {
    disable: false,
    backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
  },
  modules: [
    {
      resolve: "./src/modules/colegio",
      key: COLEGIO_MODULE
    },
    {
      resolve: "./src/modules/producto-extendido",
      key: PRODUCTO_EXTENDIDO_MODULE
    },
    {
      resolve: "./src/modules/talla-variante",
      key: TALLA_VARIANTE_MODULE
    }
  ]
})