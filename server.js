const http = require('http'),
  fs = require('fs'),
  url = require('url');

http.createServer((request, response) => {
  let addr = request.url,
    q = new URL(addr, 'http://' + request.headers.host),
    filePath = '';

  const logMessage = 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n';

  fs.appendFile('log.txt', logMessage, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
    console.log(logMessage);
  });

  if (q.pathname.includes('documentation')) {
    filePath = __dirname + '/documentation.html';
  } else if (q.pathname.includes('css')) {
    filePath = __dirname + q.pathname;
  } else if (q.pathname.includes('img')) {
      filePath = __dirname + q.pathname;
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(404);
      response.end('File not found');
      console.log(err);
      return;
    }

    let contentType = 'text/html';
    if (filePath.endsWith('.css')) {
      contentType = 'text/css';
    } else if (filePath.endsWith('.svg')) {
      contentType = 'image/svg+xml';
    } else if (filePath.endsWith('.png')) {
      contentType = 'image/png';
    }

    response.writeHead(200, { 'Content-Type': contentType });
    response.write(data);
    response.end();
  });
}).listen(8080);

console.log('My test server is running on Port 8080.');