import { Schema, model, Document } from 'mongoose'

export interface IProducto extends Document {
    codigo: string
    nombre: string
    descripcion: string
    precio: number
    fotoURL: string
    createdAt: Date
    updatedAt: Date
}

const productoSchema = new Schema<IProducto>({
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
    timestamps: true   // Mongoose agrega createdAt y updatedAt
})

export const ProductoModel = model<IProducto>('Producto', productoSchema)