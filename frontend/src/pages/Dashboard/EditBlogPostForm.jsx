import { useEffect, useState } from "react";
import { updatePost, getPostBySlug } from "../../api/blogapi";
import Blogeditor from "./BlogEditor";
import CoverImageUploader from "./CoverImageUploader";
import SubmitButton from "../../components/ux/SubmitButton";
import { RxCross1 } from "react-icons/rx";
import { useParams } from "react-router-dom";

function EditBlogPostForm() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostBySlug(slug);
        console.log("Successfully fetched post data:",response.data);
        setPost(response.data);
      } catch (error) {
        console.log("Couldn't fetch post data:", error)
      }
    }

    fetchPost();
  }, [slug]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setTags(post.tags || []);
      setCover(post.cover || null);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    tags.forEach(tag => formData.append("tags[]", tag));
    if (cover && cover instanceof File) {
      formData.append("cover", cover);
    }

    try {
      const response = await updatePost(post._id, formData); // <-- use updatePost
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CoverImageUploader cover={cover} setCover={setCover} />

        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2 border"
        />
        <br />
        
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map((tag, index) => (
          <p 
            onClick={() => setTags(state => state.filter(item => item !== tag))}
            className="py-1 px-4 rounded-full border w-fit capitalize cursor-pointer flex items-center gap-1 hover:scale-105 transition"
            key={index}
          >{tag}<RxCross1 className="h-3 aspect-square"/></p>
          ))}
        </div>

        {["latest", "featured"].map((tag, index) => (
          <button
            className="py-1 px-1.5 bg-[var(--primary-color)] text-white rounded-sm mr-2 capitalize cursor-pointer hover:scale-105 transition"
            onClick={(e) => {
              e.preventDefault();
              setTags(state => state.includes(tag) ? state : [...state, tag]);
            }}
            key={index}>{tag}</button>
        ))}
        <br />

        <label htmlFor="content">Content:</label>
        <br />

        <Blogeditor onChange={setContent} value={content}/>

        <SubmitButton className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-md w-fit self-start">
          Publish
        </SubmitButton>
      </form>
    </>
  );
}

export default EditBlogPostForm;
