import { Router } from 'express'
import { deleteProduct, getProductById, getProducts, modifyProudct, newProduct } from '../controllers/products.controller'
import upload from '../middleware/upload'

const productRoute = Router()


productRoute.get("/elite/productos", getProducts)
productRoute.get('/elite/porid/:id', getProductById)
productRoute.post('/elite/nuevoproducto', upload.single('foto'), newProduct)
productRoute.delete('/elite/eliminar/:id', deleteProduct)
productRoute.put('/elite/modificar/:id', upload.single('foto'), modifyProudct)


export default productRoute