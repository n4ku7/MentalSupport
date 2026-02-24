function SlotSelector({ slots, onBook, therapistId, bookingKey }) {
  if (!slots || slots.length === 0) {
    return <span className="chip chip-warning">No slots available</span>;
  }

  return (
    <div className="stack">
      {slots.map((slot, index) => (
        <div key={index} className="card" style={{ padding: 12 }}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <strong>{slot.date}</strong>
            <span className="chip">Open Slots</span>
          </div>
          <div className="row" style={{ marginTop: 10 }}>
            {slot.timeSlots.map((time, timeIndex) =>
              (() => {
                const slotKey = `${therapistId}-${slot.date}-${time}`;
                const isBooking = bookingKey === slotKey;

                return (
                  <button
                    key={timeIndex}
                    className="btn btn-secondary"
                    disabled={Boolean(bookingKey)}
                    onClick={() => onBook(therapistId, slot.date, time)}
                  >
                    {isBooking ? "Booking..." : time}
                  </button>
                );
              })(),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SlotSelector;
