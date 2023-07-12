const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }
  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    posts[postId].comments.push({ id, content });
  }

  if (type === "CommentUpdated") {
    const { id, postId } = data;
    const commentId = posts[postId].comments.findIndex(
      (comment) => comment.id === id
    );
    if (commentId >= 0) {
      posts[postId].comments[commentId] = data;
    }
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log(`Received an event: ${type}`);
  handleEvent(type, data);
  res.send({});
});

app.listen(4002, () => {
  console.log(`Server is listening on port: 4002`);
  axios.get("http://event-bus-srv:4005/events").then((res) => {
    for (let event of res.data) {
      console.log(`Processing event: ${event.type}`);
      handleEvent(event.type, event.data);
    }
  });
});
