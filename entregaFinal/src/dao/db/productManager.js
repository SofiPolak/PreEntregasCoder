import productModel from "../models/product.model.js";

class ProductManager {

    async addProduct(title, description, price, thumbnail, code, stock, available, category, owner) {
        try {
            let result = await productModel.create({ title, description, price, thumbnail, code, stock, available, category, owner })
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

            let { limit, page, sort } = query;

            if (!limit) {
                limit = 10;
            }
            if (!page) {
                page = 1;
            }

            let sortOptions = {};
            if (sort) {
                let order = parseInt(sort);
                sortOptions = { price: order };
            }

            let filterOptions = {};
            if (query.category) {
                filterOptions = { category: query.category };
            }

            if (query.available) {
                filterOptions = { available: query.available };
            }

            let products = await productModel.paginate(filterOptions, { limit: limit, page: page, sort: sortOptions });
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

    async deleteProduct(id, owner, role) {
        try {
            let result;
            if (role != "admin") {
                let product = await this.getProductById(id);
                if (product.owner != owner) {
                    result = { message: "No puede eliminar el producto si no es el owner" }
                    return result
                }
            }
            result = await productModel.deleteOne({ _id: id });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

}

export default ProductManager;