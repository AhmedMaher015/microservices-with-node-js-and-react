const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};
app.get("/posts", (req, res, next) => {
  res.status(200).send(posts);
});

app.post("/posts/create", (req, res, next) => {
  const { title } = req.body;
  const id = randomBytes(4).toString("hex");
  posts[id] = {
    id,
    title,
  };
  // send an event PostCreated to event-bus service
  axios
    .post(`http://event-bus-srv:4005/events`, {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res, next) => {
  const { type, data } = req.body;
  console.log(`Received an event: ${type}`);
  res.send({});
});

app.listen(4000, () => {
  console.log("V1.0.2");
  console.log(`Server is listening on port: 4000`);
});
