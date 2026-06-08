import React, { useState, useEffect } from 'react';

const Header = ({ activeLink, onNavLinkClick }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: '#home', text: 'Home' },
    { href: '#about', text: 'About' },
    { href: '#skills', text: 'Skills' },
    { href: '#experience', text: 'Experience' },
    { href: '#projects', text: 'Projects' },
    { href: '#contact', text: 'Contact' },
  ];

  // Add scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    onNavLinkClick(e, href.substring(1));
    setMobileMenuOpen(false); // Close mobile menu on link click
  };

  const handleResumeClick = () => {
    window.open('/resume', '_blank');
    setMobileMenuOpen(false); // Close mobile menu on resume click
  };

  // Logo Component for reusability with gradient
  const JMLogo = ({ size = 40, className = '' }) => (
    <div
      className={`inline-flex items-center justify-center transition-all duration-300 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
        </defs>
        <rect
          x="8"
          y="8"
          width="44"
          height="44"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          fill="none"
        />
        <text
          x="30"
          y="38"
          textAnchor="middle"
          fontSize="20"
          fontWeight="300"
          fill="url(#logoGradient)"
        >
          JM
        </text>
      </svg>
    </div>
  );

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-lg'
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand Section */}
          <div className="flex items-center space-x-3">
            <JMLogo size={52} className="hover:scale-105 cursor-pointer" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative font-medium transition-all duration-300 ${
                  activeLink === link.href.substring(1)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.text}
                {/* Active indicator */}
                {activeLink === link.href.substring(1) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
                )}
              </a>
            ))}

            {/* Resume Button - Desktop */}
            <button
              onClick={handleResumeClick}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-2 cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-90' : 'rotate-0'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white/95 backdrop-blur-sm border-t border-gray-100`}
      >
        <div className="px-4 pt-2 pb-4">
          {/* Mobile Nav Links */}
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`block px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                activeLink === link.href.substring(1)
                  ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {link.text}
            </a>
          ))}

          {/* Resume Button - Mobile */}
          <button
            onClick={handleResumeClick}
            className="w-full mt-4 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>View Resume</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
