import { useState } from "react";
import config from "../config";
import axios from "axios";

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (content.trim().length === 0) {
      alert("Please enter the content first.");
      return;
    }

    axios
      .post(`${config.API}/posts/${postId}/comments/`, {
        content,
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>New Comment</label>
        </div>
        <div>
          <input
            id="content"
            type="text"
            placeholder="Enter content."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              fontSize: "20px",
              padding: "10px",
              margin: "5px",
            }}
          />
        </div>
        <div>
          <button className="btn btn-outline-success" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
