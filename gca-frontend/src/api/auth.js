export const login = async (email, password) => {
  // TEMP MOCK (replace with API later)
  if (email === "rohit@gca.com" && password === "rohit123") {
    return { role: "admin", token: "demo-token" };
  }
  throw new Error("Invalid credentials");
};
