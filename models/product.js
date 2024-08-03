const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'data', 'products.json');

const getProductsFromFile = (callback) => {
    fs.readFile(p, (err, fileData) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileData));
        }
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductsFromFile((products) => {
            if (this.id) {
                // Editing product

                console.log('Editing product');
                const existingProductIndex = products.findIndex(
                    (prod) => prod.id === this.id
                );
                if (existingProductIndex === -1) {
                    return;
                }
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                // Creating product

                console.log('Adding product');
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    delete() {
        getProductsFromFile((products) => {
            const updatedProducts = products.filter(
                (prod) => prod.id !== this.id
            );
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (!err) {
                    // add logic to delete item from cart
                }
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static findProductById(id, callback) {
        getProductsFromFile((products) => {
            const product = products.find((product) => product.id === id);
            callback(product);
        });
    }
};
