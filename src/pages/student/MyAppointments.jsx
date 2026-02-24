import { useEffect, useState } from "react";
import { fetchMyAppointments } from "../../services/appointmentService";
import AppointmentCard from "../../components/appointments/AppointmentCard";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchMyAppointments();
      setAppointments(data);
    };
    load();
  }, []);

  return (
    <section className="stack">
      <header className="page-header">
        <h1 className="page-title">My Appointments</h1>
        <p className="page-subtitle">
          View upcoming and completed sessions in one timeline.
        </p>
      </header>

      {appointments.length === 0 ? (
        <article className="card">
          <p className="card-text">No appointments booked yet.</p>
        </article>
      ) : (
        <div className="grid grid-2">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment._id} appointment={appointment} />
          ))}
        </div>
      )}
    </section>
  );
}

export default MyAppointments;
