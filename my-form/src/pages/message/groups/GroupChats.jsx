import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const GroupChat = ({ groupData, setGroupData }) => {

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [message, setMessage] = useState("");

  const [socket, setSocket] = useState(null);
  //     const newSocket = io("http://localhost:5000/chat", {
  //     withCredentials: true,
  //   });
  // const [socket] = useState(() => newSocket);
  const socketRef = useRef(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));


  const handleSendMessage = () => {

    if (!message.trim()) {
      return;
    }

    console.log("sending message:", {
      groupId: selectedGroup?._id,
      message: message,
    });

    setMessage("");
  };

  const joinGroupFunction = (group) => {
    setSelectedGroup(group)
    // console.log("grp id",group._id)

    // socket.emit("joinGroup",group._id)
    socketRef.current.emit("joinGroup",group._id)
  }

  const socketCount = () => {
    let count = 0;
    
  }



  useEffect(() => {

  const newSocket = io("http://localhost:5000/chat", {
    withCredentials: true,
  });

  // setSocket(newSocket);
  socketRef.current = newSocket;

  newSocket.emit("join", storedUser.userId);
  

  

  return () => {
    newSocket.disconnect();
  };

}, []);

  


  return (
    <div className="h-screen bg-black text-white flex">

      {/* ================= GROUP LIST ================= */}

      <div className="w-80 border-r border-gray-700 p-4">

        <h2 className="text-xl font-bold mb-4">
          Groups
        </h2>

        {groupData?.map((group) => (

          <div
            key={group._id}
            onClick={() =>  joinGroupFunction(group)}
            className={`p-3 rounded-xl cursor-pointer mb-2
              ${
                selectedGroup?._id === group._id
                  ? "bg-gray-800"
                  : "hover:bg-gray-900"
              }
            `}
          >

            <div className="flex items-center gap-3">

              {/* Group avatar */}
              <div className="w-11 h-11 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">

                {group?.members?.[0]?.profileImg ? (
                  <img
                    src={group.members[0].profileImg}
                    alt={group.groupName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>👥</span>
                )}

              </div>


              {/* Group information */}
              <div>

                <h3 className="font-semibold">
                  {group.groupName}
                </h3>

                <p className="text-xs text-gray-400">
                  {group.members?.length} members
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* ================= CHAT AREA ================= */}

      <div className="flex-1 flex flex-col">

        {!selectedGroup ? (

          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a group to start chatting
          </div>

        ) : (

          <>
            {/* ================= HEADER ================= */}

            <div className="h-16 border-b border-gray-700 flex items-center px-5">

              <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden flex items-center justify-center">

                {selectedGroup?.members?.[0]?.profileImg ? (

                  <img
                    src={selectedGroup.members[0].profileImg}
                    alt={selectedGroup.groupName}
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <span>👥</span>

                )}

              </div>


              <div className="ml-3">

                <h2 className="font-semibold text-lg">
                  {selectedGroup.groupName}
                </h2>

                <p className="text-xs text-gray-400">
                  {selectedGroup.members?.length} members
                </p>

              </div>

            </div>


            {/* ================= MESSAGES ================= */}

            <div className="flex-1 overflow-y-auto p-5">

              {/* Example received message */}

              <div className="flex items-start gap-2 mb-5">

                <img
                  src={
                    selectedGroup?.members?.[1]?.profileImg ||
                    "https://via.placeholder.com/40"
                  }
                  alt={selectedGroup?.members?.[1]?.username}
                  className="w-9 h-9 rounded-full object-cover"
                />

                <div>

                  <p className="text-xs text-gray-400 mb-1">
                    {selectedGroup?.members?.[1]?.username}
                  </p>

                  <div className="bg-gray-800 rounded-2xl px-4 py-2">
                    Hello everyone 👋
                  </div>

                </div>

              </div>


              {/* Example own message */}

              <div className="flex justify-end mb-5">

                <div className="bg-blue-600 rounded-2xl px-4 py-2">
                  Hello Vijay!
                </div>

              </div>

            </div>


            {/* ================= INPUT ================= */}

            <div className="border-t border-gray-700 p-4">

              <div className="flex items-center gap-3">

                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  placeholder={`Message ${selectedGroup.groupName}...`}
                  className="flex-1 bg-gray-800 text-white px-5 py-3 rounded-full outline-none"
                />

                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 px-5 py-3 rounded-full font-semibold"
                >
                  Send
                </button>

              </div>

            </div>

          </>

        )}

      </div>

    </div>
  );
};

export default GroupChat;