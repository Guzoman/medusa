import { defineModule } from "@medusajs/utils"
import ColegioService from "./services/colegio-service"

export const COLEGIO_MODULE = "colegioModule"

export default defineModule(COLEGIO_MODULE, {
  services: [ColegioService],
})