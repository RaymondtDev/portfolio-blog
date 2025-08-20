import { useRef, useState, useEffect } from "react";

function CoverImageUploader({ cover, setCover }) {
  const fileInputRef = useRef();
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (cover && typeof cover === "string") {
      setPreviewUrl(cover);
    } else if (cover && cover instanceof File) {
      setPreviewUrl(URL.createObjectURL(cover));
    } else {
      setPreviewUrl(null);
    }
  }, [cover]);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setCover(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    setCover(null);
    fileInputRef.current.value = "";
  }

  return (
    <div className="mb-2">
      <label
        onClick={() => fileInputRef.current.click()}
        className={`relative w-full h-[350px] rounded-md overflow-hidden border-2 border-dashed border-[var(--primary-color)] flex items-center justify-center cursor-pointer group ${previewUrl ? 'p-0' : 'p-4'}`}
      >
        {previewUrl ? (
          <>
            <img 
              src={previewUrl} 
              alt="Cover" 
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute top-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded hover:bg-black/80"
            >
              x Remove
            </button>
          </>
        ) : (
          <span className="text-[var(--primary-color)] text-3xl font-medium">+ Add Cover Image</span>
        )}

        <input 
          type="file"
          accept="image/*"
          id="cover"
          ref={fileInputRef}
          onChange={handleChange}
          hidden
        />
      </label>

      {cover && cover instanceof File && (
        <p className="mt-2 text-sm text-gray-500">Selected: <strong>{cover.name}</strong></p>
      )}
    </div>
  );
}

export default CoverImageUploader;