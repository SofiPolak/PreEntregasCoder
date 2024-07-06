import express from 'express'
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import cartRouter from './routes/api/carts.router.js'
import productRouter from './routes/api/products.router.js'
import viewsRouter from './routes/views.router.js'
import dotenv from 'dotenv'
import session from 'express-session';
//import bodyParser from 'body-parser';
import mongoose from './config/database.js';
import MongoStore from 'connect-mongo';
import sessionsRouter from './routes/api/sessions.router.js';
import { engine } from 'express-handlebars';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import path from 'path';
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, './views'));

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB }),
    // cookie: { maxAge: 180 * 60 * 1000 },
}));

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)
app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter);

const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`));