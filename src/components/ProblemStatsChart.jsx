import React, { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import leetcodeStats from "../assets/data/leetcodeStats";

// Monochrome color scheme with subtle gradients
const COLORS = ["#ffffff", "#a1a1aa", "#525252"]; // White, light gray, dark gray
const HOVER_COLORS = ["#f3f4f6", "#d1d5db", "#6b7280"]; // Slightly different shades for hover

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg px-4 py-3 shadow-2xl">
        <p className="text-white font-light text-sm tracking-wider">
          <span className="text-gray-300">{payload[0].name}:</span> {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const ProblemStatsChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const totalProblems = leetcodeStats.reduce((sum, entry) => sum + entry.count, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-thin text-white tracking-[0.2em] mb-4">
          CODE. SOLVE. REPEAT.
        </h2>
        <div className="w-16 h-px bg-white/60 mb-2" />
        <p className="text-xs text-gray-400 tracking-[0.15em] uppercase">
          Problem Solving Journey
        </p>
      </motion.div>

      {/* Main Stats Container */}
      <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
        
        {/* Minimalist Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          {/* Center total count */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-3xl font-thin text-white mb-1"
              >
                {totalProblems}
              </motion.div>
              <div className="text-xs text-gray-400 tracking-widest uppercase">
                Solved
              </div>
            </div>
          </div>

          <PieChart width={220} height={220}>
            <Pie
              data={leetcodeStats}
              dataKey="count"
              nameKey="difficulty"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={3}
              cornerRadius={0}
              stroke="none"
            >
              {leetcodeStats.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={hoveredIndex === index ? HOVER_COLORS[index] : COLORS[index]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </motion.div>

        {/* Elegant Stats List */}
        <div className="flex flex-col gap-6 flex-1 max-w-xs">
          {leetcodeStats.map((entry, index) => {
            const percentage = ((entry.count / totalProblems) * 100).toFixed(1);
            
            return (
              <motion.div
                key={entry.difficulty}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-3 h-3 transition-all duration-300 ${
                        hoveredIndex === index ? 'scale-125' : 'scale-100'
                      }`}
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-white font-light tracking-wider uppercase text-sm">
                      {entry.difficulty}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-light text-lg">
                      {entry.count}
                    </div>
                    <div className="text-xs text-gray-500">
                      {percentage}%
                    </div>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-px bg-gray-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: "easeOut" }}
                    className="h-full transition-all duration-300"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Minimalist Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="pt-6 border-t border-gray-800"
      >
        <motion.a
          href="https://leetcode.com/shivchauhan"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
          whileHover={{ x: 4 }}
        >
          {/* LeetCode icon replacement with geometric shape */}
          <div className="w-5 h-5 border border-gray-600 group-hover:border-white transition-colors duration-300 flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-600 group-hover:bg-white transition-colors duration-300" />
          </div>
          
          <span className="font-light tracking-wider text-sm">
            Visit LeetCode Profile
          </span>
          
          <div className="w-8 h-px bg-gray-600 group-hover:bg-white group-hover:w-12 transition-all duration-300" />
          <div className="w-1.5 h-1.5 border-t border-r border-gray-600 group-hover:border-white rotate-45 transition-all duration-300" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default ProblemStatsChart;