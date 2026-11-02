import './SkillCategory.css';

const SkillCategory = ({ title, skills }) => (
  <div className="skill-category pixel-panel animate-on-scroll">
    <h3>{title}</h3>
    <ul className="skill-list">
      {skills.map(skill => (
        <li key={skill} className="skill-item">{skill}</li>
      ))}
    </ul>
  </div>
);

export default SkillCategory;
