import React, { useState } from "react";
import "./Lpagestyles.css";
import Home from './Home';
import RealTimeBarChart from './RealTimeBarChart';
import DonutChartComponent from './DonutChartComponent';
import TransactionForm from './TransactionForm';
import TransactionList from "./TransactionList";
import { useNavigate } from 'react-router-dom'; // correct place

const Lpage = () => {
  const navigate = useNavigate(); // ✅ moved to top level

  const [openDropdown, setOpenDropdown] = useState(null); 
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Home");

  const handleSelect = (componentName) => {
    setActiveComponent(componentName);
    setOpenDropdown(null);
  };

  const handleToggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    alert('You have been logged out.');
  };

  return (
    <div className={`lpage-layout ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <aside className="lpage-sidebar">
        <div className="lpage-logo-container">
          <button className="lpage-burger" onClick={handleSidebarToggle}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        <ul className="lpage-menu-list">
          <li onClick={() => handleSelect("Home")}> 
            <i className="fa-solid fa-house"></i> {!isSidebarCollapsed && "Home"} 
          </li>

          <li onClick={() => handleToggleDropdown("dashboard")} className="lpage-dropdown-toggle">
            <i className="fa-solid fa-gauge-simple-high"></i> {!isSidebarCollapsed && "Dashboard"}
          </li>
          {openDropdown === "dashboard" && !isSidebarCollapsed && (
            <div className="lpage-dropdown-buttons">
              {["Real-Time Spending Analysis", "Expense Categorization", "Spending Alerts", "Smart Payment Suggestions"]
                .map((name) => (
                  <button key={name} onClick={() => handleSelect(name)}>{name}</button>
              ))}
            </div>
          )}

          <li onClick={() => handleToggleDropdown("transaction")} className="lpage-dropdown-toggle">
            <i className="fa-solid fa-money-check-dollar"></i> {!isSidebarCollapsed && "Transaction"}
          </li>
          {openDropdown === "transaction" && !isSidebarCollapsed && (
            <div className="lpage-dropdown-buttons">
              {["New Transaction", "Show Transactions"].map((name) => (
                <button key={name} onClick={() => handleSelect(name)}>{name}</button>
              ))}
            </div>
          )}

          <li onClick={() => handleSelect("Print")}> 
            <i className="fa-solid fa-print"></i> {!isSidebarCollapsed && "Print"} 
          </li>
          <li onClick={() => handleSelect("AboutUs")}> 
            <i className="fa-solid fa-users"></i> {!isSidebarCollapsed && "About Us"} 
          </li>
          <li onClick={() => handleSelect("Settings")}> 
            <i className="fa-solid fa-screwdriver-wrench"></i> {!isSidebarCollapsed && "Settings"} 
          </li>
        </ul>
      </aside>

      <main className="lpage-main">
        <div className="lpage-topbar">
          <a className="lpage-profile-link" href="/profile">Profile</a>
          <button className="lpage-top-button lpage-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="lpage-content">
          {activeComponent === "Home" && <Home />}
          {activeComponent === "Real-Time Spending Analysis" && <RealTimeBarChart />}
          {activeComponent === "Expense Categorization" && <DonutChartComponent />}
          {activeComponent === "New Transaction" && <TransactionForm />}
          {activeComponent === "Show Transactions" && <TransactionList />}
        </div>
      </main>
    </div>
  );
};

export default Lpage;
