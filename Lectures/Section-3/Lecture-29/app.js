const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body>Hello World</body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);
