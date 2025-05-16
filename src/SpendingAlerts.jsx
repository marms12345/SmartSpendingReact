// SpendingAlerts.js
import React, { useState } from 'react';
import SpendingOverviewTabs from './SpendingOverviewTabs';
import './Spendingalertsstyles.css';

export const SpendingAlerts = () => {
  const [dataSource, setDataSource] = useState('backend');
  const [monthlyBudget, setMonthlyBudget] = useState(30000);
  const [totalSpent, setTotalSpent] = useState(0);

  const remaining = monthlyBudget - totalSpent;
  const savingRateNum =
    monthlyBudget > 0 ? Math.round((remaining / monthlyBudget) * 100) : 0;

  let alertMessage = '';
  if (savingRateNum <= 0) {
    alertMessage = '⚠️ You have reached or exceeded your monthly budget!';
  } else if (savingRateNum <= 10) {
    alertMessage = '⚠️ Warning: You are close to your monthly budget limit.';
  } else if (savingRateNum >= 50) {
    alertMessage = '✅ Great! You have used less than half of your budget.';
  } else {
    alertMessage = 'ℹ️ Keep an eye on your spending.';
  }

  return (
    <div className="spendingalerts-container">
      <div className="spendingalerts-alert-box">{alertMessage}</div>
      <SpendingOverviewTabs
        dataSource={dataSource}
        setDataSource={setDataSource}
        monthlyBudget={monthlyBudget}
        setMonthlyBudget={setMonthlyBudget}
        totalSpent={totalSpent}
        setTotalSpent={setTotalSpent}
      />
    </div>
  );
};

export default SpendingAlerts;
