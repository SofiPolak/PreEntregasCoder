import express from 'express'
import mongoose from 'mongoose'
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import cartRouter from './routes/carts.router.js'
import productRouter from './routes/products.router.js'
import viewsRouter from './routes/views.router.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)
app.use('/', viewsRouter)

const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGODB)
    .then(() => { console.log("Conectado a la base de datos") })
    .catch(error => console.error("Error en la conexion", error))