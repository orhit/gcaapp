import { useState } from "react";
import UsersTab from "./UsersTab";
import BranchesTab from "./BranchesTab";
import BatchesTab from "./BatchesTab";
import AssignmentsTab from "./AssignmentsTab";
import "../../styles/admin.css";

export default function AdminDashboard() {
  const [tab, setTab] = useState("users");

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="admin-wrapper">
      <header className="admin-header">
        <h2>Gambit Academy</h2>
        <div className="admin-right">
          <span className="role-badge">ADMIN</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="admin-body">
        <aside className="admin-sidebar">
          <button onClick={() => setTab("users")} className={tab==="users"?"active":""}>Users</button>
          <button onClick={() => setTab("branches")} className={tab==="branches"?"active":""}>Branches</button>
          <button onClick={() => setTab("batches")} className={tab==="batches"?"active":""}>Batches</button>
          <button onClick={() => setTab("assign")} className={tab==="assign"?"active":""}>Assignments</button>
        </aside>

        <main className="admin-content">
          {tab === "users" && <UsersTab />}
          {tab === "branches" && <BranchesTab />}
          {tab === "batches" && <BatchesTab />}
          {tab === "assign" && <AssignmentsTab />}
        </main>
      </div>
    </div>
  );
}
