import React, { useState } from "react";
import "./Lpagestyles.css";

const Lpage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggle = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSelect = (option) => {
    console.log(`Selected: ${option}`);
  };

  return (
    <div className="lpage-layout">
      {/* Sidebar */}
      <aside className="lpage-sidebar">
        <div className="lpage-logo-container">
          <img src="/images/smartspendingimage.png" alt="Smart Spending" className="lpage-logo" />
          <h2>Smart Spending</h2>
        </div>

        <ul className="lpage-menu-list">
          <li><i className="fa-solid fa-house"></i> Home</li>

          <li className="lpage-dropdown">
            <button onClick={handleToggle} className="lpage-dropdown-toggle">
              <i className="fa-solid fa-gauge-simple-high"></i> Dashboard
            </button>
            {isDropdownOpen && (
              <div className="lpage-dropdown-buttons">
                {["Overview", "Activity", "Reports", "Analytics"].map(option => (
                  <button key={option} onClick={() => handleSelect(option)}>
                    {option}
                  </button>
                ))}
              </div>
            )}
          </li>

          <li><i className="fa-solid fa-money-check-dollar"></i> Transaction</li>
          <li><i className="fa-solid fa-print"></i> Print</li>
          <li><i className="fa-solid fa-users"></i> About Us</li>
          <li><i className="fa-solid fa-screwdriver-wrench"></i> Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="lpage-main">
        <div className="lpage-topbar">
          <a className="lpage-profile-link" href="/profile">Profile</a>
          <button className="lpage-top-button lpage-logout">Logout</button>
        </div>

        <div className="lpage-content">
          <h1>Welcome to Smart Spending App</h1>
          <h2>Introduction</h2>
          <p>
            The Smart Spending App is a modern personal finance tool to help users track expenses,
            manage budgets, and make smarter financial decisions.
          </p>

          <h3>Purpose of the Application</h3>
          <ul>
            <li>Track daily spending</li>
            <li>Set financial goals and budgets</li>
            <li>Get actionable insights</li>
            <li>Categorize transactions</li>
            <li>Reduce unnecessary expenses</li>
          </ul>

          <h3>Target Audience</h3>
          <ul>
            <li>College students managing allowances</li>
            <li>Young professionals tracking expenses</li>
            <li>Families planning budgets</li>
            <li>Anyone improving financial discipline</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Lpage;