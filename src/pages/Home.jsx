import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="stack">
      <header className="page-header">
        <h1 className="page-title">Mental Wellness Dashboard</h1>
        <p className="page-subtitle">
          A professional support workspace for students, therapists, and
          administrators.
        </p>
      </header>

      <div className="grid grid-3">
        <article className="card">
          <h3 className="card-title">Student Workspace</h3>
          <p className="card-text">
            Book sessions, follow upcoming appointments, and access verified
            resources.
          </p>
        </article>
        <article className="card">
          <h3 className="card-title">Clinical Coordination</h3>
          <p className="card-text">
            Track therapist schedules and improve availability across care
            teams.
          </p>
        </article>
        <article className="card">
          <h3 className="card-title">Admin Control Center</h3>
          <p className="card-text">
            Manage resources, appointment flows, and therapist onboarding.
          </p>
        </article>
      </div>

      <div className="row">
        <Link to="/login" className="btn btn-primary">
          Open Dashboard
        </Link>
        <Link to="/register" className="btn btn-secondary">
          Create Account
        </Link>
      </div>
    </section>
  );
}

export default Home;
