const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());
const events = [];

app.post("/events", async (req, res, next) => {
  try {
    const { type, data } = req.body;
    events.push(req.body);
    // send event to posts service
    await axios.post("http://posts-srv:4000/events", {
      type,
      data,
    });
    // send event to comments service
    await axios.post("http://comments-srv:4001/events", {
      type,
      data,
    });
    // send event to query service
    await axios.post("http://query-srv:4002/events", {
      type,
      data,
    });

    await axios.post("http://moderation-srv:4003/events", {
      type,
      data,
    });

    res.send({});
  } catch (error) {
    console.log(error);
    res.send({});
  }
});

app.get("/events", (req, res) => {
  console.log(events);
  res.send(events);
});

app.listen(4005, console.log(`Server is listening on port: 4005.`));
