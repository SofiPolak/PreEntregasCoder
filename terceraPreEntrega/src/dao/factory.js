/*import mongoose from "mongoose";
import config from '../config/config.js'
import dotenv from 'dotenv'
dotenv.config()

console.log(config)

export let Contacts
switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect(process.env.MONGODB);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            console.log('Connected to MongoDB');
        });
        const { default: ProductsMongo } = await import('./db/productManager.js')
        Products = ProductsMongo
        const { default: CartsMongo } = await import('./db/cartManager.js')
        Products = CartsMongo
        break;

    default:

}*/