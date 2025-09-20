import { Migration } from "@medusajs/utils"

export const Migration20250920000002 = Migration({
  name: "CreateTallaVarianteTable",
  id: "Migration20250920000002",
  up: async ({ run }) => {
    await run(`
      CREATE TABLE IF NOT EXISTS talla_variante (
        id TEXT PRIMARY KEY,
        producto_id TEXT NOT NULL,
        codigo_variante TEXT NOT NULL,
        talla TEXT NOT NULL,
        precio_costo INTEGER DEFAULT 0,
        precio_venta INTEGER DEFAULT 0,
        stock INTEGER DEFAULT 0,
        activo BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_talla_variante_producto_id ON talla_variante(producto_id);
      CREATE INDEX IF NOT EXISTS idx_talla_variante_codigo_variante ON talla_variante(codigo_variante);
      CREATE INDEX IF NOT EXISTS idx_talla_variante_talla ON talla_variante(talla);
      CREATE INDEX IF NOT EXISTS idx_talla_variante_activo ON talla_variante(activo);
    `)
  },
  down: async ({ run }) => {
    await run(`DROP TABLE IF EXISTS talla_variante`)
  }
})