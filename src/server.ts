import "dotenv/config";
import app from './app'
import { AppDataSource } from './data-source'

AppDataSource.initialize().then(() => {
    const port = process.env.PORT
    console.log('Database connected!')
    app.listen(port, () => {
        console.log(`Server is running on localhost:${port}`)
    })
}).catch(err => {
    console.log(err)
})