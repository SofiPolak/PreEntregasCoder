import { Router } from "express";
import ProductManager from "../dao/db/productManager.js";
const productManager = new ProductManager();
const router = Router();

router.get('/', async (req, res) => {
    const result = await productManager.checkProducts(req.query);
    res.send({ result: "success", payload: result })
})

router.get('/:pid', async (req, res) => {
    let { pid } = req.params;
    const result = await productManager.getProductById(pid);
    res.send({ result: "success", payload: result })
})

router.post('/', async (req, res) => {
    let { title, description, price, thumbnail, code, stock, available, category } = req.body
    if (!title || !description || !price || ! thumbnail || !code || !stock || !available || !category) {
        res.send({ status: "error", error: "Faltan parametros" })
    }
    const result = await productManager.addProduct(title, description, price, thumbnail, code, stock, available, category);
    res.send({ result: "success", payload: result });
})

router.put('/:pid', async (req, res) => {
    let { pid } = req.params
    let productToReplace = req.body
    if (!productToReplace.title || !productToReplace.description || !productToReplace.price || !productToReplace.thumbnail || !productToReplace.code || !productToReplace.stock || !productToReplace.category) {
        res.send({ status: "error", error: "Parametros no definidos" })
    }
    const result = await productManager.updateProduct(pid,productToReplace);
    res.send({ result: "success", payload: result });
})

router.delete('/:pid', async (req, res) => {
    let { pid } = req.params
    const result = await productManager.deleteProduct(pid);
    res.send({ result: "success", payload: result });
})


export default router;