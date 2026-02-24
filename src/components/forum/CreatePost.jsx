import { useState } from "react";

function CreatePost({ onCreatePost }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await onCreatePost(form);
      setForm({ title: "", content: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="card">
      <h3 className="card-title">Start a Discussion</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          Title
          <input
            className="input"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Write a concise title"
            required
          />
        </label>

        <label className="form-label">
          Message
          <textarea
            className="textarea"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Share your experience or question"
            required
          />
        </label>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </article>
  );
}

export default CreatePost;
