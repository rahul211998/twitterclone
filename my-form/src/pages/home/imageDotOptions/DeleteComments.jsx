import React, { useState } from "react";
import { postRequest } from "../../../services/Api";
import { toast } from "react-toastify";

const DeleteComments = ({
  commentId,
  onDelete,
  onReport,
  postId,
  userdatas,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleDelete = async () => {
    // console.log("postid commentId",postId, commentId);

    try {
        const response = await postRequest(`posts/deleteComment/${postId}`,{commentId});

    onDelete(postId, commentId);
    setShowOptions(false);
    toast.success("Comment deleted successfully!");
        console.log("response comments delete",response)
    } catch (error) {
        console.log("error in handleDelete",error)
        toast.error("Failed to delete comment");
    }

    
  };

  const handleReport = () => {
    setShowOptions(false);
    onReport(commentId);
  };

  // Is the logged-in user the owner of this comment?
  const authenticatedCommentDeleteUser =
    userdatas?._id === storedUser?.userId;

  return (
    <div className="relative">

      {/* Three dots */}
      <button
        onClick={() => setShowOptions((prev) => !prev)}
        className="text-gray-400 hover:text-white text-xl px-2 cursor-pointer"
      >
        ⋯
      </button>

      {/* Options */}
      {showOptions && (
        <div className="absolute right-8 top-1 w-44 bg-gray-900 border border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">

          {/* Delete - ONLY COMMENT OWNER */}
          {authenticatedCommentDeleteUser && (
            <button
              onClick={handleDelete}
              className="w-full text-left px-4 py-3 text-red-400 hover:bg-gray-800 transition"
            >
               Delete comment
            </button>
          )}

          {/* Everyone can report */}
          <button
            onClick={handleReport}
            className="w-full text-left px-4 py-3 text-gray-200 hover:bg-gray-800 transition"
          >
             Report comment
          </button>

        </div>
      )}
    </div>
  );
};

export default DeleteComments;