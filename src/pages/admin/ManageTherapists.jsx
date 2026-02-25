import { useContext, useEffect, useState } from "react";
import {
  createTherapist,
  fetchTherapists,
} from "../../services/appointmentService";
import { createTherapistUser } from "../../services/authService";
import { ToastContext } from "../../context/ToastContextObject";

function ManageTherapists() {
  const { showToast } = useContext(ToastContext);
  const [therapists, setTherapists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUserSubmitting, setIsUserSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    bio: "",
  });
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    bio: "",
  });

  const loadTherapists = async () => {
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

  useEffect(() => {
    let ignore = false;

    fetchTherapists()
      .then((data) => {
        if (!ignore) {
          setTherapists(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (!ignore) {
          showToast(
            error.response?.data?.message || "Failed to load therapists",
            "error",
          );
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [showToast]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await createTherapist({ ...form, availableSlots: [] });
      setForm({ name: "", specialization: "", bio: "" });
      await loadTherapists();
      showToast("Therapist added successfully", "success");
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to create therapist",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    setIsUserSubmitting(true);

    try {
      await createTherapistUser(userForm);
      setUserForm({
        name: "",
        email: "",
        password: "",
        specialization: "",
        bio: "",
      });
      showToast("Therapist user account created", "success");
      await loadTherapists();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to create therapist user",
        "error",
      );
    } finally {
      setIsUserSubmitting(false);
    }
  };

  return (
    <section className="stack">
      <header className="page-header">
        <h1 className="page-title">Manage Therapists</h1>
        <p className="page-subtitle">
          Maintain therapist profiles and strengthen appointment coverage.
        </p>
      </header>

      <div className="grid grid-3">
        <article className="card">
          <h3 className="card-title">Add Therapist</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label className="form-label">
              Name
              <input
                className="input"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Therapist full name"
                required
              />
            </label>

            <label className="form-label">
              Specialization
              <input
                className="input"
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                placeholder="e.g. CBT, Trauma, Anxiety"
                required
              />
            </label>

            <label className="form-label">
              Bio
              <textarea
                className="textarea"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Professional summary"
              />
            </label>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding therapist..." : "Add Therapist"}
            </button>
          </form>
        </article>

        <article className="card">
          <h3 className="card-title">Add Therapist User</h3>
          <form className="form" onSubmit={handleUserSubmit}>
            <label className="form-label">
              Name
              <input
                className="input"
                name="name"
                value={userForm.name}
                onChange={(event) =>
                  setUserForm({ ...userForm, name: event.target.value })
                }
                placeholder="User full name"
                required
              />
            </label>

            <label className="form-label">
              Email
              <input
                className="input"
                name="email"
                type="email"
                value={userForm.email}
                onChange={(event) =>
                  setUserForm({ ...userForm, email: event.target.value })
                }
                placeholder="therapist@domain.com"
                required
              />
            </label>

            <label className="form-label">
              Password
              <input
                className="input"
                name="password"
                type="password"
                value={userForm.password}
                onChange={(event) =>
                  setUserForm({ ...userForm, password: event.target.value })
                }
                placeholder="Create temporary password"
                required
              />
            </label>

            <label className="form-label">
              Specialization
              <input
                className="input"
                name="specialization"
                value={userForm.specialization}
                onChange={(event) =>
                  setUserForm({ ...userForm, specialization: event.target.value })
                }
                placeholder="e.g. Anxiety, CBT"
              />
            </label>

            <label className="form-label">
              Bio
              <textarea
                className="textarea"
                name="bio"
                value={userForm.bio}
                onChange={(event) =>
                  setUserForm({ ...userForm, bio: event.target.value })
                }
                placeholder="Professional summary"
              />
            </label>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isUserSubmitting}
            >
              {isUserSubmitting ? "Creating user..." : "Create User"}
            </button>
          </form>
        </article>

        <article className="card stack">
          <h3 className="card-title">Current Directory</h3>
          {isLoading ? (
            <p className="card-text">Loading therapists...</p>
          ) : therapists.length === 0 ? (
            <p className="card-text">No therapists available.</p>
          ) : (
            therapists.map((therapist) => (
              <div key={therapist._id} className="card" style={{ padding: 12 }}>
                <div
                  className="row"
                  style={{ justifyContent: "space-between" }}
                >
                  <strong>{therapist.name}</strong>
                  <span className="chip">{therapist.specialization}</span>
                </div>
                <p className="card-text" style={{ marginTop: 8 }}>
                  {therapist.bio || "No bio provided."}
                </p>
              </div>
            ))
          )}
        </article>
      </div>
    </section>
  );
}

export default ManageTherapists;
