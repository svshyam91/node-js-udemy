const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product.ejs', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageURL, price, description);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    console.log('productId: ', productId);
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    Product.findProductById(productId, (product) => {
        if (!product) {
            res.redirect('/');
        }
        res.render('admin/edit-product.ejs', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
        });
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products.ejs', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    });
};
