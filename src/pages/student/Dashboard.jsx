import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextObject";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <section className="stack">
      <header className="page-header">
        <h1 className="page-title">
          {user?.role === "therapist" ? "Therapist Dashboard" : "Student Dashboard"}
        </h1>
        <p className="page-subtitle">
          Track your mental wellness journey and upcoming care actions.
        </p>
      </header>

      <div className="grid grid-2">
        <article className="card">
          <h3 className="card-title">Resources</h3>
          <p className="card-text">
            Explore curated learning content and practical mental health guides.
          </p>
          <div className="row" style={{ marginTop: 12 }}>
            <Link className="btn btn-secondary" to="/student/resources">
              View Resources
            </Link>
          </div>
        </article>

        {user?.role === "therapist" ? (
          <article className="card">
            <h3 className="card-title">My Free Time</h3>
            <p className="card-text">
              Add and manage your available slots for student booking.
            </p>
            <div className="row" style={{ marginTop: 12 }}>
              <Link className="btn btn-secondary" to="/therapist/availability">
                Manage Availability
              </Link>
            </div>
          </article>
        ) : (
          <article className="card">
            <h3 className="card-title">Book Appointment</h3>
            <p className="card-text">
              Find available therapist slots and schedule your next session.
            </p>
            <div className="row" style={{ marginTop: 12 }}>
              <Link className="btn btn-secondary" to="/student/appointments">
                Book Session
              </Link>
            </div>
          </article>
        )}

        <article className="card">
          <h3 className="card-title">My Appointments</h3>
          <p className="card-text">
            Review session details and monitor appointment status updates.
          </p>
          <div className="row" style={{ marginTop: 12 }}>
            <Link className="btn btn-secondary" to="/student/my-appointments">
              Open Schedule
            </Link>
          </div>
        </article>

        <article className="card">
          <h3 className="card-title">Community Forum</h3>
          <p className="card-text">
            Connect with peers, ask questions, and share supportive insights.
          </p>
          <div className="row" style={{ marginTop: 12 }}>
            <Link className="btn btn-secondary" to="/student/forum">
              Open Forum
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Dashboard;
