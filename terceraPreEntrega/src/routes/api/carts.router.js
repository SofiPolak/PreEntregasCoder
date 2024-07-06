import { Router } from "express";
import cartController from "../../controllers/carts.controller.js";
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

router.post("/:cid/products/:pid", async (req, res) => {
        let cid = req.params.cid;
        let pid = req.params.pid;
        const result = await cartController.updateCart(cid,pid);
        res.send({ result: "success", payload: result });
    
})

router.delete('/:cid/products/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const result = await cartController.deleteProductCart(cid, pid);
    res.send({ result: "success", payload: result });
})

router.put('/:cid/products/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let prodQuantity = req.body.quantity;
    const result = await cartController.updateQuantityProduct(cid, pid, prodQuantity);
    res.send({ result: "success", payload: result });
})

router.delete('/:cid', async (req, res) => {
    let cid = req.params.cid;
    const result = await cartController.deleteProductsCart(cid);
    res.send({ result: "success", payload: result });
})

export default router;