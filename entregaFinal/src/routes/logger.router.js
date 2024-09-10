import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
    res.send({ message: "Test logger" })
})

export default router;