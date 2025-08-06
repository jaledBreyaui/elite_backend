"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(), // Almacena el archivo en memoria como un Buffer
    limits: {
        fileSize: 5 * 1024 * 1024, // Límite de 5MB por archivo
    },
});
exports.default = upload;
