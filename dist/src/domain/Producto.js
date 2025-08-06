"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
class Producto {
    constructor(id, codigo, nombre, precio, descripcion, fotoURL) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.fotoURL = fotoURL;
        this.validarNombre(nombre);
        this.validarCodigo(codigo);
        this.validarPrecio(precio);
    }
    validarNombre(nombre) {
        if (!nombre)
            throw new Error('Nombre requerido');
    }
    validarCodigo(id) {
        if (!id)
            throw new Error('Código único requerido');
    }
    validarPrecio(precio) {
        if (precio < 0)
            throw new Error('Precio inválido');
    }
    modificarId(nuevoId) {
        if (!nuevoId)
            throw new Error('El ID no puede estar vacío');
        this.id = nuevoId;
    }
    modificarNombre(nuevoNombre) {
        this.validarNombre(nuevoNombre);
        this.nombre = nuevoNombre;
    }
    modificarDescripcion(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }
    modificarPrecio(nuevoPrecio) {
        this.validarPrecio(nuevoPrecio);
        this.precio = nuevoPrecio;
    }
    modificarFotoUrl(nuevaUrl) {
        this.fotoURL = nuevaUrl;
    }
}
exports.Producto = Producto;
