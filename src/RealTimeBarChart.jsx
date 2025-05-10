import React from "react";
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
import "./Realtimebarchartstyles.css"; // Importing CSS

const sampleData = [
  { period: "Daily", spending: 40 },
  { period: "Weekly", spending: 200 },
  { period: "Monthly", spending: 850 },
  { period: "Annual", spending: 10200 },
];

const RealTimeBarChart = () => {
  return (
    <div>
      <div>
        <SpendingOverviewTabs />
      </div>
      <div className="realtimebarchart-page-bar-chart-container">
        <h3 className="realtimebarchart-page-chart-title">Spending Analysis</h3>
        <ResponsiveContainer>
          <BarChart
            data={sampleData}
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