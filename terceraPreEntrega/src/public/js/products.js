import cartManager from "../../dao/db/cartManager.js";

const btnSend = document.getElementById('btn-send');

btnSend.addEventListener('click', () => {
    const productId = button.getAttribute('productId');
    const carritoId = document.getElementById('carritoId').value;

    cartManager.updateCart(carritoId, productId);
})
