const db = require('../util/database');

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        if (this.id) {
            // Editing product
            console.log('Editing product');

            return db.execute(
                'UPDATE products SET title=?, price=?, description=?, imageUrl=? WHERE id=?',
                [
                    this.title,
                    this.price,
                    this.description,
                    this.imageUrl,
                    this.id,
                ]
            );
        } else {
            // Creating product
            console.log('Adding product');

            this.id = Math.random().toString();
            return db.execute(
                'INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
                [this.title, this.price, this.description, this.imageUrl]
            );
        }
    }

    delete() {
        return db.execute('DELETE FROM products WHERE id=?', [this.id]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static findProductById(id) {
        return db.execute('SELECT * FROM products WHERE id = ?', [id]);
    }
};
