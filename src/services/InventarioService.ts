// src/services/InventarioService.ts
import { ProductoRepository } from '../repositories/ProductoRepository'
import { CrearProductoDTO } from './dtos/CrearProductoDTO'
import { Inventario } from '../domain/Inventario'
import { Producto } from '../domain/Producto'

export class InventarioService {
    private repo = new ProductoRepository()

    /** Carga todos los productos del repo y construye el Inventario */
    private async cargarInventario(): Promise<Inventario> {
        const productos = await this.repo.findAll()
        return new Inventario(productos)
    }

    /** Listar todos los productos (caso de uso “listar”) */
    async listarProductos(): Promise<Producto[]> {
        const inv = await this.cargarInventario()
        return inv.listar()
    }

    /** Filtrar productos por precio máximo (ejemplo de caso de uso) */
    async filtrarPorPrecio(max: number): Promise<Producto[]> {
        const inv = await this.cargarInventario()
        return inv.filtrar(p => p.precio <= max)
    }

    async agregarProducto(data: CrearProductoDTO): Promise<Producto> {
        const inv = await this.cargarInventario()
        const nuevo = new Producto(" ", data.codigo, data.nombre, data.precio, data.descripcion, data.fotoURL)
        inv.agregar(nuevo)
        return this.repo.save(nuevo)
    }

    /** Actualizar un producto existente */
    async actualizarProducto(
        id: string,
        cambios: Partial<Omit<Producto, 'id'>>
    ): Promise<Producto> {
        //le pido a Mongo todos los Productos e Inventario service genera un Inventario con Productos
        const inv = await this.cargarInventario()
        // Le pido al inventario que me modifique un Producto dentro de el pasandole codigo y los cambios y me devuelve ese Producto
        const modificado = inv.modificar(id, cambios)
        //Inventario me devuelve el Producto modificado y yo le paso a Productorepository el Producto modificado para que lo guarde 
        return this.repo.update(modificado)
    }

    /** Eliminar un producto por ID */
    async eliminarProducto(id: string): Promise<void> {
        const inv = await this.cargarInventario()
        inv.eliminar(id)             // valida existencia en dominio
        await this.repo.delete(id)   // borra en BD
    }

    async buscarPorId(id: string): Promise<Producto> {
        //Creo un Inventario de Productos
        const inv = await this.cargarInventario()
        //le digo al inventario que me busque un Producto por codigo y me devuelvo un Producto o undefined si no lo encuentra
        const producto = inv.buscarPorCodigo(id)
        if (!producto) throw new Error(`Producto ${id} no encontrado`)
        return producto
    }
}