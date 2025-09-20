// === MIGRACIÓN DE DATOS DESDE SUPABASE A MEDUSA ===
const { createClient } = require('@supabase/supabase-js')

// Configuración de Supabase
const supabaseUrl = 'https://iomfaykudsjzrnjelhzl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvbWZheWt1ZHNqenJuamVsaHpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODI5ODY5MSwiZXhwIjoyMDczODc0NjkxfQ.JVmd3vxFeqtdUQATGjaCNPDpok9rTnP4uQ-wthv3l7k'

const supabase = createClient(supabaseUrl, supabaseKey)

async function migrarDatos() {
  console.log('🚀 INICIANDO MIGRACIÓN DESDE SUPABASE A MEDUSA')
  console.log('=' .repeat(50))

  try {
    // 1. Migrar Colegios
    console.log('\n📚 Migrando colegios...')
    const { data: colegios, error: errorColegios } = await supabase
      .from('colegios')
      .select('*')

    if (errorColegios) {
      console.error('❌ Error obteniendo colegios:', errorColegios)
      return
    }

    console.log(`📊 Se encontraron ${colegios.length} colegios`)

    // Aquí se debería insertar en Medusa usando el servicio correspondiente
    for (const colegio of colegios) {
      console.log(`✅ Colegio: ${colegio.descripcion} (Código: ${colegio.codigo})`)
    }

    // 2. Migrar Productos
    console.log('\n📦 Migrando productos...')
    const { data: productos, error: errorProductos } = await supabase
      .from('productos')
      .select('*')

    if (errorProductos) {
      console.error('❌ Error obteniendo productos:', errorProductos)
      return
    }

    console.log(`📊 Se encontraron ${productos.length} productos`)

    // Agrupar productos por colegio
    const productosPorColegio = {}
    for (const producto of productos) {
      const colegioId = producto.cod_cole
      if (!productosPorColegio[colegioId]) {
        productosPorColegio[colegioId] = []
      }
      productosPorColegio[colegioId].push(producto)
    }

    for (const [colegioId, productosColegio] of Object.entries(productosPorColegio)) {
      const colegio = colegios.find(c => c.id === parseInt(colegioId))
      if (colegio) {
        console.log(`\n   📂 ${colegio.descripcion}: ${productosColegio.length} productos`)

        for (const producto of productosColegio) {
          console.log(`      - ${producto.nombre} (Artículo: ${producto.articulo})`)
        }
      }
    }

    // 3. Migrar Variantes
    console.log('\n📏 Migrando variantes de tallas...')
    const { data: variantes, error: errorVariantes } = await supabase
      .from('producto_variantes')
      .select('*')

    if (errorVariantes) {
      console.error('❌ Error obteniendo variantes:', errorVariantes)
      return
    }

    console.log(`📊 Se encontraron ${variantes.length} variantes`)

    // Agrupar variantes por producto
    const variantesPorProducto = {}
    for (const variante of variantes) {
      const productoId = variante.producto_id
      if (!variantesPorProducto[productoId]) {
        variantesPorProducto[productoId] = []
      }
      variantesPorProducto[productoId].push(variante)
    }

    for (const [productoId, variantesProducto] of Object.entries(variantesPorProducto)) {
      const producto = productos.find(p => p.id === productoId)
      if (producto) {
        console.log(`\n   📏 ${producto.nombre}: ${variantesProducto.length} tallas`)

        for (const variante of variantesProducto) {
          console.log(`      - Talla: ${variante.talla} (Código: ${variante.codigo})`)
        }
      }
    }

    console.log('\n✅ ¡ANÁLISIS COMPLETADO!')
    console.log('\n📝 RESUMEN:')
    console.log(`- Colegios: ${colegios.length}`)
    console.log(`- Productos: ${productos.length}`)
    console.log(`- Variantes: ${variantes.length}`)

    console.log('\n⚠️  Nota: Los datos están listos para ser migrados a Medusa')
    console.log('   Se necesitará ejecutar las migraciones de Medusa primero')

  } catch (error) {
    console.error('\n❌ ERROR EN MIGRACIÓN:', error)
  }
}

// Ejecutar migración
migrarDatos()