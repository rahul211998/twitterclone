import { useContext, useState } from "react";
import ProfileStats from "./profilecomponents/ProfileStats";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { getRequest } from "../../services/Api";

const Userprofile = () => {
    const {authUser} = useContext(AuthContext)
    const [suggestedfriends,setSuggestedfriends] = useState([]);
    const [allPostsList, setAllPostsList] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const getSuggestedFriends = async () => {
      try {
        const response = await getRequest("/users/suggested");

        if(response){
          console.log("getSuggestedFriends response",response.
suggestedUsers
);

setSuggestedfriends(response.
suggestedUsers)
        }
        else{
          console.log("getSuggestedFriends no")
        }
      } catch (error) {
        console.log("no getSuggestedFriends",error)
      }
    }


    useEffect(() => {
      getSuggestedFriends()
    },[])

    useEffect(() => {
          const getAllPosts = async () => {
            try {
              const getAllPostsResponse = await getRequest("/posts/allPosts");
      
              console.log("getAllPostsResponse",getAllPostsResponse)
              setAllPostsList(getAllPostsResponse);
            } catch (error) {
              console.log("error in getAllPosts", error);
            }
          };
      
          getAllPosts();
    }, [])


  return (
    <div>
      {/* Cover Photo */}
      <div className="relative bg-green-800 h-60">
        {/* Profile Picture */}
        <div className="absolute bottom-0 left-8 translate-y-1/2">
          <div className="w-45 h-45 rounded-full bg-white border-4 border-black flex items-center justify-center">
            Profile
          </div>
        </div>
      </div>
      <ProfileStats authuser = {authUser}/>

      {/* <div className="border-t border-gray-700 pt-5"></div>

      <div className="border-2 border-amber-200 w-45 h-45 rounded-2xl ml-5">
        <h1>profile</h1>
        <button>
          request
        </button>
      </div>

      <div className="border-b border-gray-700 pt-5"></div> */}
      

      <div className="border-t border-gray-700 my-5"></div>

<div className="mx-5 overflow-x-auto">
  <div className="flex gap-4 w-max">
    {suggestedfriends.map((sf) => (
      <div
        key={sf._id}
        className="bg-black border border-gray-800 rounded-2xl p-4 w-72 flex-shrink-0"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={sf.profileImg || "https://via.placeholder.com/60"}
              // alt={sf.username}
              className="w-14 h-14 rounded-full object-cover"
            />

            <div>
              <h2 className="text-white font-semibold">
                {sf.username}
              </h2>

              <p className="text-sm text-gray-400">
                {sf.fullName}
              </p>

              <p className="text-xs text-gray-500">
                Followed by alex + 12 more
              </p>
            </div>
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1.5 rounded-lg font-medium transition">
            Follow
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

<div className="border-b border-gray-700 my-5"></div>

<div className="bg-gray-900 p-5 mx-auto w-max">
  {allPostsList.map((post) => post.user._id === storedUser.userId ?(
    <div key={post._id}>
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

          <button>❤️</button>

          <button>💬</button>

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
    </div>
  ) : null)}
</div>
    </div>
  );
};

export default Userprofile;