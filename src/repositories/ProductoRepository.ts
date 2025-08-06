import { Producto } from '../domain/Producto'
import { ProductoModel, IProducto } from '../models/product'

export class ProductoRepository {
    /** Lee todos los documentos de Mongo y los convierte en instancias de Producto */
    async findAll(): Promise<Producto[]> {
        const docs = await ProductoModel.find().lean<IProducto[]>()
        return docs.map(d =>
            new Producto(
                (d._id as any).toString(),
                d.codigo,
                d.nombre,
                d.precio,
                d.descripcion,
                d.fotoURL ?? ""
            )
        )
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
    async save(prod: Producto): Promise<Producto> {
        const created = await ProductoModel.create({
            codigo: prod.codigo,
            nombre: prod.nombre,
            descripcion: prod.descripcion,
            precio: prod.precio,
            fotoURL: prod.fotoURL
        })
        return new Producto(
            created.id.toString(),
            created.codigo,
            created.nombre,
            created.precio,
            created.descripcion,
            created.fotoURL
        )
    }

    /** Actualiza un documento existente según la instancia de dominio */
    async update(prod: Producto): Promise<Producto> {
        const updated = await ProductoModel
            .findByIdAndUpdate(
                prod.id,
                {
                    nombre: prod.nombre,
                    descripcion: prod.descripcion,
                    precio: prod.precio,
                    fotoURL: prod.fotoURL
                },
                { new: true, runValidators: true }
            )
            .lean<IProducto>()
        console.log(updated)
        if (!updated) throw new Error(`Producto ${prod.id} no encontrado`)
        return new Producto(
            (updated._id as any).toString(),
            updated.codigo,
            updated.nombre,
            updated.precio,
            updated.descripcion,
            updated.fotoURL
        )
    }

    /** Elimina el documento con ese ID; lanza error si no existe */
    async delete(codigo: string): Promise<void> {
        const res = await ProductoModel.findOneAndDelete({ codigo })
        if (!res) throw new Error(`Producto ${codigo} no encontrado`)
    }
}