import { useState, type FormEvent } from 'react';

interface ContentSectionsProps {
  onOpenModal: (topic: string) => void;
}

export default function ContentSections({ onOpenModal }: ContentSectionsProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleCopyEmail = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText('Shanwarekush@gmail.com').catch(() => {});
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText('+91-7058051975').catch(() => {});
    }
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleInlineContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "79e2b239-52e0-4b19-9c50-d9f19f1711ae",
          email: contactEmail,
          message: contactMessage,
        })
      });

      if (response.ok) {
        setContactSubmitted(true);
        setTimeout(() => {
          setContactSubmitted(false);
          setContactEmail('');
          setContactMessage('');
        }, 4000);
      } else {
        alert("Something went wrong submitting the form. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong submitting the form. Please check your connection.");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState(null, '', window.location.pathname);
    } catch {}
  };

  return (
    <div className="relative z-10 w-full text-white">
      {/* Subtle backdrop overlay so content remains readable over background video */}
      <div className="w-full bg-gradient-to-b from-transparent via-black/85 to-black pt-24 pb-16">
        
        {/* ================= FEATURED PROJECTS SECTION ================= */}
        <section
          id="projects"
          className="max-w-6xl mx-auto px-6 sm:px-8 py-20 scroll-mt-24 border-t border-white/10"
        >
          {/* Also support #works alias */}
          <span id="works" className="scroll-mt-24 block" aria-hidden="true" />

          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                Engineering Projects // 01
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                Featured Works &amp; Systems
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-base sm:text-lg">
              Accessibility engines, data analysis pipelines, and algorithmic prototypes engineered by Kushkumar Shanware.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            
            {/* Project 1: BUG */}
            <div className="bg-[#121212]/80 backdrop-blur-sm border border-white/15 rounded-2xl p-7 flex flex-col justify-between hover:border-white/40 transition-colors duration-300 group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-3">
                  <span>FINAL YEAR CAPSTONE // ONGOING</span>
                  <span className="text-white/70 font-semibold px-2 py-0.5 rounded bg-white/10">IN PRODUCTION</span>
                </div>
                <h3 className="text-2xl font-medium text-white mb-2 group-hover:text-white transition-colors">
                  BUG: Browsing Using Gestures
                </h3>
                <div className="text-xs font-mono text-white/50 mb-3">
                  AI Accessibility Engine &bull; Chrome Extension
                </div>
                <p className="text-sm text-white/65 leading-relaxed mb-6">
                  Hands-free web interaction engine utilizing MediaPipe to detect 468+ facial landmarks and estimate 3D head orientation (yaw &amp; pitch) for smooth cursor navigation. Integrates Web Speech API voice-parsing logic and on-device Gemini Nano to process hovered DOM elements with zero server data leakage.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-white/60 mb-6">
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">MediaPipe</span>
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">FaceMesh</span>
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Web Speech API</span>
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Gemini Nano</span>
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Chrome Extension API</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">HEAD POSE TRACKING + LOCAL AI</span>
                <button
                  type="button"
                  onClick={() => onOpenModal('Project: BUG (Browsing Using Gestures)')}
                  className="action-pill text-xs px-4 py-1.5 rounded-full bg-white text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Project 2: ResumeCheck Pro */}
            <div className="bg-[#121212]/80 backdrop-blur-sm border border-white/15 rounded-2xl p-7 flex flex-col justify-between hover:border-white/40 transition-colors duration-300 group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-3">
                  <span>PYTHON &amp; DATA PARSING BETA</span>
                  <span>AI / ATS OPTIMIZATION</span>
                </div>
                <h3 className="text-2xl font-medium text-white mb-2 group-hover:text-white transition-colors">
                  ResumeCheck Pro
                </h3>
                <div className="text-xs font-mono text-white/50 mb-3">
                  Automated ATS Scoring &amp; Skill Gap Analysis
                </div>
                <p className="text-sm text-white/65 leading-relaxed mb-6">
                  Core data analysis pipeline built with Python, PyMuPDF, and Streamlit extracting unstructured text from PDF documents securely without retaining user data. Features a custom ATS scoring algorithm paired with Google Gemini AI to automate job-specific skill gap detection with high processing accuracy.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-white/60 mb-6">
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Python</span>
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Google Gemini AI</span>
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Streamlit</span>
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">PyMuPDF</span>
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Prompt Engineering</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">ZERO STORAGE &bull; HIGH ACCURACY</span>
                <button
                  type="button"
                  onClick={() => onOpenModal('Project: ResumeCheck Pro')}
                  className="action-pill text-xs px-4 py-1.5 rounded-full bg-white text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Project 3: Shardeum PayFi Hub */}
            <div className="bg-[#121212]/80 backdrop-blur-sm border border-white/15 rounded-2xl p-7 flex flex-col justify-between hover:border-white/40 transition-colors duration-300 group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-3">
                  <span>HACKATHON RUNNER-UP</span>
                  <span className="text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/20">2ND PLACE WINNER</span>
                </div>
                <h3 className="text-2xl font-medium text-white mb-2 group-hover:text-white transition-colors">
                  Shardeum PayFi Hub
                </h3>
                <div className="text-xs font-mono text-white/50 mb-3">
                  Web3 Programmable Payment Platform
                </div>
                <p className="text-sm text-white/65 leading-relaxed mb-6">
                  Architected the core programmatic transaction rules and payment verification pipelines for &apos;Shardeum PayFi Hub&apos; during the Shardeum Mini Hackathon. Earning the runner-up prize among competing engineering teams for resilient decentralization mechanics.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-white/60 mb-6">
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Web3 / PayFi</span>
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Smart Contracts</span>
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">JavaScript</span>
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Transaction Pipelines</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">SHARDEUM MINI HACKATHON</span>
                <button
                  type="button"
                  onClick={() => onOpenModal('Project: Shardeum PayFi Hub')}
                  className="action-pill text-xs px-4 py-1.5 rounded-full bg-white text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Project 4: Smart Energy Theft Detection */}
            <div className="bg-[#121212]/80 backdrop-blur-sm border border-white/15 rounded-2xl p-7 flex flex-col justify-between hover:border-white/40 transition-colors duration-300 group">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-3">
                  <span>GDG NAGPUR HACKATHON</span>
                  <span>SMART GRID ANALYTICS</span>
                </div>
                <h3 className="text-2xl font-medium text-white mb-2 group-hover:text-white transition-colors">
                  Smart Energy Theft &amp; Loss Detection
                </h3>
                <div className="text-xs font-mono text-white/50 mb-3">
                  Grid Data Anomaly Identification Pipeline
                </div>
                <p className="text-sm text-white/65 leading-relaxed mb-6">
                  Engineered data anomaly detection models and statistical loss-tracking pipelines within smart electrical grid simulations during the Google Developer Groups (GDG) Nagpur Virtual Hackathon to pinpoint unauthorized energy diversion.
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-white/60 mb-6">
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Python</span>
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Anomaly Detection</span>
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Data Analytics</span>
                  <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Smart Grids</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">GDG NAGPUR COLLABORATION</span>
                <button
                  type="button"
                  onClick={() => onOpenModal('Project: Smart Energy Theft Detection')}
                  className="action-pill text-xs px-4 py-1.5 rounded-full bg-white text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Project 5: Bookshop Management System */}
            <div className="bg-[#121212]/80 backdrop-blur-sm border border-white/15 rounded-2xl p-7 flex flex-col justify-between hover:border-white/40 transition-colors duration-300 md:col-span-2 group">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 text-xs font-mono text-white/40 mb-3">
                    <span>SYSTEMS PROGRAMMING</span>
                    <span>&bull;</span>
                    <span>C++ &amp; OBJECT-ORIENTED PROGRAMMING</span>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-2">
                    Bookshop Management System &bull; C++ &amp; OOP Engine
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed mb-4">
                    Foundational console-based library and inventory management architecture engineered in C++. Implemented custom class structures, encapsulated state management, dynamic book catalog search, and CRUD file storage operations modeling core computer science invariants.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-white/60">
                    <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">C++</span>
                    <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Data Structures (DSA)</span>
                    <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">Object-Oriented Programming (OOP)</span>
                    <span className="px-3 py-1 rounded-full border border-white/15 bg-white/5">CRUD Logic</span>
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end justify-between self-stretch pt-2 md:pt-0">
                  <span className="text-xs font-mono text-white/50 mb-4">ALGORITHMIC PERSISTENCE</span>
                  <button
                    type="button"
                    onClick={() => onOpenModal('Project: C++ Bookshop Management System')}
                    className="action-pill text-xs px-4 py-1.5 rounded-full bg-white text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    View Architecture
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= ABOUT & EDUCATION SECTION ================= */}
        <section
          id="about"
          className="max-w-6xl mx-auto px-6 sm:px-8 py-20 scroll-mt-24 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                Academic Profile &amp; Bio // 02
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                About Kushkumar
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-base sm:text-lg">
              Information Technology engineer at Priyadarshini College of Engineering, passionate about backend logic and multimodal AI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            
            {/* Bio summary */}
            <div className="lg:col-span-7 bg-[#121212]/80 backdrop-blur-sm border border-white/15 rounded-2xl p-8 space-y-5">
              <h3 className="text-2xl font-medium text-white">
                Tech-focused problem solver with an obsession for computer vision, AI APIs, and algorithmic efficiency.
              </h3>
              <p className="text-white/70 text-base leading-relaxed">
                I am <span className="text-white font-medium">Kushkumar Shanware</span>, an Information Technology engineering undergraduate based in Nagpur, Maharashtra, India.
              </p>
              <p className="text-white/70 text-base leading-relaxed">
                With strong fundamentals in C++, Data Structures &amp; Algorithms (DSA), and Object-Oriented Programming (OOP), I bridge the gap between algorithmic rigor and modern AI interfaces. My ongoing capstone work focuses on computer vision accessibility with MediaPipe and on-device Gemini Nano.
              </p>
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs font-mono text-white/40">LOCATION</div>
                  <div className="text-white font-medium mt-0.5">Nagpur, Maharashtra, India</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-white/40">CONTACT CHANNELS</div>
                  <div className="text-white font-medium mt-0.5">Shanwarekush@gmail.com</div>
                  <div className="text-xs text-white/50 font-mono mt-0.5">+91-7058051975</div>
                </div>
              </div>
            </div>

            {/* Education details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#121212]/80 backdrop-blur-sm border border-white/15 rounded-2xl p-6">
                <span className="text-xs font-mono text-white/40 tracking-wider">EDUCATION // DEGREE</span>
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-white">
                    Priyadarshini College of Engineering, Nagpur
                  </h4>
                  <p className="text-sm text-white/70 mt-1">
                    Bachelor of Technology in Information Technology
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-white font-medium border border-white/15">
                      Aug 2023 &ndash; Jun 2027
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/50 text-emerald-300 font-semibold border border-emerald-500/20">
                      CGPA: 7.5 / 10
                    </span>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10">
                    <span className="text-xs font-mono text-white/40 block mb-2">RELEVANT COURSEWORK</span>
                    <div className="flex flex-wrap gap-2 text-xs text-white/70">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Data Structures &amp; Algorithms</span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Object-Oriented Programming (OOP)</span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Database Management Systems (DBMS)</span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Operating Systems</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Open Source Contribution Badge */}
              <div className="bg-[#121212]/80 backdrop-blur-sm border border-white/15 rounded-2xl p-6">
                <span className="text-xs font-mono text-white/40 tracking-wider">OPEN SOURCE</span>
                <h4 className="text-base font-medium text-white mt-2">
                  GirlScript Summer of Code (GSSoC &apos;25)
                </h4>
                <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                  Actively contributed code optimizations and bug fixes to open-source algorithmic repositories and AI integration tools.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ================= TECHNICAL SKILLS SECTION ================= */}
        <section
          id="skills"
          className="max-w-6xl mx-auto px-6 sm:px-8 py-20 scroll-mt-24 border-t border-white/10"
        >
          {/* Also support #stack alias */}
          <span id="stack" className="scroll-mt-24 block" aria-hidden="true" />

          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                Technical Skills // 03
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                Core Stack &amp; Technologies
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-base sm:text-lg">
              Languages, computer science fundamentals, AI models, and browser technologies from Kushkumar&apos;s toolkit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Category 1: Languages */}
            <div className="bg-[#121212]/80 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:border-white/40 transition-colors">
              <span className="text-xs font-mono text-white/40">01 // LANGUAGES</span>
              <h3 className="text-lg font-medium text-white mt-2 mb-4">Programming</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-medium text-white">C++</span>
                  <span className="text-xs font-mono text-white/40">Systems &amp; OOP</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-medium text-white">Python</span>
                  <span className="text-xs font-mono text-white/40">Data &amp; AI</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-medium text-white">JavaScript / TS</span>
                  <span className="text-xs font-mono text-white/40">Extensions</span>
                </li>
              </ul>
            </div>

            {/* Category 2: Core Computer Science */}
            <div className="bg-[#121212]/80 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:border-white/40 transition-colors">
              <span className="text-xs font-mono text-white/40">02 // COMPUTER SCIENCE</span>
              <h3 className="text-lg font-medium text-white mt-2 mb-4">Core Fundamentals</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-medium text-white">Data Structures (DSA)</span>
                  <span className="text-xs font-mono text-white/40">Algorithms</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-medium text-white">OOP Principles</span>
                  <span className="text-xs font-mono text-white/40">Encapsulation</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-medium text-white">DBMS &amp; SQL</span>
                  <span className="text-xs font-mono text-white/40">Relational</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-medium text-white">Operating Systems</span>
                  <span className="text-xs font-mono text-white/40">Processes</span>
                </li>
              </ul>
            </div>

            {/* Category 3: AI & Automation */}
            <div className="bg-[#121212]/80 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:border-white/40 transition-colors">
              <span className="text-xs font-mono text-white/40">03 // AI &amp; AUTOMATION</span>
              <h3 className="text-lg font-medium text-white mt-2 mb-4">Intelligent Systems</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-medium text-white">Google Gemini API</span>
                  <span className="text-xs font-mono text-white/40">Multimodal</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-medium text-white">Gemini Nano</span>
                  <span className="text-xs font-mono text-white/40">On-Device AI</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-medium text-white">Claude &amp; Copilot</span>
                  <span className="text-xs font-mono text-white/40">LLMs</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-medium text-white">n8n &amp; Prompt Eng.</span>
                  <span className="text-xs font-mono text-white/40">Workflows</span>
                </li>
              </ul>
            </div>

            {/* Category 4: Tools & Vision */}
            <div className="bg-[#121212]/80 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:border-white/40 transition-colors">
              <span className="text-xs font-mono text-white/40">04 // TOOLS &amp; VISION</span>
              <h3 className="text-lg font-medium text-white mt-2 mb-4">Vision &amp; Web APIs</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-medium text-white">MediaPipe &amp; FaceMesh</span>
                  <span className="text-xs font-mono text-white/40">Landmarks</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-medium text-white">Human.js</span>
                  <span className="text-xs font-mono text-white/40">Kinematics</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="font-medium text-white">Web Speech API</span>
                  <span className="text-xs font-mono text-white/40">Voice Events</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-medium text-white">Git / Streamlit</span>
                  <span className="text-xs font-mono text-white/40">Pipelines</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* ================= HACKATHONS & ACHIEVEMENTS SECTION ================= */}
        <section
          id="achievements"
          className="max-w-6xl mx-auto px-6 sm:px-8 py-20 scroll-mt-24 border-t border-white/10"
        >
          {/* Also support #philosophy alias */}
          <span id="philosophy" className="scroll-mt-24 block" aria-hidden="true" />

          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                Recognition // 04
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                Hackathons &amp; Achievements
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-base sm:text-lg">
              Competitive hackathons, open-source milestones, and algorithmic contributions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Achievement 1 */}
            <div className="bg-[#121212]/80 backdrop-blur-sm border border-white/15 rounded-2xl p-7 hover:border-white/40 transition-colors">
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="text-white/40">WEB3 COMPETITION</span>
                <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/20">
                  RUNNER-UP
                </span>
              </div>
              <h3 className="text-xl font-medium text-white mt-1 mb-2">
                2nd Place Winner &bull; Shardeum Mini Hackathon
              </h3>
              <p className="text-sm text-white/65 leading-relaxed">
                Designed the core programmatic rules, security logic, and transaction flows for &apos;Shardeum PayFi Hub&apos;, earning the 2nd place runner-up prize out of multiple competing developer teams.
              </p>
            </div>

            {/* Achievement 2 */}
            <div className="bg-[#121212]/80 backdrop-blur-sm border border-white/15 rounded-2xl p-7 hover:border-white/40 transition-colors">
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="text-white/40">GOOGLE DEVELOPER GROUPS</span>
                <span className="text-white/70 font-semibold px-2 py-0.5 rounded bg-white/10">
                  PARTICIPANT
                </span>
              </div>
              <h3 className="text-xl font-medium text-white mt-1 mb-2">
                GDG Nagpur Virtual Hackathon
              </h3>
              <p className="text-sm text-white/65 leading-relaxed">
                Collaborated with team engineers to build a &apos;Smart Energy Theft &amp; Loss Detection&apos; system, focusing on data anomaly identification logic and power loss analytics in smart grid infrastructures.
              </p>
            </div>

            {/* Achievement 3 */}
            <div className="bg-[#121212]/80 backdrop-blur-sm border border-white/15 rounded-2xl p-7 hover:border-white/40 transition-colors">
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="text-white/40">GLOBAL OPEN SOURCE</span>
                <span className="text-white/70 font-semibold px-2 py-0.5 rounded bg-white/10">
                  CONTRIBUTOR
                </span>
              </div>
              <h3 className="text-xl font-medium text-white mt-1 mb-2">
                GirlScript Summer of Code (GSSoC &apos;25)
              </h3>
              <p className="text-sm text-white/65 leading-relaxed">
                Actively contributed code optimizations, test case enhancements, and bug fixes to open-source algorithmic libraries and multimodal AI integration repositories.
              </p>
            </div>

          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section
          id="contact"
          className="max-w-6xl mx-auto px-6 sm:px-8 py-20 scroll-mt-24 border-t border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                  Dispatch // 05
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
                  Get in touch
                </h2>
                <p className="text-white/60 text-base sm:text-lg mt-3 leading-relaxed">
                  Looking to connect regarding software engineering roles, AI capstone projects, or technical collaboration? Reach out directly to Kushkumar Shanware.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {/* Email button */}
                <div>
                  <div className="text-xs font-mono text-white/40 mb-1">DIRECT INBOX</div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="outline-pill inline-flex items-center gap-3 text-white border border-white/30 rounded-full px-5 py-2 text-sm font-medium hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    <span>Shanwarekush@gmail.com</span>
                    <span className="text-xs font-bold">
                      {copiedEmail ? '✓ Copied' : 'Copy'}
                    </span>
                  </button>
                </div>

                {/* Phone button */}
                <div>
                  <div className="text-xs font-mono text-white/40 mb-1">PHONE NUMBER</div>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="outline-pill inline-flex items-center gap-3 text-white border border-white/30 rounded-full px-5 py-2 text-sm font-medium hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    <span>+91-7058051975</span>
                    <span className="text-xs font-bold">
                      {copiedPhone ? '✓ Copied' : 'Copy'}
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 text-xs text-white/60">
                  <div>
                    <div className="text-white font-medium mb-1">COORDINATES</div>
                    <p>Nagpur, Maharashtra<br />India</p>
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">PROFILES</div>
                    <p>
                      <a href="https://github.com" target="_blank" rel="noreferrer" className="underline hover:text-white">GitHub</a> &bull;{' '}
                      <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="underline hover:text-white">LinkedIn</a><br />
                      <span className="text-white/40">Portfolio Verified</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Transmission Form */}
            <div className="lg:col-span-7 bg-[#121212]/80 backdrop-blur-md border border-white/20 rounded-2xl p-7 sm:p-9 shadow-2xl">
              <h3 className="text-xl font-medium mb-1">Transmit Message to Kushkumar</h3>
              <p className="text-xs text-white/50 mb-6">Direct dispatch routed to Shanwarekush@gmail.com.</p>

              {contactSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto text-xl mb-2">
                    &#10003;
                  </div>
                  <p className="text-lg font-medium">Transmission Confirmed</p>
                  <p className="text-sm text-white/60 max-w-sm mx-auto">
                    Your message has reached Kushkumar Shanware. Expect a direct reply within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInlineContactSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                      Your Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-brief" className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                      Message / Project Inquiry
                    </label>
                    <textarea
                      id="contact-brief"
                      rows={4}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Inquiry regarding software engineering opportunities, AI capstone collaboration, or technical discussions..."
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                    <span className="text-xs text-white/40">
                      Direct channel &bull; Shanwarekush@gmail.com
                    </span>
                    <button
                      type="submit"
                      className="action-pill w-full sm:w-auto inline-flex items-center justify-center bg-white text-black font-medium text-sm px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer border border-transparent hover:border-white/30"
                    >
                      Send Transmission
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="max-w-6xl mx-auto px-6 sm:px-8 pt-16 pb-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/40 font-mono">
          <div className="flex items-center gap-3 text-white/70">
            <span className="text-sm font-medium">Kushkumar Shanware</span>
            <span>&lowast;</span>
            <span>B.Tech IT &bull; Priyadarshini College of Engineering &bull; &copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6">
            <span>NAGPUR, IN</span>
            <span>IST (UTC+5:30)</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Back to top</span>
            <span>&uarr;</span>
          </button>
        </footer>

      </div>
    </div>
  );
}
