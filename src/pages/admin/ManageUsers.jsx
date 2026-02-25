import { useContext, useEffect, useState } from "react";
import { fetchAllUsers } from "../../services/authService";
import { ToastContext } from "../../context/ToastContextObject";

function ManageUsers() {
  const { showToast } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        showToast(error.response?.data?.message || "Failed to load users", "error");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [showToast]);

  return (
    <section className="stack">
      <header className="page-header">
        <h1 className="page-title">All Users</h1>
        <p className="page-subtitle">
          View all registered users and their assigned roles.
        </p>
      </header>

      <article className="card stack">
        {isLoading ? (
          <p className="card-text">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="card-text">No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user._id} className="card" style={{ padding: 12 }}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <strong>{user.name}</strong>
                <span className="chip chip-success">{user.role}</span>
              </div>
              <p className="card-text" style={{ marginTop: 8 }}>
                {user.email}
              </p>
            </div>
          ))
        )}
      </article>
    </section>
  );
}

export default ManageUsers;
