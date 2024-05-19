import express from 'express'

const router = express.Router()

router.get('/products', (req, res) => {
    res.render('products', {})
})

router.get('/carts/:cid', (req, res) => {
    res.render('carts', {})
})

export default router