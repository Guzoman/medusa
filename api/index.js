const express = require('express')
const { Medusa } = require('@medusajs/medusa')

const app = express()

// Configurar Medusa
const medusa = new Medusa(config)

// Middleware de Medusa
app.use(medusa.middleware())

// Rutas de la API
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/store/products', async (req, res) => {
  try {
    const productService = medusa.container.resolve('productService')
    const products = await productService.list()
    res.json({ products })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Exportar para Vercel
module.exports = app