export default function CommentList({ comments }) {
  const renderedComments = comments.map((comment) => {
    let content = comment.content;
    if (comment.status === "pending") {
      content = "Comment is pending.";
    }

    if (comment.status === "rejected") {
      content = "Comment is rejected.";
    }
    return <li key={comment.id}>{content}</li>;
  });

  return (
    <>
      <div className="container">
        <p>{comments.length} comments.</p>
        <ul>{renderedComments}</ul>
      </div>
    </>
  );
}
