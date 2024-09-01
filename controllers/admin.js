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
    const imageURL = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    Product.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageURL,
    })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    Product.findProductById(productId)
        .then(([rows]) => {
            const product = rows[0];
            if (!product) {
                res.redirect('/');
            }
            res.render('admin/edit-product.ejs', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
            });
        })
        .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const id = req.body.productId;
    const product = new Product(id, title, imageUrl, price, description);
    product
        .save()
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.productId;
    const product = new Product(id, null, null, null, null);
    product
        .delete()
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows]) => {
            res.render('admin/products.ejs', {
                prods: rows,
                pageTitle: 'Admin Products',
                path: '/admin/products',
            });
        })
        .catch((err) => console.log(err));
};
