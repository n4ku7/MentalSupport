import { useContext, useEffect, useState } from "react";
import CreatePost from "../../components/forum/CreatePost";
import PostCard from "../../components/forum/PostCard";
import {
  addComment,
  createPost,
  fetchPosts,
} from "../../services/forumService";
import { AuthContext } from "../../context/AuthContextObject";
import { ToastContext } from "../../context/ToastContextObject";

function Forum() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const loadPosts = async () => {
    const data = await fetchPosts();
    setPosts(data);
  };

  useEffect(() => {
    let ignore = false;

    fetchPosts()
      .then((data) => {
        if (!ignore) {
          setPosts(data);
        }
      })
      .catch(() => {
        if (!ignore) {
          showToast("Failed to load forum posts", "error");
        }
      });

    return () => {
      ignore = true;
    };
  }, [showToast]);

  const handleCreatePost = async ({ title, content }) => {
    try {
      await createPost({
        title,
        content,
        author: user?.name || "Anonymous",
      });
      await loadPosts();
      showToast("Post published", "success");
    } catch {
      showToast("Failed to publish post", "error");
    }
  };

  const handleAddComment = async (postId, comment) => {
    try {
      const updatedPosts = await addComment({
        postId,
        comment,
        author: user?.name || "Anonymous",
      });

      setPosts(updatedPosts);
      showToast("Comment posted", "success");
    } catch {
      showToast("Failed to post comment", "error");
    }
  };

  return (
    <section className="stack">
      <header className="page-header">
        <h1 className="page-title">Community Forum</h1>
        <p className="page-subtitle">
          A safe discussion space for support, reflection, and shared growth.
        </p>
      </header>

      <CreatePost onCreatePost={handleCreatePost} />

      <div className="stack">
        {posts.length === 0 ? (
          <article className="card">
            <p className="card-text">
              No posts yet. Be the first to start one.
            </p>
          </article>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onAddComment={handleAddComment}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Forum;
