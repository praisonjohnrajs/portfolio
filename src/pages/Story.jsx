import React, { useEffect, useRef } from 'react';

const Story = () => {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    revealRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRevealRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const milestones = [
    { year: '2019', title: 'Starting the Journey', desc: 'Began Bachelor of Computer Science (BCS) at Madurai Kamaraj University. Fell in love with programming and algorithms.' },
    { year: '2022', title: 'Graduation & Furthering Education', desc: 'Graduated BCS with honors and enrolled in Master of Computer Applications (MCA) at Anna University, Chennai to deepen computer science theory.' },
    { year: '2023', title: 'Entering Professional Telephony', desc: 'Joined Pulse Telesystems Private Limited as a Software Developer. Introduced to the world of SIP, Asterisk, and VoIP.' },
    { year: '2024', title: 'ConnectHub Platform Architect', desc: 'Successfully architected and launched ConnectHub, a centralized dashboard unifying telephony, real-time agent tracking, and custom CRMs.' }
  ];

  const schedule = [
    { time: '09:00 AM', task: 'Log Monitoring & Coffee', icon: 'fa-coffee', desc: 'Analyzing SIP signaling logs, Asterisk console debug entries, and server vitals over a hot espresso.' },
    { time: '11:00 AM', task: 'Telephony Dialplan Architecture', icon: 'fa-network-wired', desc: 'Designing call routing workflows, IVR nodes, and integrating Asterisk AMI event listener routines.' },
    { time: '02:00 PM', task: 'Full Stack Dashboard Refinement', icon: 'fa-code', desc: 'Writing React layouts, optimizing Socket.io listeners, and coding Node.js microservices.' },
    { time: '05:00 PM', task: 'DevOps & AWS Configurations', icon: 'fa-cloud', desc: 'Configuring Route 53 records, scaling AWS EC2 instances, stashing code, and running test builds.' }
  ];

  return (
    <div style={{ paddingTop: 'calc(var(--nav-h) + 40px)', paddingBottom: '80px' }}>
      <div className="container">
        
        {/* Title */}
        <div className="skills-header reveal" ref={addToRevealRefs}>
          <div className="section-tag">My Story</div>
          <h2 className="section-title">Behind the <span>Code</span></h2>
          <p className="section-subtitle">A look into my professional journey, day-in-the-life, and developer philosophy.</p>
        </div>

        {/* Grid: Story + Core Values */}
        <div className="about-grid" style={{ marginBottom: '80px' }}>
          <div className="reveal-left" ref={addToRevealRefs}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '20px' }}>A Developer Driven by Real-Time Systems</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '20px' }}>
              My path into software engineering wasn't just about building sites; it was about connecting people. During my studies at Anna University, I realized that static web architectures had limitations. I wanted web applications to feel alive, interactive, and instantaneous.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '20px' }}>
              This drive led me to the telephony industry. Working with Asterisk, VoIP systems, and WebSockets allowed me to engineer software where milliseconds matter. I focus on optimizing server latency, managing WebSocket event channels, and making sure that telemetry flows without interruption.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              Outside of the compiler, I believe in balancing technical challenges with healthy habits: continuously reading engineering papers, studying design patterns, and refining the art of a perfect morning coffee.
            </p>
          </div>

          <div className="reveal-right" ref={addToRevealRefs}>
            <div className="about-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '24px', color: 'var(--accent)' }}>My Life Philosophy</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--accent)', fontSize: '1.5rem', width: '24px' }}>🎯</div>
                  <div>
                    <h5 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Solve the Right Problem</h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Code is cheap; understanding business workflows is where true software quality resides.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--accent)', fontSize: '1.5rem', width: '24px' }}>⚡</div>
                  <div>
                    <h5 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Speed is a Feature</h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>A system that responds in under 100ms reduces cognitive load and keeps users engaged.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--accent)', fontSize: '1.5rem', width: '24px' }}>📚</div>
                  <div>
                    <h5 style={{ fontWeight: 600, fontSize: '0.95rem' }}>Continuous Refinement</h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Every week is an opportunity to learn a new framework, optimize a database index, or clean up debt.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Timeline */}
        <div style={{ marginBottom: '80px' }}>
          <h3 className="section-title reveal" ref={addToRevealRefs} style={{ textAlign: 'center', marginBottom: '48px', fontSize: '2rem' }}>
            My <span>Timeline</span>
          </h3>
          <div className="timeline">
            {milestones.map((m, idx) => (
              <div className="timeline-item reveal" ref={addToRevealRefs} key={idx}>
                <div className="timeline-marker">
                  <div className="timeline-dot" style={{ fontSize: '1rem' }}>{m.year}</div>
                </div>
                <div className="exp-card">
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--accent)' }}>{m.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Day in the Life Section */}
        <div>
          <h3 className="section-title reveal" ref={addToRevealRefs} style={{ textAlign: 'center', marginBottom: '16px', fontSize: '2rem' }}>
            Day in the <span>Life</span>
          </h3>
          <p className="section-subtitle reveal" ref={addToRevealRefs} style={{ textAlign: 'center', margin: '0 auto 48px' }}>
            An inside look at how I divide my day to engineer and maintain calling platforms.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {schedule.map((item, idx) => (
              <div 
                className="skill-category reveal" 
                ref={addToRevealRefs} 
                key={idx}
                style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontFamily: 'JetBrains Mono', color: 'var(--accent)', fontWeight: 600 }}>{item.time}</span>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--accent-glow)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{item.task}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', flex: 1 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Story;
