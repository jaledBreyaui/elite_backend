"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoRepository = void 0;
const Producto_1 = require("../domain/Producto");
const product_1 = require("../models/product");
class ProductoRepository {
    /** Lee todos los documentos de Mongo y los convierte en instancias de Producto */
    async findAll() {
        const docs = await product_1.ProductoModel.find().lean();
        return docs.map(d => new Producto_1.Producto(d._id.toString(), d.codigo, d.nombre, d.precio, d.descripcion, d.fotoURL ?? ""));
    }
    /** Busca un documento por ID y lo devuelve como Producto o null */
    // async findById(id: string): Promise<Producto | null> {
    //     const doc = await ProductoModel.findById(id).lean<IProducto>()
    //     return doc
    //         ? new Producto(
    //             doc.id.toString(),
    //             doc.codigo,
    //             doc.nombre,
    //             doc.precio,
    //             doc.descripcion,
    //             doc.fotoURL
    //         )
    //         : null
    // }
    /** Inserta un nuevo Producto en Mongo y retorna la instancia creada */
    async save(prod) {
        const created = await product_1.ProductoModel.create({
            codigo: prod.codigo,
            nombre: prod.nombre,
            descripcion: prod.descripcion,
            precio: prod.precio,
            fotoURL: prod.fotoURL
        });
        return new Producto_1.Producto(created.id.toString(), created.codigo, created.nombre, created.precio, created.descripcion, created.fotoURL);
    }
    /** Actualiza un documento existente según la instancia de dominio */
    async update(prod) {
        const updated = await product_1.ProductoModel
            .findByIdAndUpdate(prod.id, {
            nombre: prod.nombre,
            descripcion: prod.descripcion,
            precio: prod.precio,
            fotoURL: prod.fotoURL
        }, { new: true, runValidators: true })
            .lean();
        console.log(updated);
        if (!updated)
            throw new Error(`Producto ${prod.id} no encontrado`);
        return new Producto_1.Producto(updated._id.toString(), updated.codigo, updated.nombre, updated.precio, updated.descripcion, updated.fotoURL);
    }
    /** Elimina el documento con ese ID; lanza error si no existe */
    async delete(codigo) {
        const res = await product_1.ProductoModel.findOneAndDelete({ codigo });
        if (!res)
            throw new Error(`Producto ${codigo} no encontrado`);
    }
}
exports.ProductoRepository = ProductoRepository;
