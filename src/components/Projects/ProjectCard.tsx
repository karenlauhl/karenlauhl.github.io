import type { Project } from '../../types';
import './ProjectCard.css';

const ProjectCard = ({ project }: { project: Project }) => {
  const { title, tagline, highlights, tech, links, codeNote } = project;

  return (
    <article className="project-card pixel-panel animate-on-scroll">
      <h3 className="project-title">{title}</h3>
      <p className="project-tagline">{tagline}</p>

      <ul className="project-highlights">
        {highlights.map(point => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <ul className="project-tags" aria-label="Technologies">
        {tech.map(tag => (
          <li key={tag} className="tag">{tag}</li>
        ))}
      </ul>

      <div className="project-links">
        {links.live && (
          <a href={links.live} target="_blank" rel="noreferrer" className="project-link project-link--primary">
            Live demo ↗
          </a>
        )}
        {links.code && (
          <a href={links.code} target="_blank" rel="noreferrer" className="project-link">
            Code ↗
          </a>
        )}
        {!links.code && codeNote && <span className="project-note">{codeNote}</span>}
      </div>
    </article>
  );
};

export default ProjectCard;
