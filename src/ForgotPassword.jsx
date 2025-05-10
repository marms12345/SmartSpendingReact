import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Forgotpasswordstyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post("http://localhost:5000/forgot-password/forgotPassword", { email });
      alert(response.data.msg || "Password reset link sent to your email.");
      navigate('/'); // Go back to login page
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <div className="forgot-password-mainHeading">
        <h2>Forgot Password</h2>
      </div>
      <div className="forgot-password-container">
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="forgot-password-input"
          />
          <button type="submit" className="forgot-password-button">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;