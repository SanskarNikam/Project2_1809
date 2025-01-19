import React from "react";
import { Bar, Pie } from "react-chartjs-2"; // Import charts for analytics

const EmployerAccess = ({ tasks, employeeStats, leaderboard, teamChallenges }) => {
  const generatePieChartData = () => {
    const taskCategories = tasks.reduce((acc, task) => {
      if (!acc[task.category]) acc[task.category] = 0;
      acc[task.category] += 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(taskCategories),
      datasets: [
        {
          label: "Task Distribution by Category",
          data: Object.values(taskCategories),
          backgroundColor: ["#FF5733", "#33FF57", "#3357FF"],
        },
      ],
    };
  };

  return (
    <div className="dashboard-container">
      <h1>Employer Dashboard</h1>

      <h2>Team Productivity Insights</h2>
      <div className="chart-container">
        <Bar
          data={{
            labels: Object.keys(employeeStats),
            datasets: [
              {
                label: "Total Time Spent (hours)",
                data: Object.values(employeeStats).map((stat) => stat.totalTimeSpent),
                backgroundColor: "#3357FF",
              },
              {
                label: "Tasks Completed",
                data: Object.values(employeeStats).map((stat) => stat.tasksCompleted),
                backgroundColor: "#FF5733",
              },
            ],
          }}
        />
        <Pie data={generatePieChartData()} />
      </div>

      <h2>Leaderboard</h2>
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

      <h2>Team Challenges</h2>
      <div className="challenges-container">
        {teamChallenges.map((challenge, index) => (
          <div key={index} className="challenge">
            <h4>{challenge.challenge}</h4>
            <p>
              {challenge.completed} / {challenge.target} 
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerAccess;
