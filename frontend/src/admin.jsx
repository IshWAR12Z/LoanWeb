// FRONTEND: React.js & Bootstrap

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

function AdminDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/loans")
      .then((res) => {
        console.log("Data received:", res.data); // ✅ Debugging step
        setApplications(res.data);
      })
      .catch((err) => console.error("Error fetching applications:", err));
  }, []);
  

  const handleDelete = async (id) => {
    console.log("Attempting to delete application with ID:", id); // ✅ Debug log
  
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/admin/loans/${id}`);
        console.log("Delete response:", response.data); // ✅ Debug log
        
        // Ensure state updates correctly
        setApplications((prevApps) => prevApps.filter((app) => app._id !== id));
      } catch (error) {
        console.error("Error deleting application:", error.response ? error.response.data : error);
      }
    }
  };
  

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold text-primary">Loan Applications</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Loan Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.phone}</td>
              <td>{app.amount}</td>
              <td>{app.loanType}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(app._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminDashboard;
