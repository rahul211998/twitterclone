import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from './pages/auth/SignUp'
import Login from './pages/auth/Login'
import DummyPage from './pages/auth/DummyPage'
import Optional2fa from './pages/2fa/Optional2fa'
import QrCodePage from './pages/2fa/QrCodePage'
import ThemePage from "./themes/Theme"
import HomePage from './pages/home/HomePage'
import NotificationPage from './pages/notification/NotificationPage'
import MainLayout from "./MainLayout";
import { AuthProvider } from "./context/AuthContext";
import Twofaerrorpage from "./errorpages/Twofaerrorpage";
import Userprofile from "./components/profile/Userprofile";
import Messages from "./pages/message/Messages";
import Following from "./components/profile/follow/Following";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "./components/common/insideSideBar/Settings";

function App() {
  console.log("app runs")
  return (
    <BrowserRouter>
    <AuthProvider>
    {/* <BrowserRouter> */}
      {/* <ThemePage /> */}

      <ToastContainer />

      <Routes>

          <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Without Sidebar */}
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/oprional2fa" element={<Optional2fa />} />
        <Route path="/qrcodepage" element={<QrCodePage />} />
        <Route path="/twofaerrorpage" element={<Twofaerrorpage />} />

        {/* With Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/notificationpage" element={<NotificationPage />} />
          <Route path="/dummypage" element={<DummyPage />} />
          <Route path="/userprofilepage" element={<Userprofile/>}/>
          <Route path="/messages" element={<Messages/>}/>
          <Route path="/following" element={<Following/>}/>
          <Route path="/settings" element={<Settings/>}/>
        </Route>

      </Routes>
    {/* </BrowserRouter> */}
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;