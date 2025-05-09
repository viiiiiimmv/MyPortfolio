import { useState } from 'react';
import '../assets/css/Projects.css';
import projects from '../assets/data/projectsData.js';
import ProjectPreview from './ProjectPreview.jsx';

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [hoveredProject, setHoveredProject] = useState(null);

    const displayProject = selectedProject || hoveredProject;

    return (
        <section className="projects-section" id='projects'>
            <div className="project-container">
                <div className="project-list">
                    <h1>THINGS I'VE <br /> WORKED ON</h1>
                    {projects.map((project, index) => (
                        <p
                            key={index}
                            onMouseEnter={() => !selectedProject && setHoveredProject(project)}
                            onMouseLeave={() => !selectedProject && setHoveredProject(null)}
                            onClick={() =>
                                selectedProject?.name === project.name
                                    ? setSelectedProject(null)
                                    : setSelectedProject(project)
                            }
                            className={selectedProject?.name === project.name ? 'active' : ''}
                        >
                            {project.name}
                        </p>
                    ))}

                </div>

                <div className="project-content">
                    {displayProject ? (
                        <ProjectPreview project={displayProject} />
                    ) : (
                        <div className="default-content">
                            <h1>
                                Building&nbsp;
                                <span className="dots"><span>.</span><span>.</span><span>.</span></span>
                            </h1>
                            <h1>
                                Exploring&nbsp;
                                <span className="dots medium"><span>.</span><span>.</span><span>.</span></span>
                            </h1>
                            <h1>
                                Capturing&nbsp;
                                <span className="dots slow"><span>.</span><span>.</span><span>.</span></span>
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
