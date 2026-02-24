import SlotSelector from "./SlotSelector";

function TherapistCard({ therapist, onBook, bookingKey }) {
  return (
    <article className="card stack">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3 className="card-title">{therapist.name}</h3>
        <span className="chip">{therapist.specialization}</span>
      </div>

      <p className="card-text">{therapist.bio || "No biography available."}</p>

      <SlotSelector
        slots={therapist.availableSlots}
        therapistId={therapist._id}
        onBook={onBook}
        bookingKey={bookingKey}
      />
    </article>
  );
}

export default TherapistCard;
