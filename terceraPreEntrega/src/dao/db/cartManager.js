import cartModel from "../models/cart.model.js";
import ProductManager from "../db/productManager.js";
import TicketManager from "../db/ticketManager.js";
import UserManager from "../db/userManager.js";
import nodemailer from "nodemailer";
import path from 'path';
import __dirname from '../../utils.js';
import dotenv from 'dotenv'

const envPath = path.resolve(__dirname, 'src', '.env');
dotenv.config({ path: envPath });

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "sofiadanielapolak@gmail.com",//process.env.MAIL,
        pass: "anwz yeiy dana cvso", //process.env.PASSMAILING
    },
});

const productManager = new ProductManager();
const ticketManager = new TicketManager();
const userManager = new UserManager();

class CartManager {

    async addCart() {
        try {
            const cart = { products: [] };
            let result = await cartModel.create(cart)
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(idBuscado) {

        try {
            let result = await cartModel.findOne({ _id: idBuscado }).populate("products.product");
            return result;
        } catch (error) {
            console.log(error);
        }

    }

    async checkCarts() {
        try {
            let carts = await cartModel.find()
            return carts;
        } catch (error) {
            console.log(error)
        }
    }

    async updateCart(cid, pid) {

        try {

            let cartToUpdate = await cartModel.findOne({ _id: cid });
            let products = cartToUpdate.products;
            let productToUpdate = products.filter(p => p.product == pid);

            if (productToUpdate.length > 0) {
                ++productToUpdate[0].quantity;
            } else {
                cartToUpdate.products.push({ product: pid, quantity: 1 })
            }

            let result = await cartModel.updateOne({ _id: cid }, cartToUpdate)

            return result;
        } catch (error) {
            console.log(error)
        }

    }

    async deleteCart(id) {
        try {
            let result = await cartModel.deleteOne({ _id: id })
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductCart(cid, pid) {

        try {
            let cart = await cartModel.findOne({ _id: cid });
            let products = cart.products;
            let indexProductToDelete = products.indexOf(p => p.id == pid);
            cart.products.splice(indexProductToDelete, 1);
            let result = await cartModel.updateOne({ _id: cid }, cart)
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async updateQuantityProduct(cid, pid, prodQuantity) {
        try {

            let cartToUpdate = await cartModel.findOne({ _id: cid });
            let products = cartToUpdate.products;
            let productToUpdate = products.filter(p => p.product == pid);

            if (productToUpdate.length > 0) {
                productToUpdate[0].quantity = prodQuantity;
            }

            let result = await cartModel.updateOne({ _id: cid }, cartToUpdate)
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductsCart(cid) {
        try {
            let cart = await cartModel.findOne({ _id: cid });
            cart.products = [];
            let result = await cartModel.updateOne({ _id: cid }, cart)
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async finishPurchase(cid) {
        try {
            let cart = await cartModel.findOne({ _id: cid });
            let products = cart.products;
            let productsNotIncluded = [];
            let amount = 0;

            for (const product of products) {
                const productId = product.product;
                const quantity = product.quantity;
                const completeProduct = await productManager.getProductById(productId);
                const productStock = completeProduct.stock;
                const productPrice = completeProduct.price;

                if (quantity <= productStock) {
                    amount += quantity * productPrice;
                    const value = productStock - quantity;
                    const productUpdate = {
                        title: completeProduct.title,
                        description: completeProduct.description,
                        price: completeProduct.price,
                        thumbnail: completeProduct.thumbnail,
                        code: completeProduct.code,
                        stock: value,
                        category: completeProduct.category
                    }
                    await productManager.updateProduct(productId, productUpdate);
                    await this.deleteProductCart(cid, productId);
                } else {
                    productsNotIncluded.push(productId)
                }

            };
            if (productsNotIncluded.length < products.length) {
                let purchaser = await userManager.getUserByCart(cid);
                let purchaserEmail = purchaser.email;
                let ticket = await ticketManager.addTicket(amount, purchaserEmail);
                await transport.sendMail(
                    {
                        from: "sofiadanielapolak@gmail.com", //process.env.MAIL,
                        to: "sofi_polak@hotmail.com",
                        //to: purchaserEmail,
                        subject: "Envio de ticket de compra",
                        html: `<div>
                            <h2>Nueva compra realizada!</h2>
                            <p>Estimado/a ${purchaserEmail},</p>
                            <p>El total de su compra es $${amount}.</p>
                            <h2>Gracias por elegirnos.</h2>
                            </div>`
                    }
                )
            }

            return productsNotIncluded;
        } catch (error) {
            console.log(error)
        }
    }

}

export default CartManager;