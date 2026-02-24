import { FORUM_STORAGE_KEY } from "../utils/constants";

const getStoredPosts = () => {
  const rawData = localStorage.getItem(FORUM_STORAGE_KEY);
  return rawData ? JSON.parse(rawData) : [];
};

const setStoredPosts = (posts) => {
  localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(posts));
};

export const fetchPosts = async () => {
  return getStoredPosts();
};

export const createPost = async ({ title, content, author }) => {
  const posts = getStoredPosts();

  const newPost = {
    _id: crypto.randomUUID(),
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
    comments: [],
  };

  const updatedPosts = [newPost, ...posts];
  setStoredPosts(updatedPosts);
  return newPost;
};

export const addComment = async ({ postId, comment, author }) => {
  const posts = getStoredPosts();
  const updatedPosts = posts.map((post) => {
    if (post._id !== postId) {
      return post;
    }

    return {
      ...post,
      comments: [
        ...post.comments,
        {
          _id: crypto.randomUUID(),
          text: comment,
          author,
          createdAt: new Date().toISOString(),
        },
      ],
    };
  });

  setStoredPosts(updatedPosts);
  return updatedPosts;
};
