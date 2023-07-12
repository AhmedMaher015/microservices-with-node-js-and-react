const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log(`Received an event: ${type}`);

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    const status = !content.includes("orange") ? "approved" : "rejected";
    // send an event CommentModerated to event bus service
    axios
      .post(`http://event-bus-srv:4005/events`, {
        type: "CommentModerated",
        data: {
          id,
          content,
          postId,
          status,
        },
      })
      .catch((err) => console.log(err));
  }

  res.send({});
});

app.listen(4003, () => console.log(`Server is listening on port: 4003`));
