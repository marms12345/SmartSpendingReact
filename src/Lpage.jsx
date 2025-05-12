import React, { useState } from "react";
import "./Lpagestyles.css";
import Home from './Home';
import RealTimeBarChart from './RealTimeBarChart';
import DonutChartComponent from './DonutChartComponent';

const Lpage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Home");

  const handleSelect = (componentName) => {
    setActiveComponent(componentName);
    setIsDropdownOpen(false);
  };

  const handleToggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleSidebarToggle = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className={`lpage-layout ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <aside className="lpage-sidebar">
        <div className="lpage-logo-container">
          <button className="lpage-burger" onClick={handleSidebarToggle}>
            <i className="fa-solid fa-bars"></i>
          </button>
          {!isSidebarCollapsed && (
            <>
              {/* <img src="/images/smartspendingimage.png" alt="Smart Spending" className="lpage-logo" /> */}
              {/* <h2>Smart Spending</h2> */}
            </>
          )}
        </div>

        <ul className="lpage-menu-list">
          <li onClick={() => handleSelect("Home")}> <i className="fa-solid fa-house"></i> {!isSidebarCollapsed && "Home"} </li>

          <li onClick={handleToggleDropdown} className="lpage-dropdown-toggle"><i className="fa-solid fa-gauge-simple-high"></i> {!isSidebarCollapsed && "Dashboard"}</li>

          {/* Dashboard Submenu - placed OUTSIDE the list */}
          {isDropdownOpen && !isSidebarCollapsed && (
            <div className="lpage-dropdown-buttons">
              {[
                "Real-Time Spending Analysis",
                "Expense Categorization",
                "Spending Alerts",
                "Smart Payment Suggestions"
              ].map((name) => (
                <button key={name} onClick={() => handleSelect(name)}>
                  {name}
                </button>
              ))}
            </div>
          )}


          <li onClick={() => handleSelect("Transaction")}> <i className="fa-solid fa-money-check-dollar"></i> {!isSidebarCollapsed && "Transaction"} </li>
          <li onClick={() => handleSelect("Print")}> <i className="fa-solid fa-print"></i> {!isSidebarCollapsed && "Print"} </li>
          <li onClick={() => handleSelect("AboutUs")}> <i className="fa-solid fa-users"></i> {!isSidebarCollapsed && "About Us"} </li>
          <li onClick={() => handleSelect("Settings")}> <i className="fa-solid fa-screwdriver-wrench"></i> {!isSidebarCollapsed && "Settings"} </li>
        </ul>
      </aside>

      <main className="lpage-main">
        <div className="lpage-topbar">
          <a className="lpage-profile-link" href="/profile">Profile</a>
          <button className="lpage-top-button lpage-logout">Logout</button>
        </div>

        <div className="lpage-content">
          {activeComponent === "Home" && <Home />}
          {activeComponent === "Real-Time Spending Analysis" && <RealTimeBarChart />}
          {activeComponent === "Expense Categorization" && <DonutChartComponent  />}
          {/* Add conditional rendering for other components as needed */}
        </div>
      </main>
    </div>
  );
};

export default Lpage;