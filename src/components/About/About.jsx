import { achievements, education, spokenLanguages } from '../../data/profile';
import Skills from '../Skills/Skills';
import './About.css';

const profileFields = [
  ['Name', 'Karen Lau'],
  ['Class', 'Software Engineer'],
  ['Guild', 'Citi · Equities Technology'],
  ['Base', 'Belfast, UK'],
  ['Main stack', 'Java · Spring Boot · Python · SQL'],
  ['Special', 'Global Top 3 of 50+, 2025']
];

const About = () => (
  <section id="about" className="page-section">
    <div className="container">
      <p className="section-kicker">Stage 03 · About</p>
      <h2 className="section-title">About me</h2>
      <div className="about-intro">
        <div className="about-bio animate-on-scroll">
        <p>
          I'm a software engineer at Citi with two years' industry experience across Java
          microservices, CI/CD migration and PySpark data processing in equities and trade
          surveillance. I build full-stack apps with Spring Boot, Angular and React, using AI coding
          agents behind tests and CI.
        </p>
        <p>
          I graduated from Queen's University Belfast with a 2:1 in Computer Science with
          Professional Experience, and I speak {spokenLanguages.join(', ').replace(/, ([^,]*)$/, ' and $1')}.
        </p>
        </div>

        <aside className="profile-card pixel-panel animate-on-scroll" aria-label="Profile">
          <div className="profile-card-bar">
            <span>PROFILE.SAV</span>
            <span aria-hidden="true">■ ■ ■</span>
          </div>
          <dl className="profile-card-fields">
            {profileFields.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="profile-card-status">● Online · ready to build</p>
        </aside>
      </div>

      <Skills />

      <div className="about-columns accent-cycle">
        <div className="about-block pixel-panel animate-on-scroll">
          <h3>Education</h3>
          <ul className="about-list">
            {education.map(item => (
              <li key={item.id}>
                <div className="about-list-head">
                  <strong>{item.school}</strong>
                  <span className="about-dates">{item.dates}</span>
                </div>
                <p className="about-degree">{item.degree}</p>
                <p className="about-detail">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="about-block pixel-panel animate-on-scroll">
          <h3>Achievements &amp; activities</h3>
          <ul className="project-highlights">
            {achievements.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default About;
