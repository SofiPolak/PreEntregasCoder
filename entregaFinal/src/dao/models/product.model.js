import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = "products"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100 },
    stock: { type: Number, required: true },
    available: { type: Boolean, required: true },
    category: { type: String, required: true, max: 100 },
    owner: { type: String, default: "admin" }
})

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema)

export default productModel