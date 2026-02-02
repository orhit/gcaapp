import { useEffect, useState } from "react";
import { API_BASE } from "../../config";

export default function AssignmentsTab() {
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [message, setMessage] = useState("");

  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  const loadData = async () => {
    const [uRes, bRes] = await Promise.all([
      fetch(`${API_BASE}/admin/users?email=${email}&password=${password}`),
      fetch(`${API_BASE}/admin/batches?email=${email}&password=${password}`)
    ]);

    const users = await uRes.json();
    setStudents(users.filter(u => u.role === "student"));
    setBatches(await bRes.json());
  };

  useEffect(() => {
    loadData();
  }, []);

  const assign = async () => {
    setMessage("");

    const res = await fetch(
      `${API_BASE}/admin/assign-student?email=${email}&password=${password}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          batch_id: batchId
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.detail);
    } else {
      setMessage("Assigned successfully");
      setStudentId("");
      setBatchId("");
    }
  };

  return (
    <>
      <h3>Assign Student to Batch</h3>

      <div className="form-row">
        <select value={studentId} onChange={e => setStudentId(e.target.value)}>
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <select value={batchId} onChange={e => setBatchId(e.target.value)}>
          <option value="">Select Batch</option>
          {batches.map(b => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <button onClick={assign}>Assign</button>
      </div>

      {message && <p>{message}</p>}
    </>
  );
}
