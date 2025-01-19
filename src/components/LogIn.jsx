import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { signIn } from "../backend/login"; 
import '../login.css';

const LogIn = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      await signIn(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Sign In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">Sign In</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LogIn;
