import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/student/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Resources from "../pages/student/Resources";
import ManageResources from "../pages/admin/ManageResources";
import Appointments from "../pages/student/Appointments";
import MyAppointments from "../pages/student/MyAppointments";
import ManageAppointments from "../pages/admin/ManageAppointments";
import ManageTherapists from "../pages/admin/ManageTherapists";
import Forum from "../pages/student/Forum";
import ManageAvailability from "../pages/therapist/ManageAvailability";
import ManageUsers from "../pages/admin/ManageUsers";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin/appointments"
        element={
          <ProtectedRoute role="admin">
            <ManageAppointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/my-appointments"
        element={
          <ProtectedRoute role={["student", "therapist"]}>
            <MyAppointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/appointments"
        element={
          <ProtectedRoute role="student">
            <Appointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/resources"
        element={
          <ProtectedRoute role={["student", "therapist"]}>
            <Resources />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/forum"
        element={
          <ProtectedRoute role={["student", "therapist"]}>
            <Forum />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/resources"
        element={
          <ProtectedRoute role="admin">
            <ManageResources />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/therapists"
        element={
          <ProtectedRoute role="admin">
            <ManageTherapists />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/therapist/availability"
        element={
          <ProtectedRoute role="therapist">
            <ManageAvailability />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student"
        element={
          <ProtectedRoute role={["student", "therapist"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
