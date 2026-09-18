import React, { useState, useEffect } from 'react';

/**
 * Editorial Masthead & Archival Navigation
 * -----------------------------------------
 * Fonts used: 'Newsreader' (serif display), 'JetBrains Mono' (labels/nav).
 * Add these to your document head (index.html) or a global stylesheet:
 *
 *   <link rel="preconnect" href="https://fonts.googleapis.com">
 *   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 *   <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
 */

const navLinks = [
  { href: '#about', text: 'The Story' },
  { href: '#ventures', text: 'Ventures' },
  { href: '#experience', text: 'Experience' },
  { href: '#gallery', text: 'Gallery' },
  { href: '#skills', text: 'Skills' },
  { href: '#blog', text: 'Blog' },
];

const JMMonogram = ({ inverted = false }) => (
  <div
    className={`flex items-center justify-center w-10 h-10 border ${
      inverted ? 'bg-[#181614] border-[#302D2A]' : 'bg-white border-[#181614]'
    }`}
  >
    <span
      className={`font-[Newsreader] text-[15px] leading-none ${
        inverted ? 'text-[#F5F2EB]' : 'text-[#181614]'
      }`}
    >
      JM
    </span>
  </div>
);

const ArrowIcon = ({ className = '' }) => (
  <svg
    className={className}
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
  >
    <path
      d="M1 9L9 1M9 1H3M9 1V7"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="square"
    />
  </svg>
);

// Simple download-tray icon to visually distinguish the resume link from the arrow CTA
const DownloadIcon = ({ className = '' }) => (
  <svg
    className={className}
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
  >
    <path
      d="M5.5 1V7.5M5.5 7.5L2.5 4.5M5.5 7.5L8.5 4.5M1 9.5H10"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="square"
    />
  </svg>
);

const Header = ({ activeLink, onNavLinkClick }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    if (onNavLinkClick) onNavLinkClick(e, href.substring(1));
    else e.preventDefault();
    setMobileMenuOpen(false);
  };

  const handleResumeClick = () => {
    window.open('/resume', '_blank');
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-[#DDD8CC] transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_1px_0_rgba(0,0,0,0.02)]' : ''
      }`}
      style={{
        background: 'rgba(245, 242, 235, 0.95)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[80px]">
          {/* Brand lockup */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-3.5 flex-shrink-0"
          >
            <JMMonogram />
            {/* <span className="font-[Newsreader] font-medium text-[22px] sm:text-[26px] text-[#181614] tracking-[-0.02em]">
              Joshua Mukisa
            </span> */}
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`font-[JetBrains_Mono] text-[12px] uppercase tracking-[0.06em] transition-colors duration-200 pb-1 border-b ${
                  activeLink === link.href.substring(1)
                    ? 'text-[#181614] border-[#D97746]'
                    : 'text-[#181614]/80 border-transparent hover:text-[#181614] hover:border-[#DDD8CC]'
                }`}
              >
                {link.text}
              </a>
            ))}
          </nav>

          {/* Resume + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={handleResumeClick}
              className="flex items-center gap-2 text-[#181614] px-4 py-2.5 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.1em] border border-[#181614]/30 hover:border-[#181614] transition-colors duration-200 cursor-pointer"
            >
              Resume
              {/* <DownloadIcon /> */}
            </button>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="flex items-center gap-2 bg-[#181614] text-[#F5F2EB] px-5 py-2.5 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.1em] hover:bg-[#302D2A] transition-colors duration-200"
            >
              Get In Touch
              {/* <ArrowIcon /> */}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-[#181614]"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {isMobileMenuOpen ? (
                <path
                  d="M4 4L18 18M18 4L4 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              ) : (
                <path
                  d="M2 6H20M2 11H20M2 16H20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden bg-[#F5F2EB] border-t border-[#DDD8CC] transition-[max-height] duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[560px]' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`font-[JetBrains_Mono] text-[12px] uppercase tracking-[0.08em] py-3 border-b border-[#DDD8CC] ${
                activeLink === link.href.substring(1)
                  ? 'text-[#D97746]'
                  : 'text-[#181614]'
              }`}
            >
              {link.text}
            </a>
          ))}
          <button
            onClick={handleResumeClick}
            className="mt-4 flex items-center justify-center gap-2 border border-[#181614] text-[#181614] px-5 py-3 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.1em] cursor-pointer"
          >
            Resume
            <DownloadIcon />
          </button>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="mt-3 flex items-center justify-center gap-2 bg-[#181614] text-[#F5F2EB] px-5 py-3 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.1em]"
          >
            Get In Touch
            <ArrowIcon />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
export { JMMonogram, ArrowIcon };
