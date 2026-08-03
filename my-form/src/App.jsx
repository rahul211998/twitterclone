import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <ThemePage />

      <Routes>

        {/* Without Sidebar */}
        <Route path="/" element={<Login />} />
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
        </Route>

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;