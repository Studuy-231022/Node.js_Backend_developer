const express = require("express");
const url = require("url");
const app = express();

const port = 8000;

const getUser = (req, res) => {
  const userInfo = url.parse(req.url, true).query;
  const userName = userInfo.name || "none";
  const userAge = userInfo.age || "none";
  res.end(`[user] name: ${userName}, age: ${userAge}`);
};

const getHello = (req, res) => {
  res.set({ "Content-Type": "text/html; charset=utf-8" });
  res.end(`<h1>Hello World! 안녕하세요!</h1>`);
};

const getNotFound = (req, res) => {
  res.statusCode = 404;
  res.end("404 page not found");
};

app.get("/user", getUser);
app.get("/hello", getHello);
app.get("*", getNotFound); // else 같은 개념

app.listen(port, () => {
  console.log(`START SERVER : user ${port}`);
});
