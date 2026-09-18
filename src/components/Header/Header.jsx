import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';

/**
 * Editorial Masthead & Archival Navigation
 * -----------------------------------------
 * Fonts used: 'Newsreader' (serif display), 'JetBrains Mono' (labels/nav).
 * Add these to your document head (index.html) or a global stylesheet:
 *
 *   <link rel="preconnect" href="https://fonts.googleapis.com">
 *   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 *   <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
 *
 * The bar is 80px tall — that number must stay in sync with HEADER_OFFSET
 * in hooks/useSmoothScroll.js, which is what keeps anchor targets from
 * landing underneath it.
 */

const navLinks = [
  { href: '#about', text: 'The Story' },
  { href: '#ventures', text: 'Ventures' },
  { href: '#experience', text: 'Experience' },
  { href: '#gallery', text: 'Field Gallery' },
  { href: '#skills', text: 'Skills' },
  { href: '#blog', text: 'Blog' },
  { href: '#contact', text: 'Contact' },
];

const JMMonogram = ({ inverted = false }) => (
  <div
    className={`flex h-10 w-10 items-center justify-center border ${
      inverted ? 'border-[#302D2A] bg-[#181614]' : 'border-[#181614] bg-white'
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
    aria-hidden="true"
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
    aria-hidden="true"
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

  const barRef = useRef(null);
  const menuRef = useRef(null);
  const menuTl = useRef(null);

  /**
   * Scrolled state via ScrollTrigger instead of a scroll listener — one
   * shared measurement pass with the rest of the page, and it stays in
   * sync with Lenis rather than racing it.
   */
  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      start: 12,
      end: 'max',
      onToggle: (self) => setScrolled(self.isActive),
    });
    return () => st.kill();
  }, []);

  /** Masthead settles in ahead of the hero's entrance. */
  useLayoutEffect(() => {
    if (!barRef.current || prefersReducedMotion()) return;
    const tween = gsap.from(barRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: 'power3.out',
    });
    return () => tween.revert();
  }, []);

  /**
   * Mobile menu. GSAP animates to height:auto properly, so the panel is no
   * longer stuck behind a guessed max-height — add a seventh nav link and
   * nothing breaks.
   */
  useLayoutEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { height: 0, autoAlpha: 0 });
      if (prefersReducedMotion()) return;

      menuTl.current = gsap
        .timeline({ paused: true })
        .to(el, {
          height: 'auto',
          autoAlpha: 1,
          duration: 0.42,
          ease: 'power3.out',
        })
        .from(
          el.querySelectorAll('[data-menu-item]'),
          { y: 12, opacity: 0, duration: 0.3, stagger: 0.045 },
          '-=0.22',
        );
    }, el);

    return () => {
      menuTl.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const tl = menuTl.current;

    if (!tl) {
      gsap.set(menuRef.current, {
        height: isMobileMenuOpen ? 'auto' : 0,
        autoAlpha: isMobileMenuOpen ? 1 : 0,
      });
      return;
    }

    if (isMobileMenuOpen) tl.play();
    else tl.reverse();
  }, [isMobileMenuOpen]);

  /** Close the panel if the viewport grows into the desktop nav. */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const close = (e) => e.matches && setMobileMenuOpen(false);
    mq.addEventListener('change', close);
    return () => mq.removeEventListener('change', close);
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
      ref={barRef}
      className={`fixed left-0 right-0 top-0 z-50 border-b border-[#DDD8CC] transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_1px_0_rgba(0,0,0,0.02)]' : ''
      }`}
      style={{
        background: 'rgba(245, 242, 235, 0.95)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div className="mx-auto max-w-[1400px] px-[clamp(1.5rem,5vw,3rem)]">
        <div className="flex h-[80px] items-center justify-between">
          {/* Brand lockup */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex flex-shrink-0 items-center gap-3.5"
            aria-label="Back to top"
          >
            <JMMonogram />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                aria-current={
                  activeLink === link.href.substring(1) ? 'true' : undefined
                }
                className={`border-b pb-1 font-[JetBrains_Mono] text-[12px] uppercase tracking-[0.06em] transition-colors duration-200 ${
                  activeLink === link.href.substring(1)
                    ? 'border-[#D97746] text-[#181614]'
                    : 'border-transparent text-[#181614]/80 hover:border-[#DDD8CC] hover:text-[#181614]'
                }`}
              >
                {link.text}
              </a>
            ))}
          </nav>

          {/* Resume + CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={handleResumeClick}
              className="flex cursor-pointer items-center gap-2 border border-[#181614]/30 px-4 py-2.5 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.1em] text-[#181614] transition-colors duration-200 hover:border-[#181614]"
            >
              Resume
              {/* <DownloadIcon /> */}
            </button>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="flex items-center gap-2 bg-[#181614] px-5 py-2.5 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.1em] text-[#F5F2EB] transition-colors duration-200 hover:bg-[#302D2A]"
            >
              Get In Touch
              {/* <ArrowIcon /> */}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="p-2 text-[#181614] lg:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
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
        id="mobile-nav"
        ref={menuRef}
        className="overflow-hidden border-t border-[#DDD8CC] bg-[#F5F2EB] lg:hidden"
      >
        <div className="flex flex-col px-[clamp(1.5rem,5vw,3rem)] py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              data-menu-item
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`border-b border-[#DDD8CC] py-3 font-[JetBrains_Mono] text-[12px] uppercase tracking-[0.08em] ${
                activeLink === link.href.substring(1)
                  ? 'text-[#D97746]'
                  : 'text-[#181614]'
              }`}
            >
              {link.text}
            </a>
          ))}
          <button
            data-menu-item
            type="button"
            onClick={handleResumeClick}
            className="mt-4 flex cursor-pointer items-center justify-center gap-2 border border-[#181614] px-5 py-3 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.1em] text-[#181614]"
          >
            Resume
            {/* <DownloadIcon /> */}
          </button>
          <a
            data-menu-item
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="mt-3 flex items-center justify-center gap-2 bg-[#181614] px-5 py-3 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.1em] text-[#F5F2EB]"
          >
            Get In Touch
            {/* <ArrowIcon /> */}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
export { JMMonogram, ArrowIcon, DownloadIcon };
