import express from 'express'
import productModel from '../dao/models/product.model.js';
import cartModel from '../dao/models/cart.model.js';
const router = express.Router()

router.get('/products', async (req, res) => {

    let page = parseInt(req.query.page);
    if(!page) page=1;
    //Lean es crucial para mostrar en Handlebars, ya que evita la "hidratación" del documento de mongoose,
    //esto hace que a Handlebars llegue el documento como plain object y no como Document.
    let result = await productModel.paginate({},{page,limit:10,lean:true});
    result.prevLink = result.hasPrevPage?`http://localhost:8080/products?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8080/products?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)
    res.render('products', result)
})

router.get('/carts/:cid', async(req, res) => {
    let { cid } = req.params;
    let result = await cartModel.findOne({ _id:cid}).populate("products.product").lean();
    result = result.products;
    res.render('carts', {products: result});
})

export default router