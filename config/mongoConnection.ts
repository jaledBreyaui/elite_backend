import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'


const uri = process.env.MONGO_URI
if (!uri) {
    throw new Error('❌ MONGO_URI no está definido en el .env')
}
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose
    .connect(uri)
    .then(() => console.log('✅ MongoDB conectado'))
    .catch(err => {
        console.error('❌ Error al conectar MongoDB:', err)
        process.exit(1)
    })

export default mongoose