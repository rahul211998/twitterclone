// import XSvg from "../svgs/X";

// import { MdHomeFilled } from "react-icons/md";
// import { IoNotifications } from "react-icons/io5";
// import { FaUser } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { BiLogOut } from "react-icons/bi";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// const Sidebar = () => {
// 	const queryClient = useQueryClient();
// 	const { mutate: logout } = useMutation({
// 		mutationFn: async () => {
// 			try {
// 				const res = await fetch("/api/auth/logout", {
// 					method: "POST",
// 				});
// 				const data = await res.json();

// 				if (!res.ok) {
// 					throw new Error(data.error || "Something went wrong");
// 				}
// 			} catch (error) {
// 				throw new Error(error);
// 			}
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["authUser"] });
// 		},
// 		onError: () => {
// 			toast.error("Logout failed");
// 		},
// 	});
// 	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

// 	return (
// 		<div className='md:flex-[2_2_0] w-18 max-w-52'>
// 			<div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full'>
// 				<Link to='/' className='flex justify-center md:justify-start'>
// 					<XSvg className='px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900' />
// 				</Link>
// 				<ul className='flex flex-col gap-3 mt-4'>
// 					<li className='flex justify-center md:justify-start'>
// 						<Link
// 							to='/'
// 							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
// 						>
// 							<MdHomeFilled className='w-8 h-8' />
// 							<span className='text-lg hidden md:block'>Home</span>
// 						</Link>
// 					</li>
// 					<li className='flex justify-center md:justify-start'>
// 						<Link
// 							to='/notifications'
// 							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
// 						>
// 							<IoNotifications className='w-6 h-6' />
// 							<span className='text-lg hidden md:block'>Notifications</span>
// 						</Link>
// 					</li>

// 					<li className='flex justify-center md:justify-start'>
// 						<Link
// 							to={`/profile/${authUser?.username}`}
// 							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
// 						>
// 							<FaUser className='w-6 h-6' />
// 							<span className='text-lg hidden md:block'>Profile</span>
// 						</Link>
// 					</li>
// 				</ul>
// 				{authUser && (
// 					<Link
// 						to={`/profile/${authUser.username}`}
// 						className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full'
// 					>
// 						<div className='avatar hidden md:inline-flex'>
// 							<div className='w-8 rounded-full'>
// 								<img src={authUser?.profileImg || "/avatar-placeholder.png"} />
// 							</div>
// 						</div>
// 						<div className='flex justify-between flex-1'>
// 							<div className='hidden md:block'>
// 								<p className='text-white font-bold text-sm w-20 truncate'>{authUser?.fullName}</p>
// 								<p className='text-slate-500 text-sm'>@{authUser?.username}</p>
// 							</div>
// 							<BiLogOut
// 								className='w-5 h-5 cursor-pointer'
// 								onClick={(e) => {
// 									e.preventDefault();
// 									logout();
// 								}}
// 							/>
// 						</div>
// 					</Link>
// 				)}
// 			</div>
// 		</div>
// 	);
// };
// export default Sidebar;




import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {

  const { authUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  

    const data = {
        fullName : "John Doe",
        username : "johndoe",
        profileImg : "/avatars/boy1.png"
    }
  const menuItems = [
    { name: "Home",  page : "/dummypage"},
    
    { name: "Notifications",  page : "/notificationpage"},

    {name : "Messages", page : "/messages"}

    // { name: "Profile",  },
  ];

  console.log("hellos")

  const toUserProfile = () => {
    navigate("/userprofilepage")
;  }

  useEffect(() => {
    console.log("first sidebar")
    console.log("authUser iss from sidebar",authUser)
  }, [authUser])

  return (
    <aside className="w-64 h-auto bg-gray-900 text-white flex flex-col p-5">
      {/* Logo */}
      <h1 className="text-3xl font-bold mb-10 text-blue-500" onClick={() => navigate("/homepage")}>
        MyApp
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
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
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