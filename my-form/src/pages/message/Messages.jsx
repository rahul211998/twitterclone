// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import {io} from "socket.io-client"

// const Messages = () => {
//   const [liveMessage, setLiveMessage] = useState("");
//   const [inputLiveMessage, setInputLiveMessage ] = useState("")
//   const location = useLocation()
//   const socket = io("http://localhost:5000/chat");
//   const storedUser = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//       socket.on("connectionMessage", (message) => {
//     console.log("message is",message);

//     socket.emit("join",location.state._id)
//   });
  

//       return () => {
//         socket.off("updateMessage");
//     };
//   },[])

//   const sendMessagetoServer = () => {
//     const messageData = {
//       senderId : storedUser.userId,
//       receiverId : location?.state?._id,
//       text : inputLiveMessage,
//     }

//     console.log("messageData",messageData)
//      socket.emit("messagesFromBrowser",messageData)
//   }

//   return (
//     <div className="flex flex-col h-screen bg-black text-white">
//       {/* Header */}
//       <div className="h-16 border-b border-gray-800 flex items-center px-6">
//         <img
//           src="https://via.placeholder.com/40"
//           alt="Profile"
//           className="w-10 h-10 rounded-full object-cover"
//         />

//         <div className="ml-3">
//           <h1 className="font-semibold text-lg">{location?.state?.username || "username"}</h1>
//           <p className="text-xs text-gray-400">Active now</p>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
//         {/* Received */}
//         <div className="flex items-end gap-2">
//           <img
//             src="https://via.placeholder.com/32"
//             alt=""
//             className="w-8 h-8 rounded-full"
//           />

//           <div className="bg-gray-800 px-4 py-2 rounded-2xl max-w-sm">
//             Hey! How are you? 
//           </div>
//         </div>

//         {/* Sent */}
//         <div className="flex justify-end">
//           <div className="bg-blue-500 px-4 py-2 rounded-2xl max-w-sm">
//             {"hello"}
//           </div>
//         </div>

//         {/* Received */}
//         <div className="flex items-end gap-2">
//           <img
//             src="https://via.placeholder.com/32"
//             alt=""
//             className="w-8 h-8 rounded-full"
//           />

//           <div className="bg-gray-800 px-4 py-2 rounded-2xl max-w-sm">
//             {"chat1"}
//           </div>
//         </div>
//       </div>

//       {/* Input */}
//       <div className="border-t border-gray-800 p-4">
//         <div className="flex items-center border border-gray-700 rounded-full px-4 py-2">
//           <input
//             type="text"
//             value = {inputLiveMessage}
//             placeholder="Message..."
//             onChange={(e) => setInputLiveMessage(e.target.value)}
//             className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
//           />

//           <button className="ml-3 text-blue-500 font-semibold hover:text-blue-400" onClick={sendMessagetoServer}>
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Messages;


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const Messages = () => {
  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Create socket only once
  const [socket] = useState(() => io("http://localhost:5000/chat"));

  const [inputLiveMessage, setInputLiveMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Server connected
    socket.on("connectionMessage", (message) => {
      console.log(message);

      // Register CURRENT logged-in user
      socket.emit("join", storedUser.userId);
    });

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
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <div className="h-16 border-b border-gray-800 flex items-center px-6">
        <img
          src="https://via.placeholder.com/40"
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
                src="https://via.placeholder.com/32"
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