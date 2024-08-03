const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'data', 'cart.json');

const getCartFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        let cart = { products: [], totalPrice: 0 };
        if (!err) {
            try {
                cart = JSON.parse(fileContent);
                callback(cart);
            } catch (error) {
                callback(cart);
            }
        } else {
            callback(cart);
        }
    });
};

module.exports = class Cart {
    static addToCart(id, price) {
        getCartFromFile((cart) => {
            const existingProductIndex = cart.products.findIndex(
                (product) => product.id === id
            );
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +price;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if (err) {
                    console.log('Error in writing file ', err);
                }
            });
        });
    }

    static deleteProduct(id, productPrice) {
        getCartFromFile((cart) => {
            const updatedCart = { ...cart };
            const product = updatedCart.products.find(
                (product) => product.id === id
            );
            if (product) {
                const productQty = product.qty;
                updatedCart.totalPrice =
                    updatedCart.totalPrice - productPrice * productQty;
                updatedCart.products = updatedCart.products.filter(
                    (prod) => prod.id !== id
                );
                fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                    if (err) {
                        console.log('Error in writing file');
                    }
                });
            }
        });
    }

    static getCart(callback) {
        getCartFromFile((cart) => {
            callback(cart);
        });
    }
};
