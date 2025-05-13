import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import SpendingOverviewTabs from './SpendingOverviewTabs';
import "./Realtimebarchartstyles.css";

const RealTimeBarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchAndAggregateData = async () => {
      try {
        const response = await fetch('http://localhost:5000/expense/retrieval');
        const data = await response.json();
        const transactions = data.transactions;

        let daily = 0, weekly = 0, monthly = 0, annual = 0;
        const now = new Date();

        transactions.forEach(({ amount, date }) => {
          const txnDate = new Date(date);
          const amt = parseFloat(amount) || 0;

          // Daily
          const isToday = txnDate.toDateString() === now.toDateString();
          if (isToday) daily += amt;

          // Weekly (last 7 days)
          const diffDays = Math.floor((now - txnDate) / (1000 * 60 * 60 * 24));
          if (diffDays < 7) weekly += amt;

          // Monthly
          if (txnDate.getMonth() === now.getMonth() && txnDate.getFullYear() === now.getFullYear()) {
            monthly += amt;
          }

          // Annual
          if (txnDate.getFullYear() === now.getFullYear()) {
            annual += amt;
          }
        });

        setChartData([
          { period: "Daily", spending: daily },
          { period: "Weekly", spending: weekly },
          { period: "Monthly", spending: monthly },
          { period: "Annual", spending: annual },
        ]);
      } catch (error) {
        console.error('Error fetching transactions for bar chart:', error);
      }
    };

    fetchAndAggregateData();
  }, []);

  return (
    <div>
      <div>
        <SpendingOverviewTabs />
      </div>
      <div className="realtimebarchart-page-bar-chart-container">
        <h3 className="realtimebarchart-page-chart-title">Spending Analysis</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="spending" fill="#4CAF50" name="Amount Spent" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RealTimeBarChart;




// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// import SpendingOverviewTabs from './SpendingOverviewTabs';
// import "./Realtimebarchartstyles.css"; // Importing CSS

// const sampleData = [
//   { period: "Daily", spending: 40 },
//   { period: "Weekly", spending: 200 },
//   { period: "Monthly", spending: 850 },
//   { period: "Annual", spending: 10200 },
// ];

// const RealTimeBarChart = () => {
//   return (
//     <div>
//       <div>
//         <SpendingOverviewTabs />
//       </div>
//       <div className="realtimebarchart-page-bar-chart-container">
//         <h3 className="realtimebarchart-page-chart-title">Spending Analysis</h3>
//         <ResponsiveContainer>
//           <BarChart
//             data={sampleData}
//             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="period" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="spending" fill="#4CAF50" name="Amount Spent" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default RealTimeBarChart;