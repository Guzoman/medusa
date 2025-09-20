import { Migration } from "@medusajs/utils"

export const Migration20250920000001 = Migration({
  name: "CreateProductoExtendidoTable",
  id: "Migration20250920000001",
  up: async ({ run }) => {
    await run(`
      CREATE TABLE IF NOT EXISTS producto_extendido (
        id TEXT PRIMARY KEY,
        producto_id TEXT NOT NULL,
        colegio_id TEXT,
        articulo INTEGER,
        imagen_base TEXT,
        precio_costo INTEGER DEFAULT 0,
        precio_venta INTEGER DEFAULT 0,
        activo BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_producto_extendido_producto_id ON producto_extendido(producto_id);
      CREATE INDEX IF NOT EXISTS idx_producto_extendido_colegio_id ON producto_extendido(colegio_id);
      CREATE INDEX IF NOT EXISTS idx_producto_extendido_articulo ON producto_extendido(articulo);
      CREATE INDEX IF NOT EXISTS idx_producto_extendido_activo ON producto_extendido(activo);
    `)
  },
  down: async ({ run }) => {
    await run(`DROP TABLE IF EXISTS producto_extendido`)
  }
})