const http = require("http");
const url = require("url");

const getUser = (req, res) => {
  const userInfo = url.parse(req.url, true).query;
  const userName = userInfo.name || "none";
  const userAge = userInfo.age || "none";
  res.end(`[user] name: ${userName}, age: ${userAge}`);
};

const getHello = (req, res) => {
  res.end(`<h1>Hello World! 안녕하세요!</h1>`);
};

const getNotFound = (req, res) => {
  res.statusCode = 404;
  res.end("404 page not found");
};

const urlMap = {
  "/user": getUser,
  "/hello": getHello,
};

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, false).pathname;
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (path in urlMap) {
    urlMap[path](req, res);
  } else {
    getNotFound(req, res);
  }
});

server.listen(8000, () => {
  console.log("server is running");
});
