"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/seed.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // para leer MONGO_URI desde .env
const mongoConnection_1 = __importDefault(require("../config/mongoConnection")); // esto hace mongoose.connect(...)
const product_1 = require("./models/product");
async function seed() {
    // 1) Borramos todo
    await product_1.ProductoModel.deleteMany({});
    console.log('🗑  Colección productos vaciada');
    // 2) Definimos nuestros 4 productos
    const ejemplos = [
        { codigo: "9552", nombre: 'Pelota de fútbol', descripcion: 'Tamaño 5, oficial', precio: 1200, fotoUrl: '' },
        { codigo: "105", nombre: 'Camiseta de River', descripcion: 'Temporada 2025', precio: 3500, fotoUrl: '' },
        { codigo: "250", nombre: 'Short Nike', descripcion: 'Dry‑Fit', precio: 1800, fotoUrl: '' },
        { codigo: "252", nombre: 'Botines Adidas', descripcion: 'Tacos FG', precio: 7200, fotoUrl: '' }
    ];
    // 3) Insertamos
    const docs = await product_1.ProductoModel.insertMany(ejemplos);
    console.log(`✅ Seed completado: ${docs.length} productos creados`);
    // 4) Cerramos conexión
    await mongoConnection_1.default.disconnect();
}
seed().catch(err => {
    console.error('❌ Error en seed:', err);
    process.exit(1);
});
