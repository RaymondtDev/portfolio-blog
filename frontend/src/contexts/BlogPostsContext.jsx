import { useContext, createContext, useState, useEffect } from "react";
import { getBlogPosts } from "../api/blogapi";

const BlogPostsContext = createContext();

export const BlogPostsProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [tag, setTag] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogPosts = async () => {
    try {
      const response = await getBlogPosts();
      setBlogPosts(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlogPostsContext.Provider
      value={{
        blogPosts,
        loading,
        error,
        tag,
        setTag,
        fetchBlogPosts,
      }}
    >
      {children}
    </BlogPostsContext.Provider>
  );
};

export const useBlogPosts = () => {
  return useContext(BlogPostsContext);
};
