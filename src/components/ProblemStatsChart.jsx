// src/components/ProblemStatsChart.jsx

import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { FaGithub } from "react-icons/fa";  // Using GitHub icon as a placeholder
import leetcodeStats from "../assets/data/leetcodeStats"; // Static data
import "../assets/css/ProblemStatsChart.css"; // CSS for styling

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"]; // Easy, Medium, Hard

const ProblemStatsChart = () => {
  const stats = leetcodeStats;

  return (
    <div className="problem-stats-container">
      <div className="pie-chart-container">
        {/* Pie Chart */}
        <PieChart width={250} height={250}>
          <Pie
            data={stats}
            dataKey="count"
            nameKey="difficulty"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
          >
            {stats.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      <div className="stats-container">
        {/* Difficulty-wise Count */}
        {stats.map((entry, index) => (
          <div
            key={entry.difficulty}
            className="difficulty-box"
            style={{ backgroundColor: COLORS[index] }}
          >
            <span className="difficulty-name">{entry.difficulty}</span>
            <span className="difficulty-count">{entry.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemStatsChart;
