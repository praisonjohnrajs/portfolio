// ====== PARTICLE CANVAS ======
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let W, H;

function resizeCanvas() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W; this.y = Math.random() * H;
    this.r = Math.random() * 1.5 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,212,170,${this.alpha})`; ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,212,170,${0.06*(1-dist/120)})`; ctx.lineWidth = 0.5; ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ====== TYPED TEXT ======
const roles = ['Full Stack Developer', 'Node.js Engineer', 'React.js Developer', 'Real-Time Systems Dev', 'Cloud & DevOps Engineer'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');
function typeText() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1); charIndex++;
    if (charIndex === current.length) { isDeleting = true; setTimeout(typeText, 2000); return; }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1); charIndex--;
    if (charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; }
  }
  setTimeout(typeText, isDeleting ? 50 : 90);
}
typeText();

// ====== NAV SCROLL ======
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (scrolled / total * 100) + '%';
  navbar.classList.toggle('scrolled', scrolled > 50);
  backTop.classList.toggle('visible', scrolled > 400);
  const sections = ['about','skills','experience','projects','education','contact'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    const navEl = document.getElementById('nav-' + id);
    if (el && navEl) {
      const top = el.offsetTop - 100, bot = top + el.offsetHeight;
      navEl.classList.toggle('active', scrolled >= top && scrolled < bot);
    }
  });
});

// ====== HAMBURGER ======
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// ====== SCROLL REVEAL ======
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

// ====== SKILL BARS ======
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 400);
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-bars').forEach(el => skillBarObserver.observe(el));

// ====== COUNTER ANIMATION ======
function animateCounter(el, target, suffix='') {
  let current = 0, step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(document.getElementById('stat-exp'), 3, '+');
      animateCounter(document.getElementById('stat-proj'), 5, '+');
      animateCounter(document.getElementById('stat-tech'), 20, '+');
      animateCounter(document.getElementById('stat-commit'), 100, '%');
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

// ====== FORM SUBMIT ======
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('form-submit');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  }, 1500);
}

// ====== AI CHAT WIDGET ======
const KB = {
  greet: ["Hi there! 👋 I'm Praison's AI assistant. Ask me anything about his skills, projects, or experience!", "Hello! I'm Praison's portfolio AI. What would you like to know?"],
  name: ["I'm Praison John Raj S — a Full Stack Developer based in Chennai, Tamil Nadu with 3+ years of experience."],
  skills: ["Praison is skilled in:\n🔹 Frontend: React.js, JavaScript, HTML5, CSS3, Socket.io\n🔹 Backend: Node.js, Express.js, PHP, Python\n🔹 Databases: MongoDB, MySQL, Redis\n🔹 Cloud: AWS EC2, S3, Lambda, Route 53\n🔹 Tools: Docker, Nginx, Linux, Git"],
  connecthub: ["ConnectHub is Praison's flagship project — an enterprise-grade real-time call center management platform! 🚀\n\nKey features:\n⚡ Live agent monitoring dashboard\n📡 WebSocket + Redis Pub/Sub real-time updates\n📞 Asterisk AMI telephony integration\n🤖 Built-in AI assistant (like me!)\n🔒 JWT + 2FA/MFA security\n📊 Interactive donut charts for agent states"],
  ai: ["Yes! Praison built an AI assistant inside ConnectHub — his flagship call center platform. It helps agents and supervisors get instant answers, automate queries, and improve workflow. That's why this portfolio also has one! 🤖✨"],
  experience: ["Praison works at Pulse Telesystems Private Limited as a Software Developer since April 2023 (3+ years).\n\nHe builds:\n✅ Real-time call center platforms\n✅ Asterisk telephony systems\n✅ WebSocket dashboards\n✅ CRM & IVR solutions\n✅ AWS cloud infrastructure"],
  projects: ["Praison has built:\n\n⭐ ConnectHub — Featured real-time call center platform with AI assistant\n🌐 Switch Automation — Network switch management system\n⏱️ SIP Talk Time Tracker — Asterisk agent billing tracker\n🔒 2FA/MFA System — TOTP + QR code authenticator"],
  education: ["Praison's education:\n🎓 MCA — Anna University (2023–2024)\n🎓 BCS — Madurai Kamaraj University (2019–2022)"],
  contact: ["You can reach Praison at:\n📧 praisonjohnraj.s@gmail.com\n📱 +91 84282 73545\n💼 LinkedIn: praison-john-raj-12dec2001\n🐙 GitHub: github.com/PraisonSWDP\n📍 Chennai, Tamil Nadu"],
  hire: ["Praison is currently open to new opportunities! 🟢\n\nHe's looking for:\n✅ Full Stack Developer roles\n✅ Node.js / React.js positions\n✅ Real-time systems projects\n✅ Cloud / AWS roles\n\nDrop him an email at praisonjohnraj.s@gmail.com"],
  aws: ["Praison has hands-on AWS experience with:\n☁️ EC2 — Server management\n📦 S3 — File storage\n⚡ Lambda — Serverless functions\n🌐 Route 53 — DNS management\n🔗 API Gateway — REST API management"],
  realtime: ["Praison specializes in real-time systems! He's built:\n⚡ WebSocket dashboards\n📡 Redis Pub/Sub messaging\n☎️ Asterisk AMI telephony\n📊 Live monitoring systems"],
  default: ["Great question! I can tell you about Praison's skills, projects, ConnectHub, experience, education, or how to hire him. What interests you? 😊", "I'm not sure about that specific detail, but I can help with Praison's skills, projects like ConnectHub, his work experience, or contact details!"]
};

function getBotReply(msg) {
  const m = msg.toLowerCase();
  if (m.match(/hello|hi|hey|start|yo/)) return KB.greet[Math.floor(Math.random()*KB.greet.length)];
  if (m.match(/name|who|praison/)) return KB.name[0];
  if (m.match(/connecthub|connect hub|flagship|main project/)) return KB.connecthub[0];
  if (m.match(/ai|artificial|assistant|chatbot|gpt/)) return KB.ai[0];
  if (m.match(/skill|tech|stack|know|language|framework|use/)) return KB.skills[0];
  if (m.match(/experience|work|job|company|pulse|telesystem/)) return KB.experience[0];
  if (m.match(/project|built|made|created/)) return KB.projects[0];
  if (m.match(/education|degree|study|college|university|mca|bcs/)) return KB.education[0];
  if (m.match(/contact|email|phone|reach|linkedin|github/)) return KB.contact[0];
  if (m.match(/hire|available|open|opportunity|recruit|job|salary/)) return KB.hire[0];
  if (m.match(/aws|cloud|ec2|s3|lambda/)) return KB.aws[0];
  if (m.match(/real.?time|websocket|socket|redis/)) return KB.realtime[0];
  return KB.default[Math.floor(Math.random()*KB.default.length)];
}

function getTime() {
  return new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
}

function addMsg(content, type='bot') {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.innerHTML = `
    <div class="msg-avatar">${type==='bot'?'🤖':'👤'}</div>
    <div>
      <div class="msg-bubble">${content.replace(/\n/g,'<br/>')}</div>
      <div class="msg-time">${getTime()}</div>
    </div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot'; div.id = 'typingIndicator';
  div.innerHTML = `<div class="msg-avatar">🤖</div><div class="chat-typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

function sendMessage(msg) {
  if (!msg || !msg.trim()) return;
  addMsg(msg, 'user');
  document.getElementById('chatInput').value = '';
  showTyping();
  setTimeout(() => {
    removeTyping();
    addMsg(getBotReply(msg), 'bot');
  }, 800 + Math.random()*600);
}

// Build chat widget HTML
const chatWidget = document.createElement('div');
chatWidget.innerHTML = `
  <button class="ai-chat-btn" id="aiChatBtn" title="Chat with Praison's AI">
    <i class="fa-solid fa-robot"></i>
    <span class="chat-badge">AI</span>
  </button>
  <div class="ai-chat-window" id="aiChatWindow">
    <div class="chat-header">
      <div class="chat-avatar">🤖</div>
      <div class="chat-header-info">
        <div class="chat-header-name">Praison's AI Assistant</div>
        <div class="chat-header-status">Online — Ask me anything!</div>
      </div>
      <button class="chat-close" id="chatClose"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="chat-messages" id="chatMessages"></div>
    <div class="chat-quick-btns">
      <button class="quick-btn" onclick="sendMessage('Tell me about ConnectHub')">⭐ ConnectHub</button>
      <button class="quick-btn" onclick="sendMessage('What skills and tech stack does he know?')">🛠️ Skills</button>
      <button class="quick-btn" onclick="sendMessage('Tell me about his AI work')">🤖 AI Work</button>
      <button class="quick-btn" onclick="sendMessage('How to hire him?')">💼 Hire</button>
      <button class="quick-btn" onclick="sendMessage('Contact details')">📧 Contact</button>
    </div>
    <div class="chat-input-area">
      <input type="text" class="chat-input" id="chatInput" placeholder="Ask about Praison..." />
      <button class="chat-send" onclick="sendMessage(document.getElementById('chatInput').value)">
        <i class="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  </div>`;
document.body.appendChild(chatWidget);

// Chat toggle
document.getElementById('aiChatBtn').addEventListener('click', () => {
  const win = document.getElementById('aiChatWindow');
  win.classList.toggle('open');
  if (win.classList.contains('open') && document.getElementById('chatMessages').children.length === 0) {
    setTimeout(() => addMsg("👋 Hi! I'm Praison's AI assistant. I know everything about his skills, projects (especially ConnectHub 🚀), experience, and more. What would you like to know?", 'bot'), 400);
  }
});
document.getElementById('chatClose').addEventListener('click', () => {
  document.getElementById('aiChatWindow').classList.remove('open');
});
document.getElementById('chatInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage(e.target.value);
});
