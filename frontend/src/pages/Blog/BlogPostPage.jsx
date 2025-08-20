import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostBySlug } from "../../api/blogapi";
import { TiUser } from "react-icons/ti";
import Spinner from "../../components/ux/Spinner";
import ParallaxHero from "../../components/ParallaxHero";

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPostBySlug(slug);
      setPost(response.data)
    }

    fetchPost();
  }, [slug]);

  if (!post) return <div className="full-width h-screen flex items-center justify-center"><Spinner /></div>

  return (
    <div className="full-width grid-layout">
      <ParallaxHero image={`${post.cover.url}`} classname="overlay">
        <div className="absolute bottom-0 left-0 pb-28 text-white">
          <div className="mb-3">
            <h1 className="text-white">{post.title}</h1>
            <small>Updated at: {new Date(post.updatedAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</small>
          </div>
          <p className="flex items-center">
            <TiUser />
            {post.author.username}
          </p>
        </div>
      </ParallaxHero>
      <div dangerouslySetInnerHTML={{ __html: post.content }} className="full-width-content post-content py-3">
      </div>
    </div>
  );
}

export default BlogPost;