import { useContext, useEffect, useMemo, useState } from "react";
import {
  addMyAvailability,
  fetchMyTherapistProfile,
} from "../../services/appointmentService";
import { ToastContext } from "../../context/ToastContextObject";

function ManageAvailability() {
  const { showToast } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [therapist, setTherapist] = useState(null);
  const [form, setForm] = useState({
    date: "",
    timeSlots: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMyTherapistProfile();
        setTherapist(data);
      } catch (error) {
        showToast(
          error.response?.data?.message || "Failed to load therapist profile",
          "error",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [showToast]);

  const sortedSlots = useMemo(() => {
    if (!therapist?.availableSlots) {
      return [];
    }

    return [...therapist.availableSlots].sort((a, b) =>
      a.date.localeCompare(b.date),
    );
  }, [therapist]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const slots = form.timeSlots
        .split(",")
        .map((slot) => slot.trim())
        .filter(Boolean);

      if (slots.length === 0) {
        showToast("Enter at least one time slot", "error");
        return;
      }

      const updated = await addMyAvailability({
        date: form.date,
        timeSlots: slots,
      });

      setTherapist(updated);
      setForm({ date: "", timeSlots: "" });
      showToast("Availability updated", "success");
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to update availability",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="stack">
      <header className="page-header">
        <h1 className="page-title">Manage Availability</h1>
        <p className="page-subtitle">
          Add your free time slots so students can book appointments.
        </p>
      </header>

      <div className="grid grid-2">
        <article className="card">
          <h3 className="card-title">Add Free Slots</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label className="form-label">
              Date
              <input
                className="input"
                type="date"
                name="date"
                value={form.date}
                onChange={(event) =>
                  setForm({ ...form, date: event.target.value })
                }
                required
              />
            </label>

            <label className="form-label">
              Time Slots (comma separated)
              <input
                className="input"
                name="timeSlots"
                value={form.timeSlots}
                onChange={(event) =>
                  setForm({ ...form, timeSlots: event.target.value })
                }
                placeholder="09:00 AM, 10:00 AM, 02:30 PM"
                required
              />
            </label>

            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Add Slots"}
            </button>
          </form>
        </article>

        <article className="card stack">
          <h3 className="card-title">Current Free Time</h3>
          {isLoading ? (
            <p className="card-text">Loading availability...</p>
          ) : sortedSlots.length === 0 ? (
            <p className="card-text">No free slots added yet.</p>
          ) : (
            sortedSlots.map((slot) => (
              <div key={slot.date} className="card" style={{ padding: 12 }}>
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <strong>{slot.date}</strong>
                  <span className="chip">{slot.timeSlots.length} slots</span>
                </div>
                <div className="row" style={{ marginTop: 10 }}>
                  {slot.timeSlots.map((time) => (
                    <span key={`${slot.date}-${time}`} className="chip">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </article>
      </div>
    </section>
  );
}

export default ManageAvailability;
