import React from 'react';
import { Wallet, PiggyBank, Calendar, TrendingUp } from 'lucide-react';
import './Spendingoverviewtabs.css';

const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const data = [
  { label: 'Total Spent', icon: <Wallet size={20} />, value: 24890 },
  { label: 'Monthly Budget', icon: <Calendar size={20} />, value: 30000 },
  { label: 'Remaining', icon: <PiggyBank size={20} />, value: 5110 },
  { label: 'Saving Rate', icon: <TrendingUp size={20} />, value: '17%' },
];

const SpendingOverviewTabs = () => {
  return (
    <div className="spendingoverviewtab-page-tabs-container">
      {data.map((item, index) => (
        <div className="spendingoverviewtab-page-tab-card" key={index}>
          <div className="spendingoverviewtab-page-tab-icon">{item.icon}</div>
          <div className="spendingoverviewtab-page-tab-value">
            {typeof item.value === 'number' ? formatINR(item.value) : item.value}
          </div>
          <div className="spendingoverviewtab-page-tab-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default SpendingOverviewTabs;