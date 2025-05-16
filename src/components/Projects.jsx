import { useState } from 'react';
import '../assets/css/Projects.css';
import projects from '../assets/data/projectsData.js';
import ProjectPreview from './ProjectPreview.jsx';
import Spline from '@splinetool/react-spline';


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
                        <div className='fixed-spline' style={{ width: '100%', height: '100vh' }}>
                            <Spline scene="https://prod.spline.design/r8z9ELH6mdbydVQo/scene.splinecode" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
