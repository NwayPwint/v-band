import { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("admin_auth") !== "true") {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    navigate("/admin/login");
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h1>VELOCITY</h1>
          <p>Admin Panel</p>
        </div>
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/admin" end>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/members">Members</NavLink>
          </li>
          <li>
            <NavLink to="/admin/songs">Songs</NavLink>
          </li>
          <li>
            <NavLink to="/admin/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/admin/achievements">Achievements</NavLink>
          </li>
        </ul>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-logout">Logout</button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
