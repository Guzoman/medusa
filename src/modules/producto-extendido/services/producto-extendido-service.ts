import { MedusaService } from "@medusajs/utils"
import { ProductoExtendido } from "../models"

export default class ProductoExtendidoService extends MedusaService({ ProductoExtendido }) {
  // Método para obtener productos por colegio
  async getProductosByColegio(colegioId: string) {
    return await this.list({ colegio_id: colegioId })
  }

  // Método para obtener productos activos
  async getProductosActivos() {
    return await this.list({ activo: true })
  }

  // Método para crear o actualizar producto extendido
  async upsertProductoExtendido(data: {
    producto_id: string
    colegio_id?: string
    articulo?: number
    imagen_base?: string
    precio_costo?: number
    precio_venta?: number
    activo?: boolean
  }) {
    const existing = await this.list({ producto_id: data.producto_id })

    if (existing.length > 0) {
      return await this.update(existing[0].id, data)
    } else {
      return await this.create(data)
    }
  }

  // Método para buscar productos por artículo
  async getProductosByArticulo(articulo: number) {
    return await this.list({ articulo })
  }
}