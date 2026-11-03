import './SkillCategory.css';

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

const SkillCategory = ({ title, skills }: SkillCategoryProps) => (
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
