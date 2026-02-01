import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CoachDashboard from "./pages/coach/CoachDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import ParentDashboard from "./pages/parent/ParentDashboard";

export default function App() {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Login />;
  }

  if (role === "admin") return <AdminDashboard />;
  if (role === "coach") return <CoachDashboard />;
  if (role === "student") return <StudentDashboard />;
  if (role === "parent") return <ParentDashboard />;

  // fallback
  localStorage.clear();
  return <Login />;
}
