const express = require("express");
const app = express();
let posts = [];

// req.body 사용을 위해
app.use(express.json());

app.get("/posts", (req, res) => {
  res.json({ data: posts, status: 200 });
});

app.post("/posts", (req, res) => {
  const requiredFieldList = ["title", "name", "text"];

  const neededFieldList = requiredFieldList.filter((field) => {
    if (field in req.body) {
      return false;
    } else {
      return true;
    }
  });

  if (neededFieldList.length > 0) {
    const message = `${neededFieldList.join(",")} 필드가 필요합니다.`;
    res.json({ message: message, status: 400 });
    return;
  } else {
    const { title, name, text } = req.body;
    posts.push({
      id: posts.length + 1,
      title,
      name,
      text,
      createdDt: Date(),
    });
    res.json({
      data: { title, name, text },
      status: 201,
    });
  }
});

app.delete("/posts/:id", (req, res) => {
  const deletedId = req.params.id;

  const filteredPosts = posts.filter(
    (post) => String(post.id) !== String(deletedId)
  );

  const isLengthChanged = filteredPosts.length !== posts.length;
  if (isLengthChanged) {
    posts = filteredPosts;
    res.json({ data: null, status: 202 });
    return;
  } else {
    res.json({ data: null, status: 204 });
  }
});

app.listen(8000, () => {
  console.log("welcome posts STARTS!");
});
