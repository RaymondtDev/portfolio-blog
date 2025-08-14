import { MdDelete } from "react-icons/md";
import { deletePost } from "../api/blogapi";
import { useAuth } from "../contexts/AuthContext";
import { TiUser } from "react-icons/ti";
import { Link } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";

function BlogPostCard({ children, post }) {
  const { user } = useAuth();

  return (
    <div className="shadow-md relative rounded-md grid grid-rows-[150px_1fr_1fr] sm:grid-rows-[200px_1fr_1fr]">
      <figure className="mt-0 mb-0">
        <img
          src={`/uploads/${post.cover}`}
          alt="cover-image"
          className="object-cover rounded-t-md"
        />
      </figure>
      <div className="py-2 px-1 row-span-2 grid grid-rows-subgrid">
        <p>
          <Link to={`/blog/${post.slug}`} className="font-bold hover:text-[var(--text-color)] transition">{post.title}</Link>
        </p>
        <small className="flex items-center">
          <TiUser />
          {post.author.username}
        </small>
        {user && (
          <>
          <button
            onClick={async (e) => {
              e.preventDefault();
              await deletePost(post._id);
            }}
            className="text-2xl text-white shadow-2xl shadow-black absolute top-0 right-0 m-2 hover:scale-110 transition cursor-pointer"
          >
            <MdDelete />
          </button>
          <Link to={`/dashboard/${post.slug}/edit-post`} className="text-2xl text-white shadow-2xl shadow-black absolute top-0 left-0 m-2 hover:scale-110 transition cursor-pointer">
            <RiEdit2Fill />
          </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default BlogPostCard;
