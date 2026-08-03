import React, { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../services/Api";

const ShowImages = () => {
  const [allPostsList, setAllPostsList] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [likedClicked,setLikeClicked] = useState()
  const [colors, setColors] = useState("orange-100");
  const [showComments, setShowComments] = useState(false);
  const [postId, setPostId] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [showCommentss, setShowCommentss] = useState(false);

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
    setShowComments(true);
    setPostId(id)
    console.log("id is commentsFunction", id )
  }

  const sentComment = async (postId, text) => {
    try {
      const response = await postRequest(`/posts/comment/${postId}`,{text});
      console.log(response);
      setCommentValue("");
    } catch (error) {
      console.log("error in sentComment",error)
    }
  }

  useEffect(() => {
    // console.log("use effect runs likedClicked",likedClicked)
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

    getAllPosts();
  }, [likedClicked]);

  console.log("allPostsList",allPostsList);

  return (
    <div>
      <h1>Show Images</h1>
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
          </div>
        </div>

        <button className="text-xl">⋯</button>
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
          <button onClick={() => likedPostFunction(post._id)} className="text-2xl transition-transform duration-200 hover:scale-110"> {post.likes.includes(storedUser.userId) ? (<span className="text-red-500">❤️</span>)
          : (<span className="text-gray-400">🤍</span>)}
             </button>

          <button onClick={() => commentsFunction(post._id)}>💬</button>

          <button>📤</button>

        </div>

        <button className="text-2xl">
          🔖
        </button>

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

          {showCommentss
    ?   <div className="px-4">
    {post.comments.map((comment) => (
      <ul key={comment._id}>
        <div className="flex gap-15">
          <div className="flex">
          <h2>{comment?.user?.username || "username"} commented :</h2>
          <li className="pl-2">{comment.text}</li>
          <div className="py-5"></div>
          </div>

          <div>
            edit
          </div>

          <div onClick={() => deleteCommentFunction(post._id)}>
            delete
          </div>
        </div>
        <div className="border-t border-gray-700 p-5 w-auto"></div>
      </ul>
    ))}
  </div>
    : `View all ${post.comments.length} comments`}
      </div>  }


       <div className="px-4 py-2 text-xs text-gray-500">
         {new Date(post.createdAt).toLocaleDateString()}
       </div>
      
      <div className="border-t border-gray-700"></div>
    </div>
  ))}

</div>
    </div>
  );
};

export default ShowImages;















// Open A
// --------
// A Render
// A Effect

// Click button (add = 1)
// ----------------------
// A Render
// A Cleanup
// A Effect

// Click button (add = 2)
// ----------------------
// A Render
// A Cleanup
// A Effect

// Navigate to C
// -------------
// A Cleanup

// Navigate back to A
// ------------------
// A Render
// A Effect