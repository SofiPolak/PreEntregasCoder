import productModel from "../models/product.model.js";

class ProductManager {

    async addProduct(title, description, price, thumbnail, code, stock, available, category) {
        try {
            let result = await productModel.create({ title, description, price, thumbnail, code, stock, available, category })
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(idBuscado) {

        try {
            let result = await productModel.findOne({ _id: idBuscado });
            return result;
        } catch (error) {
            console.log(error);
        }

    }

    async checkProducts(query) {
        try {

            let { limit1, page1, sort1 } = query;

            if (!limit1) {
                limit1 = 10;
            }
            if (!page1) {
                page1 = 1;
            }

            let sortOptions = {};
            if (sort1) {
                let order = parseInt(sort1);
                sortOptions = { price: order };
            }

            let filterOptions = {};
            if (query.category) {
                filterOptions = {category: query.category};
            }

            if (query.available) {
                filterOptions = {available: query.available};
            }

            let products = await productModel.paginate(filterOptions, { limit: limit1, page: page1, sort: sortOptions });
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