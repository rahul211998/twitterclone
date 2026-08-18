
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { getRequest } from "../../services/Api";

const Messages = () => {
  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Create socket only once
  const [socket] = useState(() => io("http://localhost:5000/chat"));

  const [inputLiveMessage, setInputLiveMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    console.log("triggred")
    // Server connected
    socket.on("connectionMessage", (message) => {
      console.log("data from socket.on callback parameter",message);

      // Register CURRENT logged-in user
      socket.emit("join", storedUser.userId);
    });

    console.log("re-triggred")

    // Receive live message
    socket.on("newMessage", (message) => {
      console.log("Received: this message runs", message);

      setMessages((prev) => [...prev, message]); 
    });

      return () => {
      socket.off("connectionMessage");
      socket.off("newMessage");
    };
  }, [socket, storedUser.userId]);

  useEffect(() => {

    console.log("location.state._id",location.state._id)

  const getOldMessages = async () => {
    const response = await getRequest(`/messages/${location.state._id}`);
    setMessages(response);
  };

  getOldMessages();
}, [location.state._id]); //"This effect uses _id; if _id changes while this component is alive, rerun."

  const sendMessagetoServer = () => {
    if (!inputLiveMessage.trim()) return;

    const messageData = {
      senderId: storedUser.userId,
      receiverId: location.state._id,
      text: inputLiveMessage,
    };

    // console.log("Sending:", messageData);

    // Show immediately in sender UI
    setMessages((prev) => [...prev, messageData]);

    // Send to server
    socket.emit("messagesFromBrowser", messageData);

    setInputLiveMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white ml-64 w-[calc(100%-16rem)] min-w-0">
      {/* Header */}
      <div className="h-16 border-b border-gray-800 flex items-center px-6">
        <img
          src= {location.state.profileImg ? location.state.profileImg : `https://via.placeholder.com/40` }
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="ml-3">
          <h1 className="font-semibold text-lg">
            {location.state.username}
          </h1>
          <p className="text-xs text-gray-400">Active now</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 flex flex-col justify-end">
        {messages.map((msg, index) =>
          msg.senderId === storedUser.userId ? (
            // My message
            <div key={index} className="flex justify-end">
              <div className="bg-blue-500 px-4 py-2 rounded-2xl max-w-sm">
                {msg.text}
              </div>
            </div>
          ) : msg.senderId === location.state._id ?  (
            // Friend message
            <div key={index} className="flex items-end gap-2">
              <img
                src= {location.state.profileImg ? location.state.profileImg : `https://via.placeholder.com/32`}
                alt=""
                className="w-8 h-8 rounded-full"
              />

              <div className="bg-gray-800 px-4 py-2 rounded-2xl max-w-sm">
                {msg.text}
                {/* {msg.receiverId === location.state._id} */}
                {/* {msg.senderId} */}
              </div>
            </div>
          ) : (null) 
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center border border-gray-700 rounded-full px-4 py-2">
          <input
            type="text"
            value={inputLiveMessage}
            onChange={(e) => setInputLiveMessage(e.target.value)}
            placeholder="Message..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
          />

          <button
            onClick={sendMessagetoServer}
            className="ml-3 text-blue-500 font-semibold hover:text-blue-400"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;