import { Router } from "express";
import cartController from "../../controllers/carts.controller.js";
import { isUser, isUserOrPremium } from '../../middlewares/auth.js';
import { addProductCartErrorInfo } from "../../services/errors/info.js";
import EErrors from "../../services/errors/enum.js";
import CustomError from "../../services/errors/CustomError.js";
const router = Router();

router.get('/', async (req, res) => {
    const result = await cartController.getCarts();
    res.send({ result: "success", payload: result })
})

router.get('/:cid', async (req, res) => {
    let { cid } = req.params;
    const result = await cartController.getCart(cid);
    res.send({ result: "success", payload: result })
})

router.post('/', async (req, res) => {
    const result = await cartController.addCart();
    res.send({ result: "success", payload: result });
})

router.post("/:cid/products/:pid", isUser, async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let role = req.session?.user?.role
    let owner = req.session?.user?.email
    const result = await cartController.updateCart(cid, pid, role, owner);
    res.send({ result: "success", payload: result });

})

router.delete('/:cid/products/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const result = await cartController.deleteProductCart(cid, pid);
    res.send({ result: "success", payload: result });
})

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let prodQuantity = req.body.quantity;
        if (prodQuantity <= 0) {
            CustomError.createError({
                name: "Error en agregado de producto al carrito",
                cause: addProductCartErrorInfo(prodQuantity),
                message: "Error al agregar un producto al carrito",
                code: EErrors.INVALID_TYPES_CART_ERROR
            })
        }
        const result = await cartController.updateQuantityProduct(cid, pid, prodQuantity);
        res.send({ result: "success", payload: result });
    } catch (error) {
        res.send({ status: "error", error: error.message, cause: error.cause })
    }
})

router.delete('/:cid', async (req, res) => {
    let cid = req.params.cid;
    const result = await cartController.deleteProductsCart(cid);
    res.send({ result: "success", payload: result });
})

router.put('/:cid/purchase', async (req, res) => {
    let cid = req.params.cid;
    const result = await cartController.finishPurchase(cid);
    res.send({ result: "success", payload: result });
})

export default router;