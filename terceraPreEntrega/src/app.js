import express from 'express'
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import cartRouter from './routes/api/carts.router.js'
import productRouter from './routes/api/products.router.js'
import viewsRouter from './routes/views.router.js'
import messageRouter from './routes/api/messages.router.js'
import MessageManager from "./dao/db/messageManager.js";
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
import { Server } from 'socket.io';
dotenv.config()

const app = express()
const PORT = process.env.PORT

const messageManager = new MessageManager();

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
app.use('/api/messages', messageRouter)

const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`));
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log("Cliente conectado");

    messageManager.checkMessages()
        .then(messages => {
            socketServer.emit('messages', messages)
        })

    socket.on('addMessage', (data) => {
        messageManager.addMessage(data.user, data.message)
            .then(() => {
                messageManager.checkMessages()
                    .then(messages => {
                        socketServer.emit('messages', messages)
                    })
            })

    })
})