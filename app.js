const path = require('path');

const express = require('express');

const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/User');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {
    contraints: true,
    onDelete: 'CASCADE',
});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
    .sync()
    .then((result) => {
        return User.findByPk(1);
        // app.listen(3000);
    })
    .then((user) => {
        if (!user) {
            return User.create({ name: 'Shyam', email: 'svshyam97@gmail.com' });
        }
        return user;
    })
    .then((user) => {
        return user.createCart();
    })
    .then((cart) => {
        app.listen(3000);
    })
    .catch((err) => console.log('Error while creating tables', err));
