import projects from '../../data/projects';
import ProjectCard from './ProjectCard';
import './Projects.css';

const Projects = () => (
  <section id="projects" className="page-section">
    <div className="container">
      <p className="section-kicker">Stage 02 · Selected work</p>
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid accent-cycle">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
