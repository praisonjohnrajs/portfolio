import React, { useState, useEffect, useRef } from 'react';

const Home = ({ setCurrentPage }) => {
  // --- States ---
  const [typedRole, setTypedRole] = useState('');
  const [animateSkills, setAnimateSkills] = useState(false);
  const [stats, setStats] = useState({ exp: 0, proj: 0, tech: 0, commit: 0 });
  const [statsAnimated, setStatsAnimated] = useState(false);
  
  // Contact Form States
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // --- Refs for Observers ---
  const statsRef = useRef(null);
  const skillsRef = useRef(null);
  const revealRefs = useRef([]);

  // --- Typed Text logic ---
  useEffect(() => {
    const roles = ['Full Stack Developer', 'Node.js Engineer', 'React.js Developer', 'Real-Time Systems Dev', 'Cloud & DevOps Engineer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    const typeText = () => {
      const currentRole = roles[roleIndex];
      if (!isDeleting) {
        setTypedRole(currentRole.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentRole.length) {
          isDeleting = true;
          timeout = setTimeout(typeText, 2000);
          return;
        }
      } else {
        setTypedRole(currentRole.slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      timeout = setTimeout(typeText, isDeleting ? 50 : 90);
    };

    typeText();
    return () => clearTimeout(timeout);
  }, []);

  // --- Intersection Observers ---
  useEffect(() => {
    // 1. Scroll Reveal Observer
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    // Track ref items
    revealRefs.current.forEach(el => {
      if (el) revealObserver.observe(el);
    });

    // 2. Skill Bars Observer
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimateSkills(true);
        }
      });
    }, { threshold: 0.3 });

    if (skillsRef.current) {
      skillsObserver.observe(skillsRef.current);
    }

    // 3. Stats Counter Observer
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          setStatsAnimated(true);
          
          // Animate Experience (0 to 3)
          let startExp = 0;
          const expInterval = setInterval(() => {
            startExp += 1;
            if (startExp >= 3) {
              startExp = 3;
              clearInterval(expInterval);
            }
            setStats(prev => ({ ...prev, exp: startExp }));
          }, 300);

          // Animate Projects (0 to 5)
          let startProj = 0;
          const projInterval = setInterval(() => {
            startProj += 1;
            if (startProj >= 5) {
              startProj = 5;
              clearInterval(projInterval);
            }
            setStats(prev => ({ ...prev, proj: startProj }));
          }, 200);

          // Animate Tech Stack (0 to 20)
          let startTech = 0;
          const techInterval = setInterval(() => {
            startTech += 1;
            if (startTech >= 20) {
              startTech = 20;
              clearInterval(techInterval);
            }
            setStats(prev => ({ ...prev, tech: startTech }));
          }, 50);

          // Animate Commit Rate (0 to 100)
          let startCommit = 0;
          const commitInterval = setInterval(() => {
            startCommit += 4;
            if (startCommit >= 100) {
              startCommit = 100;
              clearInterval(commitInterval);
            }
            setStats(prev => ({ ...prev, commit: startCommit }));
          }, 30);

          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      revealObserver.disconnect();
      skillsObserver.disconnect();
      statsObserver.disconnect();
    };
  }, [statsAnimated]);

  // --- Form Submission ---
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  // Helper to push refs safely
  const addToRevealRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section id="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge reveal" ref={addToRevealRefs}>
                <i className="fa-solid fa-circle-dot"></i> Available for opportunities
              </div>
              <h1 className="hero-name reveal delay-1" ref={addToRevealRefs}>
                Hi, I'm<br/><span className="gradient">Praison John Raj</span>
              </h1>
              <div className="hero-role reveal delay-2" ref={addToRevealRefs}>
                <span className="typed-text">{typedRole}</span>
                <span className="cursor-blink"></span>
              </div>
              <p className="hero-desc reveal delay-3" ref={addToRevealRefs}>
                Results-driven Full Stack Developer with <strong>3+ years</strong> of experience building modern, scalable web applications. Specialized in real-time systems, telephony platforms, and cloud-native infrastructure using React.js, Node.js & AWS.
              </p>
              <div className="hero-buttons reveal delay-4" ref={addToRevealRefs}>
                <a href="#projects" className="btn-primary" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  <i className="fa-solid fa-rocket"></i> View My Work
                </a>
                <a href="#contact" className="btn-secondary" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  <i className="fa-solid fa-paper-plane"></i> Let's Talk
                </a>
              </div>
              
              <div className="hero-stats reveal delay-5" ref={addToRevealRefs} ref={statsRef}>
                <div className="stat">
                  <span className="stat-num">{stats.exp}+</span>
                  <span className="stat-label">Years Exp</span>
                </div>
                <div className="stat">
                  <span className="stat-num">{stats.proj}+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat">
                  <span className="stat-num">{stats.tech}+</span>
                  <span className="stat-label">Technologies</span>
                </div>
                <div className="stat">
                  <span className="stat-num">{stats.commit}%</span>
                  <span className="stat-label">Commitment</span>
                </div>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="avatar-container">
                <div className="avatar-ring-2"></div>
                <div className="avatar-ring"></div>
                <img src="/avatar.jpeg" alt="Praison John Raj S - Full Stack Developer" className="avatar-img" />
                <div className="float-badge float-badge-1"><i className="fa-brands fa-node-js"></i> Node.js</div>
                <div className="float-badge float-badge-2"><i className="fa-brands fa-react"></i> React.js</div>
                <div className="float-badge float-badge-3"><i className="fa-brands fa-aws"></i> AWS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="reveal-left" ref={addToRevealRefs}>
              <div className="section-tag">About Me</div>
              <h2 className="section-title">Building the <span>Future</span> One Line at a Time</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.85', marginBottom: '20px' }}>
                I'm a results-driven Full Stack Developer with over <strong style={{ color: 'var(--accent)' }}>3 years</strong> of experience building modern, scalable web applications. Specializing in both frontend and backend development with strong expertise in React.js, Node.js, and PHP.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.85', marginBottom: '32px' }}>
                My cloud deployment experience includes AWS services such as EC2, S3, Lambda, and API Gateway. Passionate about real-time systems, WebSocket-based applications, and custom CRM/CMS solutions aligned with business goals.
              </p>
              <div className="info-grid">
                <div className="info-item"><div className="info-label">Location</div><div className="info-value">Chennai, Tamil Nadu</div></div>
                <div className="info-item"><div className="info-label">Email</div><div className="info-value"><a href="mailto:praisonjohnraj.s@gmail.com">praisonjohnraj.s@gmail.com</a></div></div>
                <div className="info-item"><div className="info-label">GitHub</div><div className="info-value"><a href="https://github.com/PraisonSWDP" target="_blank" rel="noreferrer">github.com/PraisonSWDP</a></div></div>
                <div className="info-item"><div className="info-label">LinkedIn</div><div className="info-value"><a href="https://in.linkedin.com/in/praison-john-raj-12dec2001" target="_blank" rel="noreferrer">praison-john-raj</a></div></div>
                <div className="info-item"><div className="info-label">Phone</div><div className="info-value"><a href="tel:+918428273545">+91 84282 73545</a></div></div>
                <div className="info-item"><div className="info-label">Status</div><div className="info-value" style={{ color: 'var(--accent)' }}>Open to Work</div></div>
              </div>
            </div>
            
            <div className="reveal-right" ref={addToRevealRefs}>
              <div className="about-card">
                <div className="about-highlight">
                  <div className="highlight-icon"><i className="fa-solid fa-bolt"></i></div>
                  <div>
                    <div className="highlight-title">Real-Time Systems Expert</div>
                    <div className="highlight-text">Built live dashboards, WebSocket apps & Asterisk telephony platforms handling thousands of concurrent connections.</div>
                  </div>
                </div>
                <div className="about-highlight">
                  <div className="highlight-icon"><i className="fa-brands fa-aws"></i></div>
                  <div>
                    <div className="highlight-title">Cloud Infrastructure</div>
                    <div className="highlight-text">Hands-on experience with AWS EC2, S3, Lambda, Route 53 & API Gateway for secure, scalable deployments.</div>
                  </div>
                </div>
                <div className="about-highlight">
                  <div className="highlight-icon"><i className="fa-solid fa-shield-halved"></i></div>
                  <div>
                    <div className="highlight-title">Security-First Developer</div>
                    <div className="highlight-text">Implemented JWT auth, 2FA/MFA with TOTP, role-based access control and secure session management.</div>
                  </div>
                </div>
                <div className="about-highlight">
                  <div className="highlight-icon"><i className="fa-solid fa-layer-group"></i></div>
                  <div>
                    <div className="highlight-title">Full Stack Proficiency</div>
                    <div className="highlight-text">End-to-end development from React.js frontends to Node.js/PHP backends with MongoDB, MySQL & Redis.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" ref={skillsRef}>
        <div className="container">
          <div className="skills-header reveal" ref={addToRevealRefs}>
            <div className="section-tag">Technical Skills</div>
            <h2 className="section-title">My <span>Tech Stack</span></h2>
            <p className="section-subtitle">A comprehensive arsenal of modern technologies to build, scale, and secure any application.</p>
          </div>
          
          <div className="skills-categories">
            <div className="skill-category reveal delay-1" ref={addToRevealRefs}>
              <div className="cat-icon"><i className="fa-solid fa-display"></i></div>
              <div className="cat-title">Frontend</div>
              <div className="skill-pills">
                <span className="pill">React.js</span><span className="pill">SIP.js</span><span className="pill">WebRTC</span><span className="pill">JavaScript</span><span className="pill">HTML5</span><span className="pill">CSS3</span><span className="pill">Ajax</span><span className="pill">Socket.io</span><span className="pill">WebSockets</span>
              </div>
            </div>
            
            <div className="skill-category reveal delay-2" ref={addToRevealRefs}>
              <div className="cat-icon"><i className="fa-solid fa-server"></i></div>
              <div className="cat-title">Backend</div>
              <div className="skill-pills">
                <span className="pill">Node.js</span><span className="pill">Express.js</span><span className="pill">PHP</span><span className="pill">Python</span><span className="pill">Asterisk</span><span className="pill">Apache2</span><span className="pill">Nginx</span>
              </div>
            </div>
            
            <div className="skill-category reveal delay-3" ref={addToRevealRefs}>
              <div className="cat-icon"><i className="fa-solid fa-database"></i></div>
              <div className="cat-title">Databases</div>
              <div className="skill-pills">
                <span className="pill">MongoDB</span><span className="pill">MySQL</span><span className="pill">Redis</span>
              </div>
            </div>
            
            <div className="skill-category reveal delay-1" ref={addToRevealRefs}>
              <div className="cat-icon"><i className="fa-brands fa-aws"></i></div>
              <div className="cat-title">Cloud & DevOps</div>
              <div className="skill-pills">
                <span className="pill">AWS EC2</span><span className="pill">S3</span><span className="pill">Lambda</span><span className="pill">Route 53</span><span className="pill">API Gateway</span><span className="pill">Docker</span><span className="pill">PM2</span>
              </div>
            </div>
            
            <div className="skill-category reveal delay-2" ref={addToRevealRefs}>
              <div className="cat-icon"><i className="fa-solid fa-code-branch"></i></div>
              <div className="cat-title">Tools & OS</div>
              <div className="skill-pills">
                <span className="pill">Linux</span><span className="pill">Git</span><span className="pill">GitHub</span><span className="pill">JWT</span><span className="pill">2FA/MFA</span>
              </div>
            </div>
            
            <div className="skill-category reveal delay-3" ref={addToRevealRefs}>
              <div className="cat-icon"><i className="fa-solid fa-chart-line"></i></div>
              <div className="cat-title">Specializations</div>
              <div className="skill-pills">
                <span className="pill">Real-time Apps</span><span className="pill">CRM Systems</span><span className="pill">Call Center</span><span className="pill">VoIP/SIP</span>
              </div>
            </div>
          </div>
          
          <div className="skill-bars reveal" ref={addToRevealRefs}>
            {[
              { name: 'React.js', val: 90 },
              { name: 'Node.js', val: 92 },
              { name: 'MongoDB', val: 85 },
              { name: 'AWS Cloud', val: 82 },
              { name: 'PHP', val: 80 },
              { name: 'MySQL / Redis', val: 88 }
            ].map((bar, idx) => (
              <div className="skill-bar-item" key={idx}>
                <div className="skill-bar-header">
                  <span className="skill-bar-name">{bar.name}</span>
                  <span className="skill-bar-pct">{bar.val}%</span>
                </div>
                <div className="skill-bar-track">
                  <div 
                    className="skill-bar-fill" 
                    style={{ width: animateSkills ? `${bar.val}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience">
        <div className="container">
          <div className="exp-header reveal" ref={addToRevealRefs}>
            <div className="section-tag">Work Experience</div>
            <h2 className="section-title">Where I've <span>Worked</span></h2>
            <p className="section-subtitle">3+ years of hands-on experience building enterprise-grade applications.</p>
          </div>
          
          <div className="timeline">
            <div className="timeline-item reveal" ref={addToRevealRefs}>
              <div className="timeline-marker"><div className="timeline-dot">P</div></div>
              <div className="exp-card">
                <div className="exp-card-header">
                  <div>
                    <div className="exp-role">Software Developer <span className="exp-current">Current</span></div>
                    <div className="exp-company">Pulse Telesystems Private Limited</div>
                  </div>
                  <div className="exp-duration">Apr 2023 – Present</div>
                </div>
                <ul className="exp-list">
                  <li>Working as a Full Stack Developer in a leading call center software solutions company, focusing on telephony and real-time communication platforms.</li>
                  <li>Integrated and maintained Asterisk-based calling systems, contributing to call flow automation, API-driven interactions, and call event handling.</li>
                  <li>Developed web-based softphone dialing panels using SIP.js and WebRTC, enabling agents to call directly from the CRM without external softphone software.</li>
                  <li>Played a key role in building a centralized call center platform (ConnectHub), consolidating CRM, reporting, live monitoring, user management, and IVR functionalities.</li>
                  <li>Implemented real-time technologies like WebSocket, Redis Pub/Sub, and Asterisk AMI for live updates across dashboards and admin panels.</li>
                  <li>Implemented secure user authentication including JWT, 2FA/MFA, and role-based session management for robust application security.</li>
                  <li>Managed Linux server environments using Nginx, Apache2, and AWS cloud services (EC2, S3, Route 53) for deployment and maintenance.</li>
                  <li>Collaborated with cross-functional teams to ensure secure, scalable, and maintainable solutions using React.js, Node.js, MongoDB, and MySQL.</li>
                </ul>
                <div className="exp-tags">
                  {['React.js', 'Node.js', 'Asterisk', 'SIP.js', 'WebRTC', 'WebSocket', 'Redis', 'MongoDB', 'MySQL', 'AWS', 'Docker', 'JWT'].map((t, i) => (
                    <span className="exp-tag" key={i}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects">
        <div className="container">
          <div className="projects-header reveal" ref={addToRevealRefs}>
            <div className="section-tag">Projects</div>
            <h2 className="section-title">Things I've <span>Built</span></h2>
            <p className="section-subtitle">A showcase of real-world solutions I've engineered from concept to production.</p>
          </div>

          {/* FEATURED: ConnectHub */}
          <div className="featured-project reveal" ref={addToRevealRefs}>
            <div className="featured-label"><i className="fa-solid fa-star"></i> Featured Project</div>
            <div className="featured-grid">
              <div>
                <h3 className="featured-title">ConnectHub</h3>
                <p className="featured-desc">Enterprise-grade real-time communication and call center management platform. ConnectHub unifies CRM, live agent monitoring, IVR management, and Asterisk-based telephony into a single powerful dashboard — enabling call centers to operate with maximum efficiency and real-time visibility.</p>
                <ul className="featured-features">
                  <li><i className="fa-solid fa-check-circle"></i> Real-time agent dashboard with live call tracking across queues and locations</li>
                  <li><i className="fa-solid fa-check-circle"></i> Integrated browser-based WebRTC softphone panels utilizing SIP.js for direct call execution</li>
                  <li><i className="fa-solid fa-check-circle"></i> WebSocket + Redis Pub/Sub powered live status updates without page refresh</li>
                  <li><i className="fa-solid fa-check-circle"></i> Asterisk AMI integration for complete call flow control and IVR management</li>
                  <li><i className="fa-solid fa-check-circle"></i> Interactive donut charts showing agent states: On Call, Ready, Not Ready, Logout</li>
                  <li><i className="fa-solid fa-check-circle"></i> Call listening and barging functionality for supervisor monitoring</li>
                  <li><i className="fa-solid fa-check-circle"></i> JWT + 2FA/MFA authentication with role-based access control</li>
                  <li><i className="fa-solid fa-check-circle"></i> Multi-language and location-wise agent grouping with live call counts</li>
                </ul>
                <div className="featured-tags">
                  {['React.js', 'Node.js', 'Asterisk', 'SIP.js', 'WebRTC', 'WebSocket', 'Redis', 'MongoDB', 'MySQL', 'JWT', 'Docker', 'AWS'].map((tag, idx) => (
                    <span className="featured-tag" key={idx}>{tag}</span>
                  ))}
                </div>
                <div className="featured-buttons">
                  <a href="https://github.com/PraisonSWDP" target="_blank" rel="noreferrer" className="btn-primary" id="connecthub-github"><i className="fa-brands fa-github"></i> View on GitHub</a>
                  <a href="#contact" className="btn-secondary" id="connecthub-demo" onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}><i className="fa-solid fa-envelope"></i> Request Demo</a>
                </div>
              </div>
              
              <div className="featured-visual">
                <div className="connecthub-mockup">
                  <div className="mockup-bar">
                    <span className="mockup-dot red"></span><span className="mockup-dot yellow"></span><span className="mockup-dot green"></span>
                    <span className="mockup-title">ConnectHub — Live Dashboard</span>
                  </div>
                  <div className="code-line"><span className="cm">// Live Agent Monitor</span></div>
                  <div className="code-line"><span className="kw">const</span> <span className="fn">io</span> = <span className="fn">require</span>(<span className="str">'socket.io'</span>);</div>
                  <div className="code-line"></div>
                  <div className="code-line"><span className="fn">io</span>.<span className="fn">on</span>(<span className="str">'connection'</span>, (socket) {"=>"} {"{"}</div>
                  <div className="code-line">{"  "}socket.<span className="fn">on</span>(<span className="str">'agent:status'</span>, (data) {"=>"} {"{"}</div>
                  <div className="code-line">{"    "}redis.<span className="fn">publish</span>(<span className="str">'live-agents'</span>, data);</div>
                  <div className="code-line">{"    "}io.<span className="fn">emit</span>(<span className="str">'dashboard:update'</span>, {"{"}</div>
                  <div className="code-line">{"      "}agent: data.name,</div>
                  <div className="code-line">{"      "}status: <span className="str">'On Call'</span>,</div>
                  <div className="code-line">{"      "}queue: <span className="str">'Sales-EN'</span>,</div>
                  <div className="code-line">{"      "}duration: <span className="num">03:47</span></div>
                  <div className="code-line">{"    "}{"}"});</div>
                  <div className="code-line">{"  "}{"}"});</div>
                  <div className="code-line">{"}"});<span className="code-cursor">|</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Projects */}
          <div className="projects-grid">
            <div className="project-card reveal delay-1" ref={addToRevealRefs}>
              <div className="project-icon"><i className="fa-solid fa-network-wired"></i></div>
              <div className="project-title">Switch Automation System</div>
              <p className="project-desc">Comprehensive solution to streamline and automate network switch management. Features centralized control, real-time monitoring, automated workflows and bulk device operations.</p>
              <div className="project-tech"><span className="tech-chip">Node.js</span><span className="tech-chip">React.js</span><span className="tech-chip">MongoDB</span><span className="tech-chip">WebSocket</span></div>
              <a href="https://github.com/PraisonSWDP" target="_blank" rel="noreferrer" className="project-link" id="switch-auto-link"><i className="fa-brands fa-github"></i> View Project <i className="fa-solid fa-arrow-right"></i></a>
            </div>
            
            <div className="project-card reveal delay-2" ref={addToRevealRefs}>
              <div className="project-icon"><i className="fa-solid fa-clock"></i></div>
              <div className="project-title">SIP Talk Time Tracker</div>
              <p className="project-desc">Tracking system to monitor agent talk time across multiple SIP servers. Provides real-time tracking integrated with Asterisk-based SIP servers, customized for billing.</p>
              <div className="project-tech"><span className="tech-chip">Asterisk</span><span className="tech-chip">Node.js</span><span className="tech-chip">MySQL</span><span className="tech-chip">Redis</span></div>
              <a href="https://github.com/PraisonSWDP" target="_blank" rel="noreferrer" className="project-link" id="sip-tracker-link"><i className="fa-brands fa-github"></i> View Project <i className="fa-solid fa-arrow-right"></i></a>
            </div>
            
            <div className="project-card reveal delay-3" ref={addToRevealRefs}>
              <div className="project-icon"><i className="fa-solid fa-shield-halved"></i></div>
              <div className="project-title">2FA/MFA Auth System</div>
              <p className="project-desc">Secure Two-Factor Authentication system with QR-code-based registration for Microsoft and Google Authenticator apps. Implements TOTP with JWT.</p>
              <div className="project-tech"><span className="tech-chip">Node.js</span><span className="tech-chip">JWT</span><span className="tech-chip">TOTP</span><span className="tech-chip">React.js</span></div>
              <a href="https://github.com/PraisonSWDP" target="_blank" rel="noreferrer" className="project-link" id="mfa-auth-link"><i className="fa-brands fa-github"></i> View Project <i className="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education">
        <div className="container">
          <div className="reveal" style={{ marginBottom: '64px' }} ref={addToRevealRefs}>
            <div className="section-tag">Education</div>
            <h2 className="section-title">Academic <span>Background</span></h2>
            <p className="section-subtitle">Strong theoretical foundation combined with continuous practical learning.</p>
          </div>
          <div className="edu-grid">
            <div className="edu-card reveal delay-1" ref={addToRevealRefs}>
              <div className="edu-icon"><i className="fa-solid fa-graduation-cap"></i></div>
              <div className="edu-year">2023 – 2024</div>
              <div className="edu-degree">Master of Computer Applications (MCA)</div>
              <div className="edu-institution">Anna University, Tamil Nadu</div>
            </div>
            <div className="edu-card reveal delay-2" ref={addToRevealRefs}>
              <div className="edu-icon"><i className="fa-solid fa-university"></i></div>
              <div className="edu-year">2019 – 2022</div>
              <div className="edu-degree">Bachelor of Computer Science (BCS)</div>
              <div className="edu-institution">Madurai Kamaraj University, Tamil Nadu</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact">
        <div className="container">
          <div className="contact-header reveal" ref={addToRevealRefs}>
            <div className="section-tag">Get In Touch</div>
            <h2 className="section-title">Let's <span>Work Together</span></h2>
            <p className="section-subtitle">Have a project in mind or want to discuss opportunities? I'd love to hear from you.</p>
          </div>
          
          <div className="contact-grid">
            <div className="contact-info">
              <a href="mailto:praisonjohnraj.s@gmail.com" className="contact-card reveal delay-1" ref={addToRevealRefs} id="contact-email-link">
                <div className="contact-icon"><i className="fa-solid fa-envelope"></i></div>
                <div><div className="contact-title">Email</div><div className="contact-value">praisonjohnraj.s@gmail.com</div></div>
              </a>
              <a href="tel:+918428273545" className="contact-card reveal delay-2" ref={addToRevealRefs} id="contact-phone-link">
                <div className="contact-icon"><i className="fa-solid fa-phone"></i></div>
                <div><div className="contact-title">Phone</div><div className="contact-value">+91 84282 73545</div></div>
              </a>
              <a href="https://github.com/PraisonSWDP" target="_blank" rel="noreferrer" className="contact-card reveal delay-3" ref={addToRevealRefs} id="contact-github-link">
                <div className="contact-icon"><i className="fa-brands fa-github"></i></div>
                <div><div className="contact-title">GitHub</div><div className="contact-value">github.com/PraisonSWDP</div></div>
              </a>
              <a href="https://in.linkedin.com/in/praison-john-raj-12dec2001" target="_blank" rel="noreferrer" className="contact-card reveal delay-4" ref={addToRevealRefs} id="contact-linkedin-link">
                <div className="contact-icon"><i className="fa-brands fa-linkedin-in"></i></div>
                <div><div className="contact-title">LinkedIn</div><div className="contact-value">praison-john-raj-12dec2001</div></div>
              </a>
              <a href="https://wa.me/918428273545?text=Hi%20Praison,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!" target="_blank" rel="noreferrer" className="contact-card reveal delay-5" ref={addToRevealRefs} id="contact-whatsapp-link">
                <div className="contact-icon" style={{ background: 'rgba(37, 211, 102, 0.15)', borderColor: 'rgba(37, 211, 102, 0.3)', color: '#25D366' }}><i className="fa-brands fa-whatsapp"></i></div>
                <div><div className="contact-title">WhatsApp</div><div className="contact-value" style={{ color: '#25D366' }}>Chat on WhatsApp</div></div>
              </a>
            </div>
            
            <div className="contact-form reveal-right" ref={addToRevealRefs}>
              {!submitSuccess ? (
                <form id="contactForm" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="form-name">Your Name</label>
                    <input 
                      type="text" 
                      id="form-name" 
                      className="form-input" 
                      placeholder="John Doe" 
                      required 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="form-email">Email Address</label>
                    <input 
                      type="email" 
                      id="form-email" 
                      className="form-input" 
                      placeholder="john@example.com" 
                      required 
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="form-subject">Subject</label>
                    <input 
                      type="text" 
                      id="form-subject" 
                      className="form-input" 
                      placeholder="Project discussion / Job opportunity" 
                      required 
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="form-message">Message</label>
                    <textarea 
                      id="form-message" 
                      className="form-textarea" 
                      placeholder="Tell me about your project or opportunity..." 
                      required
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn-primary" 
                    id="form-submit" 
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i> Sending...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane"></i> Send Message
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div id="form-success" style={{ textAlign: 'center', padding: '40px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--accent)' }}>Message Sent!</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Thanks for reaching out. I'll get back to you within 24 hours.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
