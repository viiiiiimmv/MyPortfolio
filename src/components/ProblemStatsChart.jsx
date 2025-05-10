import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import leetcodeStats from "../assets/data/leetcodeStats"; // Static data
import "../assets/css/ProblemStatsChart.css";

const COLORS = ["#00C49F", "#FFBB28", "#FF4F81"]; // Easy, Medium, Hard

const ProblemStatsChart = () => {
  return (
    <div className="stats-wrapper">
      <h2 className="stats-heading">Code. Solve. Repeat.</h2>

      <div className="problem-stats-container">
        {/* Pie Chart Section */}
        <div className="pie-chart-container">
          <PieChart width={280} height={280}>
            <Pie
              data={leetcodeStats}
              dataKey="count"
              nameKey="difficulty"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              cornerRadius={8}
            >
              {leetcodeStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Stats List Section */}
        <div className="stats-container">
          {leetcodeStats.map((entry, index) => (
            <div
              key={entry.difficulty}
              className="difficulty-box modern"
              style={{ borderLeft: `6px solid ${COLORS[index]}` }}
            >
              <span className="difficulty-name">{entry.difficulty}</span>
              <span className="difficulty-count">{entry.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="footer-details">
          <img 
            src="https://cdn.simpleicons.org/leetcode/FFA116" 
            alt="LeetCode" 
            width="20" 
            height="20" 
          />
          <a href="https://leetcode.com/shivchauhan" target="_blank" rel="noopener noreferrer">
            Visit LeetCode Profile
          </a>
        </p>
      </div>
    </div>
  );
};

export default ProblemStatsChart;
