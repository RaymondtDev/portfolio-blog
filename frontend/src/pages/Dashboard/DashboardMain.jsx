import { useState } from "react";
import BlogPostForm from "./BlogPostForm";
import { useAuth } from "../../contexts/AuthContext";
import BlogPosts from "../../components/BlogPosts";

function DashboardMain() {
  const [active, setActive] = useState();
  const { user } = useAuth();

  return (
    <>
      <div className="p-2">
        <h1 >Welcome, {user.username}</h1>
        <button onClick={() => setActive(!active)} className="px-2.5 py-1.5 rounded-sm hover:scale-105 transition bg-[var(--primary-color)] text-white mt-2 cursor-pointer">{active ? "Posts" : "Create Post"}</button>
      </div>
      <div className="px-2 py-1.5">
        {active ? <BlogPostForm /> : <BlogPosts />}
      </div>
    </>
  );
}

export default DashboardMain;