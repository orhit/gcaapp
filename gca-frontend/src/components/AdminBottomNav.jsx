export default function AdminBottomNav({ tab, setTab }) {
  return (
    <nav className="admin-bottom-nav">
      <button
        className={tab === "users" ? "active" : ""}
        onClick={() => setTab("users")}
      >
        Users
      </button>

      <button
        className={tab === "branches" ? "active" : ""}
        onClick={() => setTab("branches")}
      >
        Branches
      </button>

      <button
        className={tab === "batches" ? "active" : ""}
        onClick={() => setTab("batches")}
      >
        Batches
      </button>

      <button
        className={tab === "assign" ? "active" : ""}
        onClick={() => setTab("assign")}
      >
        Assign
      </button>
    </nav>
  );
}
