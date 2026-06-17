import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL;

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editStudent, setEditStudent] = useState({
    id: "", name: "", email: "", phone: "", dept: "",
    age: "", gender: "", semester: "", cgpa: "",
    address: "", linkedin: "", github: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      // NOTE: Ensure this matches your Controller @GetMapping
      const response = await axios.get(`${API_URL}/students`); 
      setStudents(response.data);
    } catch (error) {
      Swal.fire("Error", "Could not fetch students.", "error");
    }
  };

  const deleteStudent = async (student) => {
    const result = await Swal.fire({
      title: "Delete Student?",
      text: `${student.name} will be removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/students/${student.id}`);
      Swal.fire("Deleted!", "Student removed successfully.", "success");
      fetchStudents();
    } catch (error) {
      Swal.fire("Error", "Could not delete student.", "error");
    }
  };

  const openUpdateModal = (student) => {
    setEditStudent(student);
    setShow(true);
  };

  const handleUpdate = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!emailRegex.test(editStudent.email)) {
      Swal.fire("Invalid Email", "Please enter valid email", "warning");
      return;
    }
    if (!phoneRegex.test(editStudent.phone)) {
      Swal.fire("Invalid Phone", "Please enter valid phone number", "warning");
      return;
    }

    try {
      setLoading(true);
      await axios.put(`${API_URL}/students`, editStudent);
      Swal.fire("Updated!", "Student updated successfully.", "success");
      setShow(false);
      fetchStudents();
    } catch (err) {
      Swal.fire("Error", "Update failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid px-4 py-4">
      <h2 className="text-center fw-bold mb-4">Student Records</h2>

      <div className="table-responsive shadow rounded">
        <table className="table table-hover table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Phone</th>
              <th>Age</th><th>Gender</th><th>Dept</th><th>Sem</th>
              <th>CGPA</th><th>Address</th><th>LinkedIn</th><th>GitHub</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.age}</td>
                <td>{student.gender}</td>
                <td>{student.dept}</td>
                <td>{student.semester}</td>
                <td>{student.cgpa}</td>
                <td>{student.address}</td>
                <td>{student.linkedin}</td>
                <td>{student.github}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => openUpdateModal(student)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteStudent(student)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Update Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control value={editStudent.name} onChange={(e) => setEditStudent({...editStudent, name: e.target.value})} />
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control value={editStudent.email} onChange={(e) => setEditStudent({...editStudent, email: e.target.value})} />
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control value={editStudent.phone} onChange={(e) => setEditStudent({...editStudent, phone: e.target.value})} />
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Select value={editStudent.dept} onChange={(e) => setEditStudent({...editStudent, dept: e.target.value})}>
                  <option value="CSE">CSE</option><option value="IT">IT</option>
                  <option value="ECE">ECE</option><option value="EEE">EEE</option>
                  <option value="ME">ME</option><option value="CE">CE</option>
                  <option value="AI">AI</option><option value="DS">DS</option>
                </Form.Select>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update Student"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewStudents;