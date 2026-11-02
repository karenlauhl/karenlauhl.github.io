import { achievements, education, spokenLanguages } from '../../data/profile';
import Skills from '../Skills/Skills';
import './About.css';

const About = () => (
  <section id="about" className="page-section">
    <div className="container">
      <p className="section-kicker">About</p>
      <h2 className="section-title">About me</h2>
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

      <Skills />

      <div className="about-columns">
        <div className="about-block animate-on-scroll">
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

        <div className="about-block animate-on-scroll">
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
