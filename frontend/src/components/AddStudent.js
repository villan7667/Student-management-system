import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddStudent = () => {
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const wrapperRef = useRef(null);

  const [student, setStudent] = useState({
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

  const depts = [
    { value: "CSE", label: "Computer Science Engineering" },
    { value: "IT", label: "Information Technology" },
    { value: "ECE", label: "Electronics & Communication" },
    { value: "EEE", label: "Electrical Engineering" },
    { value: "ME", label: "Mechanical Engineering" },
    { value: "CE", label: "Civil Engineering" },
    { value: "AI", label: "Artificial Intelligence" },
    { value: "DS", label: "Data Science" },
  ];

  const semesters = Array.from({ length: 8 }, (_, i) => ({
    value: String(i + 1),
    label: `Semester ${i + 1}`,
  }));

  const genders = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleDropdownToggle = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleOptionClick = (name, value) => {
    setStudent({ ...student, [name]: value });
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!nameRegex.test(student.name)) {
      Swal.fire("Invalid Name", "Only alphabets are allowed", "warning");
      return;
    }

    if (!emailRegex.test(student.email)) {
      Swal.fire("Invalid Email", "Please enter valid email", "warning");
      return;
    }

    if (!phoneRegex.test(student.phone)) {
      Swal.fire("Invalid Phone", "Phone must contain 10 digits starting with 6-9", "warning");
      return;
    }

    const ageNum = Number(student.age);
    if (!ageNum || ageNum < 18 || ageNum > 60) {
      Swal.fire("Invalid Age", "Age should be between 18 and 60", "warning");
      return;
    }

    const semesterNum = Number(student.semester);
    if (!semesterNum || semesterNum < 1 || semesterNum > 8) {
      Swal.fire("Invalid Semester", "Select a valid semester", "warning");
      return;
    }

    const cgpaNum = Number(student.cgpa);
    if (student.cgpa && (cgpaNum < 0.0 || cgpaNum > 10.0)) {
      Swal.fire("Invalid CGPA", "CGPA must be between 0.0 and 10.0", "warning");
      return;
    }

    try {
      setLoading(true);

      // Updated endpoint to match backend StudentController.java @RequestMapping("/students")
      await axios.post(`${process.env.REACT_APP_API_URL}/students`, student);

      Swal.fire("Success!", "Student Registered Successfully", "success");

      setStudent({
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
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire("Duplicate Data", "Email / Phone already exists", "error");
      } else {
        Swal.fire("Server Error", "Backend connection failed", "error");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-5 border-0">
        <h2 className="text-center fw-bold mb-4">Student Registration</h2>

        <form onSubmit={handleSubmit}>
          <div className="row" ref={wrapperRef}>
            
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control input-animated"
                name="name"
                placeholder="Full Name"
                value={student.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="email"
                className="form-control input-animated"
                name="email"
                placeholder="Email"
                value={student.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control input-animated"
                name="phone"
                placeholder="Phone Number"
                value={student.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="number"
                className="form-control input-animated"
                name="age"
                placeholder="Age"
                value={student.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <div className="custom-select-wrapper">
                <input
                  type="text"
                  className="form-control input-animated"
                  name="gender"
                  placeholder="Select Gender"
                  value={student.gender}
                  readOnly
                  onClick={() => handleDropdownToggle("gender")}
                  required
                />
                <div className={`custom-dropdown ${openDropdown === "gender" ? "open" : ""}`}>
                  {genders.map((g) => (
                    <div
                      key={g.value}
                      className="custom-option"
                      onClick={() => handleOptionClick("gender", g.value)}
                    >
                      {g.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="custom-select-wrapper">
                <input
                  type="text"
                  className="form-control input-animated"
                  name="dept"
                  placeholder="Select Department"
                  value={student.dept}
                  readOnly
                  onClick={() => handleDropdownToggle("dept")}
                  required
                />
                <div className={`custom-dropdown ${openDropdown === "dept" ? "open" : ""}`}>
                  {depts.map((d) => (
                    <div
                      key={d.value}
                      className="custom-option"
                      onClick={() => handleOptionClick("dept", d.value)}
                    >
                      {d.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="custom-select-wrapper">
                <input
                  type="text"
                  className="form-control input-animated"
                  name="semester"
                  placeholder="Select Semester"
                  value={student.semester}
                  readOnly
                  onClick={() => handleDropdownToggle("semester")}
                  required
                />
                <div className={`custom-dropdown ${openDropdown === "semester" ? "open" : ""}`}>
                  {semesters.map((s) => (
                    <div
                      key={s.value}
                      className="custom-option"
                      onClick={() => handleOptionClick("semester", s.value)}
                    >
                      {s.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="number"
                step="0.1"
                className="form-control input-animated"
                name="cgpa"
                placeholder="CGPA"
                value={student.cgpa}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12 mb-4">
              <input
                type="text"
                className="form-control input-animated"
                name="linkedin"
                placeholder="LinkedIn URL"
                value={student.linkedin}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12 mb-4">
              <input
                type="text"
                className="form-control input-animated"
                name="github"
                placeholder="GitHub URL"
                value={student.github}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12 mb-3">
              <textarea
                className="form-control input-animated"
                rows="3"
                name="address"
                placeholder="Address"
                value={student.address}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg w-100 submit-btn"
          >
            {loading ? (
              <span className="loading-text">
                <span className="spinner-border spinner-border-sm me-2"></span>
                Registering...
              </span>
            ) : (
              "Register Student"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddStudent;
