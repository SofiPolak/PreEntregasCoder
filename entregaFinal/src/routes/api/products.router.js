import { Router } from "express";
import productController from "../../controllers/products.controller.js";
import { isAdmin, isAdminOrPremium } from '../../middlewares/auth.js';
import { generateProducts } from "../../utils.js"
import { generateProductErrorInfo } from "../../services/errors/info.js";
import EErrors from "../../services/errors/enum.js";
import CustomError from "../../services/errors/CustomError.js";
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

router.post('/', isAdmin, async (req, res) => {
    try {
        let { title, description, price, thumbnail, code, stock, available, category } = req.body
        let owner = req.session?.user?.email
        if (!owner) {
            owner = "admin"
        }
        if (!title || !description || !price || !thumbnail || !code || !stock || !available || !category) {
            CustomError.createError({
                name: "Error en creacion del producto",
                cause: generateProductErrorInfo({ title, description, price, thumbnail, code, stock, available, category }),
                message: "Error al crear un producto",
                code: EErrors.INVALID_TYPES_PRODUCT_ERROR
            })
            //res.send({ status: "error", error: "Faltan parametros" })
        }
        const result = await productController.addProduct(title, description, price, thumbnail, code, stock, available, category, owner);
        res.send({ result: "success", payload: result });
    } catch (error) {
        res.send({ status: "error", error: error.message, cause: error.cause })
    }
})

router.put('/:pid', isAdmin, async (req, res) => {
    let { pid } = req.params
    let productToReplace = req.body
    if (!productToReplace.title || !productToReplace.description || !productToReplace.price || !productToReplace.thumbnail || !productToReplace.code || !productToReplace.stock || !productToReplace.category) {
        res.send({ status: "error", error: "Parametros no definidos" })
    }
    const result = await productController.updateProduct(pid, productToReplace);
    res.send({ result: "success", payload: result });
})

router.delete('/:pid', isAdmin, async (req, res) => {
    let { pid } = req.params
    let role = req.session?.user?.role
    let owner = req.session?.user?.email
    const result = await productController.deleteProduct(pid, owner, role);
    res.send({ result: "success", payload: result });
})

router.get('/mock/mockingproducts', async (req, res) => {
    const result = generateProducts();
    res.send({ result: "success", payload: result })
})

export default router;