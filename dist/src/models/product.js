"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoModel = void 0;
const mongoose_1 = require("mongoose");
const productoSchema = new mongoose_1.Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        default: ''
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    fotoURL: {
        type: String,
        default: ''
    }
}, {
    collection: 'productos',
    timestamps: true // Mongoose agrega createdAt y updatedAt
});
exports.ProductoModel = (0, mongoose_1.model)('Producto', productoSchema);
