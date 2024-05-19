import { Router } from "express";
import CartManager from "../dao/db/cartManager.js";
const cartManager = new CartManager();
const router = Router();

router.get('/', async (req, res) => {
    const result = await cartManager.checkCarts();
    res.send({ result: "success", payload: result })
})

router.get('/:cid', async (req, res) => {
    let { cid } = req.params;
    const result = await cartManager.getCartById(cid);
    res.send({ result: "success", payload: result })
})

router.post('/', async (req, res) => {
    const result = await cartManager.addCart();
    res.send({ result: "success", payload: result });
})

/*router.delete('/:cid', async (req, res) => {
    let { cid } = req.params
    const result = await cartManager.deleteCart(cid);
    res.send({ result: "success", payload: result });
})*/

router.post("/:cid/products/:pid", async (req, res) => {
        let cid = req.params.cid;
        let pid = req.params.pid;
        const result = await cartManager.updateCart(cid,pid);
        res.send({ result: "success", payload: result });
    
})

router.delete('/:cid/products/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const result = await cartManager.deleteProductCart(cid, pid);
    res.send({ result: "success", payload: result });
})

/*router.put('/:cid', async (req, res) => {
    let cid = req.params.cid;
    const result = await cartManager.updateCart??(cid);
    res.send({ result: "success", payload: result });
})*/

router.put('/:cid/products/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let prodQuantity = req.body.quantity;
    const result = await cartManager.updateQuantityProduct(cid, pid, prodQuantity);
    res.send({ result: "success", payload: result });
})

router.delete('/:cid', async (req, res) => {
    let cid = req.params.cid;
    const result = await cartManager.deleteProductsCart(cid);
    res.send({ result: "success", payload: result });
})

export default router;