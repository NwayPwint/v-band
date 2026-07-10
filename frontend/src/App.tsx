import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./components/AdminLayout";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Music from "./pages/public/Music";
import Tour from "./pages/public/Tour";
import PublicMembers from "./pages/public/Members";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Songs from "./pages/Songs";
import Events from "./pages/Events";
import Achievements from "./pages/Achievements";
import Interviews from "./pages/Interviews";
import AdminLogin from "./pages/AdminLogin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="music" element={<Music />} />
          <Route path="tour" element={<Tour />} />
          <Route path="members" element={<PublicMembers />} />
          <Route path="explore" element={<Navigate to="/members" replace />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="songs" element={<Songs />} />
          <Route path="events" element={<Events />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="interviews" element={<Interviews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
