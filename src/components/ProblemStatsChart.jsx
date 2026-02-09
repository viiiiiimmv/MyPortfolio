import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import useLeetCodeStats from "../hooks/useLeetCodeStats";
import {
  buildLeetCodeProfileUrl,
  extractLeetCodeHandle,
} from "../utils/leetcode";

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

const formatLastUpdated = (value) => {
  if (!value) return "Waiting for sync";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Waiting for sync";

  return `Updated ${parsed.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const ProblemStatsChart = ({ profile = "https://leetcode.com/u/viii-iii-mmv/" }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const username = useMemo(() => extractLeetCodeHandle(profile), [profile]);
  const profileUrl = useMemo(() => buildLeetCodeProfileUrl(username), [username]);

  const {
    stats,
    totalProblems,
    isLoading,
    isRefreshing,
    error,
    source,
    lastUpdated,
  } = useLeetCodeStats(username);

  const safeTotalProblems = Math.max(1, totalProblems);
  const statusLabel = useMemo(() => {
    if (!username) return "Invalid LeetCode profile";
    if (isLoading) return "Syncing latest stats...";
    if (isRefreshing) return "Refreshing stats...";
    if (error) return `Using cached stats (${source})`;
    return `${formatLastUpdated(lastUpdated)} • ${source}`;
  }, [error, isLoading, isRefreshing, lastUpdated, source, username]);

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-thin text-white tracking-[0.2em] mb-4">
          CODE. SOLVE. REPEAT.
        </h2>
        <div className="w-16 h-px bg-white/60 mb-2" />
        <p className="text-xs text-gray-400 tracking-[0.15em] uppercase">
          Problem Solving Journey
        </p>
      </div>

      {/* Main Stats Container */}
      <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
        
        {/* Minimalist Pie Chart */}
        <div className="relative">
          {/* Center total count */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-thin text-white mb-1">
                {totalProblems}
              </div>
              <div className="text-xs text-gray-400 tracking-widest uppercase">
                Solved
              </div>
            </div>
          </div>

          <PieChart width={220} height={220}>
            <Pie
              data={stats}
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
              {stats.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={hoveredIndex === index ? HOVER_COLORS[index] : COLORS[index]}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </div>

        {/* Elegant Stats List */}
        <div className="flex flex-col gap-6 flex-1 max-w-xs">
          {stats.map((entry, index) => {
            const percentage = ((entry.count / safeTotalProblems) * 100).toFixed(1);
            
            return (
              <div
                key={entry.difficulty}
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
                  <div
                    className="h-full transition-all duration-300"
                    style={{ width: `${percentage}%`, backgroundColor: COLORS[index] }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Minimalist Footer */}
      <div className="pt-6 border-t border-gray-800">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">
          {statusLabel}
        </p>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
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
        </a>
      </div>
    </div>
  );
};

export default ProblemStatsChart;
