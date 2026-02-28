import { motion as Motion } from "framer-motion";
import projects from "../assets/data/mobileProjects.js";
import {
  fadeUp,
  sectionReveal,
  subtleHover,
  subtlePress,
  viewportConfig,
} from "../lib/motion";

const ProjectPanel = () => {
  return (
    <Motion.section
      className="min-h-screen bg-black px-4 py-8 text-white"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
    >
      {/* Header Section */}
      <Motion.div className="mb-12 text-center" variants={fadeUp}>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Things I've worked on
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
          A collection of projects that showcase engineering, design, and
          problem-solving in action.
        </p>
      </Motion.div>

      {/* Projects Grid */}
      <div className="space-y-8 max-w-md mx-auto">
        {projects.map((project, index) => {
          return (
            <Motion.div
              key={index}
              className="bg-transparent rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-300 transform hover:scale-[1.02] focus-within:ring-2 focus-within:ring-gray-500 focus-within:ring-opacity-30"
              tabIndex="0"
              variants={fadeUp}
              whileHover={subtleHover}
            >
              {/* Project Content */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3 text-white">
                  {project.name}
                </h2>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Skills Tags */}
                {project.skills && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-700 border border-gray-600 text-gray-200 px-3 py-1 rounded-full text-xs font-medium hover:border-gray-500 hover:bg-gray-650 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Project Links */}
                <div className="flex flex-col gap-3">
                  {project.links.map((link, idx) => (
                    <Motion.a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-medium text-center transition-all duration-200 hover:bg-white hover:transform hover:scale-[1.02] focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 active:scale-95"
                      whileHover={subtleHover}
                      whileTap={subtlePress}
                    >
                      {link.text}
                    </Motion.a>
                  ))}
                </div>
              </div>
            </Motion.div>
          );
        })}
      </div>
    </Motion.section>
  );
};

export default ProjectPanel;
