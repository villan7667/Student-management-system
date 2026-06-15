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
    id: "",
    name: "",
    email: "",
    phone: "",
    dept: "",
    age: "",
    gender: "",
    semester: "",
    cgpa: "",
    address: "",
    linkedin: "",
    github: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/getStudents`);

      setStudents(response.data);
    } catch (error) {
      Swal.fire("Error", "Could not fetch students.", "error");
    }
  };

  const deleteStudent = async (student) => {
    const confirmDelete = await Swal.fire({
      title: "Delete Student?",
      text: `${student.name} will be removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/deleteStudent/${student.id}`);

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

      await axios.put(`${API_URL}/updateStudent`, editStudent);

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
      <h2 className="text-center fw-bold mb-4" style={{ color: "#000" }}>
        Student Records
      </h2>

      <div className="table-responsive shadow rounded">
        <table className="table table-hover table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Age</th>

              <th>Gender</th>

              <th>Department</th>

              <th>Semester</th>

              <th>CGPA</th>

              <th>Address</th>

              <th>LinkedIn</th>

              <th>GitHub</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>

                <td>{student.name || "-"}</td>

                <td>{student.email || "-"}</td>

                <td>{student.phone || "-"}</td>

                <td>{student.age || "-"}</td>

                <td>{student.gender || "-"}</td>

                <td>{student.dept || "-"}</td>

                <td>{student.semester || "-"}</td>

                <td>{student.cgpa || "-"}</td>

                <td>{student.address || "-"}</td>

                <td>{student.linkedin || "-"}</td>

                <td>{student.github || "-"}</td>

                <td>
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

      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Update Student
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ color: "#000" }}>
          <Form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Label style={{ color: "#000" }}>Name</Form.Label>

                <Form.Control
                  value={editStudent.name}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label style={{ color: "#000" }}>Email</Form.Label>

                <Form.Control
                  value={editStudent.email}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label style={{ color: "#000" }}>Phone</Form.Label>

                <Form.Control
                  value={editStudent.phone}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      phone: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label style={{ color: "#000" }}>Department</Form.Label>

                <Form.Select
                  value={editStudent.dept}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      dept: e.target.value,
                    })
                  }
                >
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="ME">ME</option>
                  <option value="CE">CE</option>
                  <option value="AI">AI</option>
                  <option value="DS">DS</option>
                </Form.Select>
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label style={{ color: "#000" }}>Age</Form.Label>

                <Form.Control
                  type="number"
                  value={editStudent.age}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      age: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label style={{ color: "#000" }}>Semester</Form.Label>

                <Form.Control
                  type="number"
                  value={editStudent.semester}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      semester: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label style={{ color: "#000" }}>CGPA</Form.Label>

                <Form.Control
                  value={editStudent.cgpa}
                  onChange={(e) =>
                    setEditStudent({
                      ...editStudent,
                      cgpa: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>

          <Button variant="primary" onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update Student"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewStudents;
