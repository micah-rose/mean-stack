const http = require('http');

const server = http.createServer((req, res) => {
    res.end('My first response.');
});

server.listen(process.env.PORT || 3000);