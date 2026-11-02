import { experience } from '../../data/profile';
import './Experience.css';

const Experience = () => (
  <section id="experience" className="page-section">
    <div className="container">
      <p className="section-kicker">Experience</p>
      <h2 className="section-title">Where I've worked</h2>
      <ol className="timeline">
        {experience.map(job => (
          <li key={job.id} className="timeline-item animate-on-scroll">
            <div className="timeline-head">
              <div>
                <h3 className="timeline-role">{job.role}</h3>
                <p className="timeline-org">{job.org} · {job.location}</p>
              </div>
              <span className="timeline-dates">{job.dates}</span>
            </div>
            {job.team && <p className="timeline-team">{job.team}</p>}
            <ul className="project-highlights">
              {job.points.map(point => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <ul className="project-tags" aria-label="Technologies">
              {job.tech.map(tag => (
                <li key={tag} className="tag">{tag}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Experience;
