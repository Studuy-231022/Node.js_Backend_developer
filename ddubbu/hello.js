const http = require("http");

let count = 0;

const server = http.createServer((req, res) => {
  console.log(count++);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.write("hello\n");
  res.end("node.js\n");
});

server.listen(8000, () => {
  console.log("server is running");
});
