import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // To extract token from URL
import axios from 'axios';
import './Resetpasswordstyles.css';


const ResetPassword = () => {
  const { token } = useParams(); // Extract token from the URL
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      // Send token and new password to the backend (port 5000)
      const response = await axios.post(`http://localhost:5000/reset-password/${token}`, { newPassword });
      alert(response.data.msg || "Password has been reset successfully.");
      navigate('/'); // Go back to login page
    }
    catch (err) {
      alert(err.response?.data?.msg || "Failed to reset password. Token may be expired or invalid.");
    }
  };

  return (
    <div>
      <div className="reset-password-mainHeading">
        <h2>Reset Your Password</h2>
      </div>
      <div className="reset-password-container">
        <form onSubmit={handlePasswordReset} className="reset-password-form">
          <label htmlFor="password" className="reset-password-label">New Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="reset-password-input"
          />
          <div className="reset-password-button-wrapper">
            <button type="submit" className="reset-password-button">Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;