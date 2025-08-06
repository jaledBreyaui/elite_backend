
export class Producto {
    constructor(
        public id: string,
        public codigo: string,
        public nombre: string,
        public precio: number,
        public descripcion: string,
        public fotoURL: string
    ) {
        this.validarNombre(nombre)
        this.validarCodigo(codigo)
        this.validarPrecio(precio)
    }

    private validarNombre(nombre: string) {
        if (!nombre) throw new Error('Nombre requerido')
    }
    private validarCodigo(id: string) {
        if (!id) throw new Error('Código único requerido')

    }
    private validarPrecio(precio: number) {
        if (precio < 0) throw new Error('Precio inválido')
    }

    modificarId(nuevoId: string): void {
        if (!nuevoId) throw new Error('El ID no puede estar vacío');
        this.id = nuevoId;
    }

    modificarNombre(nuevoNombre: string): void {
        this.validarNombre(nuevoNombre);
        this.nombre = nuevoNombre;
    }

    modificarDescripcion(nuevaDescripcion: string): void {
        this.descripcion = nuevaDescripcion;
    }

    modificarPrecio(nuevoPrecio: number): void {
        this.validarPrecio(nuevoPrecio);
        this.precio = nuevoPrecio;
    }

    modificarFotoUrl(nuevaUrl: string): void {
        this.fotoURL = nuevaUrl;
    }
} 
