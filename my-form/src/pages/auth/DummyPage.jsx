// import { useNavigate } from "react-router-dom";
// import { postRequest } from "../../services/Api";

// const DummyPage = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const logoutst = await postRequest("/auth/logout");
//       console.log("logoutst",logoutst)
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* Navbar */}
//       <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//         <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 active:scale-95 transition"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//           </svg>
//           Logout
//         </button>
//       </nav>

//       {/* Page Content */}
//       <div className="p-6">
//         <p className="text-gray-500 text-sm">Welcome to the dashboard.</p>
//       </div>

//     </div>
//   );
// };

// export default DummyPage;







import { useNavigate } from "react-router-dom";
import { postRequest } from "../../services/Api";

const DummyPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const logoutst = await postRequest("/auth/logout");

      console.log("logoutst", logoutst);

      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="ml-64 min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 active:scale-95 transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>

          Logout
        </button>
      </nav>

      {/* Page Content */}
      <main className="p-6 min-h-[calc(100vh-73px)]">

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome back 👋
          </h2>

          <p className="text-gray-500 mt-1">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Posts
            </p>

            <h3 className="text-3xl font-bold text-gray-800 mt-2">
              24
            </h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Followers
            </p>

            <h3 className="text-3xl font-bold text-gray-800 mt-2">
              128
            </h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Following
            </p>

            <h3 className="text-3xl font-bold text-gray-800 mt-2">
              86
            </h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Notifications
            </p>

            <h3 className="text-3xl font-bold text-gray-800 mt-2">
              5
            </h3>
          </div>

        </div>

        {/* Dummy Activity */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mt-6 shadow-sm">

          <h2 className="text-lg font-semibold text-gray-800">
            Recent Activity
          </h2>

          <div className="mt-5 space-y-4">

            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <p className="text-gray-600">
                You created a new post
              </p>

              <span className="text-sm text-gray-400">
                2 hours ago
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <p className="text-gray-600">
                Ajith liked your post
              </p>

              <span className="text-sm text-gray-400">
                4 hours ago
              </span>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Vijay started following you
              </p>

              <span className="text-sm text-gray-400">
                Yesterday
              </span>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default DummyPage;

