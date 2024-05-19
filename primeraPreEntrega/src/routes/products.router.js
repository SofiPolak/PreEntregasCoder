const express = require("express");
const router = express.Router();

const ProductManager = require("../ProductManager");
const productManager = new ProductManager();

router.get("/products", async (req, res) => {

    try {
        const products = await productManager.getProducts();
        let limit = parseInt(req.query.limit);
        if (limit) {
            const productsLimit = products.slice(0, limit);
            res.json(productsLimit);
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(404).json({ message: "Error, productos no encontrados" });
    }

})

router.get("/products/:pid", async (req, res) => {

    try {
        let pid = parseInt(req.params.pid);
        const productById = await productManager.getProductById(pid);
        if (productById) {
            res.json(productById);
        } else {
            res.status(404).json({ message: "Producto no encontrado por id" });
        }
    } catch (error) {
        res.status(404).json({ message: "Error, producto no encontrado por id" });
    }

})

router.post("/products", async (req, res) => {

    try {
        const result = await productManager.addProduct(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(404).json({ message: "Error, no se pudo agregar el producto" });
    }

})

router.put("/products/:pid", async (req, res) => {

    try {
        let pid = parseInt(req.params.pid);
        const result = await productManager.updateProduct(pid, req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(404).json({ message: "Error, no se pudo actualizar el producto" });
    }

})

router.delete("/products/:pid", async (req, res) => {

    try {
        let pid = parseInt(req.params.pid);
        const result = await productManager.deleteProduct(pid);
        res.status(201).json(result);
    } catch (error) {
        res.status(404).json({ message: "Error, no se pudo eliminar el producto" });
    }

})

module.exports = router;