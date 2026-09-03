import { useState, type MouseEvent } from 'react';

interface NavbarProps {
  onContactClick?: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToAnchor = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    closeMenu();

    const element = document.getElementById(targetId);
    if (element) {
      const navbarOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - navbarOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch {
        // Fallback for sandboxed frames
      }
    } else {
      window.location.hash = targetId;
    }
  };

  const handleContactClick = (e: MouseEvent<HTMLAnchorElement>) => {
    scrollToAnchor(e, 'contact');
    if (onContactClick) {
      onContactClick();
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className="fixed top-0 left-0 right-0 w-full z-20 px-6 sm:px-8 py-5 flex flex-row justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/10 transition-all duration-300"
      >
        {/* Logo (left) */}
        <a
          href="/"
          id="nav-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            try {
              window.history.pushState(null, '', window.location.pathname);
            } catch {}
          }}
          className="flex flex-row items-center gap-2 cursor-pointer select-none group hover:opacity-80 transition-opacity duration-300"
        >
          <span
            className="text-[20px] sm:text-[22px] tracking-tight text-white font-medium"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Kushkumar Shanware
          </span>
          <span
            className="text-[22px] sm:text-[24px] text-white/80 select-none leading-none group-hover:rotate-90 transition-transform duration-500"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            &lowast;
          </span>
        </a>

        {/* Desktop nav links (center, hidden below md) */}
        <div
          id="desktop-nav-links"
          className="hidden md:flex flex-row items-center gap-1 text-[15px] font-medium text-white/80 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-2 py-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
        >
          <a
            href="#projects"
            onClick={(e) => scrollToAnchor(e, 'projects')}
            className="px-5 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Projects
          </a>
          <a
            href="#about"
            onClick={(e) => scrollToAnchor(e, 'about')}
            className="px-5 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={(e) => scrollToAnchor(e, 'skills')}
            className="px-5 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Skills
          </a>
          <a
            href="#achievements"
            onClick={(e) => scrollToAnchor(e, 'achievements')}
            className="px-5 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Achievements
          </a>
        </div>

        {/* Desktop CTA & Socials (right, hidden below md) */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-4 pr-1">
            <a href="https://github.com/Kushkumar-Shanware" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white hover:scale-110 transition-all duration-300" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com/in/kushkumar-shanware" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#0077b5] hover:scale-110 transition-all duration-300" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
          <a
            id="desktop-cta"
            href="#contact"
            onClick={handleContactClick}
            className="inline-flex items-center justify-center text-[15px] font-semibold text-black bg-white px-7 py-2.5 rounded-full hover:bg-gray-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger (visible below md) */}
        <button
          id="mobile-menu-button"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 focus:outline-none z-20 cursor-pointer"
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform origin-center ${
              isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform origin-center ${
              isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile overlay (z-index: 9) */}
      <div
        id="mobile-nav-overlay"
        className={`fixed inset-0 bg-black/90 backdrop-blur-md z-[19] flex flex-col justify-center px-8 gap-8 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <a
          href="#projects"
          onClick={(e) => scrollToAnchor(e, 'projects')}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity duration-200"
        >
          Projects
        </a>
        <a
          href="#about"
          onClick={(e) => scrollToAnchor(e, 'about')}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity duration-200"
        >
          About
        </a>
        <a
          href="#skills"
          onClick={(e) => scrollToAnchor(e, 'skills')}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity duration-200"
        >
          Skills
        </a>
        <a
          href="#achievements"
          onClick={(e) => scrollToAnchor(e, 'achievements')}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity duration-200"
        >
          Achievements
        </a>
        <a
          href="#contact"
          onClick={handleContactClick}
          className="text-[32px] font-medium text-white underline underline-offset-4 hover:opacity-60 transition-opacity duration-200 pt-4"
        >
          Get in touch
        </a>
      </div>
    </>
  );
}
