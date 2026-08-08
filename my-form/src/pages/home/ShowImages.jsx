import React, { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../services/Api";
import DeletePost from "./imageDotOptions/DeletePost";
import PostsOptions from "./imageDotOptions/PostsOptions";
import DeleteComments from "./imageDotOptions/DeleteComments";

const ShowImages = ({allPostsList, setAllPostsList}) => {
  // const [allPostsList, setAllPostsList] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [likedClicked,setLikeClicked] = useState()
  const [colors, setColors] = useState("orange-100");
  const [showComments, setShowComments] = useState(false);
  const [postId, setPostId] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [showCommentss, setShowCommentss] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [cmts, setCmts] = useState(false)

  const [openedPostId, setOpenedPostId] = useState(null);

  const likedPostFunction = async (id) => {
    // console.log("yes like clicked friend id",id)
    try {
      const response = await postRequest(`/posts/like/${id}`);
      // message : "post liked successfully", liked: true

      setLikeClicked(response.liked)

      console.log("response likedPostFunction", response)
    } catch (error) {
      console.log("error in likedPostFunction",error)
    }
  }

  const commentsFunction = (id) => {
  if (openedPostId === id) {
    setOpenedPostId(null); // close
  } else {
    setOpenedPostId(id); // open
  }
};

  const sentComment = async (postId, text) => {
    
    try {
      const response = await postRequest(`/posts/comment/${postId}`,{text});
      console.log("response sentComment",response);
      setCommentValue("");
      setCmts(true)
    } catch (error) {
      console.log("error in sentComment",error)
    }
  }

//   const sentComment = async (postId, text) => {
//   if (!text.trim()) return;

//   try {
//     const response = await postRequest(
//       `/posts/comment/${postId}`,
//       { text }
//     );

//     console.log("response sentComment", response);

//     const updatedPost = response.message;

//     setAllPostsList((prevPosts) =>
//       prevPosts.map((post) =>
//         post._id === postId
//           ? {
//               ...post,
//               comments: updatedPost.comments,
//             }
//           : post
//       )
//     );

//     setCommentValue("");

//   } catch (error) {
//     console.log("error in sentComment", error);
//   }
// };



  const removeCommentFromUI = (postId, commentId) => {
  setAllPostsList((prevPosts) =>
    prevPosts.map((post) => {
      if (post._id !== postId) {
        return post;
      }

      return {
        ...post,
        comments: post.comments.filter(
          (comment) => comment._id !== commentId
        ),
      };
    })
  );
};

  useEffect(() => {
    console.log("use effect runs likedClicked",likedClicked)
    const getAllPosts = async () => {
      try {
        const getAllPostsResponse = await getRequest("/posts/allPosts");

        // console.log("getAllPostsResponse",getAllPostsResponse)
        setAllPostsList(getAllPostsResponse);
        setCmts(false);

        // console.log("allPostsList",allPostsList);
      } catch (error) {
        console.log("error in getAllPosts", error);
      }
    };
    

    getAllPosts();
  }, [likedClicked, cmts]);

  console.log("allPostsList",allPostsList);

  return (
    <div>
      <div className="md:max-w-3xl mx-auto p-5 bg-black border border-gray-800 rounded-lg overflow-hidden text-white">

  {allPostsList.map((post) => (
    <div key={post._id} className="mb-1">

      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={post.user.profileImg || "https://via.placeholder.com/40"}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <h1 className="font-semibold">
              {post.user.username}
            </h1>
          <div className="py-1 text-xs text-gray-500">
         {new Date(post.createdAt).toLocaleDateString()}
       </div>
          </div>
        </div>

        <div>
          {/* <DeletePost postId = {post.user}/> */}
          <PostsOptions userId = {post.user} postId = {post._id} setAllPostsList = {setAllPostsList}/>
          {/* <button className="text-xl" onClick={deletePost}>⋯</button> */}
        </div>
      </div>

      {/* Image */}
      {post.img && (
        <img
          src={post.img}
          alt="post"
          className="w-full h-[500px] object-cover"
        />
      )}

      {/* Action Buttons */}
      <div className="flex justify-between px-4 py-3">

        <div className="flex gap-5 text-2xl">

          {/* <button>❤️</button> */}
          <button onClick={() => likedPostFunction(post._id)} className="text-2xl transition-transform duration-200 hover:scale-110 cursor-pointer"> {post.likes.includes(storedUser.userId) ? (<span className="text-red-500">❤️</span>)
          : (<span className="text-gray-400">🤍</span>)}
             </button>

          <button onClick={() => commentsFunction(post._id)}>💬</button>

          {/* <button>📤</button> */}

        </div>

      </div>

      {/* Likes */}
      <div className="px-4">
        <p className="font-semibold">
          {post.likes.length} likes
        </p>
      </div>

      {/* Caption */}
      <div className="px-4 py-2">
        <span className="font-semibold mr-2">
          {/* {post.user.username} */}
        </span>

        <span>{post.text}</span>
      </div>

      {/* Comments */}
      {post._id === postId ? <div className="flex ">
        <input type="text" value={commentValue} onChange={(e) => setCommentValue(e.target.value)} placeholder="comments" className="w-full border-2 border-gray-700 border-t rounded-2xl p-2" />
        <button onClick={() => sentComment(post._id, commentValue )} className="border-gray-400 border-2 rounded-2xl p-2 ml-2">sent</button>
      </div> : <div className="px-4 text-gray-400 text-sm cursor-pointer" onClick={() => setShowCommentss(!showCommentss)}> 
{/* showCommentss */}
{openedPostId === post._id && (
  <>

      <div className="flex px-4 py-3">
      <input
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 border border-gray-700 rounded-full px-4 py-2 bg-black"
      />

      <button
        onClick={() => sentComment(post._id, commentValue)}
        className="ml-3 px-4 rounded-full bg-blue-600 cursor-pointer text-white"
      >
        Send
      </button>
    </div>

    {/* Existing Comments */}
    <div className="px-4 mt-3 space-y-3">
      {post.comments.map((comment) => (
        <div
          key={comment._id}
          className="flex gap-3"
        >
          <img
            src={
              comment?.user?.profileImg ||
              "https://i.pravatar.cc/40"
            }
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="bg-gray-800 rounded-2xl px-4 py-3 flex-1 flex justify-between">

            <div>
            <h3 className="font-semibold text-sm">
              {comment.user.username}
            </h3>

            <p>{comment.text}</p>
            </div>

            <div>
              <DeleteComments commentId = {comment._id} postId = {post._id} userdatas = {comment?.user} onDelete={removeCommentFromUI}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
)}
      </div>  }


      
      <div className="border-t mt-1 border-gray-700"></div>
    </div>
  ))}

</div>
    </div>
  );
};

export default ShowImages;



























































//           {showCommentss
//     ?   <div className="px-4 space-y-3">
//   {post.comments.map((comment) => (
//     <div
//       key={comment._id}
//       className="flex justify-between items-start border-b border-gray-800 pb-3"
//     >
//       {/* Left Side */}
//       <div className="flex gap-3 w-full">
//         <img
//           src={
//             comment?.user?.profileImg ||
//             "https://i.pravatar.cc/40"
//           }
//           alt="profile"
//           className="w-10 h-10 rounded-full object-cover"
//         />

//         <div className="bg-gray-800 rounded-2xl px-4 py-3 w-full flex items-start justify-between">
//   {/* Comment Content */}
//   <div className="flex-1">
//     <h3 className="font-semibold text-white text-sm">
//       {comment?.user?.username || "Username"}
//     </h3>

//     <p className="text-gray-200 mt-1 break-words">
//       {comment.text}
//     </p>
//   </div>

//   {/* Actions */}
//   <div className="flex items-center gap-4 ml-4">
//     <button className="text-sm text-blue-400 hover:text-blue-300">
//       Edit
//     </button>

//     <button
//       onClick={() => deleteCommentFunction(post._id)}
//       className="text-sm text-red-400 hover:text-red-300"
//     >
//       Delete
//     </button>
//   </div>
// </div>

//       </div>

      
//     </div>
//   ))}
// </div>
//     : `View all ${post.comments.length} comments`}