import { useContext, useState } from "react";
import ProfileStats from "./profilecomponents/ProfileStats";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { getRequest, postRequest } from "../../services/Api";
import { useRef } from "react";

const Userprofile = () => {
  const fileInputRef = useRef(null);
    // const {authUser} = useContext(AuthContext)
    const { authUser, setAuthUser } = useContext(AuthContext);
    const [suggestedfriends,setSuggestedfriends] = useState([]);
    const [allPostsList, setAllPostsList] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    // const [profileImg, setProfileImg] = useState(defaultProfile);
    const [defaultCover, setDefaultCover] = useState("https://images.unsplash.com/photo-1528465424850-54d22f092f9d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y292ZXIlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D");

    const [defaultProfile, setDefaultProfile] = useState("    https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg");

    const [profileImg, setProfileImg] = useState(authUser?.profileImg || defaultProfile);
    
    const [profileUploading, setProfileUploading] = useState(false);

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



        const getUserPosts = async () => {
      try {
        // const username = storedUser.username;
        const response = await getRequest(`/posts/user/${storedUser?.
username}`);

        if(response){
          console.log("getUserPosts response",response
);

setAllPostsList(response)
        }
        else{
          console.log("getUserPosts no")
        }
      } catch (error) {
        console.log("no getUserPosts",error)
      }
    }


    useEffect(() => {
      getSuggestedFriends();
    },[])

    // useEffect(() => {
    //       const getAllPosts = async () => {
    //         try {
    //           const getAllPostsResponse = await getRequest("/posts/allPosts");
      
    //           console.log("getAllPostsResponse",getAllPostsResponse)
    //           setAllPostsList(getAllPostsResponse);
    //         } catch (error) {
    //           console.log("error in getAllPosts", error);
    //         }
    //       };
      
    //       getAllPosts();
    // }, [])

    useEffect(() => {
      getUserPosts()
    }, [])

    const editPicture = () => {
      fileInputRef.current.click();
    }



const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = async () => {
    const base64 = reader.result;

    setProfileUploading(true);

    setProfileImg(base64);

    // Upload immediately
    try {
      const response = await postRequest("/users/update", {
        profileImg: base64,
      });

      console.log(response);

      // Update AuthContext
setAuthUser(response);
    } catch (error) {
      console.log(error);
    } finally {
      // Hide skeleton after upload finishes
      setProfileUploading(false);
    }
  };

  reader.readAsDataURL(file);
};


  return (
    <div className="ml-64 w-[calc(100%-16rem)] min-w-0">
      {/* Cover Photo */}
      <input
  type="file"
  ref={fileInputRef}
  accept="image/*"
  className="hidden"
  onChange={handleImageChange}
/>
      <div className="relative bg-green-800 h-60">
        {/* Profile Picture */}
        <img src= {defaultCover} alt="cover" className="h-full w-full object-cover"/>
        <div className="absolute bottom-0 left-8 translate-y-1/2">
          <div className="w-40 h-40 rounded-full bg-orange-500 border-4 border-black flex items-center justify-center cursor-pointer" onClick={editPicture}>
            {profileUploading ? <div className="w-full h-full rounded-full bg-gray-700 animate-pulse" /> : <img
    src={ authUser?.profileImg || profileImg 
}
  alt="imgs"
  className="h-full w-full object-cover rounded-full"
/>}
            {/* <img src={defaultProfile} alt="" className="h-full w-full object-cover rounded-full"/> */}
            {/* <img
    src={ authUser?.profileImg || profileImg 
}
  alt="imgs"
  className="h-full w-full object-cover rounded-full"
/> */}
          </div>
        </div>
      </div>
      <ProfileStats authuser = {authUser} friendsListLength = {allPostsList.length}/>

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
              src={sf?.profileImg || defaultProfile}
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

{allPostsList.length !== 0 ? (<div className="bg-gray-900 p-5 mx-auto w-max">
  {allPostsList.map((post) => post.user._id === storedUser.userId ?(
    <div key={post._id}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
          src={post?.user?.profileImg || defaultProfile}
            // src={post?.user?.profileImg || defaultProfile}
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
        <span className="font-semibold">
          {/* {post.user.username} */}
        </span>

        <span>{post.text}</span>
      </div>
      <div className="border-t border-gray-700 pt-2"></div>
    </div>
  ) : <h1>no images</h1>)}
</div>) : (
  <div className="w-full min-h-[400px] flex items-center justify-center">
  <div className="text-center px-6">

    {/* Icon */}
    <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gray-800 flex items-center justify-center">
      <span className="text-4xl">📷</span>
    </div>

    {/* Title */}
    <h2 className="text-2xl font-bold text-white mb-2">
      No posts yet
    </h2>

    {/* Description */}
    <p className="text-gray-400 max-w-sm mx-auto mb-6">
      You haven't created any posts yet. Share your first photo
      and let your friends see what you're up to.
    </p>


  </div>
</div>
)}
    </div>
  );
};

export default Userprofile;