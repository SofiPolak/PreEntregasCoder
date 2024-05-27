function addToCart() {
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', async (event) => {
            //const productId = button.getAttribute('data-product-id');
            //const cartId = document.getElementById('carritoId').value;
            const productId = "664e76aea1604d347baf79ed";
            const cartId = "664e76b4a1604d347baf79ef";
  
            try {
                const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

            } catch (error) {
                console.log(error);
            }
        });
    });
}


addToCart();