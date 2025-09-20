import { defineModule } from "@medusajs/utils"
import ProductoExtendidoService from "./services/producto-extendido-service"

export const PRODUCTO_EXTENDIDO_MODULE = "productoExtendidoModule"

export default defineModule(PRODUCTO_EXTENDIDO_MODULE, {
  services: [ProductoExtendidoService],
})