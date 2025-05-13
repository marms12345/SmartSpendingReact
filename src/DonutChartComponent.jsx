import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import SpendingOverviewTabs from './SpendingOverviewTabs';
import './DonutChartComponent.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF69B4', '#33FF57', '#FF3333', '#9933FF'];

const CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Bills & Utilities",
  "Health",
  "Shopping",
  "Entertainment",
  "Education",
  "Personal Care",
  "Others"
];

const DonutChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:5000/expense/retrieval');
        const data = await response.json();
        const expenses = data.transactions; 

        const categoryMap = CATEGORIES.reduce((acc, cat) => {
          acc[cat] = 0;
          return acc;
        }, {});

        expenses.forEach((item) => {
          const category = item.category || 'Others';
          const amount = parseFloat(item.amount) || 0;
          if (categoryMap.hasOwnProperty(category)) {
            categoryMap[category] += amount;
          } else {
            categoryMap['Others'] += amount;
          }
        });

        const formattedData = Object.entries(categoryMap)
          .filter(([_, value]) => value > 0)
          .map(([name, value]) => ({ name, value }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="donut-chart-container">
      <div>
        <SpendingOverviewTabs />
      </div>
      <div className="chart-wrapper">
        <h3 className="chart-title">Expenditure Breakdown</h3>
        <ResponsiveContainer  width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
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





// import React from 'react';
// import {
//   PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
// } from 'recharts';
// import SpendingOverviewTabs from './SpendingOverviewTabs';
// import './DonutChartComponent.css'; // CSS import

// const data = [
//   { name: 'Food', value: 4000 },
//   { name: 'Transportation', value: 2500 },
//   { name: 'Utilities', value: 1800 },
//   { name: 'Entertainment', value: 1200 },
//   { name: 'Others', value: 1000 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF'];

// const DonutChartComponent = () => {
//   return (
//     <div className="donut-chart-container">
//       <div>
//         <SpendingOverviewTabs />
//       </div>
//       <div className="chart-wrapper">
//         <h3 className="chart-title">Expenditure Breakdown</h3>
//         <ResponsiveContainer>
//           <PieChart>
//             <Pie
//               data={data}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               innerRadius={70}
//               outerRadius={120}
//               fill="#8884d8"
//               label
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend verticalAlign="bottom" height={36} />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default DonutChartComponent;
