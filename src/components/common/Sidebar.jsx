import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextObject";

function Sidebar() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  const links =
    user.role === "admin"
      ? [
          { to: "/admin", label: "Dashboard" },
          { to: "/admin/resources", label: "Resources" },
          { to: "/admin/appointments", label: "Appointments" },
          { to: "/admin/therapists", label: "Therapists" },
        ]
      : [
          { to: "/student", label: "Dashboard" },
          { to: "/student/resources", label: "Resources" },
          { to: "/student/forum", label: "Forum" },
          { to: "/student/appointments", label: "Book Session" },
          { to: "/student/my-appointments", label: "My Sessions" },
        ];

  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <p className="sidebar-heading">Navigation</p>
        <nav className="sidebar-nav">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin" || item.to === "/student"}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
