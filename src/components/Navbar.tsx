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

        {/* Desktop CTA (right, hidden below md) */}
        <a
          id="desktop-cta"
          href="#contact"
          onClick={handleContactClick}
          className="hidden md:inline-flex items-center justify-center text-[15px] font-semibold text-black bg-white px-7 py-2.5 rounded-full hover:bg-gray-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
        >
          Get in touch
        </a>

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
