import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import emailjs from 'emailjs-com';

import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';
import useSmoothScroll from '../../hooks/useSmoothScroll';

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

/** Section ids in document order — drives the active nav link. */
const SECTION_IDS = [
  'home',
  'about',
  'ventures',
  'experience',
  'gallery',
  'skills',
  'blog',
  'contact',
];

// Small toast shown after a successful contact-form submission.
const SuccessToast = ({ isVisible, onClose }) => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  useLayoutEffect(() => {
    if (!isVisible || !toastRef.current || prefersReducedMotion()) return;
    const tween = gsap.from(toastRef.current, {
      xPercent: 110,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
    return () => tween.revert();
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={toastRef}
      role="status"
      aria-live="polite"
      className="fixed right-4 top-24 z-[60]"
    >
      <div className="flex max-w-sm items-start gap-3 border border-[#D97746] bg-[#181614] px-6 py-4 text-[#F5F2EB] shadow-lg">
        <div className="flex-1">
          <p className="mb-1 font-[JetBrains_Mono] text-[12px] uppercase tracking-[0.06em] text-[#D97746]">
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

  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    if (import.meta.env?.VITE_PUBLIC_KEY) {
      emailjs.init(import.meta.env.VITE_PUBLIC_KEY);
    }
  }, []);

  /**
   * Active nav link tracking.
   *
   * Replaces the old scroll listener: that recalculated offsetTop for every
   * section on every scroll event, which thrashes layout. ScrollTrigger
   * measures once and only reports when a section actually takes over.
   */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) setActiveLink(id);
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  /**
   * Images and webfonts change every section's height. Without a refresh,
   * every trigger below the fold is measured against stale positions.
   */
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener('load', refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    return () => window.removeEventListener('load', refresh);
  }, []);

  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    scrollTo(targetId);
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
        <Hero onNavLinkClick={handleNavLinkClick} />
        <About />
        <Ventures />
        <ExperienceSection />
        <AgaKhanGallery />
        <Skills />
        <Blog />
        <Contact onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
