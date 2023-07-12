import PostCreate from "./Componants/PostCreate";
import PostList from "./Componants/PostList";

export default function App() {
  return (
    <div className="container">
      <h1>Blog App !!!!!!!!!!!!!!!!!!!!!!</h1>
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
}
