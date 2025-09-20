import { MedusaService } from "@medusajs/utils"
import { Colegio } from "../models"

export default class ColegioService extends MedusaService({ Colegio }) {
  // Método para obtener colegios activos
  async getActiveColegios() {
    return await this.list({ status: "active" })
  }

  // Método para obtener colegio por código
  async getColegioByCodigo(codigo: number) {
    const colegios = await this.list({ codigo })
    return colegios[0] || null
  }

  // Método para crear o actualizar colegio
  async upsertColegio(data: {
    codigo: number
    descripcion: string
    logo_url?: string
  }) {
    const existing = await this.getColegioByCodigo(data.codigo)

    if (existing) {
      return await this.update(existing.id, {
        descripcion: data.descripcion,
        logo_url: data.logo_url
      })
    } else {
      return await this.create(data)
    }
  }
}