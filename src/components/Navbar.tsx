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
        className="fixed top-0 left-0 right-0 w-full z-20 px-6 sm:px-8 py-5 flex flex-row justify-between items-center bg-black/30 backdrop-blur-sm transition-all duration-300"
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
          className="flex flex-row items-center gap-3 cursor-pointer select-none group"
        >
          <span
            className="text-[22px] sm:text-[26px] tracking-tight text-white font-medium"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe&reg;
          </span>
          <span
            className="text-[26px] sm:text-[30px] text-white select-none leading-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            &lowast;
          </span>
        </a>

        {/* Desktop nav links (center, hidden below md) */}
        <div
          id="desktop-nav-links"
          className="hidden md:flex flex-row items-center gap-1 text-[23px] text-white"
        >
          <a
            href="#labs"
            onClick={(e) => scrollToAnchor(e, 'labs')}
            className="hover:opacity-60 transition-opacity duration-200"
          >
            Labs
          </a>
          <span>, </span>
          <a
            href="#studio"
            onClick={(e) => scrollToAnchor(e, 'studio')}
            className="hover:opacity-60 transition-opacity duration-200"
          >
            Studio
          </a>
          <span>, </span>
          <a
            href="#openings"
            onClick={(e) => scrollToAnchor(e, 'openings')}
            className="hover:opacity-60 transition-opacity duration-200"
          >
            Openings
          </a>
          <span>, </span>
          <a
            href="#shop"
            onClick={(e) => scrollToAnchor(e, 'shop')}
            className="hover:opacity-60 transition-opacity duration-200"
          >
            Shop
          </a>
        </div>

        {/* Desktop CTA (right, hidden below md) */}
        <a
          id="desktop-cta"
          href="#contact"
          onClick={handleContactClick}
          className="hidden md:inline-block text-[23px] text-white underline underline-offset-4 hover:opacity-60 transition-opacity duration-200"
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
          href="#labs"
          onClick={(e) => scrollToAnchor(e, 'labs')}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity duration-200"
        >
          Labs
        </a>
        <a
          href="#studio"
          onClick={(e) => scrollToAnchor(e, 'studio')}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity duration-200"
        >
          Studio
        </a>
        <a
          href="#openings"
          onClick={(e) => scrollToAnchor(e, 'openings')}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity duration-200"
        >
          Openings
        </a>
        <a
          href="#shop"
          onClick={(e) => scrollToAnchor(e, 'shop')}
          className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity duration-200"
        >
          Shop
        </a>
        <a
          href="#contact"
          onClick={handleContactClick}
          className="text-[32px] font-medium text-white underline underline-offset-4 hover:opacity-60 transition-opacity duration-200 pt-2"
        >
          Get in touch
        </a>
      </div>
    </>
  );
}
