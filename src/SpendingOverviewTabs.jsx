// SpendingOverviewTabs.js
import React, { useEffect } from 'react';
import { Wallet, PiggyBank, Calendar, TrendingUp } from 'lucide-react';
import {
  startOfMonth,
  endOfMonth,
  parseISO,
  isWithinInterval,
} from 'date-fns';
import './Spendingoverviewtabs.css';

const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const SpendingOverviewTabs = ({
  dataSource,
  setDataSource,
  monthlyBudget,
  setMonthlyBudget,
  totalSpent,
  setTotalSpent,
}) => {
  const fetchData = async (source) => {
    try {
      const endpoint =
        source === 'csv'
          ? 'http://localhost:5000/upload/csv-records'
          : 'http://localhost:5000/expense/retrieval';

      const res = await fetch(endpoint);
      const data = await res.json();

      const transactions =
        source === 'csv' ? data.records || [] : data.transactions || [];

      const now = new Date();
      const start = startOfMonth(now);
      const end = endOfMonth(now);

      const currentMonthExpenses = transactions.filter((item) => {
        let txnDate;
        try {
          txnDate = parseISO(item.date);
        } catch {
          txnDate = new Date();
        }
        return isWithinInterval(txnDate, { start, end });
      });

      const total = currentMonthExpenses.reduce((sum, item) => {
        const amount = Number(item.amount || 0);
        return sum + amount;
      }, 0);

      setTotalSpent(total);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setTotalSpent(0);
    }
  };

  useEffect(() => {
    fetchData(dataSource);
  }, [dataSource]);

  const remaining = monthlyBudget - totalSpent;
  const savingRate =
    monthlyBudget > 0
      ? `${Math.round((remaining / monthlyBudget) * 100)}%`
      : '0%';

  const data = [
    { label: 'Total Spent', icon: <Wallet size={20} />, value: totalSpent },
    {
      label: 'Monthly Budget',
      icon: <Calendar size={20} />,
      value: (
        <input
          type="number"
          value={monthlyBudget}
          onChange={(e) => setMonthlyBudget(Number(e.target.value))}
          style={{
            width: '80px',
            border: 'none',
            background: 'transparent',
            fontSize: '1rem',
            fontWeight: 'bold',
            textAlign: 'right',
          }}
        />
      ),
    },
    { label: 'Remaining', icon: <PiggyBank size={20} />, value: remaining },
    { label: 'Saving Rate', icon: <TrendingUp size={20} />, value: savingRate },
  ];

  return (
    <div className="spendingoverviewtab-page-tabs-container">
      {data.map((item, index) => (
        <div className="spendingoverviewtab-page-tab-card" key={index}>
          <div className="spendingoverviewtab-page-tab-icon">{item.icon}</div>
          <div className="spendingoverviewtab-page-tab-value">
            {typeof item.value === 'number'
              ? formatINR(item.value)
              : item.value}
          </div>
          <div className="spendingoverviewtab-page-tab-label">
            {item.label}
          </div>
        </div>
      ))}
      <div className="spendingoverviewtab-page-toggle-buttons">
        <button
          onClick={() => setDataSource('backend')}
          className={dataSource === 'backend' ? 'active' : ''}
        >
          Backend
        </button>
        <button
          onClick={() => setDataSource('csv')}
          className={dataSource === 'csv' ? 'active' : ''}
        >
          CSV
        </button>
      </div>
    </div>
  );
};

export default SpendingOverviewTabs;


// import React, { useEffect, useState } from 'react';
// import { Wallet, PiggyBank, Calendar, TrendingUp } from 'lucide-react';
// import {
//   startOfMonth,
//   endOfMonth,
//   parseISO,
//   isWithinInterval,
// } from 'date-fns';
// import './Spendingoverviewtabs.css';

// const formatINR = (amount) =>
//   new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0,
//   }).format(amount);

// const SpendingOverviewTabs = () => {
//   const [dataSource, setDataSource] = useState('backend'); // default is backend
//   const [monthlyBudget, setMonthlyBudget] = useState(30000);
//   const [totalSpent, setTotalSpent] = useState(0);

//   const fetchData = async (source) => {
//     try {
//       const endpoint =
//         source === 'csv'
//           ? 'http://localhost:5000/upload/csv-records'
//           : 'http://localhost:5000/expense/retrieval';

//       const res = await fetch(endpoint);
//       const data = await res.json();

//       const transactions =
//         source === 'csv' ? data.records || [] : data.transactions || [];

//       const now = new Date();
//       const start = startOfMonth(now);
//       const end = endOfMonth(now);

//       const currentMonthExpenses = transactions.filter((item) => {
//         let txnDate;
//         try {
//           txnDate = parseISO(item.date);
//         } catch {
//           txnDate = new Date(); // fallback to now if parse fails
//         }
//         return isWithinInterval(txnDate, { start, end });
//       });

//       const total = currentMonthExpenses.reduce((sum, item) => {
//         const amount = Number(item.amount || 0);
//         return sum + amount;
//       }, 0);

//       setTotalSpent(total);
//     } catch (error) {
//       console.error('Error fetching expenses:', error);
//       setTotalSpent(0);
//     }
//   };

//   useEffect(() => {
//     fetchData(dataSource);
//   }, [dataSource]);

//   const remaining = monthlyBudget - totalSpent;
//   const savingRate =
//     monthlyBudget > 0
//       ? `${Math.round((remaining / monthlyBudget) * 100)}%`
//       : '0%';

//   const data = [
//     { label: 'Total Spent', icon: <Wallet size={20} />, value: totalSpent },
//     {
//       label: 'Monthly Budget',
//       icon: <Calendar size={20} />,
//       value: (
//         <input
//           type="number"
//           value={monthlyBudget}
//           onChange={(e) => setMonthlyBudget(Number(e.target.value))}
//           style={{
//             width: '80px',
//             border: 'none',
//             background: 'transparent',
//             fontSize: '1rem',
//             fontWeight: 'bold',
//             textAlign: 'right',
//           }}
//         />
//       ),
//     },
//     { label: 'Remaining', icon: <PiggyBank size={20} />, value: remaining },
//     { label: 'Saving Rate', icon: <TrendingUp size={20} />, value: savingRate },
//   ];

//   return (
// <div>
//   <div className="spendingoverviewtab-page-tabs-container">
//     {data.map((item, index) => (
//       <div className="spendingoverviewtab-page-tab-card" key={index}>
//         <div className="spendingoverviewtab-page-tab-icon">{item.icon}</div>
//         <div className="spendingoverviewtab-page-tab-value">
//           {typeof item.value === 'number' ? formatINR(item.value) : item.value}
//         </div>
//         <div className="spendingoverviewtab-page-tab-label">{item.label}</div>
//       </div>
//     ))}

//     <div className="spendingoverviewtab-page-toggle-buttons">
//       <button
//         onClick={() => setDataSource('backend')}
//         className={dataSource === 'backend' ? 'active' : ''}
//       >
//         Backend
//       </button>
//       <button
//         onClick={() => setDataSource('csv')}
//         className={dataSource === 'csv' ? 'active' : ''}
//       >
//         CSV
//       </button>
//     </div>
//   </div>
// </div>

//   );
// };

// export default SpendingOverviewTabs;





// import React, { useEffect, useState } from 'react';
// import { Wallet, PiggyBank, Calendar, TrendingUp } from 'lucide-react';
// import './Spendingoverviewtabs.css';

// const formatINR = (amount) =>
//   new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0,
//   }).format(amount);

// const SpendingOverviewTabs = () => {
//   const [monthlyBudget, setMonthlyBudget] = useState(30000); // Editable by user
//   const [totalSpent, setTotalSpent] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/expense/retrieval');
//         const data = await res.json();

//         const transactions = data.transactions || [];

//         const currentMonthExpenses = transactions.filter((item) => {
//           const date = new Date(item.date);
//           const now = new Date();
//           return (
//             date.getMonth() === now.getMonth() &&
//             date.getFullYear() === now.getFullYear()
//           );
//         });

//         const total = currentMonthExpenses.reduce(
//           (sum, item) => sum + Number(item.amount || 0),
//           0
//         );

//         setTotalSpent(total);
//       } catch (error) {
//         console.error('Error fetching expenses:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const remaining = monthlyBudget - totalSpent;
//   const savingRate =
//     monthlyBudget > 0 ? `${Math.round((remaining / monthlyBudget) * 100)}%` : '0%';

//   const data = [
//     { label: 'Total Spent', icon: <Wallet size={20} />, value: totalSpent },
//     {
//       label: 'Monthly Budget',
//       icon: <Calendar size={20} />,
//       value: (
//         <input
//           type="number"
//           value={monthlyBudget}
//           onChange={(e) => setMonthlyBudget(Number(e.target.value))}
//           style={{
//             width: '80px',
//             border: 'none',
//             background: 'transparent',
//             fontSize: '1rem',
//             fontWeight: 'bold',
//             textAlign: 'right',
//           }}
//         />
//       ),
//     },
//     { label: 'Remaining', icon: <PiggyBank size={20} />, value: remaining },
//     { label: 'Saving Rate', icon: <TrendingUp size={20} />, value: savingRate },
//   ];

//   return (
//     <div className="spendingoverviewtab-page-tabs-container">
//       {data.map((item, index) => (
//         <div className="spendingoverviewtab-page-tab-card" key={index}>
//           <div className="spendingoverviewtab-page-tab-icon">{item.icon}</div>
//           <div className="spendingoverviewtab-page-tab-value">
//             {typeof item.value === 'number'
//               ? formatINR(item.value)
//               : item.value}
//           </div>
//           <div className="spendingoverviewtab-page-tab-label">{item.label}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SpendingOverviewTabs;
