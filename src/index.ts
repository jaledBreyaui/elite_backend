const PORT = process.env.PORT || 3001

import dotenv from 'dotenv'
dotenv.config()
import '../config/mongoConnection'
import app from './app'

app.listen(PORT, () => {
    console.log(`listening in port : 3001`);
})
    .on('error', (err: Error) => {
        console.error('Server failed to start:', err)
    }) 