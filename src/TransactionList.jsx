import React, { useState } from "react";
import "./Transactionliststyles.css";

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    const handleRetrieve = async () => {
        try {
            const response = await fetch("http://localhost:5000/expense/retrieval");
            if (!response.ok) throw new Error("Failed to retrieve transactions");

            const data = await response.json();
            setTransactions(data.transactions || []);
        } catch (error) {
            console.error("Error retrieving transactions:", error);
            alert("Something went wrong while fetching the transactions.");
        }
    };

    return (
        <div className="transaction-list-container">
            <div className="form-button" style={{ marginTop: "20px" }}>
                <button onClick={handleRetrieve} className="transaction-form-submit-btn">
                    Show Transactions
                </button>
            </div>

            {transactions.length > 0 && (
                <div className="transaction-table-container">
                    <h3>All Transactions</h3>
                    <table border="1" cellPadding="10" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>SI. No.</th>
                                <th>Transaction #</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((txn, index) => (
                                <tr key={txn.transactionNumber}>
                                    <td>{index + 1}</td>
                                    <td>{txn.transactionNumber}</td>
                                    <td>{txn.amount}</td>
                                    <td>{txn.description}</td>
                                    <td>{txn.category}</td>
                                    <td>{new Date(txn.date).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TransactionList;
