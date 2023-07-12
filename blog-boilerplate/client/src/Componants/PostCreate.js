import { useState } from "react";
import config from "../config";
import axios from "axios";

export default function PostCreate() {
  const [title, setTitle] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim().length === 0) {
      alert("Please enter the title first.");
      return;
    }

    axios
      .post(`${config.API}/posts/create`, {
        title,
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <div>
      <h2>Create A Post</h2>
      <form onSubmit={submitHandler}>
        <div>
          <input
            className="form-control"
            type="text"
            placeholder="Enter title."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              fontSize: "20px",
              padding: "10px",
              margin: "5px",
            }}
          />
        </div>
        <div>
          <button className="btn btn-success" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
