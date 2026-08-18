import React, { useEffect, useState } from "react";
import {getRequest, postRequest} from '../../services/Api'
import { toast } from "react-toastify";

const MessagePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [mycartList, setMycartList] = useState([]);
  const [allfollowingusers, setAllfollowingusers] = useState([]);

  // const cartfunction = async () => {
  //   try {
  //     const response = await getRequest('/cart/getallcart');

  //     setMycartList(response)

  //  console.log("response from cart",response)
  //   } catch (error) {
  //     console.log("error",error)
  //   }
  // }

  // Static for now — later replace with API data
  const followingFriends = [
    { _id: "user200", username: "Ajith" },
    { _id: "user300", username: "Vijay" },
    { _id: "user400", username: "Karthi" },
  ];

  const handleSelectFriend = (friendId) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const createGroup = () => {
    // const currentUserId = "user100"; // current logged-in user for now

    // const members = [currentUserId, ...selectedFriends];

    if(!groupName){
     return toast("group name is not given", {autoClose : 1000,closeButton : true, theme : "dark"})
      // return console.log("no group name")
    }

    if(selectedFriends.length === 0){
      return toast("select friends", {autoClose : 1000,closeButton : true, theme : "dark"})
      // return console.log("no group name")
    }

    console.log("datas for group lists",{
      name: groupName,
      selectedFriends,
    });
  };

  const getAllFollowingUsers = async () => {
    try {
      if(showForm !== true){
      const response = await getRequest('/users/allfollowingusers');
      setAllfollowingusers(response)
      console.log("response",response)
      }
    } catch (error) {
      console.log("error",error)
    }
    finally{
      setShowForm((v) => !v)
    }
  }

  useEffect(() => {
      const cartfunction = async () => {
    try {
      const response = await getRequest('/cart/getallcart');

      setMycartList(response)

   console.log("response from cart",response)
    } catch (error) {
      console.log("error",error)
    }
  }

  cartfunction()
  },[])

  return (
    <div className="ml-64">
      <h1>MessagePage</h1>

      <div className="mx-3 my-4">
        <button
          className="bg-amber-400 p-2 rounded-2xl text-black cursor-pointer"
          onClick={getAllFollowingUsers}
          // setShowForm((v) => !v)
        >
          New Group
        </button>

        {showForm ? (
          <div className="mt-5">
            <div className="bg-blue-950 border-white rounded-2xl p-5">

              {/* Group name */}
              <input
                className="bg-amber-100 h-8 w-xl text-black px-2"
                type="text"
                placeholder="Group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />

              <h2 className="mt-4">Select friends</h2>

              {/* Friends */}
              <div className="mt-2">
                {allfollowingusers.map((friend) => (
                  <label
                    key={friend._id}
                    className="flex items-center gap-2 my-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFriends.includes(friend._id)}
                      onChange={() => handleSelectFriend(friend._id)}
                    />

                    <span>{friend?.username}</span>
                  </label>
                ))}
              </div>

              <button
                onClick={createGroup}
                className="mt-4 bg-black text-white px-4 py-2 rounded-xl"
              >
                Create Group
              </button>

            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* <button onClick={cartfunction}>
        click
      </button> */}

      {mycartList.map((cart) => (
        <ul key={cart?._id} className="ml-2">
          <div className="bg-blue-950 p-2 w-fit text-white rounded">
            <li>{cart.productName.charAt(0).toUpperCase() + cart.productName.slice(1)}</li>
          </div>
        </ul>
      ))}

    </div>
  );
};

export default MessagePage;