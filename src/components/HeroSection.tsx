import { useState, useEffect, type MouseEvent } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

interface HeroSectionProps {
  onPillClick?: (label: string) => void;
}

export default function HeroSection({ onPillClick }: HeroSectionProps) {
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Typewriter hook
  const { displayed, done } = useTypewriter(
    'IT Engineer & Builder. Specializing in C++, computer vision with MediaPipe, and on-device Gemini AI pipelines. What are we building together?',
    34,
    500
  );

  // Action pill buttons become visible 400ms after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setPillsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = (e: MouseEvent) => {
    e.preventDefault();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText('Shanwarekush@gmail.com').catch(() => {
        // Fallback if needed
      });
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handlePillClick = (label: string) => {
    if (onPillClick) {
      onPillClick(label);
    }
  };

  return (
    <section
      id="hero-section"
      className="relative z-10 w-full min-h-[768px] h-screen h-[100dvh] flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-6 sm:px-8 md:px-10 overflow-hidden select-none sm:select-text"
    >
      {/* Content Container */}
      <div id="hero-content-container" className="max-w-xl relative z-10">
        
        {/* 1. Blurred intro label */}
        <div
          id="hero-blurred-label"
          className="blurred-label mb-6 select-none pointer-events-none text-white"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
          }}
        >
          Hey there, meet A.R.I.A,
          <br />
          Kushkumar Shanware&apos;s Adaptive Portfolio Agent
        </div>

        {/* 2. Typewriter text */}
        <p
          id="hero-typewriter-text"
          className="text-white mb-6 font-normal min-h-[54px]"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
          }}
        >
          {displayed}
          {!done && (
            <span
              id="typewriter-blinking-cursor"
              className="cursor animate-blink"
              aria-hidden="true"
            />
          )}
        </p>

        {/* 3. Action pill buttons */}
        <div
          id="hero-action-pills-container"
          className={`flex flex-wrap gap-y-1 ${
            pillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'
          }`}
          style={{
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {/* 4 White pill buttons */}
          <button
            type="button"
            id="pill-bug"
            onClick={() => handlePillClick('BUG: AI Accessibility')}
            className="action-pill inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[15px] px-5 py-[0.4em] mx-[0.2em] mb-[0.4em] whitespace-nowrap font-medium"
          >
            BUG: AI Accessibility
          </button>

          <button
            type="button"
            id="pill-resumecheck"
            onClick={() => handlePillClick('ResumeCheck Pro')}
            className="action-pill inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[15px] px-5 py-[0.4em] mx-[0.2em] mb-[0.4em] whitespace-nowrap font-medium"
          >
            ResumeCheck Pro
          </button>

          <button
            type="button"
            id="pill-skills"
            onClick={() => handlePillClick('Skills & Core CS')}
            className="action-pill inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[15px] px-5 py-[0.4em] mx-[0.2em] mb-[0.4em] whitespace-nowrap font-medium"
          >
            Skills &amp; Core CS
          </button>

          <button
            type="button"
            id="pill-achievements"
            onClick={() => handlePillClick('Hackathons & Awards')}
            className="action-pill inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[15px] px-5 py-[0.4em] mx-[0.2em] mb-[0.4em] whitespace-nowrap font-medium"
          >
            Hackathons &amp; Awards
          </button>

          {/* 1 Outline pill button */}
          <button
            type="button"
            id="pill-copy-email"
            onClick={handleCopyEmail}
            title="Click to copy Kushkumar's email address"
            className="outline-pill inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[15px] px-5 py-[0.4em] mx-[0.2em] mb-[0.4em] whitespace-nowrap font-medium gap-3 transition-colors duration-200 cursor-pointer group"
          >
            <span>
              Reach Kush:{' '}
              <span className="underline underline-offset-1">
                Shanwarekush@gmail.com
              </span>
            </span>

            {/* Feather/Lucide Copy Icon from Artistic Flair */}
            <span className="relative flex items-center justify-center w-3 h-3">
              {copied ? (
                <span className="text-[11px] font-bold leading-none">&#10003;</span>
              ) : (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 20 0 1 1-2-2V4a2 2 0 1 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
