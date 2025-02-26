const http = require('http');
const fs = require('fs');

function log(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync('log.txt', `[${timestamp}] ${message}\n`);
  console.log(message); 
}

http.createServer((request, response) => {
  log(`GET ${request.url} HTTP/1.1 from ${request.socket.remoteAddress}`);
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello Node!\n');
  log(`200 OK - Content Length: 12`);
}).listen(8080);

log('Server started on port 8080');