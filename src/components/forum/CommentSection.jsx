import { useState } from "react";

function CommentSection({ comments, onAddComment }) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await onAddComment(comment);
      setComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="stack">
      {comments.length > 0 && (
        <div className="stack">
          {comments.map((item) => (
            <div key={item._id} className="card" style={{ padding: 12 }}>
              <p className="card-text">{item.text}</p>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <span className="chip">{item.author}</span>
                <span className="card-text">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <form className="row" onSubmit={handleSubmit}>
        <input
          className="input"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Add a supportive comment"
          disabled={isSubmitting}
          required
        />
        <button
          className="btn btn-secondary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Comment"}
        </button>
      </form>
    </div>
  );
}

export default CommentSection;
