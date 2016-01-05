const http = require("http");
const nconf = require("nconf");
// environment and options
nconf.env().argv();
// create server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "ContentType": "text/html" });
  res.end(JSON.stringify(nconf.get(), null, 2));
});
// bind server
server.listen(process.env.PORT || 3000);