// src/domain/Inventario.ts
import { Producto } from './Producto'

export class Inventario {
    private productos: Producto[]

    constructor(productos: Producto[] = []) {
        this.productos = productos
    }

    listar(): Producto[] {
        return [...this.productos]
    }

    buscarPorCodigo(id: string): Producto | undefined {
        return this.productos.find(p => p.codigo === id)
    }

    filtrar(predicate: (p: Producto) => boolean): Producto[] {
        return this.productos.filter(predicate)
    }

    agregar(producto: Producto): void {
        if (this.buscarPorCodigo(producto.id)) {
            throw new Error(`Producto con id ${producto.id} ya existe`)
        }
        this.productos.push(producto)
    }

    modificar(
        id: string,
        cambios: Partial<Omit<Producto, 'id'>>
    ): Producto {
        const prod = this.buscarPorCodigo(id)
        if (!prod) throw new Error(`Producto ${id} no encontrado`)
        console.log(cambios);
        if (cambios.nombre != null) prod.modificarNombre(cambios.nombre)
        if (cambios.descripcion != null) prod.modificarDescripcion(cambios.descripcion)
        if (cambios.precio != null) prod.modificarPrecio(cambios.precio)
        if (cambios.fotoURL != null) prod.modificarFotoUrl(cambios.fotoURL)
        return prod
    }

    eliminar(id: string): void {
        const idx = this.productos.findIndex(p => p.codigo === id)
        if (idx < 0) throw new Error(`Producto ${id} no encontrado`)
        this.productos.splice(idx, 1)
    }
}
