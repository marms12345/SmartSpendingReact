import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Loginstyles.css';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/signin/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      alert(res.data.msg || 'Login successful!');
      navigate('/Lpage');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed. Check your credentials.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-left">
        <img src="/images/smartspendingimage.png" alt="Smart Spending Logo" />
      </div>
      <div className="login-page-right">
        <h2>Sign In</h2>
        <p>
          {/* Don't have an account? <a href="/register">Create free account.</a> */}
          Don't have an account? <Link to="/register">Create free account.</Link>
        </p>

        <form onSubmit={handleSubmit} className="login-page-form-wrapper">
          <input
            type="email"
            placeholder="Enter email"
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
          <div className="login-page-form-options">
            {/* <a href="/forgot-password">Forgot your password?</a> */}
            <Link to="/forgot-password">Forgot your password?</Link>
          </div>
          <button type="submit">Sign In</button>
          <div className="login-page-checkbox">
            <input type="checkbox" id="keepSignedIn" />
            <label htmlFor="keepSignedIn">Keep me signed in</label>
          </div>
          <p className="login-page-terms">
            By signing up you agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
