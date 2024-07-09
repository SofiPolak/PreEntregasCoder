import mongoose from "mongoose";
import config from '../config/config.js'
import path from 'path';
import __dirname from '../utils.js';
import dotenv from 'dotenv'

const envPath = path.resolve(__dirname, 'src', '.env');
dotenv.config({ path: envPath });

console.log(config)

export let Products
export let Carts
export let Users
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
        Carts = CartsMongo
        const { default: UsersMongo } = await import('./db/userManager.js')
        Users = UsersMongo
        break;

    default:

}