import { useState } from "react";

export default function SessionsTab() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [sessions, setSessions] = useState([]);

  const addSession = () => {
    if (!topic) return;
    setSessions([
      ...sessions,
      { topic, notes, date: new Date().toLocaleDateString() }
    ]);
    setTopic("");
    setNotes("");
  };

  return (
    <>
      <h3>Add Session</h3>

      <input
        placeholder="Session Topic (e.g. Sicilian Defense)"
        value={topic}
        onChange={e => setTopic(e.target.value)}
      />

      <textarea
        placeholder="Coach notes / focus areas"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />

      <button className="primary" onClick={addSession}>
        Save Session
      </button>

      <h4 style={{ marginTop: 30 }}>Previous Sessions</h4>

      <ul className="session-list">
        {sessions.map((s, i) => (
          <li key={i}>
            <strong>{s.topic}</strong>
            <span>{s.date}</span>
            <p>{s.notes}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
