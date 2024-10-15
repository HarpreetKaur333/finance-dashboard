import React, { useState, useEffect } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import './App.css';
import { FaUser, FaEnvelope, FaBriefcase } from "react-icons/fa"; // Import icons

function App() {
  // Initial state for income, expenses, and categories
  const [income, setIncome] = useState([500, 1000, 750, 900, 1200, 1500]);
  const [expenses, setExpenses] = useState([300, 600, 400, 550, 700, 800]);
  const [expenseCategories, setExpenseCategories] = useState([
    { category: "Rent", amount: 500 },
    { category: "Food", amount: 300 },
    { category: "Transport", amount: 100 },
    { category: "Shopping", amount: 200 },
    { category: "Entertainment", amount: 150 },
  ]);

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    jobTitle: ""
  });

  // Load personal info from localStorage when the component mounts
  useEffect(() => {
    const storedPersonalInfo = localStorage.getItem('personalInfo');
    if (storedPersonalInfo) {
      setPersonalInfo(JSON.parse(storedPersonalInfo));
    }
  }, []);

  // Save personal info to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
  }, [personalInfo]);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const [newIncome, setNewIncome] = useState('');
  const [newExpense, setNewExpense] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Rent');

  const categories = ["Rent", "Food", "Transport", "Shopping", "Entertainment"];

  const addIncome = () => {
    if (newIncome) {
      setIncome([...income, parseFloat(newIncome)]);
      setNewIncome('');
    }
  };

  const addExpense = () => {
    if (newExpense && selectedCategory) {
      setExpenses([...expenses, parseFloat(newExpense)]);
      setExpenseCategories([...expenseCategories, { category: selectedCategory, amount: parseFloat(newExpense) }]);
      setNewExpense('');
      setSelectedCategory('Rent');
    }
  };

  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Income",
        data: income,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Expenses",
        data: expenses,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const pieChartData = {
    labels: expenseCategories.map((item) => item.category),
    datasets: [
      {
        data: expenseCategories.map((item) => item.amount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const barChartData = {
    labels: expenseCategories.map((item) => item.category),
    datasets: [
      {
        label: "Expenses by Category",
        data: expenseCategories.map((item) => item.amount),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="App">
      <h1>Personal Finance Dashboard</h1>

      <div className="content-wrapper">
        {/* Personal Info Form */}
        <div className="personal-info">
          <h2>Personal Information</h2>
          <div>
            <label><FaUser /> Name:</label>
            <input
              type="text"
              name="name"
              value={personalInfo.name}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div>
            <label><FaEnvelope /> Email:</label>
            <input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
              required
            />
          </div>
          <div>
            <label><FaBriefcase /> Job Title:</label>
            <input
              type="text"
              name="jobTitle"
              value={personalInfo.jobTitle}
              onChange={handlePersonalInfoChange}
              required
            />
          </div>

          <h3>Entered Info:</h3>
          <p><strong>Name:</strong> {personalInfo.name}</p>
          <p><strong>Email:</strong> {personalInfo.email}</p>
          <p><strong>Job Title:</strong> {personalInfo.jobTitle}</p>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="input-section">
            <h3>Add Income</h3>
            <input
              type="number"
              placeholder="Income"
              value={newIncome}
              onChange={(e) => setNewIncome(e.target.value)}
            />
            <button onClick={addIncome}>Add Income</button>
          </div>

          <div className="input-section">
            <h3>Add Expense</h3>
            <input
              type="number"
              placeholder="Expense Amount"
              value={newExpense}
              onChange={(e) => setNewExpense(e.target.value)}
            />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button onClick={addExpense}>Add Expense</button>
          </div>

          <div className="chart-container">
            <div className="chart">
              <h2>Income vs Expenses</h2>
              <Line data={lineChartData} />
            </div>

            <div className="chart">
              <h2>Expenses Breakdown</h2>
              <Pie data={pieChartData} />
            </div>
          </div>

          <div className="chart-container">
            <div className="chart">
              <h2>Expenses by Category</h2>
              <Bar data={barChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
