import { useEffect, useState } from "react";
import { API_BASE } from "../../config";

export default function CoachDashboard() {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  // Load branches on mount
  useEffect(() => {
    fetch(`${API_BASE}/coach/branches?email=${email}&password=${password}`)
      .then(res => res.json())
      .then(setBranches);
  }, []);

  // Load students when branch changes
  useEffect(() => {
    if (!selectedBranch) return;

    fetch(
      `${API_BASE}/coach/students?branch_id=${selectedBranch}&email=${email}&password=${password}`
    )
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        const initial = {};
        data.forEach(s => (initial[s.id] = true));
        setAttendance(initial);
      });
  }, [selectedBranch]);

  const toggleAttendance = (id) => {
    setAttendance(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const saveSession = async () => {
    setMessage("");

    if (!date || !time || !selectedBranch) {
      setMessage("Date, time and branch required");
      return;
    }

    // Step 1: get batch of this coach under branch
    const batchRes = await fetch(
      `${API_BASE}/coach/students?branch_id=${selectedBranch}&email=${email}&password=${password}`
    );
    const batchStudents = await batchRes.json();

    if (!batchStudents.length) {
      setMessage("No students found");
      return;
    }

    const batchId = batchStudents[0].batch_id || null; // backend already validated

    // Step 2: create session
    await fetch(`${API_BASE}/coach/session?email=${email}&password=${password}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        batch_id: batchId,
        date,
        time,
        topic
      })
    });

    // Step 3: save attendance
    const payload = {
      batch_id: batchId,
      date,
      attendance: students.map(s => ({
        student_id: s.id,
        present: attendance[s.id]
      }))
    };

    await fetch(
      `${API_BASE}/coach/attendance?email=${email}&password=${password}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    setMessage("Session & attendance saved ✅");
    setTopic("");
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Coach Dashboard</h2>

      {/* Branch selector */}
      <label>Branch</label>
      <select
        value={selectedBranch}
        onChange={e => setSelectedBranch(e.target.value)}
      >
        <option value="">Select Branch</option>
        {branches.map(b => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      {/* Session details */}
      {students.length > 0 && (
        <>
          <hr />
          <h4>Session Details</h4>

          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <input type="time" value={time} onChange={e => setTime(e.target.value)} />
          <input
            placeholder="Topic"
            value={topic}
            onChange={e => setTopic(e.target.value)}
          />

          <h4>Attendance</h4>

          {students.map(s => (
            <div key={s.id}>
              <label>
                <input
                  type="checkbox"
                  checked={attendance[s.id] || false}
                  onChange={() => toggleAttendance(s.id)}
                />
                {s.name}
              </label>
            </div>
          ))}

          <button onClick={saveSession}>Save Session</button>
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}
