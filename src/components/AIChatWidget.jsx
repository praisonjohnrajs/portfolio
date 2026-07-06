import React, { useState, useEffect, useRef } from 'react';

const KB = {
  greet: [
    "Hi there! 👋 I'm Praison's AI assistant. Ask me anything about his skills, projects, or experience! You can also toggle the Speaker icon for voice replies.",
    "Hello! I'm Praison's portfolio AI. What would you like to know today? Feel free to speak your questions using the Mic icon!"
  ],
  name: ["I'm Praison John Raj S — a Full Stack Developer based in Chennai, Tamil Nadu with 3+ years of experience."],
  skills: [
    "Praison is skilled in:\n🔹 Frontend: React.js, SIP.js, WebRTC, JavaScript, HTML5, CSS3, Socket.io\n🔹 Backend: Node.js, Express.js, PHP, Python\n🔹 Databases: MongoDB, MySQL, Redis\n🔹 Cloud: AWS EC2, S3, Lambda, Route 53\n🔹 Tools: Docker, Nginx, Linux, Git"
  ],
  connecthub: [
    "ConnectHub is Praison's flagship project — an enterprise-grade real-time call center management platform! 🚀\n\nKey features:\n⚡ Live agent monitoring dashboard\n📞 Integrated WebRTC softphone via SIP.js (direct browser calling)\n📡 WebSocket + Redis Pub/Sub real-time updates\n📞 Asterisk AMI telephony integration\n🤖 Built-in AI assistant\n🔒 JWT + 2FA/MFA security\n📊 Interactive donut charts for agent states"
  ],
  sip: [
    "Praison has strong WebRTC expertise! He uses SIP.js to build browser-based calling panels inside CRM dashboards (like ConnectHub), connecting web browsers directly to Asterisk PBX systems for live audio streams without any third-party softphones."
  ],
  ai: [
    "Yes! Praison built an AI assistant inside ConnectHub — his flagship call center platform. It helps agents and supervisors get instant answers, automate queries, and improve workflow. That's why this portfolio also has one! 🤖✨"
  ],
  experience: [
    "Praison works at Pulse Telesystems Private Limited as a Software Developer since April 2023.\n\nHe builds:\n✅ Real-time call center platforms\n✅ Asterisk telephony systems\n✅ WebSocket dashboards\n✅ CRM & IVR solutions\n✅ AWS cloud infrastructure"
  ],
  projects: [
    "Praison has built:\n\n⭐ ConnectHub — Featured real-time call center platform with AI assistant\n🌐 Switch Automation — Network switch management system\n⏱️ SIP Talk Time Tracker — Asterisk agent billing tracker\n🔒 2FA/MFA System — TOTP + QR code authenticator"
  ],
  education: [
    "Praison's education:\n🎓 MCA — Anna University (2023–2024)\n🎓 BCS — Madurai Kamaraj University (2019–2022)"
  ],
  contact: [
    "You can reach Praison at:\n📧 praisonjohnraj.s@gmail.com\n📱 +91 84282 73545\n💼 LinkedIn: praison-john-raj-12dec2001\n🐙 GitHub: github.com/PraisonSWDP\n📍 Chennai, Tamil Nadu"
  ],
  hire: [
    "Praison is currently open to new opportunities! 🟢\n\nHe's looking for:\n✅ Full Stack Developer roles\n✅ Node.js / React.js positions\n✅ Real-time systems projects\n✅ Cloud / AWS roles\n\nDrop him an email at praisonjohnraj.s@gmail.com"
  ],
  aws: [
    "Praison has hands-on AWS experience with:\n☁️ EC2 — Server management\n📦 S3 — File storage\n⚡ Lambda — Serverless functions\n🌐 Route 53 — DNS management\n🔗 API Gateway — REST API management"
  ],
  realtime: [
    "Praison specializes in real-time systems! He's built:\n⚡ WebSocket dashboards\n📡 Redis Pub/Sub messaging\n☎️ Asterisk AMI telephony\n📊 Live monitoring systems"
  ],
  interview: [
    "Welcome to the AI Recruiter Interview Mode! 🎓 Let's test your knowledge to see if you can hire Praison.\n\nQuestion 1: 'Praison uses WebSockets and Redis in ConnectHub for dashboard stats. Why is Redis Pub/Sub needed here instead of just WebSockets?'\n\n(Type or speak your answer!)"
  ],
  default: [
    "Great question! I can tell you about Praison's skills, projects, ConnectHub, experience, education, or how to hire him. What interests you? 😊",
    "I'm not sure about that specific detail, but I can help with Praison's skills, projects like ConnectHub, his work experience, or contact details!"
  ]
};

// Simple response system matching keywords
function getBotReply(msg, interviewStage, setInterviewStage) {
  const m = msg.toLowerCase();

  // Interview flow handling
  if (interviewStage > 0) {
    if (interviewStage === 1) {
      setInterviewStage(2);
      return "Correct! Redis Pub/Sub scales the WebSockets by distributing status updates across multiple server instances, ensuring real-time sync. Let's move to Question 2:\n\n'Asterisk AMI and AGI are telephony protocols Praison uses. What is the main difference between AMI and AGI?'";
    }
    if (interviewStage === 2) {
      setInterviewStage(0); // reset
      return "Perfect! AMI (Asterisk Manager Interface) is used for monitoring and controlling call states asynchronously (like our dashboard), while AGI (Asterisk Gateway Interface) is used for executing custom calling scripts synchronously. You passed! Praison is 100% hireable! 🚀";
    }
  }

  if (m.includes('interview') || m.includes('test me') || m.includes('quiz')) {
    setInterviewStage(1);
    return KB.interview[0];
  }
  if (m.match(/hello|hi|hey|start|yo/)) return KB.greet[Math.floor(Math.random() * KB.greet.length)];
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
  if (m.match(/sip|webrtc|phone|voip/)) return KB.sip[0];
  
  return KB.default[Math.floor(Math.random() * KB.default.length)];
}

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interviewStage, setInterviewStage] = useState(0);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Setup Web Speech API for Speech Recognition (STT)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          sendMessage(transcript);
        }
      };

      rec.onerror = (e) => {
        console.error('Speech Recognition Error:', e);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [interviewStage]);

  const getTime = () => {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const handleOpenChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const welcomeText = "👋 Hi! I'm Praison's AI assistant. I know everything about his skills, projects (especially ConnectHub 🚀), experience, and more. Ask me anything, or start the Recruiter Quiz!";
        setMessages([
          {
            id: Date.now(),
            content: welcomeText,
            type: 'bot',
            time: getTime(),
          },
        ]);
        speakText(welcomeText);
      }, 800);
    }
  };

  const speakText = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    
    // Cancel any current speaking
    window.speechSynthesis.cancel();
    
    // Clean text markup
    const cleanText = text.replace(/🔹|⚡|📞|🤖|✨|✅|⭐|🎓|📧|📱|💼|🐙|📍|🚀|👋|💡|📊|🔒|📡/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = (text) => {
    if (!text || !text.trim()) return;

    // Add user message
    const userMsgId = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: userMsgId,
        content: text,
        type: 'user',
        time: getTime(),
      },
    ]);

    setInputValue('');
    setIsTyping(true);

    // Get response
    setTimeout(() => {
      setIsTyping(false);
      const reply = getBotReply(text, interviewStage, setInterviewStage);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          content: reply,
          type: 'bot',
          time: getTime(),
        },
      ]);
      speakText(reply);
    }, 1000 + Math.random() * 500);
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported in your browser. Please try Chrome or Edge.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const toggleVoice = () => {
    const nextState = !voiceEnabled;
    setVoiceEnabled(nextState);
    if (!nextState && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <>
      <button 
        className="ai-chat-btn" 
        id="aiChatBtn" 
        onClick={handleOpenChat} 
        title="Chat with Praison's AI"
      >
        <i className="fa-solid fa-robot"></i>
        <span className="chat-badge">AI</span>
      </button>

      <div className={`ai-chat-window ${isOpen ? 'open' : ''}`} id="aiChatWindow">
        <div className="chat-header">
          <div className="chat-avatar">🤖</div>
          <div className="chat-header-info">
            <div className="chat-header-name">Praison's AI Assistant</div>
            <div className="chat-header-status">Online — Ask me anything!</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button 
              className="chat-close" 
              onClick={toggleVoice} 
              title={voiceEnabled ? 'Mute AI Voice' : 'Enable AI Voice'}
              style={{ color: voiceEnabled ? 'var(--accent)' : 'var(--text-muted)' }}
            >
              <i className={`fa-solid ${voiceEnabled ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
            </button>
            <button className="chat-close" onClick={() => setIsOpen(false)} id="chatClose">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <div className="chat-messages" id="chatMessages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-msg ${msg.type}`}>
              <div className="msg-avatar">{msg.type === 'bot' ? '🤖' : '👤'}</div>
              <div>
                <div 
                  className="msg-bubble"
                  dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }}
                />
                <div className="msg-time">{msg.time}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-msg bot" id="typingIndicator">
              <div className="msg-avatar">🤖</div>
              <div className="chat-typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-quick-btns">
          <button className="quick-btn" onClick={() => sendMessage('Tell me about ConnectHub')}>⭐ ConnectHub</button>
          <button className="quick-btn" onClick={() => sendMessage('What skills and tech stack does he know?')}>🛠️ Skills</button>
          <button className="quick-btn" onClick={() => sendMessage('Start AI Recruiter Interview')}>🎓 Recruiter Quiz</button>
          <button className="quick-btn" onClick={() => sendMessage('How to hire him?')}>💼 Hire</button>
        </div>

        <div className="chat-input-area">
          <button 
            className="chat-send" 
            onClick={startListening} 
            title={isListening ? 'Listening...' : 'Speak Question'}
            style={{ 
              background: isListening ? 'linear-gradient(135deg, #ef4444, #f87171)' : 'var(--glass)',
              color: isListening ? '#ffffff' : 'var(--text-primary)',
              border: isListening ? 'none' : '1px solid var(--glass-border)'
            }}
          >
            <i className={`fa-solid ${isListening ? 'fa-microphone fa-beat' : 'fa-microphone'}`}></i>
          </button>

          <input 
            type="text" 
            className="chat-input" 
            id="chatInput" 
            placeholder="Ask about Praison..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
          />
          
          <button className="chat-send" onClick={() => sendMessage(inputValue)}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default AIChatWidget;
