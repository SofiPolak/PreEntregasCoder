import ProductManager from "../dao/db/productManager.js";
const productManager = new ProductManager();

async function getProducts(query) {
    return productManager.checkProducts(query);
  }

async function getProduct(pid) {
    return productManager.getProductById(pid);
  }

async function addProduct(title, description, price, thumbnail, code, stock, available, category) {
    return productManager.addProduct(title, description, price, thumbnail, code, stock, available, category);
  }

async function updateProduct(pid,productToReplace) {
    return productManager.updateProduct(pid,productToReplace);
  }

async function deleteProduct(pid) {
    return productManager.deleteProduct(pid);
  }

export default {getProducts, getProduct, addProduct, updateProduct, deleteProduct};