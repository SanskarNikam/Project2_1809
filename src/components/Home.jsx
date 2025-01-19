import React from "react";
import "../home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {


  const navigate = useNavigate();

  const handleEmployerAccess = () => {
   
    navigate("/employer-dashboard")
  };

  const handleEmployeeAccess = () => {
   
    navigate("/employee-dashboard")
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Our Innovative Platform</h1>
        <p className="hero-subtitle">
          Discover a seamless way to simplify your tasks and enhance productivity.
          With cutting-edge features and a user-centric design, we deliver an unmatched experience.
        </p>
        <div className="role-buttons">
          <button className="role-button" onClick={handleEmployerAccess}>
            Employer Access
          </button>
          <button className="role-button" onClick={handleEmployeeAccess}>
            Employee Access
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features">
          <div className="feature-card">
            <h3 className="feature-title">Easy to Use</h3>
            <p className="feature-description">
              Our platform is designed with simplicity in mind, ensuring a hassle-free experience for everyone.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Secure</h3>
            <p className="feature-description">
              Your data's security is our top priority, with state-of-the-art encryption and protection.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Customizable</h3>
            <p className="feature-description">
              Adapt the platform to meet your unique needs with a wide range of customization options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
