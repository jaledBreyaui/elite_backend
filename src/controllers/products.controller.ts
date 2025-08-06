import { Request, Response } from "express"
import { InventarioService } from '../services/InventarioService'
import cloudinary from '../config/cloudinary'

const service = new InventarioService()

export const getProducts = async (req: Request, res: Response) => {
    try {
        const productos = await service.listarProductos()
        res.status(200).json(productos)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const producto = await service.buscarPorId(id)
        res.status(200).json(producto)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const newProduct = async (req: Request, res: Response) => {
    try {
        const { codigo, nombre, descripcion, precio } = req.body
        let fotoURL = ''

        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            const cloudinaryResponse = await cloudinary.uploader.upload(dataURI, {
                resource_type: "auto",
            });
            fotoURL = cloudinaryResponse.secure_url;
        }

        const nuevo = await service.agregarProducto({ codigo, nombre, descripcion, precio, fotoURL })
        res.status(200).json(nuevo)
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error al crear producto" })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const eliminado = await service.eliminarProducto(id)
        res.status(200).json({ succes: `Producto ${id} eliminado` })
    } catch (error) {
        res.status(400).json({ error: "Error al eliminar producto" })
    }
}

export const modifyProudct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { nombre, descripcion, precio } = req.body
        let fotoURL = req.body.fotoURL; // Mantener la fotoURL existente si no se sube una nueva

        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            const cloudinaryResponse = await cloudinary.uploader.upload(dataURI, {
                resource_type: "auto",
            });
            fotoURL = cloudinaryResponse.secure_url;
        }

        const modificado = await service.actualizarProducto(id, { nombre, descripcion, precio, fotoURL })
        res.status(200).json(modificado)
    } catch (error) {
        console.error("Error al modificar producto:", error);
        res.status(500).json({ error: "Error al modificar producto" })
    }
}



