const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render('shop/index.ejs', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
            });
        })
        .catch((err) => console.log('Error while fetching products ', err));
};

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render('shop/product-list.ejs', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
            });
        })
        .catch((err) => console.log('Error while fetching all products', err));
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    // Product.findAll({
    //     where: {
    //         id: productId,
    //     },
    // })
    //     .then((products) => {
    //         console.log('product: ', products);
    //         res.render('shop/product-detail', {
    //             product: products[0],
    //             pageTitle: products[0].title,
    //             path: '/products',
    //         });
    //     })
    //     .catch((err) => console.log(err));

    Product.findByPk(productId)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
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
