import { useState } from "react";
import { createEmployee } from "./api";
const DEPARTMENTS = ["HR", "IT", "Sales", "Finance", "Operations", "Marketing"];

export default function EmployeeForm({ onEmployeeCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState(DEPARTMENTS[0]);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const newEmployee = await createEmployee(name, email,dept);
      onEmployeeCreated(newEmployee);
      setName("");
      setEmail("");
      setDept(DEPARTMENTS[0]);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h2>New Entry</h2>
      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <p>Department: <select className="opt" value={dept} onChange={(e) => setDept(e.target.value)}>
        {DEPARTMENTS.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select></p>
      
      <button type="submit">Register</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}