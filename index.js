//expressjs is used

const express = require('express');

const routes = require('./routes/index');

const app = express();

app.use('/', routes);

// app.get('/home', (req, res) => {
//   console.log('req', req);
//   res.end('its express');
// });

app.listen(8000, (err) => {
  if (err) {
    console.log('server is not running', err);
    return;
  }
  console.log('server is running');
});

/* The below code is for server creation and request listen and response
This will work with node alone without any package
but expressjs is used in the above code for easy usage and directory and framework structure

var http = require("http");

let server = http.createServer(function (req, res) {
  console.log(req);
  if (req.url.includes("home")) {
    return res.end("<p>HI Home</p>");
  }
  return res.end("hello world");
});

server.listen(8000, () => {
  console.log("server is running");
});

*/
