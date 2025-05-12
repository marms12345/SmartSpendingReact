import React, { useState } from "react";
import "./Transactionformstyles.css";

const categories = [
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

const TransactionForm = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const transactionData = {
            amount: parseFloat(amount),
            description,
            category,
            date: new Date().toISOString()
        };

        try {
            const response = await fetch("http://localhost:5000/expense/transaction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(transactionData)
            });

            if (!response.ok) throw new Error("Failed to add transaction");

            alert("Transaction added successfully!");
            setAmount("");
            setDescription("");
            setCategory("");
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong while saving the transaction.");
        }
    };

    return (
        <div>
            <div className="transaction-form-mainHeading">
                <h2>Add New Expense</h2>
            </div>
            <div className="transaction-form-container">
                <form className="transaction-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            placeholder="Enter amount"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Enter description"
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-button">
                        <button type="submit" className="transaction-form-submit-btn">
                            Add Transaction
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default TransactionForm;
