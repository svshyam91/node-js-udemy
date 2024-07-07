const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My first Page</title><head>');
        res.write(
            '<body><form method="POST" action="/message"><input type="text" name="message"><button type="submit">Submit</button></form></body>'
        );
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'DUMMY');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body>Hello World</body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);
