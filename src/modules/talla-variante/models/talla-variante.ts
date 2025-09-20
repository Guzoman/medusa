import { model } from "@medusajs/utils"

export const TallaVariante = model.define("talla_variante", {
  id: model.id({ prefix: "tvar" }).primaryKey(),
  producto_id: model.text(),
  codigo_variante: model.text(),
  talla: model.text(),
  precio_costo: model.number().default(0),
  precio_venta: model.number().default(0),
  stock: model.number().default(0),
  activo: model.boolean().default(true),
})