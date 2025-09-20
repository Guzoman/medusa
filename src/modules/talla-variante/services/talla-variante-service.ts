import { MedusaService } from "@medusajs/utils"
import { TallaVariante } from "../models"

export default class TallaVarianteService extends MedusaService({ TallaVariante }) {
  // Método para obtener variantes por producto
  async getVariantesByProducto(productoId: string) {
    return await this.list({ producto_id: productoId })
  }

  // Método para obtener variantes activas
  async getVariantesActivas() {
    return await this.list({ activo: true })
  }

  // Método para crear o actualizar variante
  async upsertVariante(data: {
    producto_id: string
    codigo_variante: string
    talla: string
    precio_costo?: number
    precio_venta?: number
    stock?: number
    activo?: boolean
  }) {
    const existing = await this.list({
      producto_id: data.producto_id,
      talla: data.talla
    })

    if (existing.length > 0) {
      return await this.update(existing[0].id, data)
    } else {
      return await this.create(data)
    }
  }

  // Método para actualizar stock
  async actualizarStock(varianteId: string, cantidad: number) {
    const variante = await this.retrieve(varianteId)
    const nuevoStock = Math.max(0, variante.stock + cantidad)

    return await this.update(varianteId, { stock: nuevoStock })
  }

  // Método para obtener variantes por talla específica
  async getVariantesByTalla(talla: string) {
    return await this.list({ talla })
  }
}