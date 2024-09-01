const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index.ejs', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/',
            });
        })
        .catch((err) => {
            console.log('Error while fetching products ', err);
        });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list.ejs', {
                prods: rows,
                pageTitle: 'All Products',
                path: '/products',
            });
        })
        .catch((err) => {
            console.log('Error while fetching all products', err);
        });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findProductById(productId)
        .then(([rows]) => {
            res.render('shop/product-detail', {
                product: rows[0],
                pageTitle: rows[0].title,
                path: '/products',
            });
        })
        .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
    // Fix this method
    Cart.getCart((cart) => {
        Product.fetchAll((products) => {
            const cartProducts = [];
            cart.products.forEach((cartProduct) => {
                const product = products.find(
                    (prod) => prod.id === cartProduct.id
                );
                cartProducts.push({
                    productData: product,
                    qty: cartProduct.qty,
                });
            });
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Cart',
                cartProducts: cartProducts,
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    // Fix this method
    const prodId = req.body.productId;
    Product.findProductById(prodId, (product) => {
        Cart.addToCart(prodId, product.price);
    });
    console.log('prod Id: ', prodId);
    res.redirect('/cart');
};

exports.deleteCartItem = (req, res, next) => {
    // Fix this method
    const prodId = req.body.productId;
    Product.findProductById(prodId, (product) => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Orders',
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
    });
};
