import { useEffect, useState } from "react";
import { fetchAllAppointments } from "../../services/appointmentService";
import AppointmentCard from "../../components/appointments/AppointmentCard";

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchAllAppointments();
      setAppointments(data);
    };
    load();
  }, []);

  return (
    <section className="stack">
      <header className="page-header">
        <h1 className="page-title">All Appointments</h1>
        <p className="page-subtitle">
          Operational view of student sessions across all therapists.
        </p>
      </header>

      {appointments.length === 0 ? (
        <article className="card">
          <p className="card-text">No appointments found.</p>
        </article>
      ) : (
        <div className="grid grid-2">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              showStudent
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ManageAppointments;
