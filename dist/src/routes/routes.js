"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const upload_1 = __importDefault(require("../middleware/upload"));
const productRoute = (0, express_1.Router)();
productRoute.get("/elite/productos", products_controller_1.getProducts);
productRoute.get('/elite/porid/:id', products_controller_1.getProductById);
productRoute.post('/elite/nuevoproducto', upload_1.default.single('foto'), products_controller_1.newProduct);
productRoute.delete('/elite/eliminar/:id', products_controller_1.deleteProduct);
productRoute.put('/elite/modificar/:id', upload_1.default.single('foto'), products_controller_1.modifyProudct);
exports.default = productRoute;
