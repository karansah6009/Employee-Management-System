

const BASE_URL = "http://localhost:8080/api";

export async function createEmployee(name, email,dept) {
  const response = await fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, dept }),
  });
  if (!response.ok) throw new Error("Failed to create employee");
  return response.json();
}

export async function getAllEmployees() {
  const response = await fetch(`${BASE_URL}/employees`);
  if (!response.ok) throw new Error("Failed to fetch employees");
  return response.json();
}


export async function checkIn(employeeId) {
  const response = await fetch(`${BASE_URL}/attendance/employee/${employeeId}/checkin`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Check-in failed (maybe already checked in today?)");
  return response.json();
}


export async function updateEmployee(id, name, email, dept) {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, dept }),
  });
  if (!response.ok) throw new Error("Failed to update employee");
  return response.json();
}


export async function checkOut(employeeId) {
  const response = await fetch(`${BASE_URL}/attendance/employee/${employeeId}/checkout`, {
    method: "PUT",
  });
  if (!response.ok) throw new Error("Check-out failed (maybe not checked in yet?)");
  return response.json();
}