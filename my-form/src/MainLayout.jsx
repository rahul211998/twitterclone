import { Outlet } from "react-router-dom";
import Sidebar from "./components/common/Sidebar"
import Rightpanel from "./components/common/Rightpanel";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <div className="flex-1">
        <Outlet />
      </div>

      <Rightpanel />
    </div>
  );
};

export default MainLayout;