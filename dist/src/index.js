"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PORT = process.env.PORT || 3001;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("../config/mongoConnection");
const app_1 = __importDefault(require("./app"));
app_1.default.listen(PORT, () => {
    console.log(`listening in port : 3001`);
})
    .on('error', (err) => {
    console.error('Server failed to start:', err);
});
