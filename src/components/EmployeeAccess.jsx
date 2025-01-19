import React from "react";
import { Bar, Line } from "react-chartjs-2"; // Import charts for analytics
import TaskList from "./TaskList";

const EmployeeAccess = ({ tasks, employeeStats, selectedEmployee, setSelectedEmployee }) => {
  // Generate data for productivity insights
  const generateChartData = () => {
    const taskCategories = tasks.reduce((acc, task) => {
      if (!acc[task.category]) acc[task.category] = 0;
      acc[task.category] += parseFloat(task.timeSpent);
      return acc;
    }, {});

    return {
      labels: Object.keys(taskCategories),
      datasets: [
        {
          label: "Time Spent per Category (hours)",
          data: Object.values(taskCategories),
          backgroundColor: ["#FF5733", "#33FF57", "#3357FF"],
        },
      ],
    };
  };

  const generateLineChartData = () => {
    const performanceOverTime = tasks.reduce((acc, task) => {
      const date = task.timestamp.toDate().toLocaleDateString();
      if (!acc[date]) acc[date] = 0;
      acc[date] += parseFloat(task.timeSpent);
      return acc;
    }, {});

    return {
      labels: Object.keys(performanceOverTime),
      datasets: [
        {
          label: "Productivity Over Time",
          data: Object.values(performanceOverTime),
          borderColor: "#FF5733",
          fill: false,
        },
      ],
    };
  };

  return (
    <div className="dashboard-container">
      <h1>Employee Dashboard</h1>
      <div className="filters-container">
        <label>Filter by Employee:</label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">All Employees</option>
          {Object.keys(employeeStats).map((uid) => (
            <option key={uid} value={uid}>
              Employee {uid}
            </option>
          ))}
        </select>
      </div>

      <h2>Productivity Insights</h2>
      <div className="chart-container">
        <Bar data={generateChartData()} />
        <Line data={generateLineChartData()} />
      </div>

      <h2>Your Tasks</h2>
      <TaskList tasks={tasks.filter((task) => task.uid === selectedEmployee)} />
    </div>
  );
};

export default EmployeeAccess;
