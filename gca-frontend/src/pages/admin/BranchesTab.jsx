import { useEffect, useState } from "react";

export default function BranchesTab() {
  const [branches, setBranches] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  const loadBranches = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/admin/branches?email=${email}&password=${password}`
    );
    const data = await res.json();
    setBranches(data);
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const addBranch = async () => {
    setError("");
    if (!name) return setError("Branch name required");

    await fetch(
      `http://127.0.0.1:8000/admin/create-branch?email=${email}&password=${password}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location }),
      }
    );

    setName("");
    setLocation("");
    loadBranches();
  };

  return (
    <>
      <h3>Create Branch</h3>

      <div className="form-row">
        <input
          placeholder="Branch Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={addBranch}>Add</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Branch</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.location || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
