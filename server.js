const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Normalize URL path
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // Strip query parameters or hash from filepath if any
  filePath = filePath.split('?')[0].split('#')[0];
  
  const absolutePath = path.join(__dirname, filePath);
  const ext = path.extname(absolutePath).toLowerCase();
  
  // Check if file is within directory to prevent path traversal
  if (!absolutePath.startsWith(__dirname)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  fs.readFile(absolutePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        res.statusCode = 500;
        res.end(`Internal Server Error: ${err.code}`);
      }
      return;
    }

    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`  CollabNet Prototype Server Running Successfully!`);
  console.log(`  Local URL: http://localhost:${PORT}`);
  console.log(`  Press Ctrl+C to terminate server.`);
  console.log(`==================================================\n`);
});
