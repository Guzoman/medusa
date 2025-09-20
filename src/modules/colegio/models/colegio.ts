import { model } from "@medusajs/utils"

export const Colegio = model.define("colegio", {
  id: model.id({ prefix: "col" }).primaryKey(),
  codigo: model.number(),
  descripcion: model.text(),
  logo_url: model.text().nullable(),
  status: model.enum(["active", "inactive"]).default("active"),
})