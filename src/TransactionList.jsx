import React, { useState } from "react";
import "./Transactionliststyles.css";

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [view, setView] = useState(""); // "normal" or "csv"

    const handleRetrieve = async () => {
        try {
            const response = await fetch("http://localhost:5000/expense/retrieval");
            if (!response.ok) throw new Error("Failed to retrieve transactions");

            const data = await response.json();
            setTransactions(data.transactions || []);
            setView("normal");
        } catch (error) {
            console.error("Error retrieving transactions:", error);
            alert("Something went wrong while fetching the transactions.");
        }
    };

    const handleRetrieveCSV = async () => {
        try {
            const response = await fetch("http://localhost:5000/upload/csv-records");
            if (!response.ok) throw new Error("Failed to retrieve CSV transactions");

            const data = await response.json();
            setTransactions(data.records || []); // ✅ updated to 'records'
            setView("csv");
        } catch (error) {
            console.error("Error retrieving CSV transactions:", error);
            alert("Something went wrong while fetching the CSV data.");
        }
    };

    return (
        <div className="transaction-list-container">
            <div className="form-button" style={{ marginTop: "20px", gap: "1rem", display: "flex", justifyContent: "center" }}>
                <button onClick={handleRetrieve} className="transaction-form-submit-btn">
                    Show Normal Transactions
                </button>
                <button onClick={handleRetrieveCSV} className="transaction-form-submit-btn">
                    Show CSV Transactions
                </button>
            </div>

            {transactions.length > 0 && (
                <div className="transaction-table-container">
                    <h3>{view === "csv" ? "CSV Transactions" : "All Transactions"}</h3>
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
                                <tr key={txn.transactionNumber || index}>
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




// import React, { useState } from "react";
// import "./Transactionliststyles.css";

// const TransactionList = () => {
//     const [transactions, setTransactions] = useState([]);

//     const handleRetrieve = async () => {
//         try {
//             const response = await fetch("http://localhost:5000/expense/retrieval");
//             if (!response.ok) throw new Error("Failed to retrieve transactions");

//             const data = await response.json();
//             setTransactions(data.transactions || []);
//         } catch (error) {
//             console.error("Error retrieving transactions:", error);
//             alert("Something went wrong while fetching the transactions.");
//         }
//     };

//     return (
//         <div className="transaction-list-container">
//             <div className="form-button" style={{ marginTop: "20px" }}>
//                 <button onClick={handleRetrieve} className="transaction-form-submit-btn">
//                     Show Transactions
//                 </button>
//             </div>

//             {transactions.length > 0 && (
//                 <div className="transaction-table-container">
//                     <h3>All Transactions</h3>
//                     <table border="1" cellPadding="10" cellSpacing="0">
//                         <thead>
//                             <tr>
//                                 <th>SI. No.</th>
//                                 <th>Transaction #</th>
//                                 <th>Amount</th>
//                                 <th>Description</th>
//                                 <th>Category</th>
//                                 <th>Date</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {transactions.map((txn, index) => (
//                                 <tr key={txn.transactionNumber}>
//                                     <td>{index + 1}</td>
//                                     <td>{txn.transactionNumber}</td>
//                                     <td>{txn.amount}</td>
//                                     <td>{txn.description}</td>
//                                     <td>{txn.category}</td>
//                                     <td>{new Date(txn.date).toLocaleString()}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TransactionList;



// ############## the second one ################

// import React, { useState } from "react";
// import "./Transactionliststyles.css";

// const TransactionList = ({ transactions: propTransactions }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [showCSVData, setShowCSVData] = useState(false);

//   const handleRetrieve = async () => {
//     if (propTransactions && propTransactions.length > 0) {
//       setTransactions(propTransactions);
//       setShowCSVData(true);
//     } else {
//       alert("No CSV data found. Please upload a file first.");
//     }
//   };

//   return (
//     <div className="transaction-list-container">
//       <div className="form-button" style={{ marginTop: "20px" }}>
//         <button onClick={handleRetrieve} className="transaction-form-submit-btn">
//           Show Transactions
//         </button>
//       </div>

//       {transactions.length > 0 && (
//         <div className="transaction-table-container">
//           <h3>{showCSVData ? "CSV Transactions" : "All Transactions"}</h3>
//           <table border="1" cellPadding="10" cellSpacing="0">
//             <thead>
//               <tr>
//                 <th>SI. No.</th>
//                 <th>Transaction #</th>
//                 <th>Amount</th>
//                 <th>Description</th>
//                 <th>Category</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((txn, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{txn.transactionNumber || `TX-${index + 1}`}</td>
//                   <td>{txn.amount}</td>
//                   <td>{txn.description}</td>
//                   <td>{txn.category}</td>
//                   <td>{new Date(txn.date).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransactionList;


// ########the intial one which can also be used for the initial transaction form and 3 transaction form############
// import React, { useState } from "react";
// import "./Transactionliststyles.css";

// const TransactionList = () => {
//     const [transactions, setTransactions] = useState([]);

//     const handleRetrieve = async () => {
//         try {
//             const response = await fetch("http://localhost:5000/expense/retrieval");
//             if (!response.ok) throw new Error("Failed to retrieve transactions");

//             const data = await response.json();
//             setTransactions(data.transactions || []);
//         } catch (error) {
//             console.error("Error retrieving transactions:", error);
//             alert("Something went wrong while fetching the transactions.");
//         }
//     };

//     return (
//         <div className="transaction-list-container">
//             <div className="form-button" style={{ marginTop: "20px" }}>
//                 <button onClick={handleRetrieve} className="transaction-form-submit-btn">
//                     Show Transactions
//                 </button>
//             </div>

//             {transactions.length > 0 && (
//                 <div className="transaction-table-container">
//                     <h3>All Transactions</h3>
//                     <table border="1" cellPadding="10" cellSpacing="0">
//                         <thead>
//                             <tr>
//                                 <th>SI. No.</th>
//                                 <th>Transaction #</th>
//                                 <th>Amount</th>
//                                 <th>Description</th>
//                                 <th>Category</th>
//                                 <th>Date</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {transactions.map((txn, index) => (
//                                 <tr key={txn.transactionNumber}>
//                                     <td>{index + 1}</td>
//                                     <td>{txn.transactionNumber}</td>
//                                     <td>{txn.amount}</td>
//                                     <td>{txn.description}</td>
//                                     <td>{txn.category}</td>
//                                     <td>{new Date(txn.date).toLocaleString()}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TransactionList;
