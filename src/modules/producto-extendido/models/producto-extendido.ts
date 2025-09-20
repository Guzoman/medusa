import { model } from "@medusajs/utils"

export const ProductoExtendido = model.define("producto_extendido", {
  id: model.id({ prefix: "pext" }).primaryKey(),
  producto_id: model.text(),
  colegio_id: model.text().nullable(),
  articulo: model.number().nullable(),
  imagen_base: model.text().nullable(),
  precio_costo: model.number().default(0),
  precio_venta: model.number().default(0),
  activo: model.boolean().default(true),
})