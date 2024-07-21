const path = require('path');

const express = require('express');

const rootDir = require('./util/path');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404.pug', { pageTitle: '404' });
});

app.listen(3000);
