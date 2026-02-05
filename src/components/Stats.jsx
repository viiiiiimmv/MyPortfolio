import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProblemStatsChart from './ProblemStatsChart';
import images from '../assets/data/imageData';
import { FaInstagram, FaDownload, FaCoffee, FaCamera, FaGlobe} from 'react-icons/fa';

const handleDownload = () => {
  const link = document.createElement('a');
  link.href = 'https://drive.google.com/file/d/180o5z1N69kH0GgS4QMjojMA9mm4Hrv5i/view?usp=share_link';
  link.download = 'resume.pdf';
  link.click();
};

const Stats = () => {
  const [currentImage, setCurrentImage] = useState(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * images.length);
      setCurrentImage(images[nextIndex]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-3">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 3px 3px, white 1px, transparent 0)',
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row">
        
        {/* Left side - Photography showcase */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative lg:w-1/2 h-screen flex flex-col justify-between p-8 lg:p-16"
        >
          {/* Header section */}
          <div className="relative z-20">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <FaCamera className="text-white text-2xl" />
              <div className="w-16 h-px bg-white" />
              <span className="text-xs text-gray-400 tracking-[0.3em] uppercase">Photography</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-4xl lg:text-6xl font-thin text-white leading-tight tracking-wide mb-8"
            >
              Fueled by code, coffee,
              <br />
              and a passion for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                photography.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl text-gray-300 font-light tracking-wide max-w-2xl"
            >
              Building experiences that connect and inspire.
            </motion.p>
          </div>

          {/* Photography showcase with hover effect */}
          <motion.div 
            className="relative flex-1 max-h-96 mx-8 my-16 rounded-2xl overflow-hidden group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <img 
                src={currentImage} 
                alt="Photography showcase" 
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  isHovered ? 'filter-none scale-110' : 'filter grayscale scale-100'
                }`}
              />
            </div>

            {/* Overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className={`absolute inset-0 transition-opacity duration-500 ${
              isHovered ? 'bg-black/20' : 'bg-black/40'
            }`} />

            {/* Instagram link overlay */}
            <motion.div 
              className="absolute bottom-6 left-6 right-6 flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div 
                className="group/insta flex items-center gap-4 cursor-pointer bg-black/60 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 hover:bg-black/80 transition-all duration-300"
                onClick={() => window.open('https://www.instagram.com/stealthy.shutter', '_blank')}
              >
                <FaInstagram className="text-white text-xl group-hover/insta:scale-110 transition-transform duration-300" />
                <span className="text-white font-light tracking-wider">@stealthy.shutter</span>
              </div>

                <div
                    className="group/site flex items-center gap-4 cursor-pointer bg-black/60 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 hover:bg-black/80 transition-all duration-300"
                    onClick={() => window.open('https://stealthyshutter.netlify.app', '_blank')}
                >
                    <FaGlobe className="text-white text-xl group-hover/site:scale-110 transition-transform duration-300" />
                    <span className="text-white font-light tracking-wider">
    stealthyshutter.netlify.app
  </span>
                </div>


            </motion.div>

            {/* Hover instruction */}
            <motion.div
              className={`absolute top-6 right-6 text-white text-sm font-light tracking-wider transition-opacity duration-300 ${
                isHovered ? 'opacity-0' : 'opacity-60'
              }`}
            >
              Hover to see in color
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right side - Stats and actions */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="lg:w-1/2 h-screen flex flex-col justify-center p-8 lg:p-16 bg-gradient-to-b from-gray-950 via-black to-gray-950 border-l border-gray-800"
        >
          
          {/* Stats section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-16"
          >
            <div className="mb-8">
              <span className="text-sm text-gray-500 tracking-[0.2em] uppercase mb-4 block">Coding Stats</span>
              <div className="w-20 h-px bg-white mb-8" />
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all duration-500">
              <ProblemStatsChart username="shivchauhan" />
            </div>
          </motion.div>

          {/* Resume download section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-16"
          >
            <div className="mb-6">
              <span className="text-sm text-gray-500 tracking-[0.2em] uppercase">Resume</span>
              <div className="w-16 h-px bg-white/60 mt-2" />
            </div>
            
            <motion.div
              onClick={handleDownload}
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer relative py-6 border-l-2 border-gray-700 hover:border-white pl-8 transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-thin text-white tracking-wide mb-2 group-hover:text-gray-200 transition-colors duration-300">
                    Download CV
                  </h3>
                  <p className="text-sm text-gray-500 tracking-wider uppercase">
                    Latest Version • PDF Format
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-px bg-gray-600 group-hover:bg-white group-hover:w-20 transition-all duration-500" />
                  <div className="w-3 h-3 border-t-2 border-r-2 border-gray-600 group-hover:border-white rotate-45 transition-all duration-300" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          

          {/* Decorative elements */}
          <div className="absolute bottom-16 right-16 w-px h-16 bg-gradient-to-t from-transparent via-white/30 to-transparent" />
        </motion.div>
      </div>


    </section>
  );
};

export default Stats;