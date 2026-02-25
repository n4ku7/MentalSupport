import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextObject";
import { ToastContext } from "../../context/ToastContextObject";
import { register } from "../../services/authService";

function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    specialization: "",
    bio: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = await register(form);

      login(data);
      showToast("Account created successfully", "success");

      if (data.role === "admin") {
        navigate("/admin");
      } else if (data.role === "therapist") {
        navigate("/therapist/availability");
      } else {
        navigate("/student");
      }
    } catch (error) {
      showToast(
        error.response?.data?.message || "Registration failed",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="stack">
      <header className="page-header">
        <h1 className="page-title">Create Account</h1>
        <p className="page-subtitle">
          Start using a unified dashboard for mental support services.
        </p>
      </header>

      <article className="card" style={{ maxWidth: 560 }}>
        <form className="form" onSubmit={handleSubmit}>
          <label className="form-label">
            Full Name
            <input
              className="input"
              name="name"
              placeholder="Enter full name"
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-label">
            Email Address
            <input
              className="input"
              name="email"
              type="email"
              placeholder="you@university.edu"
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-label">
            Password
            <input
              className="input"
              name="password"
              type="password"
              placeholder="Choose a strong password"
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-label">
            Role
            <select className="select" name="role" onChange={handleChange}>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="therapist">Therapist</option>
            </select>
          </label>

          {form.role === "therapist" && (
            <>
              <label className="form-label">
                Specialization
                <input
                  className="input"
                  name="specialization"
                  placeholder="e.g. Anxiety, CBT"
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-label">
                Bio
                <textarea
                  className="textarea"
                  name="bio"
                  placeholder="Professional summary"
                  onChange={handleChange}
                />
              </label>
            </>
          )}

          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="card-text" style={{ marginTop: 12 }}>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </article>
    </section>
  );
}

export default Register;
