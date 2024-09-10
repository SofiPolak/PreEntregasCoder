import CartManager from "../dao/db/cartManager.js";
const cartManager = new CartManager();

async function getCarts() {
  return cartManager.checkCarts();
}

async function getCart(cid) {
  return cartManager.getCartById(cid);
}

async function addCart() {
  return cartManager.addCart();
}

async function updateCart(cid, pid, role, owner) {
  return cartManager.updateCart(cid, pid, role, owner);
}

async function deleteProductCart(cid, pid) {
  return cartManager.deleteProductCart(cid, pid);
}

async function updateQuantityProduct(cid, pid, prodQuantity) {
  return cartManager.updateQuantityProduct(cid, pid, prodQuantity);
}

async function deleteProductsCart(cid) {
  return cartManager.deleteProductsCart(cid);
}

async function finishPurchase(cid) {
  return cartManager.finishPurchase(cid);
}

export default { getCarts, getCart, addCart, updateCart, deleteProductCart, updateQuantityProduct, deleteProductsCart, finishPurchase };