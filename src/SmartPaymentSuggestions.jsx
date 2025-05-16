// SpendingAlerts.js
import React, { useState } from 'react';
import SpendingOverviewTabs from './SpendingOverviewTabs';
import './SmartPaymentSuggestionsstyles.css';

export const SmartPaymentSuggestions = () => {
  const [dataSource, setDataSource] = useState('backend');
  const [monthlyBudget, setMonthlyBudget] = useState(30000);
  const [totalSpent, setTotalSpent] = useState(0);

  const remaining = monthlyBudget - totalSpent;
  const savingRateNum =
    monthlyBudget > 0 ? Math.round((remaining / monthlyBudget) * 100) : 0;

  let alertMessage = '';
  let smartSuggestions = [];

  if (savingRateNum <= 0) {
    alertMessage = '⚠️ You have reached or exceeded your monthly budget!';
    smartSuggestions.push(
      '💳 Consider using a cashback credit card for your purchases to soften the impact.',
      '📊 Review and adjust your spending categories for next month.',
      '🚨 Enable spending alerts to prevent over-budgeting in real time.'
    );
  } else if (savingRateNum <= 10) {
    alertMessage = '⚠️ Warning: You are close to your monthly budget limit.';
    smartSuggestions.push(
      '💡 Try switching to UPI or wallet payments with ongoing offers to save a bit more.',
      '🛍️ For upcoming online shopping, check if your credit card offers discounts (like on Amazon, Flipkart).',
      '🔍 Avoid impulse purchases — maybe use a wishlist instead and wait 24 hours before buying.'
    );
  } else if (savingRateNum >= 50) {
    alertMessage = '✅ Great! You have used less than half of your budget.';
    smartSuggestions.push(
      '💳 You might qualify for premium credit card offers — consider exploring options.',
      '📈 Reinvest your unspent budget into a savings or SIP plan for better returns.',
      '🤝 Consider sharing your budgeting habits with friends via the app (coming soon!).'
    );
  } else {
    alertMessage = 'ℹ️ Keep an eye on your spending.';
    smartSuggestions.push(
      '🛒 Plan big-ticket purchases toward the end of your billing cycle for better cash flow.',
      '🔔 Set category-wise limits for groceries, travel, or shopping to stay in control.',
      '💳 Link your bank accounts and cards for personalized suggestions (feature coming soon).'
    );
  }

  return (
    <div className="spendingalerts-container">
      <div className="spendingalerts-alert-box">{alertMessage}</div>

      <div className="spendingalerts-suggestions">
        <h4>Smart Payment Suggestions</h4>
        <ul>
          {smartSuggestions.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

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

export default SmartPaymentSuggestions;

