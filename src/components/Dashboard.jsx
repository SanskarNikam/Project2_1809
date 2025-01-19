import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { db } from "../backend/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import '../dashboard.css'; // Styles
import { Bar, Pie, Line } from 'react-chartjs-2'; 
import { Chart as ChartJS } from 'chart.js/auto'; 

const Dashboard = () => {
  const [tasks, setTasks] = useState([]); // Tasks
  const [employeeStats, setEmployeeStats] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(""); // Filter
  const [customReportData, setCustomReportData] = useState([]);
  const [reportType, setReportType] = useState(""); // Report
  const [leaderboard, setLeaderboard] = useState([]);
  const [teamChallenges, setTeamChallenges] = useState([]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const taskQuery = query(collection(db, "tasks"));
      const querySnapshot = await getDocs(taskQuery);
      const fetchedTasks = [];
      querySnapshot.forEach((doc) => {
        fetchedTasks.push({ ...doc.data(), id: doc.id });
      });
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  const generateChartData = () => {
    const taskCategories = tasks.reduce((acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = 0;
      }
      acc[task.category] += parseFloat(task.timeSpent);
      return acc;
    }, {});

    return {
      labels: Object.keys(taskCategories),
      datasets: [
        {
          label: 'Time Spent per Category (hours)',
          data: Object.values(taskCategories),
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
        },
      ],
    };
  };

  const filteredTasks = selectedEmployee
    ? tasks.filter((task) => task.uid === selectedEmployee)
    : tasks;

  const generatePerformanceTrends = () => {
    const performanceData = tasks.reduce((acc, task) => {
      if (!acc[task.uid]) {
        acc[task.uid] = { tasksCompleted: 0, totalTimeSpent: 0 };
      }
      acc[task.uid].tasksCompleted += 1;
      acc[task.uid].totalTimeSpent += parseFloat(task.timeSpent);
      return acc;
    }, {});

    setEmployeeStats(performanceData);
  };

  const generateReport = (period) => {
    const reportData = tasks.filter((task) => {
      const taskDate = task.timestamp.toDate();
      const currentDate = new Date();
      const diffInTime = currentDate - taskDate;
      if (period === "weekly") {
        return diffInTime <= 7 * 24 * 60 * 60 * 1000;
      } else if (period === "monthly") {
        return diffInTime <= 30 * 24 * 60 * 60 * 1000;
      }
      return true;
    });
    setCustomReportData(reportData);
  };

  const generateLineChartData = () => {
    const performanceOverTime = tasks.reduce((acc, task) => {
      const date = task.timestamp.toDate().toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += parseFloat(task.timeSpent);
      return acc;
    }, {});

    return {
      labels: Object.keys(performanceOverTime),
      datasets: [
        {
          label: 'Productivity Over Time',
          data: Object.values(performanceOverTime),
          borderColor: '#FF5733',
          fill: false,
        },
      ],
    };
  };

  const generatePieChartData = () => {
    const taskCategories = tasks.reduce((acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = 0;
      }
      acc[task.category] += 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(taskCategories),
      datasets: [
        {
          label: 'Task Distribution by Category',
          data: Object.values(taskCategories),
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
        },
      ],
    };
  };

  const generateLeaderboard = () => {
    const sortedLeaderboard = Object.entries(employeeStats)
      .map(([uid, stats]) => ({
        uid,
        tasksCompleted: stats.tasksCompleted,
        totalTimeSpent: stats.totalTimeSpent,
      }))
      .sort((a, b) => b.tasksCompleted - a.tasksCompleted);

    setLeaderboard(sortedLeaderboard);
  };

  const generateTeamChallenges = () => {
    const challengeData = [
      { challenge: "Complete 10 Ad Hoc Tasks This Week", target: 10, completed: 7 },
      { challenge: "Complete 50 Tasks This Month", target: 50, completed: 45 },
    ];
    setTeamChallenges(challengeData);
  };

  useEffect(() => {
    generatePerformanceTrends();
    generateLeaderboard();
    generateTeamChallenges();
  }, [tasks]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Employer Dashboard</h1>

      <div className="filters-container">
        <label>Select Employee:</label>
        <select
          onChange={(e) => setSelectedEmployee(e.target.value)}
          value={selectedEmployee}
        >
          <option value="">All Employees</option>
          {employeeStats &&
            Object.keys(employeeStats).map((uid) => (
              <option key={uid} value={uid}>
                Employee {uid}
              </option>
            ))}
        </select>
      </div>

      <TaskForm addTask={addTask} />

      <h2>Productivity Insights</h2>
      <div className="chart-container">
        <Bar data={generateChartData()} />
        <Line data={generateLineChartData()} />
        <Pie data={generatePieChartData()} />
      </div>

      <h2>Team Performance Trends</h2>
      <div className="performance-table">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Tasks Completed</th>
              <th>Total Time Spent (hours)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(employeeStats).map((uid) => (
              <tr key={uid}>
                <td>Employee {uid}</td>
                <td>{employeeStats[uid].tasksCompleted}</td>
                <td>{employeeStats[uid].totalTimeSpent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Leaderboard</h2>
      <div className="leaderboard-container">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Employee</th>
              <th>Tasks Completed</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.uid}>
                <td>{index + 1}</td>
                <td>Employee {entry.uid}</td>
                <td>{entry.tasksCompleted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Team Challenges</h2>
      <div className="challenges-container">
        {teamChallenges.map((challenge, index) => (
          <div key={index} className="challenge">
            <h4>{challenge.challenge}</h4>
            <p>
              {challenge.completed} / {challenge.target} tasks completed
            </p>
          </div>
        ))}
      </div>

      <h2>Generate Custom Report</h2>
      <div>
        <button onClick={() => generateReport("weekly")}>Weekly Report</button>
        <button onClick={() => generateReport("monthly")}>Monthly Report</button>
      </div>

      <div className="custom-report">
        <h3>{reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h3>
        <ul>
          {customReportData.map((task) => (
            <li key={task.id}>{task.name} - {task.category} - {task.timeSpent} hours</li>
          ))}
        </ul>
      </div>

      <TaskList tasks={filteredTasks} />
    </div>
  );
};

export default Dashboard;
