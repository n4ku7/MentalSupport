import { useContext } from "react";
import { ToastContext } from "../../context/ToastContextObject";

function ToastViewport() {
  const { toasts, removeToast } = useContext(ToastContext);

  return (
    <div className="toast-viewport" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span>{toast.message}</span>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastViewport;
