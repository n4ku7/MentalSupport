import { useContext } from "react";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Sidebar from "./components/common/Sidebar";
import ToastViewport from "./components/common/ToastViewport";
import { AuthContext } from "./context/AuthContextObject";
import { Analytics } from "@vercel/analytics/react";
function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="app-shell">
      <ToastViewport />
      <Navbar />
      <main className={`main-content ${user ? "with-sidebar" : ""}`}>
        {user ? (
          <div className="layout-grid">
            <Sidebar />
            <section className="content-pane">
              <AppRoutes />
            </section>
          </div>
        ) : (
          <AppRoutes />
        )}
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
