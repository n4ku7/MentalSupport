import { useEffect, useState } from "react";
import {
  fetchAllAppointments,
  fetchTherapists,
} from "../../services/appointmentService";
import AppointmentCard from "../../components/appointments/AppointmentCard";

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [appointmentsData, therapistsData] = await Promise.all([
        fetchAllAppointments(),
        fetchTherapists(),
      ]);
      setAppointments(appointmentsData);
      setTherapists(therapistsData);
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

      <article className="card stack">
        <h3 className="card-title">Therapist Free Time</h3>
        {therapists.length === 0 ? (
          <p className="card-text">No therapists found.</p>
        ) : (
          therapists.map((therapist) => (
            <div key={therapist._id} className="card" style={{ padding: 12 }}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <strong>{therapist.name}</strong>
                <span className="chip">
                  {therapist.availableSlots?.length || 0} dates
                </span>
              </div>

              {!therapist.availableSlots || therapist.availableSlots.length === 0 ? (
                <p className="card-text" style={{ marginTop: 8 }}>
                  No free slots added.
                </p>
              ) : (
                therapist.availableSlots.map((slot) => (
                  <div key={`${therapist._id}-${slot.date}`} style={{ marginTop: 10 }}>
                    <p className="card-text">
                      <strong>{slot.date}</strong>
                    </p>
                    <div className="row" style={{ marginTop: 6 }}>
                      {slot.timeSlots.map((time) => (
                        <span key={`${slot.date}-${time}`} className="chip">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          ))
        )}
      </article>
    </section>
  );
}

export default ManageAppointments;
