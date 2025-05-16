import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Lpage from "./Lpage";
import Home from "./Home";
import RealTimeBarChart from "./RealTimeBarChart";
import DonutChartComponent from "./DonutChartComponent";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import SpendingOverviewTabs from './SpendingOverviewTabs';

function App() {
  return (
     <div>
        <Router>
          <div>
            <Routes>
              {/* As we are now able to connect the backend we need dont need this anymore we can keep this in the
              button of sign in */}
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              {/* This reset route should not be removed from this app */}
              <Route path="/reset-password/:token" element={<ResetPassword />}/>
              <Route path="/Lpage" element={<Lpage />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/RealTimeBarChart" element={<RealTimeBarChart />} />
              <Route path="/DonutChartComponent" element={<DonutChartComponent />}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;


// use this as the main one all the time

// <div>
//         {/* <Login /> */}
//         {/* <Register /> */}
//         {/* <ForgotPassword /> */}
//         {/* <ResetPassword /> */}
//         {/* <Lpage /> */}
//         {/* <Home /> */}
//         {/* <RealTimeBarChart/> */}
//         {/* <DonutChartComponent/> */}
//         {/* <TransactionForm /> */}
//         {/* // <TransactionList /> */}
// </div>

//  <div>
//         <Router>
//           <div>
//             <Routes>
//               {/* As we are now able to connect the backend we need dont need this anymore we can keep this in the
//               button of sign in */}
//               <Route path="/" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/forgot-password" element={<ForgotPassword />} />
//               {/* This reset route should not be removed from this app */}
//               <Route
//                 path="/reset-password/:token"
//                 element={<ResetPassword />}
//               />
//               <Route path="/Lpage" element={<Lpage />} />
//               <Route path="/Home" element={<Home />} />
//               <Route path="/RealTimeBarChart" element={<RealTimeBarChart />} />
//               <Route
//                 path="/DonutChartComponent"
//                 element={<DonutChartComponent />}
//               />
//             </Routes>
//           </div>
//         </Router>
//       </div>

// <nav style={{ padding: "10px", background: "#eee" }}>
//   <Link to="/" style={{ marginRight: "10px" }}>
//     Login
//   </Link>
//   <Link to="/register" style={{ marginRight: "10px" }}>
//     Register
//   </Link>
//   <Link to="/forgot-password" style={{ marginRight: "10px" }}>
//     ForgotPassword
//   </Link>
//   {/* For dynamic route, this path should not have the :token in Link directly */}
//   <Link to="/reset-password" style={{ marginRight: "10px" }}>
//     ResetPassword
//   </Link>
//   <Link to="/Lpage" style={{ marginRight: "10px" }}>
//     Lpage
//   </Link>
//   <Link to="/Home" style={{ marginRight: "10px" }}>
//     Home
//   </Link>
//   <Link to="/RealTimeBarChart" style={{ marginRight: "10px" }}>
//     Real-Time Spending Analysis
//   </Link>
//   <Link to="/DonutChartComponent">Expense Categorization</Link>
// </nav>;
