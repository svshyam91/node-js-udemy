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
    req.user
        .getCart()
        .then((cart) => {
            cart.getProducts()
                .then((cartProducts) => {
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Cart',
                        cartProducts: cartProducts,
                    });
                })
                .catch((error) => console.log(error));
        })
        .then((error) => console.log(error));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then((products) => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(prodId);
        })
        .then((product) => {
            return fetchedCart.addProduct(product, {
                through: {
                    quantity: newQuantity,
                },
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch((err) => console.log(err));
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
