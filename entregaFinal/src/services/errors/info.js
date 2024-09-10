export const generateProductErrorInfo = (product) => {
    return `Hay un problema con el producto.
    Propiedades requeridas:
    title: necesita ser un string y se recibio ${product.title}, 
    description: necesita ser un string y se recibio ${product.description}, 
    price: necesita ser un float y se recibio ${product.price}, 
    thumbnail: necesita ser un string y se recibio ${product.thumbnail}, 
    code: necesita ser un id y se recibio ${product.code}, 
    stock: necesita ser un entero y se recibio ${product.stock}, 
    available: necesita ser un boolean y se recibio ${product.available}, 
    category: necesita ser un string y se recibio ${product.category}`
}

export const addProductCartErrorInfo = (quantity) => {
    return `Hay un problema con el producto para agregar al carrito.
    La cantidad necesita ser mayor a cero y se recibio ${quantity}`
}