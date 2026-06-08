import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [show, setShow] = useState(false);
  const [editStudent, setEditStudent] = useState({
    id: "",
    name: "",
    dept: "",
    age: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8003/getStudents");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteStudent = async (student) => {
    try {
      await axios.delete(`http://localhost:8003/deleteStudent/${student.id}`);
      const result = await Swal.fire({
        title: "Deleted!",
        text: `${student.name} removed.`,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Undo",
      });
      if (result.dismiss === Swal.DismissReason.cancel) {
        await axios.post("http://localhost:8003/addStudent", student);
        fetchStudents();
        Swal.fire("Restored!", "Student added back.", "success");
      } else {
        fetchStudents();
      }
    } catch (error) {
      Swal.fire("Error", "Could not delete student.", "error");
    }
  };

  const openUpdateModal = (student) => {
    setEditStudent(student);
    setShow(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:8003/updateStudent", editStudent);
      Swal.fire("Updated!", "Data saved successfully.", "success");
      setShow(false);
      fetchStudents();
    } catch (err) {
      Swal.fire("Error", "Update failed.", "error");
    }
  };

  return (
    <div className="container-fluid px-5 view-container">
      <h2 className="text-center view-heading">Student Records</h2>
      <div className="glass-card">
        <table className="table modern-table align-middle text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td data-label="ID">{student.id}</td>
                <td data-label="Name">{student.name}</td>
                <td data-label="Department">{student.dept}</td>
                <td data-label="Age">{student.age}</td>
                <td data-label="Actions">
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => openUpdateModal(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(student)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={editStudent.name}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                value={editStudent.dept}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, dept: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                value={editStudent.age}
                onChange={(e) =>
                  setEditStudent({ ...editStudent, age: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Back
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewStudents;
