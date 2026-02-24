import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextObject";
import { ToastContext } from "../../context/ToastContextObject";
import { login as loginService } from "../../services/authService";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = await loginService(form);

      login(data);
      showToast("Login successful", "success");

      navigate(data.role === "admin" ? "/admin" : "/student");
    } catch (error) {
      showToast(error.response?.data?.message || "Login failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="stack">
      <header className="page-header">
        <h1 className="page-title">Welcome Back</h1>
        <p className="page-subtitle">
          Sign in to access your mental health support dashboard.
        </p>
      </header>

      <article className="card" style={{ maxWidth: 520 }}>
        <form className="form" onSubmit={handleSubmit}>
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
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </label>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="card-text" style={{ marginTop: 12 }}>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </article>
    </section>
  );
}

export default Login;
