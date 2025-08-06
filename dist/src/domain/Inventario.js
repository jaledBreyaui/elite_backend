"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventario = void 0;
class Inventario {
    constructor(productos = []) {
        this.productos = productos;
    }
    listar() {
        return [...this.productos];
    }
    buscarPorCodigo(id) {
        return this.productos.find(p => p.codigo === id);
    }
    filtrar(predicate) {
        return this.productos.filter(predicate);
    }
    agregar(producto) {
        if (this.buscarPorCodigo(producto.id)) {
            throw new Error(`Producto con id ${producto.id} ya existe`);
        }
        this.productos.push(producto);
    }
    modificar(id, cambios) {
        const prod = this.buscarPorCodigo(id);
        if (!prod)
            throw new Error(`Producto ${id} no encontrado`);
        console.log(cambios);
        if (cambios.nombre != null)
            prod.modificarNombre(cambios.nombre);
        if (cambios.descripcion != null)
            prod.modificarDescripcion(cambios.descripcion);
        if (cambios.precio != null)
            prod.modificarPrecio(cambios.precio);
        if (cambios.fotoURL != null)
            prod.modificarFotoUrl(cambios.fotoURL);
        return prod;
    }
    eliminar(id) {
        const idx = this.productos.findIndex(p => p.codigo === id);
        if (idx < 0)
            throw new Error(`Producto ${id} no encontrado`);
        this.productos.splice(idx, 1);
    }
}
exports.Inventario = Inventario;
