import ProductManager from "../dao/db/productManager.js";
const productManager = new ProductManager();

async function getProducts(query) {
  return productManager.checkProducts(query);
}

async function getProduct(pid) {
  return productManager.getProductById(pid);
}

async function addProduct(title, description, price, thumbnail, code, stock, available, category, owner) {
  return productManager.addProduct(title, description, price, thumbnail, code, stock, available, category, owner);
}

async function updateProduct(pid, productToReplace) {
  return productManager.updateProduct(pid, productToReplace);
}

async function deleteProduct(pid, owner, role) {
  return productManager.deleteProduct(pid, owner, role);
}

export default { getProducts, getProduct, addProduct, updateProduct, deleteProduct };