const express = require('express');

const http = require('http');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/add-product', (req, res, next) => {
    res.send(
        '<form action="/product" method="POST"><input type="text" name="title" /><button type="submit">Submit</button></form>'
    );
});

app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Express!</h1>');
});

const server = http.createServer(app);
server.listen(3000);
