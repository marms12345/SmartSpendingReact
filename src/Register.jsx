import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registerstyles.css'; // Optional: create a CSS file for styling


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        name,
        email,
        password,
        role
      });
      alert(response.data.msg || 'Registration successful!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <div className="register-page-mainHeading">
        <h2>Create Free Account</h2>
      </div>
      <div className="register-page-container">

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>


  );
}

export default Register;
