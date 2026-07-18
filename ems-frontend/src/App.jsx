import { useEffect, useState } from "react";
import { getAllEmployees } from "./api";
import EmployeeForm from "./EmployeeForm";
import AttendanceCard from "./AttendenceCard";
import "./App.css";

export default function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (err) {
      console.error(err);
    }
  }

  function handleEmployeeCreated(newEmployee) {
    setEmployees((prev) => [...prev, newEmployee]);
  }

  function handleEmployeeUpdated(updatedEmployee) {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="app">
      <header className="ledger-header">
        <p className="eyebrow">Daily Register</p>
        <h1>Time Ledger</h1>
        <p className="ledger-date">{today}</p>
      </header>

      <EmployeeForm onEmployeeCreated={handleEmployeeCreated} />

      <p className="section-label">On Record — {employees.length}</p>
      <div className="attendance-list">
        {employees.length === 0 && (
          <p className="empty-state">No employees registered yet.</p>
        )}
        {employees.map((emp) => (
          <AttendanceCard key={emp.id} employee={emp} onEmployeeUpdated={handleEmployeeUpdated} />
        ))}
      </div>
    </div>
  );
}