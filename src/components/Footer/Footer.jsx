import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="mb-8 md:mb-0">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <defs>
                <linearGradient
                  id="logoGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
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
            <p className="mt-2 text-gray-400">Wakanda is the goal.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#experience"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Experience
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Connect
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.linkedin.com/in/joshua-mukisa/"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Josh-The-Developapa"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/jmuks_k/"
                    target="_blank"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            {/* <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Joshua Mukisa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
