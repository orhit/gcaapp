import { useEffect, useState } from "react";

export default function UsersTab() {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "coach",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  // 🔄 Load users from DB
  const loadUsers = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/admin/users?email=${email}&password=${password}`
    );
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ➕ Add new user
  const addUser = async () => {
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://127.0.0.1:8000/admin/create-user?email=${email}&password=${password}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed to create user");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "coach",
      });

      loadUsers(); // 🔄 refresh table
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // 🎯 Filter logic (frontend only)
  const filteredUsers =
    filterRole === "all"
      ? users
      : users.filter((u) => u.role === filterRole);

  return (
    <>
      <h3>Create User</h3>

      <div className="form-row">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="coach">Coach</option>
          <option value="student">Student</option>
          <option value="parent">Parent</option>
        </select>

        <button onClick={addUser} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🔍 FILTER */}
      <div style={{ margin: "20px 0" }}>
        <label style={{ marginRight: 10 }}>Filter by role:</label>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All</option>
          <option value="coach">Coach</option>
          <option value="student">Student</option>
          <option value="parent">Parent</option>
        </select>
      </div>

      {/* 📋 USERS TABLE */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.active ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
