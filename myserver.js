const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log("Request for:", req.url); 

  let filePath = '';
  let contentType = 'text/html';


  if (req.url === '/' || req.url === '/index.html') {
    filePath = 'index.html';
  } else if (req.url === '/about') {
    filePath = 'about.html';
  } else if (req.url === '/contact') {
    filePath = 'contact.html';
  } else if (req.url === '/style.css') {
    filePath = 'style.css';
    contentType = 'text/css';
  } else {
    filePath = null;
  }

  if (filePath) {
    fs.readFile(path.join(__dirname, filePath), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Server error");
      } else {
        res.setHeader('Content-Type', contentType);
        res.statusCode = 200;
        res.end(data);
      }
    });
  } else {
   
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end("<h1>404 Page Not Found</h1>");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
