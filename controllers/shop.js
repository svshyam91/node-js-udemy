const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index.ejs', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list.ejs', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findProductById(productId, (product) => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products',
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        console.log('cart', cart);
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
    const prodId = req.body.productId;
    Product.findProductById(prodId, (product) => {
        Cart.addToCart(prodId, product.price);
    });
    console.log('prod Id: ', prodId);
    res.redirect('/cart');
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
