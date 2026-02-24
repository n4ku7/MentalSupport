import { useContext, useEffect, useState } from "react";
import {
  fetchTherapists,
  bookAppointment,
} from "../../services/appointmentService";
import TherapistCard from "../../components/appointments/TherapistCard";
import { ToastContext } from "../../context/ToastContextObject";

function Appointments() {
  const { showToast } = useContext(ToastContext);
  const [therapists, setTherapists] = useState([]);
  const [bookingKey, setBookingKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTherapists();
        setTherapists(data);
      } catch (error) {
        showToast(
          error.response?.data?.message || "Failed to load therapists",
          "error",
        );
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [showToast]);

  const handleBook = async (therapistId, date, timeSlot) => {
    const currentBookingKey = `${therapistId}-${date}-${timeSlot}`;
    setBookingKey(currentBookingKey);

    try {
      await bookAppointment({ therapistId, date, timeSlot });
      showToast("Appointment booked successfully", "success");
      const data = await fetchTherapists();
      setTherapists(data);
    } catch (error) {
      showToast(error.response?.data?.message || "Booking failed", "error");
    } finally {
      setBookingKey(null);
    }
  };

  return (
    <section className="stack">
      <header className="page-header">
        <h1 className="page-title">Book Appointment</h1>
        <p className="page-subtitle">
          Choose a therapist and select an available slot for your session.
        </p>
      </header>

      <div className="grid">
        {isLoading ? (
          <article className="card">
            <p className="card-text">Loading therapists...</p>
          </article>
        ) : therapists.length === 0 ? (
          <article className="card">
            <p className="card-text">No therapists available for booking.</p>
          </article>
        ) : (
          therapists.map((t) => (
            <TherapistCard
              key={t._id}
              therapist={t}
              onBook={handleBook}
              bookingKey={bookingKey}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Appointments;
