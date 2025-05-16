import React from 'react';
import './Homestyles.css'; // styling separated for clarity
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Header */}
      <header className="home-page-header">
        <div className="home-page-logo">Smart Spending</div>
      </header>

      {/* Welcome Section */}
      <section className="home-page-welcome-section">
        <h1>Welcome to Smart Spending App</h1>
        <p>
          Your personal finance assistant to track spending, save smarter, and make better financial decisions.
          Whether you're trying to save for a goal or just get a better grasp on your finances,
          we provide tools and insights to help.
        </p>
      </section>

      {/* Features */}
      <section className="home-page-features-section">
        <h2>Features</h2>
        <div className="home-page-features">
          <div className="home-page-feature-card">
            <h3>Real-Time Spending Analysis</h3>
            <p>Track your expenses and analyze your spending habits to stay within your budget.</p>
          </div>
          <div className="home-page-feature-card">
            <h3>Expense Categorization</h3>
            <p>Understand your spending behavior by categorizing expenses into essentials vs non-essentials.</p>
          </div>
          <div className="home-page-feature-card">
            <h3>Spending Alerts</h3>
            <p>Receive alerts when you exceed your budget, helping you stay in control of your finances.</p>
          </div>
          <div className="home-page-feature-card">
            <h3>Smart Payment Suggestions</h3>
            <p>Receive intelligent suggestions on whether to use UPI, credit/debit cards, or cash based on your spending habits.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="home-page-footer">
        <div className="home-page-contact">
          <strong>Contact Us</strong><br />
          Email: support@smartspending.com<br />
          Phone: +123 456 7890
        </div>
        <div className="home-page-footer-links">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
          <span>FAQ</span>
        </div>
      </footer> */}
    </div>
  );
};

export default Home;