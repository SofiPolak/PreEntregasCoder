import express from 'express'
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import cartRouter from './routes/api/carts.router.js'
import productRouter from './routes/api/products.router.js'
import viewsRouter from './routes/views.router.js'
import messageRouter from './routes/api/messages.router.js'
import loggerRouter from './routes/logger.router.js'
import userRouter from './routes/api/users.router.js'
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
import errorHandler from "./middlewares/errors.js"
import { addLogger } from "./utils/logger.js";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080;

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "Documentacion",
            description: "Api Coder"
        }
    },
    apis: [path.join(__dirname, 'docs/**/*.yaml')]
}

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
//app.use(addLogger); // comentado para que no imprima en la terminal

app.use('/documents', express.static(path.join(__dirname, 'documents')));

app.use('/loggerTest', loggerRouter)
app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)
app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter);
app.use('/api/messages', messageRouter)
app.use('/api/users', userRouter)
app.use(errorHandler)

const specs = swaggerJsdoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

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