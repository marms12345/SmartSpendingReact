import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import SpendingOverviewTabs from './SpendingOverviewTabs';
import './DonutChartComponent.css'; // CSS import

const data = [
  { name: 'Food', value: 4000 },
  { name: 'Transportation', value: 2500 },
  { name: 'Utilities', value: 1800 },
  { name: 'Entertainment', value: 1200 },
  { name: 'Others', value: 1000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF'];

const DonutChartComponent = () => {
  return (
    <div className="donut-chart-container">
      <div>
        <SpendingOverviewTabs />
      </div>
      <div className="chart-wrapper">
        <h3 className="chart-title">Expenditure Breakdown</h3>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DonutChartComponent;
