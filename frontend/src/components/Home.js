import React from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const AnimatedSection = ({ children, className }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} className={`${className} ${inView ? "animate-fade-up" : "hidden-init"}`}>
      {children}
    </div>
  );
};

const Home = () => {
  const featuredStudents = [
    { id: 1, name: "Alex Johnson", dept: "Computer Science", age: 20 },
    { id: 2, name: "Sarah Williams", dept: "Electrical Engineering", age: 22 },
    { id: 3, name: "Michael Brown", dept: "Mechanical Engineering", age: 21 },
  ];

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <div className="hero-section text-center text-white d-flex align-items-center justify-content-center">
        <div className="container">
          <h1 className="display-3 fw-bold neon-text">Academy Portal</h1>
          <p className="lead mb-4 text-white">Empowering students through modern technology.</p>
          <Link to="/add" className="btn btn-hover btn-lg">Get Started</Link>
        </div>
      </div>

      {/* Details Section */}
      <AnimatedSection className="container py-5">
        <h2 className="text-center view-heading">Platform Details</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card p-4 h-100">
              <h4 className="neon-text">Fast & Reliable</h4>
              <p className="text-white">Built with modern tech stacks for lightning-fast data processing and zero downtime.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-4 h-100">
              <h4 className="neon-text">Secure Data</h4>
              <p className="text-white">End-to-end encryption and secure REST APIs ensure student data remains private.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-4 h-100">
              <h4 className="neon-text">Easy Management</h4>
              <p className="text-white">Intuitive UI/UX allowing administrators to add, edit, or delete records effortlessly.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* About Institute Section */}
      <AnimatedSection className="container py-5">
        <div className="glass-card p-5 text-center">
          <h2 className="view-heading">About Our Institute</h2>
          <p className="text-white" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            Founded in 2020, the Academy Portal bridges the gap between traditional education and digital excellence. 
            We focus on creating an ecosystem where technology streamlines administration, allowing educators 
            to focus on what truly matters: teaching and mentoring the next generation of innovators.
          </p>
        </div>
      </AnimatedSection>

      {/* Student Cards Section */}
      <AnimatedSection className="container py-5">
        <h2 className="text-center view-heading mb-5">Featured Students</h2>
        <div className="row">
          {featuredStudents.map((student) => (
            <div key={student.id} className="col-md-4 mb-4">
              <div className="card p-4 text-center h-100 student-card">
                <div className="mb-3">
                  <div className="neon-avatar">{student.name.charAt(0)}</div>
                </div>
                <h5 className="neon-text">{student.name}</h5>
                <p className="text-white mb-1">Dept: {student.dept}</p>
                <p className="text-white-50">Age: {student.age}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Home;
