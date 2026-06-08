import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddStudent = () => {
  const [student, setStudent] = useState({
    id: "",
    name: "",
    dept: "",
    age: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (student.id.trim() === "" || student.name.trim() === "") {
      Swal.fire("Warning", "Please fill in all fields", "warning");
      return;
    }
    try {
      await axios.post("http://localhost:8003/addStudent", student);
      Swal.fire("Success!", "Student registered successfully.", "success");
      setStudent({ id: "", name: "", dept: "", age: "" });
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire("Duplicate ID", "This ID is already taken.", "error");
      } else {
        Swal.fire("Error!", "Server connection failed.", "error");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-5" style={{ borderRadius: "20px" }}>
        <h2 className="text-center mb-4 fw-bold typing-heading">
          {" "}
          Student Registration{" "}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              name="id"
              placeholder="Student ID"
              value={student.id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Full Name"
              value={student.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              className="form-control"
              name="age"
              placeholder="Age"
              value={student.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="dept"
              placeholder="Department"
              value={student.dept}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 btn-hover"
          >
            Register Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
