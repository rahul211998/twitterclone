import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {

  const { authUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  
  const menuItems = [
    
    { name: "Notifications",  page : "/notificationpage"},

    {name : "Setting", page : "/settings"},

    { name: "LogOut",  page : "/dummypage"},

    // { name: "Profile",  },
  ];

  console.log("hellos")

  const toUserProfile = () => {
    navigate("/userprofilepage")
;  }

  return (
    // <aside className="w-64 h-auto bg-gray-900 text-white flex flex-col p-5 overflow-hidden">
     <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white p-5 flex flex-col">
      {/* Logo */}
      <h1 className="text-3xl font-bold mb-10 text-blue-500 cursor-pointer" onClick={() => navigate("/homepage")}>
        Twitter
      </h1>

      {/* Menu */}
      <nav className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            {item.icon}
            {/* <span className="text-lg">{item.name}</span> */}
            <Link to= {item.page}>{item.name}</Link>
          </button>
        ))}
      </nav>

      {/* Bottom Profile */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src={authUser?.profileImg
 || "https://i.pravatar.cc/40"}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="">
            <p className="font-semibold" onClick={toUserProfile}>{storedUser?.username ?? "user"}</p>
            <p className="text-sm text-gray-400">{storedUser?.fullName ?? "user"}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;