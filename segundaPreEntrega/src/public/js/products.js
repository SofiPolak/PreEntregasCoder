//import cartManager from "../../dao/db/cartManager.js";

/*const btnSend = document.getElementById('btn-send');

btnSend.addEventListener('click', () => {
    const productId = button.getAttribute('productId');
    const carritoId = document.getElementById('carritoId').value;

    cartManager.updateCart(carritoId, productId);
})
*/

function addToCart() {
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', async (event) => {
            const productId = button.getAttribute('data-product-id');
            const cartId = document.getElementById('carritoId').value;
  
            try {
                const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();

            } catch (error) {
                console.log(error);
            }
        });
    });
}
