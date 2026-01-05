import React, { useState, useEffect, useRef } from 'react';
// Correct import from 'react-router-dom' for modern React Router
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SkillsSection from '../../components/Skills/Skills';
import AboutSection from '../../components/About/About';
import ExperienceSection from '../../components/Experience/Experience';
import ProjectsSection from '../../components/Projects/Projects';
import HeroImageMasonry from '../../components/HeroImageMasonry/HeroImageMasonry.jsx';

// Success Toast Component
const SuccessToast = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-sm">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-bounce">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <p className="font-medium">Message Sent!</p>
          <p className="text-sm text-green-100">
            Thanks for reaching out. I'll get back to you soon!
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-green-200 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Confetti Animation Component
const ConfettiParticle = ({ delay, color, left, animationDuration }) => (
  <div
    className="absolute w-3 h-3 opacity-80"
    style={{
      left: `${left}%`,
      backgroundColor: color,
      animationDelay: `${delay}s`,
      animationDuration: `${animationDuration}s`,
      animation: `confetti-fall ${animationDuration}s linear forwards`,
    }}
  />
);

const ConfettiAnimation = ({ isActive }) => {
  const confettiColors = [
    '#3B82F6',
    '#8B5CF6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#EC4899',
  ];
  const particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push({
      id: i,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      left: Math.random() * 100,
      delay: Math.random() * 2,
      animationDuration: 2 + Math.random() * 2,
    });
  }

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {particles.map((particle) => (
        <ConfettiParticle
          key={particle.id}
          delay={particle.delay}
          color={particle.color}
          left={particle.left}
          animationDuration={particle.animationDuration}
        />
      ))}
    </div>
  );
};

const Home = () => {
  // State for active navigation link
  const [activeLink, setActiveLink] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Refs for each section for scroll-spy functionality
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  // Effect for updating active nav link on scroll
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_PUBLIC_KEY);
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let currentSection = 'home';

      for (const [sectionName, ref] of Object.entries(sectionRefs)) {
        const section = ref.current;
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (
            scrollPosition >= sectionTop - 100 &&
            scrollPosition < sectionTop + sectionHeight - 100
          ) {
            currentSection = sectionName;
          }
        }
      }
      setActiveLink(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRefs]);

  // Add custom CSS for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slide-in {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes confetti-fall {
        0% {
          transform: translateY(-100vh) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
      
      @keyframes pulse-success {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }
      
      .animate-slide-in {
        animation: slide-in 0.5s ease-out;
      }
      
      .animate-pulse-success {
        animation: pulse-success 0.6s ease-in-out;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Handler for smooth scrolling to sections
  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for fixed header
        behavior: 'smooth',
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_PUBLIC_KEY
      );

      // Success animation sequence
      setShowConfetti(true);
      setShowSuccessToast(true);
      e.target.reset();

      // Hide confetti after 3 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to send message:', error);
      // You could add an error toast here too
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      <Header
        activeLink={activeLink}
        onNavLinkClick={(e, id) => handleNavLinkClick(e, id)}
      />

      {/* Success Toast */}
      <SuccessToast
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />

      {/* Confetti Animation */}
      <ConfettiAnimation isActive={showConfetti} />

      <main>
        {/* --- Hero Section --- */}
        <section
          id="home"
          ref={sectionRefs.home}
          className="min-h-screen flex flex-col lg:flex-row"
        >
          {/* Left Panel - Text Content */}
          <div className="w-full lg:w-1/2 flex justify-center items-center px-6 sm:px-8 lg:px-16 py-5 lg:py-12 order-2 lg:order-1 relative z-20">
            <div className="max-w-lg w-full">
              <h1 className="text-3xl sm:text-4xl md:text-[40px] lg:text-[40px] font-bold leading-tight mb-4">
                Hi, I'm <span className="gradient-text">Joshua Mukisa</span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-semibold text-gray-600 mb-6">
                Software Developer
              </h2>
              <p className="text-base sm:text-lg md:text-[18px] text-gray-500 mb-8 font-[400] leading-relaxed text-justify">
                I'm a software developer with over half a decade in experience
                building full-stack apps, AI/ML systems, and real-world IoT
                solutions. I'm driven by the desire to inspire a generation of
                Africans to rise, lead, and redefine the global tech space.
                Wakanda is the goal!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="#contact"
                  onClick={(e) => handleNavLinkClick(e, 'contact')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 text-center text-[16px]"
                >
                  Get In Touch
                </Link>
                <Link
                  to="#projects"
                  onClick={(e) => handleNavLinkClick(e, 'projects')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300 text-center text-[16px]"
                >
                  View Work
                </Link>
              </div>
            </div>
          </div>

          {/* Right Panel - Masonry Layout */}
          <div className="w-full lg:w-1/2 h-80 sm:h-96 lg:h-screen order-1 lg:order-2 relative">
            <HeroImageMasonry />
          </div>
        </section>

        {/* --- About Section --- */}
        <AboutSection sectionRef={sectionRefs.about} />

        {/* --- Skills Section --- */}
        <SkillsSection sectionRef={sectionRefs.skills} />

        {/* --- Experience Section (Newly Added) --- */}
        <ExperienceSection sectionRef={sectionRefs.experience} />

        {/* --- Projects Section (Updated) --- */}
        <ProjectsSection sectionRef={sectionRefs.projects} />

        {/* --- Contact Section (Updated) --- */}
        <section
          id="contact"
          ref={sectionRefs.contact}
          className="py-16 bg-white"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
            </div>
            <div className="md:flex md:space-x-8">
              <div className="md:w-1/2 mb-12 md:mb-0">
                <h3 className="text-xl font-semibold mb-6">
                  Contact Information
                </h3>
                <p className="text-gray-600 mb-8">
                  I'm currently open to new opportunities, interesting projects,
                  or just tech discussions. Feel free to reach out!
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                      <i className="fas fa-envelope text-blue-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Email</h4>
                      <Link
                        to="mailto:kiryowajoshua22@gmail.com"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        kiryowajoshua22@gmail.com
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mr-4">
                      <i className="fas fa-phone-alt text-purple-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Phone</h4>
                      <Link
                        to="tel:+12544009785"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        +1 254 400 9785
                      </Link>
                    </div>
                  </div>
                  {/* WhatsApp */}
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mr-4">
                      <i className="fab fa-whatsapp text-green-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">WhatsApp</h4>
                      <Link
                        to="https://wa.me/12544009785"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-500 hover:text-green-700"
                      >
                        Chat with me on WhatsApp
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Connect with me
                  </h4>
                  <div className="flex space-x-4">
                    <Link
                      to="https://www.linkedin.com/in/joshua-mukisa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-blue-100 hover:text-blue-500"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </Link>
                    <Link
                      to="https://github.com/Josh-The-Developapa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-800 hover:text-white"
                    >
                      <i className="fab fa-github"></i>
                    </Link>
                    <Link
                      to="https://www.instagram.com/jmuks_k/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-pink-600 hover:text-white"
                    >
                      <i className="fab fa-instagram"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                  {/* Form fields */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300"
                      placeholder="Your name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300"
                      placeholder="Your email"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300"
                      placeholder="Subject"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-300"
                      placeholder="Your message"
                      required
                      disabled={isSubmitting}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 ${
                      isSubmitting
                        ? 'opacity-70 cursor-not-allowed'
                        : 'hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
