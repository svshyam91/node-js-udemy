const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    const url = req.url;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My first Page</title><head>');
        res.write(
            '<body><form method="POST" action="/message"><input type="text" name="message"><button type="submit">Submit</button></form></body>'
        );
        res.write('</html>');
        return res.end();
    }
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body>Hello World</body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);
