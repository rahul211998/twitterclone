import { useState } from "react";
import { postRequest } from "../../services/Api";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // console.log("filessss",file)

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImg(reader.result); // Base64
    };

    reader.readAsDataURL(file);
  };

  const uploadImageFunction = async () => {
    if(!text, !img) return;
    try {
      const response = await postRequest("/posts/create",{text, img})

      console.log("uploadImageFunction created:", response);

      // reset form
      setText("");
      setImg("");
    } catch (error) {
      console.log(error, "error in uploadImageFunction")
    }
  }

  return (
    <div className="w-full rounded-xl bg-zinc-900 p-4 space-y-4">

      {/* Text */}
      <textarea
        className="w-full h-24 resize-none rounded-lg bg-zinc-800 p-3 text-white outline-none"
        placeholder="What's happening?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Image Preview */}
      {img && (
        <img
          src={img}
          alt="preview"
          className="w-40 rounded-lg"
        />
      )}

      {/* Bottom */}
      <div className="flex justify-between items-center">

        {/* Hidden Input */}
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        {/* Upload Button */}
        <label
          htmlFor="imageUpload"
          className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Upload Image
        </label>

        {/* Post Button */}
        <button
          className="rounded-lg bg-green-500 px-5 py-2 text-white hover:bg-green-600"
        onClick={uploadImageFunction} >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;