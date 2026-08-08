// import { useState } from "react";
// import { deleteRequest } from "../../../services/Api";

// const PostsOptions = ({userId, postId},) => {
//       const [showOptions, setShowOptions] = useState(false);
//       const storedUser = JSON.parse(localStorage.getItem("user"));
    
//       const deletePost = async () => {
//         try {
//             const response = await deleteRequest(`posts/delete/${postId}`);

//             console.log("response deletePost",response)

//         console.log("Delete:", postId);
//         setShowOptions(false);
//         } catch (error) {
//             console.log("error in deletePost",error)
//         }

//       };
    
//       const repostPost = () => {
//         console.log("Repost:", userId._id);
//         setShowOptions(false);
//       };
    
//       const seeLikeAI = () => {
//         console.log("See Like AI:", userId._id);
//         setShowOptions(false);
//       };
    
//       return (
//         <div>
    
//           {userId?._id === storedUser?.userId ? <div className="relative">
//                   <button
//             className="text-xl cursor-pointer"
//             onClick={() => setShowOptions(!showOptions)}
//           >
//             ⋯
//           </button>
    
//           {showOptions && (
//             <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10">
//               <button
//                 onClick={seeLikeAI}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-800"
//               >
//                 🤖 See Like AI
//               </button>
    
//               <button
//                 onClick={repostPost}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-800"
//               >
//                 🔁 Repost
//               </button>
    
//               <button
//                 onClick={deletePost}
//                 className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-800"
//               >
//                 🗑 Delete
//               </button>
//             </div>
//           )}
//           </div> : 
          
//                 <div className="relative">
//                   <button
//             className="text-xl cursor-pointer"
//             onClick={() => setShowOptions(!showOptions)}
//           >
//             ⋯
//           </button>
    
//           {showOptions && (
//             <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10">
//               <button
//                 onClick={seeLikeAI}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-800"
//               >
//                 🤖 See Like AI
//               </button>
    
//               <button
//                 onClick={repostPost}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-800"
//               >
//                 🔁 Repost
//               </button>
//             </div>
//           )}
//           </div>}
    
    
    
//         </div>
    
//       );
    
    
    

// }

// export default PostsOptions



import { useEffect, useState } from "react";
import { deleteRequest } from "../../../services/Api";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import DeletePostSkeleton from "../../../components/skeletons/DeletePostSkeleton";

const PostsOptions = ({ userId, postId, setAllPostsList }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Only open confirmation
  const handleDeleteClick = () => {
    setShowOptions(false);
    setShowDeleteConfirm(true);
  };

  // Actually delete
  const deletePost = async () => {
    try {
      setDeleteLoading(true)
      const response = await deleteRequest(`posts/delete/${postId}`);

      // console.log("response deletePost", response);

          const deletedPostId = response.deletedPost._id;

    setAllPostsList((prevPosts) =>
    prevPosts.filter((post) => post._id !== deletedPostId)
    );

      setShowDeleteConfirm(false);

      toast.success("Post deleted successfully!",);

    } catch (error) {
      console.log("error in deletePost", error);
    } finally {
    setDeleteLoading(false);
  }
  };

  const repostPost = () => {
    console.log("Repost:", userId._id);
    setShowOptions(false);
  };

  const seeLikeAI = () => {
    console.log("See Like AI:", userId._id);
    setShowOptions(false);
  };

  const isOwner = userId?._id === storedUser?.userId;


  // useEffect(() => {
    
  // }, [])



  return (
    <div>
      
      {/* Three dots */}
      <div className="relative">

        <button
          className="text-xl cursor-pointer"
          onClick={() => setShowOptions(!showOptions)}
        >
          ⋯
        </button>

        {showOptions && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10">

            <button
              onClick={seeLikeAI}
              className="w-full text-left px-4 py-2 hover:bg-gray-800"
            >
              See Like AI
            </button>

            <button
              onClick={repostPost}
              className="w-full text-left px-4 py-2 hover:bg-gray-800"
            >
               Repost
            </button>

            {/* Delete only for owner */}
            {isOwner && (
              <button
                onClick={handleDeleteClick}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-800"
              >
                Delete
              </button>
            )}

          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

          { deleteLoading ? (
      <DeletePostSkeleton />
    ) : (

          <div className="w-80 rounded-xl bg-gray-900 border border-gray-700 p-6 shadow-xl">

            <h2 className="text-lg font-semibold text-white mb-3">
              Delete Post?
            </h2>

            <p className="text-gray-400 mb-6">
              Do you want to delete this post?
            </p>

            <div className="flex justify-end gap-3">

              {/* No */}
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
              >
                No
              </button>

              {/* Yes */}
              <button
                onClick={deletePost}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Yes
              </button>

            </div>

          </div>
          )}
        </div>
      )}

    </div>
  );
};

export default PostsOptions;