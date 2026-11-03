import NeonCat from '../NeonCat/NeonCat';
import './Contact.css';

const Contact = () => (
  <>
    <section id="contact" className="page-section contact">
      <div className="container">
        <p className="section-kicker">Stage 04 · Contact</p>
        <h2 className="section-title">Get in touch</h2>
        <p className="contact-text">
          Want to talk about a role or a project? Email me or find me on LinkedIn.
        </p>
        <div className="contact-links">
          <a href="mailto:karenlauhlwork@gmail.com" className="project-link project-link--primary">
            Email me
          </a>
          <a href="https://linkedin.com/in/karenlauhl" target="_blank" rel="noreferrer" className="project-link">
            LinkedIn ↗
          </a>
          <a href="https://github.com/karenlauhl" target="_blank" rel="noreferrer" className="project-link">
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
    <footer className="site-footer">
      <NeonCat />
      <div className="container">© {new Date().getFullYear()} Karen Lau</div>
    </footer>
  </>
);

export default Contact;
