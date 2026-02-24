function AppointmentCard({ appointment, showStudent = false }) {
  const statusClass =
    appointment.status === "confirmed"
      ? "chip chip-success"
      : appointment.status === "cancelled"
        ? "chip chip-danger"
        : "chip chip-warning";

  return (
    <article className="card stack">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3 className="card-title">
          {showStudent ? appointment.student.name : appointment.therapist.name}
        </h3>
        <span className={statusClass}>{appointment.status}</span>
      </div>
      {showStudent ? (
        <p className="card-text">
          <strong>Therapist:</strong> {appointment.therapist.name}
        </p>
      ) : (
        <p className="card-text">
          <strong>Date:</strong> {appointment.date}
        </p>
      )}
      {showStudent && (
        <p className="card-text">
          <strong>Date:</strong> {appointment.date}
        </p>
      )}
      <p className="card-text">
        <strong>Time:</strong> {appointment.timeSlot}
      </p>
    </article>
  );
}

export default AppointmentCard;
