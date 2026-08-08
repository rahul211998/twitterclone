import { getRequest } from "../../../services/Api";
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

const Following = () => {

    const [followingFriends, getFollowingFriends] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
            const getAllFollwingFriends = async () => {
        try {
            const response = await getRequest("/users/allfollowingusers");

            getFollowingFriends(response);

            console.log("response from getAllFollwingFriends",response);
        } catch (error) {
            console.log("error",error)
        }
        finally{
            setLoading(false);
        }
    }

    getAllFollwingFriends();
    },[])

  return (
    <div className="min-h-screen bg-black text-white ml-64 w-[calc(100%-16rem)] min-w-0">

    {loading ? (
  <SkeletonTheme baseColor="#202020" highlightColor="#3a3a3a">
    {/* Header Skeleton */}
    <div className="sticky top-0 bg-black border-b border-gray-800 p-4">
      <Skeleton width={120} height={30} />

      <div className="mt-4">
        <Skeleton height={42} borderRadius={8} />
      </div>
    </div>

    {/* User List Skeleton */}
    <div className="mt-3">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between px-5 py-4"
        >
          <div className="flex items-center gap-4">
            <Skeleton circle width={56} height={56} />

            <div>
              <Skeleton width={130} height={18} />
              <div className="mt-2">
                <Skeleton width={170} height={14} />
              </div>
            </div>
          </div>

          <Skeleton width={95} height={38} borderRadius={8} />
        </div>
      ))}
    </div>
  </SkeletonTheme>
) : (
  <div>
    <div className="sticky top-0 bg-black border-b border-gray-800 p-4">
      <h1 className="text-2xl font-semibold">Following</h1>

      <input
        type="text"
        placeholder="Search"
        className="mt-4 w-full rounded-lg bg-neutral-900 px-4 py-2 outline-none border border-neutral-700 focus:border-gray-400"
      />
    </div>

    <div className="mt-3">
      {followingFriends.map((userFriends) => (
        <div
          key={userFriends._id}
          className="flex items-center justify-between px-5 py-4 hover:bg-neutral-900 transition"
        >
          <div className="flex items-center gap-4">
            <img
              src={
                userFriends?.profileImg ||
                "https://i.pravatar.cc/150?img=1"
              }
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />

            <div>
              <h2 className="font-semibold">
                {userFriends.username || "username"}
              </h2>
              <p className="text-sm text-gray-400">
                {userFriends.fullName || "fullName"}
              </p>
            </div>
          </div>

          <button className="bg-white text-black font-medium px-5 py-2 rounded-lg hover:bg-gray-200 transition" 
          onClick={ () => {
            navigate("/messages",{state : userFriends})
          }}>
            Message
          </button>
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
};

export default Following;