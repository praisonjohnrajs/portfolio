import React, { useState, useEffect } from 'react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollWidth, setScrollWidth] = useState('0%');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      
      // Update scroll progress width
      if (total > 0) {
        setScrollWidth(`${(scrolled / total) * 100}%`);
      } else {
        setScrollWidth('0%');
      }

      // Navbar background state
      setIsScrolled(scrolled > 50);

      // Section highlighters (only if on home page)
      if (currentPage === 'home') {
        const sections = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];
        let currentActive = '';
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop - 120;
            const bot = top + el.offsetHeight;
            if (scrolled >= top && scrolled < bot) {
              currentActive = id;
              break;
            }
          }
        }
        setActiveSection(currentActive);
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavClick = (e, page, sectionId = '') => {
    e.preventDefault();
    setIsMobileOpen(false);
    
    if (page !== currentPage) {
      setCurrentPage(page);
    }
    
    if (sectionId) {
      // If switching to home, wait a split second for page mount, then scroll
      if (page !== 'home') {
        setCurrentPage('home');
      }
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress */}
      <div className="scroll-progress" style={{ width: scrollWidth }}></div>

      {/* Navigation */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={(e) => handleNavClick(e, 'home')}>
            &lt;Praison /&gt;
          </a>
          
          <ul className="nav-links">
            <li>
              <a 
                href="#about" 
                className={currentPage === 'home' && activeSection === 'about' ? 'active' : ''}
                onClick={(e) => handleNavClick(e, 'home', 'about')}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                className={currentPage === 'home' && activeSection === 'skills' ? 'active' : ''}
                onClick={(e) => handleNavClick(e, 'home', 'skills')}
              >
                Skills
              </a>
            </li>
            <li>
              <a 
                href="#experience" 
                className={currentPage === 'home' && activeSection === 'experience' ? 'active' : ''}
                onClick={(e) => handleNavClick(e, 'home', 'experience')}
              >
                Experience
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className={currentPage === 'home' && activeSection === 'projects' ? 'active' : ''}
                onClick={(e) => handleNavClick(e, 'home', 'projects')}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#education" 
                className={currentPage === 'home' && activeSection === 'education' ? 'active' : ''}
                onClick={(e) => handleNavClick(e, 'home', 'education')}
              >
                Education
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={currentPage === 'story' ? 'active' : ''}
                onClick={(e) => handleNavClick(e, 'story')}
              >
                My Story
              </a>
            </li>

            <li>
              <a 
                href="#contact" 
                className="nav-cta" 
                onClick={(e) => handleNavClick(e, 'home', 'contact')}
              >
                Hire Me
              </a>
            </li>
          </ul>

          <div 
            className={`hamburger ${isMobileOpen ? 'open' : ''}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${isMobileOpen ? 'open' : ''}`}>
        <a href="#about" className="mobile-link" onClick={(e) => handleNavClick(e, 'home', 'about')}>About</a>
        <a href="#skills" className="mobile-link" onClick={(e) => handleNavClick(e, 'home', 'skills')}>Skills</a>
        <a href="#experience" className="mobile-link" onClick={(e) => handleNavClick(e, 'home', 'experience')}>Experience</a>
        <a href="#projects" className="mobile-link" onClick={(e) => handleNavClick(e, 'home', 'projects')}>Projects</a>
        <a href="#education" className="mobile-link" onClick={(e) => handleNavClick(e, 'home', 'education')}>Education</a>
        <a href="#" className="mobile-link" onClick={(e) => handleNavClick(e, 'story')}>My Story</a>

        <a href="#contact" className="mobile-link" onClick={(e) => handleNavClick(e, 'home', 'contact')}>Hire Me</a>
      </div>
    </>
  );
};

export default Navbar;
