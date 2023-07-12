const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const comments = {};
app.get("/posts/:id/comments", (req, res, next) => {
  const { id: postId } = req.params;
  res.status(200).send(comments[postId] || []);
});

app.post("/posts/:id/comments", (req, res, next) => {
  try {
    const { content } = req.body;
    const { id: postId } = req.params;
    const id = randomBytes(4).toString("hex");
    comments[postId] = comments[postId] || [];
    comments[postId].push({
      id,
      content,
      status: "pending",
    });
    // send an event CommentCreated to event-bus service
    axios.post(`http://event-bus-srv:4005/events`, {
      type: "CommentCreated",
      data: {
        id,
        content,
        status: "pending",
        postId,
      },
    });
    res.status(201).send(comments[postId]);
  } catch (error) {
    console.log(error);
  }
});

app.post("/events", (req, res, next) => {
  try {
    const { type, data } = req.body;
    console.log(`Received an event: ${type}`);

    if (type === "CommentModerated") {
      const { id, postId } = data;
      const commentId = comments[postId].findIndex(
        (comment) => comment.id === id
      );
      if (commentId >= 0) {
        comments[postId][commentId] = data;
        axios.post("http://event-bus-srv:4005/events", {
          type: "CommentUpdated",
          data,
        });
      }
    }
    res.send({});
  } catch (error) {
    console.log(error);
  }
});

app.listen(4001, () => console.log(`Server is listening on port: 4001`));
