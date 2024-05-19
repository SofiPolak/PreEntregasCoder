import productModel from "../models/product.model.js";

class ProductManager {

    async addProduct(title, description, price, thumbnail, code, stock, category) {
        try {
            let result = await productModel.create({ title, description, price, thumbnail, code, stock, category })
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(idBuscado) {

        try {
            let result = await productModel.findOne({_id: idBuscado});
            return result;
        } catch (error) {
            console.log(error);
        }

    }

    async checkProducts(limit1, page1, sort1, query) {
        try {
            if (!limit1) {
                limit1 = 10;
            }
            if (!page1) {
                page1 = 1;
            }
            
            if(sort1){
                let order = parseInt(sort1);
                let products = await productModel.paginate({}, { limit: limit1, page: page1, sort: {price:order} });
                return products;
            }
            
            let products = await productModel.paginate({}, { limit: limit1, page: page1 });
            return products;
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, productUpdate) {
        try {
            let result = await productModel.updateOne({ _id: id }, productUpdate);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            let result = await productModel.deleteOne({ _id: id });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

}

export default ProductManager;