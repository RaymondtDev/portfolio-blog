import { useEffect, useState } from "react";
import { getBlogPosts } from "../api/blogapi";
import BlogPostCard from "./BlogPostCard";
import { Link } from "react-router-dom";
import Spinner from "./ux/Spinner";

function BlogPosts() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await getBlogPosts();
        setBlogPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Something went wrong:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) return <div className="full-width h-svh flex items-center justify-center -mt-[90px]"><Spinner /></div>;

  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {blogPosts?.slice(0,1).map(post => {
        if (post.tags.includes("featured")) {
          return <div className="col-span-full rounded-md h-[400px] bg-cover bg-no-repeat relative" style={{ backgroundImage: `url(/uploads/${post.cover})` }}>
            <div className="absolute left-0 bottom-0 w-full px-5 py-12 rounded-b-md bg-linear-to-t from-black/95 to-black/0">
              <h1 className="text-white text-4xl" style={{ marginBottom: "10px" }}>Featured</h1>
              <p className="text-white" style={{ marginBottom: "10px" }}>{post.title}</p>
              <Link to={`/blog/${post.slug}`} className="font-bold hover:text-[var(--text-color)] transition">
                <button className="text-white px-6 py-1.5 rounded-md bg-white/30 border-white border backdrop-blur-sm cursor-pointer hover:scale-105 hover:bg-white/50 transition">Read</button>
              </Link>
            </div>
          </div>
        }
      })}
      {blogPosts?.map((post) => (
        <BlogPostCard post={post} key={post._id} />
      ))}
    </div>
  );
}

export default BlogPosts;
