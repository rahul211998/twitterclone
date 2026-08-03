import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileStats = ({authuser}) => {

    // const usernames = username
    const navigate = useNavigate();

    const {username, followers, following } = authuser || {}
  return (
    <div className="p-5 px-8">
  <div className="flex items-start gap-10">
    {/* Empty space because the profile picture is absolutely positioned */}
    <div className="w-40"></div>

    {/* User Info */}
    <div className="flex-1">
      <h1 className="text-2xl font-bold">{username ?? 'user'}</h1>
      {/* <p className="text-gray-500">@rahul</p> */}

      <div className="flex gap-50 mt-4">
        <div className="text-center">
          <h2 className="font-bold text-2xl">{201}</h2>
          <p className="text-2xl">Posts</p>
        </div>

        <div className="text-center">
          <h2 className="font-bold text-2xl">{followers?.length ?? 10}</h2>
          <p className="text-2xl">Followers</p>
        </div>

        <div className="text-center" onClick={() => {
          navigate("/following")
        }}>
          <h2 className="font-bold text-2xl">{following?.length ?? 10}</h2>
          <p className="text-2xl">Following</p>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default ProfileStats