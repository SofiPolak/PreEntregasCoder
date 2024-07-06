import { Router } from "express";
import productController from "../../controllers/products.controller.js";
import { isAdmin } from '../../middlewares/auth.js';
const router = Router();

router.get('/', async (req, res) => {
    const result = await productController.getProducts(req.query);
    res.send({ result: "success", payload: result })
})

router.get('/:pid', async (req, res) => {
    let { pid } = req.params;
    const result = await productController.getProduct(pid);
    res.send({ result: "success", payload: result })
})

router.post('/', /*isAdmin,*/ async (req, res) => {
    console.log(req.session.user)
    console.log(req.user)
    let { title, description, price, thumbnail, code, stock, available, category } = req.body
    if (!title || !description || !price || !thumbnail || !code || !stock || !available || !category) {
        res.send({ status: "error", error: "Faltan parametros" })
    }
    const result = await productController.addProduct(title, description, price, thumbnail, code, stock, available, category);
    res.send({ result: "success", payload: result });
})

router.put('/:pid', async (req, res) => {
    let { pid } = req.params
    let productToReplace = req.body
    if (!productToReplace.title || !productToReplace.description || !productToReplace.price || !productToReplace.thumbnail || !productToReplace.code || !productToReplace.stock || !productToReplace.category) {
        res.send({ status: "error", error: "Parametros no definidos" })
    }
    const result = await productController.updateProduct(pid, productToReplace);
    res.send({ result: "success", payload: result });
})

router.delete('/:pid', async (req, res) => {
    let { pid } = req.params
    const result = await productController.deleteProduct(pid);
    res.send({ result: "success", payload: result });
})


export default router;