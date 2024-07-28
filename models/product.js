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
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
};
