const express = require("express");
const router = express.Router();

const CartManager = require("../CartManager");
const cartManager = new CartManager();

router.get("/carts/:cid", async (req, res) => {

    try {
        let cid = parseInt(req.params.cid);
        const cartById = await cartManager.getCartById(cid);
        if (cartById) {
            res.json(cartById);
        } else {
            res.status(404).json({ message: "Carrito no encontrado por id" });
        }
    } catch (error) {
        res.status(404).json({ message: "Error, carrito no encontrado por id" });
    }
    
})

router.post("/carts", async (req, res) => {

    try {
        const result = await cartManager.addCart();
        res.status(201).json(result);
    }
    catch (error) {
        res.status(404).json({ message: "Error, no se pudo agregar el carrito" });
    }
    
})

router.post("/carts/:cid/product/:pid", async (req, res) => {

    try {
        let cid = parseInt(req.params.cid);
        let pid = parseInt(req.params.pid);
        const result = await cartManager.updateCart(cid,pid);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(404).json({ message: "Error, no se pudo agregar el producto al carrito" });
    }
    
})

module.exports = router;