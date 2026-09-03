import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface HistoryItem {
  type: 'input' | 'output';
  text: string;
}

export default function TerminalWidget() {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', text: '> INITIALIZING SYSTEM...' },
    { type: 'output', text: '> CONNECTING TO PORTFOLIO NODE...' },
    { type: 'output', text: '> STATUS: SECURE CONNECTION ESTABLISHED\n' },
    { type: 'output', text: "Type 'help' to see available commands." }
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = '';

    if (trimmedCmd === '') {
      setHistory((prev) => [...prev, { type: 'input', text: `user@guest:~$ ${cmd}` }]);
      return;
    }

    switch (trimmedCmd) {
      case 'help':
        output = `AVAILABLE COMMANDS:
  help      - Show this message
  about     - View my bio and background
  skills    - View technical stack
  projects  - View featured works
  contact   - Get my email and phone number
  resume    - View my official resume
  clear     - Clear the terminal`;
        break;
      case 'about':
        output = `NAME: Kushkumar Shanware
ROLE: AI & Software Engineer
LOCATION: Nagpur, Maharashtra, India

SUMMARY:
Tech-focused problem solver with an obsession for computer vision, AI APIs, and algorithmic efficiency. Strong fundamentals in C++, Data Structures (DSA), and Object-Oriented Programming (OOP).`;
        break;
      case 'skills':
        output = `TECHNICAL STACK:
- Languages: C++, Python, JavaScript/TypeScript
- AI/ML: Google Gemini Nano, MediaPipe, Prompt Engineering
- Domains: Computer Vision, Backend Architectures, Data Structures`;
        break;
      case 'projects':
        output = `FEATURED PROJECTS:
1. ResumeCheck Pro (Gemini AI API, PyMuPDF)
2. Shardeum PayFi Hub (Web3, Smart Contracts)
3. Smart Energy Theft Detection (Python, Anomaly Detection)
4. C++ Bookshop Management System (OOP, File Handling)`;
        break;
      case 'contact':
        output = `CONTACT CHANNELS:
Email: Shanwarekush@gmail.com
Phone: +91-7058051975
Location: Nagpur, India`;
        break;
      case 'resume':
        output = `RESUME LINK:
https://drive.google.com/file/d/1XTxzlmZCFvgsci8d8vGV29ch-azxHFxQ/view?usp=sharing`;
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        output = `Command not found: ${trimmedCmd}. Type 'help' to see available commands.`;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: `user@guest:~$ ${cmd}` },
      { type: 'output', text: output }
    ]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div 
      className="lg:col-span-7 bg-[#0a0a0a]/90 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono text-sm h-[400px] cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="bg-[#1a1a1a] px-5 py-3 flex items-center gap-2 border-b border-white/10 shrink-0">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        <div className="ml-4 text-white/40 text-xs tracking-wider">kushkumar@terminal:~</div>
      </div>
      
      {/* Terminal Body */}
      <div className="p-6 text-white/80 whitespace-pre-wrap flex-grow leading-relaxed overflow-y-auto">
        {history.map((item, idx) => (
          <div key={idx} className={item.type === 'input' ? 'text-emerald-400 mt-2' : 'mt-1'}>
            {item.text}
          </div>
        ))}
        
        {/* Active Input Line */}
        <div className="flex items-center mt-2">
          <span className="text-emerald-400 mr-2 shrink-0">user@guest:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent outline-none border-none text-white/80"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
