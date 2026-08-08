// import { useState } from "react";
// import { postRequest } from "../../services/Api";

// const CreatePost = () => {
//   const [text, setText] = useState("");
//   const [img, setImg] = useState("");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     // console.log("filessss",file)

//     if (!file) return;

//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setImg(reader.result); // Base64
//     };

//     reader.readAsDataURL(file);
//   };

//   const uploadImageFunction = async () => {
//     if(!text, !img) return;
//     try {
//       const response = await postRequest("/posts/create",{text, img})

//       console.log("uploadImageFunction created:", response);

//       // reset form
//       setText("");
//       setImg("");
//     } catch (error) {
//       console.log(error, "error in uploadImageFunction")
//     }
//   }

//   return (
//     <div className="w-full px-4 py-2">
//           <div className="w-full rounded-xl bg-zinc-900 p-5 space-y-4">

//       {/* Text */}
//       <textarea
//         className="w-full h-24 resize-none rounded-lg bg-zinc-800 p-3 text-white outline-none"
//         placeholder="What's happening?"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />

//       {/* Image Preview */}
//       {img && (
//         <img
//           src={img}
//           alt="preview"
//           className="w-40 rounded-lg"
//         />
//       )}

//       {/* Bottom */}
//       <div className="flex justify-between items-center">

//         {/* Hidden Input */}
//         <input
//           type="file"
//           id="imageUpload"
//           accept="image/*"
//           className="hidden"
//           onChange={handleImageChange}
//         />

//         {/* Upload Button */}
//         <label
//           htmlFor="imageUpload"
//           className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//         >
//           Upload Image
//         </label>

//         {/* Post Button */}
//         <button
//           className="rounded-lg bg-green-500 px-5 py-2 text-white hover:bg-green-600 cursor-pointer"
//         onClick={uploadImageFunction} >
//           Post
//         </button>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default CreatePost;





import { useState } from "react";
import { getRequest, postRequest } from "../../services/Api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

const CreatePost = ({setAllPostsList}) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImg(reader.result);
    };

    reader.readAsDataURL(file);
  };

      const getAllPosts = async () => {
        try {
          const getAllPostsResponse = await getRequest("/posts/allPosts");
  
          // console.log("getAllPostsResponse",getAllPostsResponse)
          setAllPostsList(getAllPostsResponse);
  
          // console.log("allPostsList",allPostsList);
        } catch (error) {
          console.log("error in getAllPosts", error);
        }
      };
  
      // getAllPosts();

  const uploadImageFunction = async () => {
    // Don't allow empty post
    if (!text.trim() && !img) return;

    try {
      setLoading(true);

      const response = await postRequest("/posts/create", {
        text,
        img,
      });

      console.log("uploadImageFunction created:", response);

      // Reset form
      setText("");
      setImg("");

    } catch (error) {
      console.log(
        error,
        "error in uploadImageFunction"
      );
    } finally {
      setLoading(false);

      getAllPosts();
      toast.success("Post uploaded successfully!");
    }
  };

  return (
    <div className="bg-black border border-gray-800 rounded-xl p-5">

      {loading ? (
          <div className="bg-black rounded-2xl p-4 animate-pulse">

    {/* Header */}
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">

          <div className="flex justify-between items-center mt-4">
    
    {/* Upload Image skeleton */}
    <Skeleton
      width={1200}
      height={140}
      borderRadius={8}
      className="animate-pulse"
    />

    {/* Post button skeleton */}
    {/* <Skeleton
      width={70}
      height={40}
      borderRadius={8}
      className="animate-pulse"
    /> */}

  </div>


      </div>
    </div>

    {/* Loading text */}
    <div className="flex justify-center mt-5">
      <p className="text-sm text-gray-500">
        Creating your post...
      </p>
    </div>

  </div>
      ) : (
        <>
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
              className="w-40 mt-3 rounded-lg"
            />
          )}

          {/* Bottom */}
          <div className="flex justify-between items-center mt-4">

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
              onClick={uploadImageFunction}
              disabled={!text.trim() && !img}
              className="rounded-lg bg-green-500 px-5 py-2 text-white hover:bg-green-600 cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Post
            </button>

          </div>
        </>
      )}

    </div>
  );
};

export default CreatePost;

