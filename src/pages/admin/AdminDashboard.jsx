import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <section className="stack">
      <header className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">
          Centralized operational control for resources, appointments, and
          teams.
        </p>
      </header>

      <div className="grid grid-3">
        <article className="card">
          <h3 className="card-title">Resource Management</h3>
          <p className="card-text">
            Publish and maintain quality educational material for students.
          </p>
          <div className="row" style={{ marginTop: 12 }}>
            <Link className="btn btn-secondary" to="/admin/resources">
              Manage Resources
            </Link>
          </div>
        </article>

        <article className="card">
          <h3 className="card-title">Appointment Oversight</h3>
          <p className="card-text">
            Review sessions, monitor loads, and ensure service continuity.
          </p>
          <div className="row" style={{ marginTop: 12 }}>
            <Link className="btn btn-secondary" to="/admin/appointments">
              View Appointments
            </Link>
          </div>
        </article>

        <article className="card">
          <h3 className="card-title">Therapist Directory</h3>
          <p className="card-text">
            Add therapist profiles and keep the care team catalog up to date.
          </p>
          <div className="row" style={{ marginTop: 12 }}>
            <Link className="btn btn-secondary" to="/admin/therapists">
              Manage Therapists
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

export default AdminDashboard;
