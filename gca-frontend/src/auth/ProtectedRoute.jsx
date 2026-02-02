import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, children }) {
  const userRole = localStorage.getItem("role");

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}