import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import projects from "../assets/data/projectsData";

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 7000); // Increased duration to 12 seconds
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="relative w-full h-screen flex overflow-hidden bg-black" id="projects">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-96 h-full bg-gradient-to-b from-gray-950 via-black to-gray-950 border-r border-gray-800 flex flex-col justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute left-20 top-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-white to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute top-16 left-8 right-8"
        >
          <h2 className="text-3xl font-thin text-white tracking-[0.3em] mb-2">
            PROJECTS
          </h2>
          <div className="w-16 h-px bg-white"></div>
          <p className="text-xs text-gray-400 mt-3 tracking-widest">
            SELECTED WORKS
          </p>
        </motion.div>

        <div className="flex flex-col items-start pl-8 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              onClick={() => setActiveIndex(index)}
              className="cursor-pointer relative group flex items-center w-full"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.15, duration: 0.6 }}
              whileHover={{ x: 8 }}
            >
              <div
                className={`relative w-6 h-6 mr-8 transition-all duration-500 ${
                  activeIndex === index
                    ? "bg-white shadow-lg shadow-white/50"
                    : "bg-gray-700 group-hover:bg-gray-500"
                }`}
                style={{
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                }}
              />

              <div className="flex-1">
                <motion.h3
                  className={`text-lg font-light tracking-wider transition-all duration-300 ${
                    activeIndex === index
                      ? "text-white"
                      : "text-gray-400 group-hover:text-gray-200"
                  }`}
                >
                  {project.title}
                </motion.h3>
                <p className="text-xs text-gray-600 mt-1 tracking-widest uppercase">
                  {project.skills[0]} • {project.skills.length} TECHS
                </p>
              </div>

              <div
                className={`absolute left-3 w-5 h-px transition-all duration-500 ${
                  activeIndex === index ? "bg-white" : "bg-gray-700"
                }`}
              />
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-16 left-8 right-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-px bg-gray-800">
              <motion.div
                className="h-full bg-white origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 0 : 1 }}
                transition={{ duration: 7, ease: "linear" }}
                key={activeIndex}
              />
            </div>
            <span className="text-xs text-gray-500 tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")}/
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
          <p className="text-xs text-gray-600 tracking-widest">
            {isHovered ? "HOVER TO PAUSE" : "AUTO CYCLING"}
          </p>
        </div>
      </motion.div>

      <div className="flex-1 h-full flex items-center justify-center relative overflow-hidden">
        <motion.div
          key={activeIndex}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={projects[activeIndex].image}
            alt="background"
            className="w-full h-full object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="relative z-10 w-full max-w-6xl h-full flex items-center justify-center p-16"
        >
          <div className="w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center gap-8 mb-8"
            >
              <div className="text-8xl font-thin text-white/20 leading-none">
                {String(activeIndex + 1).padStart(2, "0")}
              </div>
              <div>
                <span className="text-sm font-light text-gray-400 tracking-[0.2em] uppercase block mb-2">
                  Featured Project
                </span>
                <div className="w-20 h-px bg-white"></div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-6xl md:text-7xl font-thin text-white mb-8 leading-tight tracking-wide"
            >
              {projects[activeIndex].title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-12"
            >
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl font-light tracking-wide">
                {projects[activeIndex].description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mb-16"
            >
              <h4 className="text-sm text-gray-500 tracking-[0.2em] uppercase mb-6">
                Technologies
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
                {projects[activeIndex].skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + i * 0.1, duration: 0.5 }}
                    className="group"
                  >
                    <div className="w-full h-16 border border-gray-700 flex items-center justify-center hover:border-white hover:bg-white transition-all duration-300">
                      <span className="text-sm font-light tracking-wider text-white group-hover:text-black transition-colors duration-300">
                        {skill}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex gap-8"
            >
              {projects[activeIndex].links.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative"
                >
                  <div className="flex items-center gap-4 py-4 pr-8 border-b border-gray-700 group-hover:border-white transition-colors duration-300">
                    <span className="text-lg font-light text-white tracking-wider">
                      {link.text}
                    </span>
                    <div className="w-8 h-px bg-gray-700 group-hover:bg-white transition-colors duration-300 group-hover:w-12" />
                    <div className="w-2 h-2 border-t border-r border-gray-700 group-hover:border-white rotate-45 transition-all duration-300" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute top-20 right-20 w-px h-20 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        <div className="absolute bottom-20 right-20 w-20 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      </div>
    </section>
  );
}