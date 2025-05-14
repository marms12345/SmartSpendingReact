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
  "Others",
];

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [csvFile, setCsvFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {
      amount: parseFloat(amount),
      description,
      category,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/expense/transaction",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transactionData),
        }
      );

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

  const handleFileUpload = async () => {
    if (!csvFile) {
      alert("Please select a CSV file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      const response = await fetch("http://localhost:5000/upload/upload-csv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload CSV");

      const result = await response.json();
      alert(result.message || "CSV uploaded successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while uploading the CSV file.");
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
              <option value="" disabled>
                Select category
              </option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
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

      {/* Upload CSV Section */}
      <div className="transaction-form-upload-csv-container">
        <label
          htmlFor="csv-upload"
          className="transaction-form-upload-csv-label"
        >
          Upload CSV File
        </label>
        {/* Custom file input */}
        <label
          htmlFor="csv-upload"
          className="transaction-form-custom-file-upload"
        >
          Choose File
        </label>
        <input
          type="file"
          id="csv-upload"
          accept=".csv"
          onChange={(e) => setCsvFile(e.target.files[0])}
        />
        <button
          onClick={handleFileUpload}
          className="transaction-form-upload-csv-btn"
        >
          Upload CSV
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;

// import React, { useState } from "react";
// import "./Transactionformstyles.css";

// const categories = [
//     "Food & Dining",
//     "Transportation",
//     "Bills & Utilities",
//     "Health",
//     "Shopping",
//     "Entertainment",
//     "Education",
//     "Personal Care",
//     "Others"
// ];

// const TransactionForm = () => {
//     const [amount, setAmount] = useState("");
//     const [description, setDescription] = useState("");
//     const [category, setCategory] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const transactionData = {
//             amount: parseFloat(amount),
//             description,
//             category,
//             date: new Date().toISOString()
//         };

//         try {
//             const response = await fetch("http://localhost:5000/expense/transaction", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(transactionData)
//             });

//             if (!response.ok) throw new Error("Failed to add transaction");

//             alert("Transaction added successfully!");
//             setAmount("");
//             setDescription("");
//             setCategory("");
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Something went wrong while saving the transaction.");
//         }
//     };

//     return (
//         <div>
//             <div className="transaction-form-mainHeading">
//                 <h2>Add New Expense</h2>
//             </div>
//             <div className="transaction-form-container">
//                 <form className="transaction-form" onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label>Amount</label>
//                         <input
//                             type="number"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                             required
//                             placeholder="Enter amount"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Description</label>
//                         <input
//                             type="text"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             required
//                             placeholder="Enter description"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Category</label>
//                         <select
//                             value={category}
//                             onChange={(e) => setCategory(e.target.value)}
//                             required
//                         >
//                             <option value="" disabled>Select category</option>
//                             {categories.map((cat, index) => (
//                                 <option key={index} value={cat}>{cat}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="form-button">
//                         <button type="submit" className="transaction-form-submit-btn">
//                             Add Transaction
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>

//     );
// };

// export default TransactionForm;


// ################### Third one which is the best one so try to maintain this one#################

// import React, { useState } from "react";
// import Papa from "papaparse";
// import "./Transactionformstyles.css";

// const categories = [
//   "Food & Dining",
//   "Transportation",
//   "Bills & Utilities",
//   "Health",
//   "Shopping",
//   "Entertainment",
//   "Education",
//   "Personal Care",
//   "Others"
// ];

// const TransactionForm = () => {
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [isCSVMode, setIsCSVMode] = useState(false); // toggle
//   const [csvData, setCSVData] = useState([]); // store CSV transactions

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const transactionData = {
//       amount: parseFloat(amount),
//       description,
//       category,
//       date: new Date().toISOString()
//     };

//     try {
//       const response = await fetch("http://localhost:5000/expense/transaction", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(transactionData)
//       });

//       if (!response.ok) throw new Error("Failed to add transaction");

//       alert("Transaction added successfully!");
//       setAmount("");
//       setDescription("");
//       setCategory("");
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong while saving the transaction.");
//     }
//   };

//   const handleCSV = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     Papa.parse(file, {
//       header: true,
//       skipEmptyLines: true,
//       complete: function (results) {
//         const parsedData = results.data.map(row => ({
//           amount: parseFloat(row.amount),
//           description: row.description,
//           category: row.category,
//           date: row.date || new Date().toISOString()
//         }));

//         setCSVData(parsedData);
//         console.log("CSV Data Parsed:", parsedData);
//       }
//     });
//   };

//   const toggleMode = () => {
//     setIsCSVMode(!isCSVMode);
//   };

//   return (
//     <div>
//       <div className="transaction-form-mainHeading">
//         <h2>{isCSVMode ? "Upload CSV Data" : "Add New Expense"}</h2>
//       </div>

//       <div className="transaction-form-container">
//         <form className="transaction-form" onSubmit={handleSubmit}>
//           {isCSVMode ? (
//             <>
//               <div className="form-group">
//                 <label>Upload CSV File</label>
//                 <input type="file" accept=".csv" onChange={handleCSV} />
//               </div>

//               {csvData.length > 0 && (
//                 <div className="csv-preview">
//                   <h3>CSV Preview:</h3>
//                   <ul>
//                     {csvData.map((item, index) => (
//                       <li key={index}>
//                         ₹{item.amount} - {item.description} ({item.category})
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </>
//           ) : (
//             <>
//               <div className="form-group">
//                 <label>Amount</label>
//                 <input
//                   type="number"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   required
//                   placeholder="Enter amount"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Description</label>
//                 <input
//                   type="text"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                   placeholder="Enter description"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Category</label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   required
//                 >
//                   <option value="" disabled>Select category</option>
//                   {categories.map((cat, index) => (
//                     <option key={index} value={cat}>{cat}</option>
//                   ))}
//                 </select>
//               </div>
//             </>
//           )}

//           <div className="form-button">
//             {!isCSVMode && (
//               <button type="submit" className="transaction-form-submit-btn">
//                 Add Transaction
//               </button>
//             )}

//             <button
//               type="button"
//               onClick={toggleMode}
//               className="toggle-mode-btn"
//             >
//               {isCSVMode ? "Go to Add Transaction" : "Go to Upload CSV"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TransactionForm;




// ############################ the second one #############################

// import React, { useState } from "react";
// import Papa from "papaparse";
// import "./Transactionformstyles.css";

// const categories = [
//     "Food & Dining",
//     "Transportation",
//     "Bills & Utilities",
//     "Health",
//     "Shopping",
//     "Entertainment",
//     "Education",
//     "Personal Care",
//     "Others"
// ];

// const TransactionForm = () => {
//     const [amount, setAmount] = useState("");
//     const [description, setDescription] = useState("");
//     const [category, setCategory] = useState("");

//     const [useCSVMode, setUseCSVMode] = useState(false);
//     const [csvTransactions, setCSVTransactions] = useState([]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const transactionData = {
//             amount: parseFloat(amount),
//             description,
//             category,
//             date: new Date().toISOString()
//         };

//         try {
//             const response = await fetch("http://localhost:5000/expense/transaction", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(transactionData)
//             });

//             if (!response.ok) throw new Error("Failed to add transaction");

//             alert("Transaction added successfully!");
//             setAmount("");
//             setDescription("");
//             setCategory("");
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Something went wrong while saving the transaction.");
//         }
//     };

//     const handleCSVUpload = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         Papa.parse(file, {
//             header: true,
//             skipEmptyLines: true,
//             complete: function (results) {
//                 const parsedData = results.data.map(row => ({
//                     amount: parseFloat(row.amount),
//                     description: row.description,
//                     category: row.category,
//                     date: row.date || new Date().toISOString()
//                 }));

//                 setCSVTransactions(parsedData);
//                 setUseCSVMode(true);
//                 alert("CSV uploaded! Now showing analysis for CSV data.");
//             }
//         });
//     };

//     return (
//         <div>
//             <div className="transaction-form-mainHeading">
//                 <h2>Add New Expense</h2>
//             </div>

//             <div className="transaction-form-container">
//                 <form className="transaction-form" onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label>Amount</label>
//                         <input
//                             type="number"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                             required
//                             placeholder="Enter amount"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Description</label>
//                         <input
//                             type="text"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             required
//                             placeholder="Enter description"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Category</label>
//                         <select
//                             value={category}
//                             onChange={(e) => setCategory(e.target.value)}
//                             required
//                         >
//                             <option value="" disabled>Select category</option>
//                             {categories.map((cat, index) => (
//                                 <option key={index} value={cat}>{cat}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="form-button">
//                         <button type="submit" className="transaction-form-submit-btn">
//                             Add Transaction
//                         </button>

//                         <input
//                             type="file"
//                             accept=".csv"
//                             onChange={handleCSVUpload}
//                             style={{ marginLeft: "10px" }}
//                         />
//                     </div>
//                 </form>
//             </div>

//             {/* {useCSVMode && (
//                 <div className="csv-preview">
//                     <h3>CSV Transactions Preview</h3>
//                     <ul>
//                         {csvTransactions.map((txn, index) => (
//                             <li key={index}>
//                                 ₹{txn.amount} - {txn.description} [{txn.category}]
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )} */}
//         </div>
//     );
// };

// export default TransactionForm;




// ################################# the initial one ######################################

// import React, { useState } from "react";
// import "./Transactionformstyles.css";

// const categories = [
//     "Food & Dining",
//     "Transportation",
//     "Bills & Utilities",
//     "Health",
//     "Shopping",
//     "Entertainment",
//     "Education",
//     "Personal Care",
//     "Others"
// ];

// const TransactionForm = () => {
//     const [amount, setAmount] = useState("");
//     const [description, setDescription] = useState("");
//     const [category, setCategory] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const transactionData = {
//             amount: parseFloat(amount),
//             description,
//             category,
//             date: new Date().toISOString()
//         };

//         try {
//             const response = await fetch("http://localhost:5000/expense/transaction", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(transactionData)
//             });

//             if (!response.ok) throw new Error("Failed to add transaction");

//             alert("Transaction added successfully!");
//             setAmount("");
//             setDescription("");
//             setCategory("");
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Something went wrong while saving the transaction.");
//         }
//     };

//     return (
//         <div>
//             <div className="transaction-form-mainHeading">
//                 <h2>Add New Expense</h2>
//             </div>
//             <div className="transaction-form-container">
//                 <form className="transaction-form" onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label>Amount</label>
//                         <input
//                             type="number"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                             required
//                             placeholder="Enter amount"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Description</label>
//                         <input
//                             type="text"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             required
//                             placeholder="Enter description"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Category</label>
//                         <select
//                             value={category}
//                             onChange={(e) => setCategory(e.target.value)}
//                             required
//                         >
//                             <option value="" disabled>Select category</option>
//                             {categories.map((cat, index) => (
//                                 <option key={index} value={cat}>{cat}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="form-button">
//                         <button type="submit" className="transaction-form-submit-btn">
//                             Add Transaction
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>

//     );
// };

// export default TransactionForm;
