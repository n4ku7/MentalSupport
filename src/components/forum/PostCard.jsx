import CommentSection from "./CommentSection";

function PostCard({ post, onAddComment }) {
  return (
    <article className="card stack">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3 className="card-title">{post.title}</h3>
        <span className="chip">{post.author}</span>
      </div>

      <p className="card-text">{post.content}</p>

      <p className="card-text">
        Posted on {new Date(post.createdAt).toLocaleString()}
      </p>

      <CommentSection
        comments={post.comments}
        onAddComment={(commentText) => onAddComment(post._id, commentText)}
      />
    </article>
  );
}

export default PostCard;
