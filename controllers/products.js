const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product.ejs', {
        pageTitle: 'Add Product',
        path: '/add-product',
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop.ejs', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
};
