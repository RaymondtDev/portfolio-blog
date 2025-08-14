import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useEffect, useRef, useState } from "react";
import { uploadImage } from "../../api/blogapi";
import { FaBold, FaItalic, FaParagraph, FaStrikethrough } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { RiCodeBlock, RiH1, RiH2, RiH3, RiH4 } from "react-icons/ri";
import { MdFormatListBulleted } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { TbBlockquote } from "react-icons/tb";
import Spinner from "../../components/ux/Spinner";

function Blogeditor({ onChange, value }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editorTick, setEditorTick] = useState(0);
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: value || "", // <-- use prop
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        spellcheck: "true",
      },
    },
  });

  // Listen for selection and transaction updates only after mount
  useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => setEditorTick((tick) => tick + 1);
    const handleTransaction = () => setEditorTick((tick) => tick + 1);

    editor.on("selectionUpdate", handleSelectionUpdate);
    editor.on("transaction", handleTransaction);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
      editor.off("transaction", handleTransaction);
    };
  }, [editor]);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !editor) return;

    const previeURL = URL.createObjectURL(file);
    setPreview(previeURL);
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await uploadImage(formData);
      const imageURL = response.data.url;

      editor.chain().focus().setImage({ src: imageURL }).run();
    } catch (error) {
      console.error("Image upload fail:", error);
      alert("Upload failed");
    } finally {
      setLoading(false);
      setPreview(null);
    }
  };

  const triggerUpload = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <div className="rounded-md border">
      <div>
        <div className="flex flex-wrap gap-2 border-b p-2 bg-gray-100 rounded-t-md">
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBold().run();
            }}
            className={`${
              editor.isActive("bold") ? "text-[var(--btn-color)]" : ""
            } cursor-pointer px-1.5 hover:scale-110 transition`}
          >
            <FaBold />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleItalic().run();
            }}
            className={`${
              editor.isActive("italic") ? "text-[var(--btn-color)]" : ""
            } cursor-pointer px-1.5 hover:scale-110 transition`}
          >
            <FaItalic />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleStrike().run();
            }}
            className={`${
              editor.isActive("strike")
                ? "line-through text-[var(--btn-color)]"
                : ""
            } cursor-pointer px-1.5 hover:scale-110 transition`}
          >
            <FaStrikethrough />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBulletList().run();
            }}
            className={`${
              editor.isActive("bulletList")
                ? "line-through text-[var(--btn-color)]"
                : ""
            } cursor-pointer px-1.5 hover:scale-110 transition`}
          >
            <MdFormatListBulleted />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleOrderedList().run();
            }}
            className={`${
              editor.isActive("orderedList")
                ? "line-through text-[var(--btn-color)]"
                : ""
            } cursor-pointer px-1.5 hover:scale-110 transition`}
          >
            <GoListOrdered />
          </button>

          <div className="flex flex-wrap gap-2 bg-gray-300 p-2 rounded-sm">
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().setParagraph().run();
              }}
              className={`${
                editor.isActive("paragraph")
                  ? "underline text-[var(--btn-color)]"
                  : ""
              } cursor-pointer px-1.5 hover:scale-110 transition`}
            >
              <FaParagraph />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              }}
              className={`${
                editor.isActive("heading", { level: 1 })
                  ? "font-bold text-[var(--btn-color)]"
                  : ""
              } cursor-pointer px-1.5 hover:scale-110 transition`}
            >
              <RiH1 />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleHeading({ level: 2 }).run();
              }}
              className={`${
                editor.isActive("heading", { level: 2 })
                  ? "font-bold text-[var(--btn-color)]"
                  : ""
              } cursor-pointer px-1.5 hover:scale-110 transition`}
            >
              <RiH2 />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleHeading({ level: 3 }).run();
              }}
              className={`${
                editor.isActive("heading", { level: 3 })
                  ? "font-bold text-[var(--btn-color)]"
                  : ""
              } cursor-pointer px-1.5 hover:scale-110 transition`}
            >
              <RiH3 />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleHeading({ level: 4 }).run();
              }}
              className={`${
                editor.isActive("heading", { level: 4 })
                  ? "font-bold text-[var(--btn-color)]"
                  : ""
              } cursor-pointer px-1.5 hover:scale-110 transition`}
            >
              <RiH4 />
            </button>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBlockquote().run();
            }}
            className={`${
              editor.isActive("blockquote")
                ? "font-bold text-[var(--btn-color)]"
                : ""
            } cursor-pointer px-1.5 hover:scale-110 transition`}
          >
            <TbBlockquote />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleCodeBlock().run();
            }}
            className={`${
              editor.isActive("codeBlock")
                ? "font-bold text-[var(--btn-color)]"
                : ""
            } cursor-pointer px-1.5 hover:scale-110 transition`}
          >
            <RiCodeBlock />
          </button>
          <button
            onClick={triggerUpload}
            className="text-lg cursor-pointer px-1.5 hover:scale-110 transition"
          >
            {loading ? "Uploading..." : <BiImageAdd />}
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            hidden
          />
        </div>
        {loading ? (
          <div className="w-20 aspect-square flex justify-center items-center">
            <Spinner />
          </div>
        ) : preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-[60%] h-auto border rounded"
          />
        ) : null}
      </div>

      <EditorContent
        editor={editor}
        className="h-[306px] overflow-y-auto bg-[var(--input-background)] rounded-b-md"
      />
    </div>
  );
}

export default Blogeditor;
