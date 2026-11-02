import SkillCategory from './SkillCategory';
import './Skills.css';

// From the Software Engineer CV.
const skillCategories = [
  { title: 'Languages', skills: ['Java', 'Python', 'SQL', 'TypeScript', 'JavaScript', 'Unix shell'] },
  { title: 'Frontend', skills: ['React', 'Angular', 'Vite', 'HTML/CSS', 'Canvas API', 'IndexedDB', 'PWA'] },
  { title: 'Backend & data', skills: ['Spring Boot', 'Maven', 'Gradle', 'REST APIs', 'WebSockets', 'Spark', 'PySpark', 'Pandas', 'Oracle', 'MySQL', 'MSSQL Server'] },
  { title: 'Cloud & DevOps', skills: ['OpenShift', 'Kubernetes', 'Docker', 'Ansible', 'CI/CD pipelines (YAML)', 'TeamCity', 'GitLab CI', 'AutoSys', 'GCP', 'Linux'] },
  { title: 'Testing & delivery', skills: ['JUnit', 'Mockito', 'MockMvc', 'Vitest', 'Integration testing', 'GitHub Actions', 'Release management', 'Git', 'Jira'] },
  { title: 'AI-assisted development', skills: ['Claude Code', 'GitHub Copilot', 'Copilot CLI', 'Antigravity'] }
];

const Skills = () => (
  <div className="skills-grid accent-cycle">
    {skillCategories.map(category => (
      <SkillCategory key={category.title} title={category.title} skills={category.skills} />
    ))}
  </div>
);

export default Skills;
