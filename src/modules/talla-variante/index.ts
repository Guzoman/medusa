import { defineModule } from "@medusajs/utils"
import TallaVarianteService from "./services/talla-variante-service"

export const TALLA_VARIANTE_MODULE = "tallaVarianteModule"

export default defineModule(TALLA_VARIANTE_MODULE, {
  services: [TallaVarianteService],
})