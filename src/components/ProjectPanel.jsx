import React from 'react';
import projects from '../assets/data/mobileProjects.js';
import '../assets/css/ProjectPanel.css';

const ProjectPanel = () => {
  return (
    <div className="prj-panel">
      <div className="prj-header">
        <h1 className="prj-title">Things I've worked on</h1>
        <p className="prj-subtitle">
          A collection of projects that showcase engineering, design, and problem-solving in action.
        </p>
      </div>

      {projects.map((project, index) => (
        <div key={index} className="prj-card" tabIndex="0">
          {project.images[0] && (
            <div className="image-wrapper">
              <img
                src={project.images[0]}
                alt={project.name}
                className="prj-image"
              />
            </div>
          )}
          <div className="prj-content">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <div className="prj-links">
              {project.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectPanel;
