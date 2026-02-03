// src/api/auth.js
export const login = async (email, password) => {
  try {
    const res = await fetch("https://gacbackend-7gix.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Login failed");
    }

    const data = await res.json(); // { user_id, role, name }

    // ✅ Save role, user_id, name to localStorage
    localStorage.setItem("role", data.role);
    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("name", data.name);
    localStorage.setItem("email", email);

    return data; // Optional: you can use this in Login.jsx
  } catch (err) {
    throw new Error(err.message || "Login failed. Try again.");
  }
};