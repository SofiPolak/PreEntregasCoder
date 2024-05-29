import cartModel from "../models/cart.model.js";

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
            let result = await cartModel.findOne({ _id:idBuscado}).populate("products.product");
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
                cartToUpdate.products.push({ product: pid, quantity: 1})
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
            cart.products.splice(indexProductToDelete,1);
            let result = await cartModel.updateOne({ _id: cid }, cart)
            return result;
        } catch (error) {
            console.log(error)
        }
    }

    async updateQuantityProduct(cid, pid, prodQuantity){
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

    async deleteProductsCart(cid){
        try {
            let cart = await cartModel.findOne({ _id: cid });
            cart.products = [];
            let result = await cartModel.updateOne({ _id: cid }, cart)
            return result;
        } catch (error) {
            console.log(error)
        }
    }
/*
    async updateProductsCart(cid, products){
        try {
            let cart = await cartModel.findOne({ _id: cid });
            products.forEach(product => {
                //Ver esto del Id
                product = products.filter(p => p.id == pid);
                if (product.length > 0) {
                    ++product[0].quantity;
                } else {
                    cart.products.push({ product: pid, quantity: 1})
                }
            });

            let result = await cartModel.updateOne({ _id: cid }, cart)
            return result;
        } catch (error) {
            console.log(error)
        }
    }
*/
}

export default CartManager;