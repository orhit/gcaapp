import { useState } from "react";

const demoBatch = {
  name: "Under-12 Advanced",
  students: [
    { name: "Arjun", present: true },
    { name: "Riya", present: true },
    { name: "Kabir", present: false }
  ]
};

export default function AttendanceTab() {
  const [students, setStudents] = useState(demoBatch.students);

  const toggle = (i) => {
    const updated = [...students];
    updated[i].present = !updated[i].present;
    setStudents(updated);
  };

  const submitAttendance = () => {
    console.log("Attendance submitted:", students);
    alert("Attendance saved");
  };

  return (
    <>
      <h3>{demoBatch.name}</h3>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={s.present}
                  onChange={() => toggle(i)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="primary" onClick={submitAttendance}>
        Save Attendance
      </button>
    </>
  );
}
