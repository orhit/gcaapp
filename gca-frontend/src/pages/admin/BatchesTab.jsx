import { useEffect, useState } from "react";

export default function BatchesTab() {
  const [batches, setBatches] = useState([]);
  const [branches, setBranches] = useState([]);
  const [coaches, setCoaches] = useState([]);

  const [name, setName] = useState("");
  const [branchId, setBranchId] = useState("");
  const [coachId, setCoachId] = useState("");

  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  const loadData = async () => {
    const [bRes, cRes, btRes] = await Promise.all([
      fetch(`http://127.0.0.1:8000/admin/branches?email=${email}&password=${password}`),
      fetch(`http://127.0.0.1:8000/admin/coaches?email=${email}&password=${password}`),
      fetch(`http://127.0.0.1:8000/admin/batches?email=${email}&password=${password}`)
    ]);

    setBranches(await bRes.json());
    setCoaches(await cRes.json());
    setBatches(await btRes.json());
  };

  useEffect(() => {
    loadData();
  }, []);

  const addBatch = async () => {
    if (!name || !branchId || !coachId) return;

    await fetch(
      `http://127.0.0.1:8000/admin/create-batch?email=${email}&password=${password}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          branch_id: branchId,
          coach_id: coachId,
        }),
      }
    );

    setName("");
    setBranchId("");
    setCoachId("");
    loadData();
  };

  return (
    <>
      <h3>Create Batch</h3>

      <div className="form-row">
        <input
          placeholder="Batch Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select value={branchId} onChange={(e) => setBranchId(e.target.value)}>
          <option value="">Select Branch</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <select value={coachId} onChange={(e) => setCoachId(e.target.value)}>
          <option value="">Select Coach</option>
          {coaches.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button onClick={addBatch}>Add</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Batch</th>
            <th>Branch</th>
            <th>Coach</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.branch_id}</td>
              <td>{b.coach_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
