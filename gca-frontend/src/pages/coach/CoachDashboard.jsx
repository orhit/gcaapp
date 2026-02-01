import { useState } from "react";
import AttendanceTab from "./AttendanceTab";
import SessionsTab from "./SessionsTab";
import "../../styles/coach.css";

export default function CoachDashboard() {
  const [tab, setTab] = useState("attendance");

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="coach-wrapper">
      <header className="coach-header">
        <h2>Coach Panel</h2>
        <div className="coach-right">
          <span className="role-badge coach">COACH</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="coach-tabs">
        <button
          className={tab === "attendance" ? "active" : ""}
          onClick={() => setTab("attendance")}
        >
          Attendance
        </button>
        <button
          className={tab === "sessions" ? "active" : ""}
          onClick={() => setTab("sessions")}
        >
          Sessions
        </button>
      </div>

      <main className="coach-content">
        {tab === "attendance" && <AttendanceTab />}
        {tab === "sessions" && <SessionsTab />}
      </main>
    </div>
  );
}
