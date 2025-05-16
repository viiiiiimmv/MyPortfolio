import React from 'react';
import '../assets/css/StackShowcase.css';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt, FaJava } from 'react-icons/fa';
import { SiJavascript, SiMongodb, SiTailwindcss, SiMysql } from 'react-icons/si';

const techStack = [
  { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E', dark: '#b9a90f' },
  { name: 'ReactJS', icon: <FaReact />, color: '#61DBFB', dark: '#1b8ca8' },
  { name: 'NodeJS', icon: <FaNodeJs />, color: '#68A063', dark: '#3c6b38' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#4DB33D', dark: '#2a6922' },
  { name: 'MySQL', icon: <SiMysql />, color: '#00758F', dark: '#003e49' },
  { name: 'TailwindCSS', icon: <SiTailwindcss />, color: '#38BDF8', dark: '#1b6077' },
  { name: 'Java', icon: <FaJava />, color: '#f89820', dark: '#914c08' },
  { name: 'Git Control', icon: <FaGitAlt />, color: '#F1502F', dark: '#812e1c' },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } }
};

const StackShowcase = () => {
  return (
    <section className="stack-fullscreen">
      <h2 className="stack-title">🚀 The Stack I Love</h2>
      <motion.div className="stack-grid" variants={container} initial="hidden" animate="show">
        {techStack.map((tool, index) => (
          <motion.div
            key={index}
            className="stack-card"
            variants={item}
            style={{
              '--hoverColor': tool.color,
              '--darkColor': tool.dark
            }}
          >
            <div className="stack-icon">{tool.icon}</div>
            <div className="stack-label">{tool.name}</div>
            <div className="gradient-overlay" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default StackShowcase;
