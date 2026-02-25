import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextObject";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const links = !user
    ? [
        { to: "/", label: "Home" },
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
      ]
    : user.role === "admin"
      ? [
          { to: "/admin", label: "Dashboard" },
          { to: "/admin/resources", label: "Resources" },
          { to: "/admin/appointments", label: "Appointments" },
          { to: "/admin/therapists", label: "Therapists" },
          { to: "/admin/users", label: "Users" },
        ]
      : user.role === "therapist"
        ? [
            { to: "/student", label: "Dashboard" },
            { to: "/therapist/availability", label: "My Free Time" },
            { to: "/student/resources", label: "Resources" },
            { to: "/student/forum", label: "Forum" },
            { to: "/student/my-appointments", label: "My Sessions" },
          ]
        : [
            { to: "/student", label: "Dashboard" },
            { to: "/student/resources", label: "Resources" },
            { to: "/student/forum", label: "Forum" },
            { to: "/student/appointments", label: "Book Session" },
            { to: "/student/my-appointments", label: "My Sessions" },
          ];

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <div className="brand-mark" />
          <div>
            <p className="brand-title">Mental Support Hub</p>
            <p className="brand-subtitle">Wellness & Care Dashboard</p>
          </div>
        </div>

        <nav className={`topbar-nav ${user ? "topbar-nav-auth" : ""}`}>
          {links.map((item) => (
            <Link key={item.to} to={item.to} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="user-panel">
          {user ? (
            <>
              <span className="chip">{user.name}</span>
              <span className="chip chip-success">{user.role}</span>
              <button className="btn btn-ghost" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <span className="chip">Guest</span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
