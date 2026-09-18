import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';

import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Ventures from '../../components/Ventures/Ventures';
import ExperienceSection from '../../components/Experience/Experience';
import AgaKhanGallery from '../../components/Gallery/AgaKhanGallery';
import Skills from '../../components/Skills/Skills';
import Blog from '../../components/Blog/Blog';
import Contact from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';

/**
 * Adjust the import paths above to match wherever you place each
 * component in your project. Each section also expects these fonts
 * to be loaded globally — see the comment at the top of Header.jsx.
 */

// Small toast shown after a successful contact-form submission.
const SuccessToast = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-24 right-4 z-[60] animate-slide-in">
      <div className="bg-[#181614] text-[#F5F2EB] px-6 py-4 border border-[#D97746] shadow-lg flex items-start gap-3 max-w-sm">
        <div className="flex-1">
          <p className="font-[JetBrains_Mono] text-[12px] uppercase tracking-[0.06em] text-[#D97746] mb-1">
            Message Sent
          </p>
          <p className="font-[Plus_Jakarta_Sans] text-[13px] text-[#F5F2EB]/90">
            Thanks for reaching out — I'll get back to you soon.
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Dismiss"
          className="text-[#F5F2EB]/70 hover:text-[#F5F2EB]"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    ventures: useRef(null),
    experience: useRef(null),
    gallery: useRef(null),
    skills: useRef(null),
    blog: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    if (import.meta.env?.VITE_PUBLIC_KEY) {
      emailjs.init(import.meta.env.VITE_PUBLIC_KEY);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let currentSection = 'home';

      for (const [sectionName, ref] of Object.entries(sectionRefs)) {
        const section = ref.current;
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (
            scrollPosition >= sectionTop - 120 &&
            scrollPosition < sectionTop + sectionHeight - 120
          ) {
            currentSection = sectionName;
          }
        }
      }
      setActiveLink(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Inject the slide-in keyframe used by the success toast once.
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slide-in {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      .animate-slide-in { animation: slide-in 0.4s ease-out; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
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
        import.meta.env.VITE_PUBLIC_KEY,
      );
      setShowSuccessToast(true);
      e.target.reset();
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F5F2EB] text-[#181614]">
      <Header activeLink={activeLink} onNavLinkClick={handleNavLinkClick} />

      <SuccessToast
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />

      <main>
        <div ref={sectionRefs.home}>
          <Hero onNavLinkClick={handleNavLinkClick} />
        </div>

        <About sectionRef={sectionRefs.about} />

        <Ventures sectionRef={sectionRefs.ventures} />

        <ExperienceSection sectionRef={sectionRefs.experience} />

        <AgaKhanGallery sectionRef={sectionRefs.gallery} />

        <Skills sectionRef={sectionRefs.skills} />

        <Blog sectionRef={sectionRefs.blog} />

        <Contact
          sectionRef={sectionRefs.contact}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
