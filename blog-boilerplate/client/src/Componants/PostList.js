import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get(`${config.API}/posts`);
    console.log(res.data);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        key={post.id}
        className="card"
        style={{ width: "30%", padding: "10px", margin: "10px" }}
      >
        <h3>{post.title}</h3>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    );
  });

  return (
    <>
      <h2>Posts</h2>

      <div className="d-flex flex-wrap justify-content">{renderedPosts}</div>
    </>
  );
}
