"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error('❌ MONGO_URI no está definido en el .env');
}
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose_1.default
    .connect(uri)
    .then(() => console.log('✅ MongoDB conectado'))
    .catch(err => {
    console.error('❌ Error al conectar MongoDB:', err);
    process.exit(1);
});
exports.default = mongoose_1.default;
