import { Migration } from "@medusajs/utils"

export const Migration20250920000000 = Migration({
  name: "CreateColegioTable",
  id: "Migration20250920000000",
  up: async ({ run }) => {
    await run(`
      CREATE TABLE IF NOT EXISTS colegio (
        id TEXT PRIMARY KEY,
        codigo INTEGER NOT NULL,
        descripcion TEXT NOT NULL,
        logo_url TEXT,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_colegio_codigo ON colegio(codigo);
      CREATE INDEX IF NOT EXISTS idx_colegio_status ON colegio(status);
    `)
  },
  down: async ({ run }) => {
    await run(`DROP TABLE IF EXISTS colegio`)
  }
})