// src/seed.ts
import dotenv from 'dotenv'
dotenv.config()              // para leer MONGO_URI desde .env

import mongoose from '../config/mongoConnection'   // esto hace mongoose.connect(...)
import { ProductoModel } from './models/product'

async function seed() {
    // 1) Borramos todo
    await ProductoModel.deleteMany({})
    console.log('🗑  Colección productos vaciada')

    // 2) Definimos nuestros 4 productos
    const ejemplos = [
        { codigo: "9552", nombre: 'Pelota de fútbol', descripcion: 'Tamaño 5, oficial', precio: 1200, fotoUrl: '' },
        { codigo: "105", nombre: 'Camiseta de River', descripcion: 'Temporada 2025', precio: 3500, fotoUrl: '' },
        { codigo: "250", nombre: 'Short Nike', descripcion: 'Dry‑Fit', precio: 1800, fotoUrl: '' },
        { codigo: "252", nombre: 'Botines Adidas', descripcion: 'Tacos FG', precio: 7200, fotoUrl: '' }
    ]

    // 3) Insertamos
    const docs = await ProductoModel.insertMany(ejemplos)
    console.log(`✅ Seed completado: ${docs.length} productos creados`)

    // 4) Cerramos conexión
    await mongoose.disconnect()
}

seed().catch(err => {
    console.error('❌ Error en seed:', err)
    process.exit(1)
})
