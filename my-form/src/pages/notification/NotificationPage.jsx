import React from "react";

const NotificationPage = () => {
  const notifications = [
    {
      id: 1,
      username: "Ajith",
      message: "liked your post",
      time: "2 min ago",
      image: "https://i.pravatar.cc/50?img=12",
      type: "like",
    },
    {
      id: 2,
      username: "Vijay",
      message: "started following you",
      time: "10 min ago",
      image: "https://i.pravatar.cc/50?img=13",
      type: "follow",
    },
    {
      id: 3,
      username: "Karthi",
      message: "commented on your post",
      time: "30 min ago",
      image: "https://i.pravatar.cc/50?img=14",
      type: "comment",
    },
    {
      id: 4,
      username: "Suriya",
      message: "mentioned you in a post",
      time: "1 hour ago",
      image: "https://i.pravatar.cc/50?img=15",
      type: "mention",
    },
    {
      id: 5,
      username: "Dhanush",
      message: "sent you a message",
      time: "2 hours ago",
      image: "https://i.pravatar.cc/50?img=16",
      type: "message",
    },
  ];

  return (
    <div className="ml-64 min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <button className="text-sm text-blue-400 hover:text-blue-300">
            Mark all as read
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">

          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center gap-4 p-4 border-b border-gray-800 hover:bg-gray-800 transition cursor-pointer"
            >

              {/* Profile Image */}
              <img
                src={notification.image}
                alt={notification.username}
                className="w-12 h-12 rounded-full object-cover"
              />

              {/* Notification Content */}
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">
                    {notification.username}
                  </span>{" "}
                  <span className="text-gray-300">
                    {notification.message}
                  </span>
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>

              {/* Notification Icon */}
              <div className="text-xl">
                {notification.type === "like" && "❤️"}
                {notification.type === "follow" && "👤"}
                {notification.type === "comment" && "💬"}
                {notification.type === "mention" && "🔔"}
                {notification.type === "message" && "✉️"}
              </div>

            </div>
          ))}

        </div>

        {/* Empty State Example */}
        {notifications.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">🔔</div>

            <h2 className="text-xl text-white font-semibold">
              No notifications
            </h2>

            <p className="mt-2">
              You're all caught up!
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default NotificationPage;
