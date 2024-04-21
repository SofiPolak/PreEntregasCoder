const express = require("express");
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsRouter = require("./routes/products.router.js")
const cartsRouter = require("./routes/carts.router.js")

app.use("/api/", productsRouter);
app.use("/api/", cartsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})