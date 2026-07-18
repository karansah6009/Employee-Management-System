import { useState } from "react";
import { checkIn, checkOut, updateEmployee } from "./api";

const DEPARTMENTS = ["HR", "IT", "Sales", "Finance", "Operations", "Marketing"];


export default function AttendenceCard({ employee,onEmployeeUpdated }) {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email || "");
  const [dept, setDept] = useState(employee.dept);
  const [editError, setEditError] = useState("");

  async function handleCheckIn() {
    setError("");
    try {
      const attendance = await checkIn(employee.id);
      setStatus({ type: "in", time: attendance.checkIn });
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleCheckOut() {
    setError("");
    try {
      const attendance = await checkOut(employee.id);
      setStatus({ type: "out", time: attendance.checkOut });
    } catch (err) {
      setError(err.message);
    }
  }

     
  async function handleSaveEdit(e) {
    e.preventDefault();
    setEditError("");
    try {
      const updated = await updateEmployee(employee.id, name, email, dept);
      onEmployeeUpdated(updated);
      setIsEditing(false);
    } catch (err) {
      setEditError(err.message);
    }
  }
 
  function handleCancelEdit() {
    setName(employee.name);
    setEmail(employee.email || "");
    setDept(employee.dept);
    setEditError("");
    setIsEditing(false);
  }
 
  if (isEditing) {
    return (
      <div className="attendance-card">
        <form onSubmit={handleSaveEdit} className="edit-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <select value={dept} onChange={(e) => setDept(e.target.value)}>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <div className="button-row">
            <button type="submit" className="btn-in">Save</button>
            <button type="button" className="btn-out" onClick={handleCancelEdit}>Cancel</button>
          </div>
          {editError && <p className="error">{editError}</p>}
        </form>
      </div>
    );
  }
  return (
    <div className="attendance-card">
      <div className="card-top">
        <p className="employee-name">{employee.name}</p>
        <span className="employee-id">No. {String(employee.id).padStart(3, "0")}</span>
      </div>
      <p className="employee-email">{employee.email}</p>
      <p className="employee-dept">{employee.dept}</p>

      <div className="button-row">
        <button className="btn-in" onClick={handleCheckIn}>Check In</button>
        <button className="btn-out" onClick={handleCheckOut}>Check Out</button>
      </div>

      
      <button className="edit-link" onClick={() => setIsEditing(true)}>Edit details</button>


      {status && (
        <div className={`stamp ${status.type === "in" ? "stamp-in" : "stamp-out"}`}>
          {status.type === "in" ? "IN" : "OUT"} · {status.time}
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}