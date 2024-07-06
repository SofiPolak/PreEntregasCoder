function addToCart() {
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', async (event) => {
            //const productId = button.getAttribute('data-product-id');
            //const cartId = document.getElementById('carritoId').value;
            const productId = "664e767da1604d347baf79d3";
            const cartId = "666dd083aaa002dd8d72040c";
            console.log("estoy en el addToCart, metodo llamado por handlebar")

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
