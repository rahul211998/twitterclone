import { useNavigate } from "react-router-dom";
import { postRequest } from "../../services/Api";

const DummyPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const logoutst = await postRequest("/auth/logout");
      console.log("logoutst",logoutst)
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 active:scale-95 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </nav>

      {/* Page Content */}
      <div className="p-6">
        <p className="text-gray-500 text-sm">Welcome to the dashboard.</p>
      </div>

    </div>
  );
};

export default DummyPage;