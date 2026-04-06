import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';

// Asset imports — profile pic picked from masonry set
import profilePic from '../../assets/pic-4.jpeg';
import VoteAbleImg from '../../assets/VoteAble.png';
import CaderaImg from '../../assets/Cadera.png';

// ─── Injected global styles (fonts + animations) ───────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  :root {
    --primary:   #ffdf30;
    --secondary: #ff725e;
    --surface:          #0e0e0e;
    --surface-low:      #131313;
    --surface-mid:      #191919;
    --surface-high:     #1f1f1f;
    --surface-highest:  #262626;
    --outline:          #484848;
    --on-surface:       #ffffff;
    --on-surface-dim:   #ababab;
    --on-primary:       #5d5000;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--surface);
    color: var(--on-surface);
    font-family: 'Manrope', sans-serif;
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  .font-headline { font-family: 'Space Grotesk', sans-serif; }

  /* Pulse dot */
  @keyframes pulse-ring {
    0%   { transform: scale(1); opacity: .75; }
    100% { transform: scale(3); opacity: 0; }
  }
  .pulse-dot::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--secondary);
    border-radius: 50%;
    animation: pulse-ring 2s cubic-bezier(.24,0,.38,1) infinite;
  }

  /* Hero text gradient */
  .text-gradient {
    background: linear-gradient(135deg, var(--primary) 0%, #ffa500 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Bento hover glow */
  .bento-card { transition: border-color .3s, background .3s; }
  .bento-card:hover { border-color: rgba(255,223,48,.25) !important; }

  /* Timeline */
  .timeline-row { border-top: 1px solid rgba(255,255,255,.05); transition: background .2s; }
  .timeline-row:hover { background: rgba(255,255,255,.03); }

  /* Toast slide-in */
  @keyframes toast-in {
    from { transform: translateX(110%); opacity: 0; }
    to   { transform: translateX(0);    opacity: 1; }
  }
  .toast-animate { animation: toast-in .4s cubic-bezier(.22,1,.36,1) forwards; }

  /* Confetti fall */
  @keyframes confetti-fall {
    0%   { transform: translateY(-100vh) rotate(0deg);   opacity: 1; }
    100% { transform: translateY(110vh)  rotate(720deg); opacity: 0; }
  }

  /* Input underline focus */
  .field-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--outline);
    color: var(--on-surface);
    font-family: 'Manrope', sans-serif;
    font-size: 1rem;
    padding: .75rem 0;
    width: 100%;
    outline: none;
    transition: border-color .3s;
  }
  .field-input::placeholder { color: rgba(255,255,255,.2); }
  .field-input:focus { border-bottom-color: var(--primary); }

  /* Mobile nav transition */
  .mobile-nav-open  { max-height: 28rem; opacity: 1; }
  .mobile-nav-close { max-height: 0;     opacity: 0; overflow: hidden; }
`;

// ─── Sub-components ─────────────────────────────────────────────────────────

const SuccessToast = ({ visible, onClose }) => {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [visible, onClose]);
  if (!visible) return null;
  return (
    <div
      className="toast-animate"
      style={{
        position: 'fixed',
        top: '5rem',
        right: '1.5rem',
        zIndex: 9999,
        background: 'linear-gradient(135deg,#22c55e,#16a34a)',
        color: '#fff',
        borderRadius: '4px',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 20px 60px rgba(0,0,0,.5)',
        maxWidth: '22rem',
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'rgba(255,255,255,.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        ✓
      </div>
      <div>
        <p
          style={{
            margin: 0,
            fontWeight: 700,
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          Message Sent!
        </p>
        <p style={{ margin: 0, fontSize: '.85rem', opacity: 0.85 }}>
          I'll get back to you soon.
        </p>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '1.2rem',
          marginLeft: 'auto',
        }}
      >
        ✕
      </button>
    </div>
  );
};

const Confetti = ({ active }) => {
  if (!active) return null;
  const colors = [
    '#ffdf30',
    '#ff725e',
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#ec4899',
  ];
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9998,
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: 55 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 10,
            height: 10,
            left: `${Math.random() * 100}%`,
            background: colors[Math.floor(Math.random() * colors.length)],
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            animation: `confetti-fall ${2 + Math.random() * 2}s linear ${Math.random() * 1.5}s forwards`,
          }}
        />
      ))}
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const Home = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  // Inject global styles once
  useEffect(() => {
    const tag = document.createElement('style');
    tag.innerHTML = GLOBAL_STYLES;
    document.head.appendChild(tag);
    emailjs.init(import.meta.env.VITE_PUBLIC_KEY);
    return () => document.head.removeChild(tag);
  }, []);

  // Scroll spy + header shadow
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const pos = window.scrollY;
      let current = 'home';
      for (const [name, ref] of Object.entries(sectionRefs)) {
        if (!ref.current) continue;
        if (pos >= ref.current.offsetTop - 120) current = name;
      }
      setActiveLink(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_PUBLIC_KEY,
      );
      setShowConfetti(true);
      setShowToast(true);
      e.target.reset();
      setTimeout(() => setShowConfetti(false), 3500);
    } catch {
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Nav links
  const navLinks = [
    { href: 'home', label: 'Home' },
    { href: 'about', label: 'About' },
    { href: 'skills', label: 'Skills' },
    { href: 'experience', label: 'Experience' },
    { href: 'projects', label: 'Projects' },
    { href: 'contact', label: 'Contact' },
  ];

  // ── Skills data
  const primarySkills = [
    { name: 'React.js', icon: '⚛', label: 'Advanced' },
    { name: 'Node.js', icon: '🟢', label: 'Advanced' },
    { name: 'Express.js', icon: '⚡', label: 'Advanced' },
    { name: 'MongoDB', icon: '🍃', label: 'Advanced' },
    { name: 'JavaScript', icon: 'JS', label: 'Advanced' },
    { name: 'Python', icon: '🐍', label: 'Advanced' },
    { name: 'C++', icon: '{}', label: 'Advanced' },
    { name: 'Arduino', icon: '🔌', label: 'Advanced' },
    { name: 'PyTorch', icon: '🔥', label: 'Moderate' },
  ];
  const additionalSkills = [
    'HTML',
    'CSS',
    'Figma',
    'Git',
    'GitHub',
    'NumPy',
    'Pandas',
    'Matplotlib',
    'REST APIs',
    'Postman',
    'Notion',
    'Excel',
  ];
  const softSkills = [
    'Creativity',
    'Problem Solving',
    'Inquisitiveness',
    'Adaptability',
    'Fast Learner',
    'Work Ethic',
    'Discipline',
    'Initiative',
  ];

  // ── Experience data
  const experiences = [
    {
      period: 'MAY 2025 — PRESENT',
      role: 'Co-Founder',
      company: 'Videra Digital',
      desc: 'Co-founded a SaaS company building scalable data management ecosystems. Led frontend engineering and spearheaded Cadera, a School Information System used by real institutions.',
    },
    {
      period: 'JULY 2022 — PRESENT',
      role: 'CEO & Founder',
      company: 'VoteAble Inc',
      desc: 'Founded and led a full-stack e-voting platform for Ugandan school student council elections. Successfully launched at Aga Khan High School Kampala, monetized via subscription.',
    },
    {
      period: 'APR 2023 — SEP 2023',
      role: 'Frontend Developer',
      company: 'UpLift Establishment',
      desc: 'Built a dynamic website from the ground up, led UI revisions, and integrated gallery features — gaining hands-on experience with modern web tools and team collaboration.',
    },
    {
      period: 'JUN 2022',
      role: 'Electoral Data & Logistics Intern',
      company: 'Electoral Commission of Uganda',
      desc: 'Supported election logistics and district coordination. Conducted Excel data analysis to extract key registration trends and deliver data-driven insights.',
    },
  ];

  // ── Projects (Cadera first, then VoteAble only)
  const projects = [
    {
      title: 'Cadera',
      badge1: 'EdTech',
      badge2: 'SaaS',
      image: CaderaImg,
      desc: 'A complete School Information System that simplifies grading, reporting, teacher management, and academic workflows through a single integrated platform.',
      tags: ['React', 'NestJS', 'Supabase', 'Prisma'],
      liveUrl: 'https://cadera.app',
      status: null,
    },
    {
      title: 'VoteAble',
      badge1: 'Civic Tech',
      badge2: 'Web App',
      image: VoteAbleImg,
      desc: 'An electronic voting system revolutionizing how schools in Uganda conduct student leadership elections. Trusted and used by Aga Khan High School, Kampala.',
      tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth'],
      liveUrl: 'https://voteable.live',
      status: null,
    },
  ];

  // ─── Shared style tokens
  const S = {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    surface: 'var(--surface)',
    surfaceMid: 'var(--surface-mid)',
    surfaceHigh: 'var(--surface-high)',
    outline: 'var(--outline)',
    dimText: 'var(--on-surface-dim)',
  };

  return (
    <div style={{ background: S.surface, minHeight: '100vh' }}>
      <SuccessToast visible={showToast} onClose={() => setShowToast(false)} />
      <Confetti active={showConfetti} />

      {/* ── TOP NAV ─────────────────────────────────────────────────────── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 50,
          background: scrolled ? 'rgba(14,14,14,.85)' : 'rgba(14,14,14,.6)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,.05)',
          transition: 'background .3s',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 68,
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollTo(e, 'home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.75rem',
              textDecoration: 'none',
            }}
          >
            <span style={{ color: S.primary, fontSize: '1.4rem' }}>⌨</span>
            <span
              className="font-headline"
              style={{
                fontSize: '1.25rem',
                fontWeight: 900,
                letterSpacing: '-.04em',
                color: '#fff',
                textTransform: 'uppercase',
              }}
            >
              Joshua Mukisa
            </span>
          </a>

          {/* Desktop nav */}
          <nav
            style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
            className="desktop-nav"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={`#${l.href}`}
                onClick={(e) => scrollTo(e, l.href)}
                className="font-headline"
                style={{
                  fontSize: '.8rem',
                  fontWeight: 700,
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: activeLink === l.href ? S.primary : S.dimText,
                  transition: 'color .25s',
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/joshua-mukisa-resume.pdf"
              target="_blank"
              className="font-headline"
              style={{
                background: S.primary,
                color: S.surface,
                padding: '.45rem 1.25rem',
                fontSize: '.8rem',
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'opacity .2s',
              }}
              onMouseEnter={(e) => (e.target.style.opacity = '.85')}
              onMouseLeave={(e) => (e.target.style.opacity = '1')}
            >
              RESUME
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '1.5rem',
            }}
            className="mobile-btn"
          >
            ☰
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={mobileOpen ? 'mobile-nav-open' : 'mobile-nav-close'}
          style={{
            background: 'rgba(14,14,14,.97)',
            transition: 'max-height .3s, opacity .3s',
          }}
        >
          <div
            style={{
              padding: '1rem 1.5rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '.25rem',
            }}
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={`#${l.href}`}
                onClick={(e) => scrollTo(e, l.href)}
                className="font-headline"
                style={{
                  padding: '.75rem 1rem',
                  fontSize: '.9rem',
                  fontWeight: 700,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: activeLink === l.href ? S.primary : S.dimText,
                  borderLeft:
                    activeLink === l.href
                      ? `3px solid ${S.primary}`
                      : '3px solid transparent',
                  transition: 'all .2s',
                  borderRadius: 2,
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/joshua-mukisa-resume.pdf"
              target="_blank"
              className="font-headline"
              style={{
                marginTop: '.75rem',
                background: S.primary,
                color: S.surface,
                padding: '.75rem 1rem',
                fontSize: '.85rem',
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                textAlign: 'center',
                borderRadius: 2,
              }}
            >
              VIEW RESUME
            </a>
          </div>
        </div>

        {/* Responsive style overrides */}
        <style>{`
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-btn   { display: block !important; }
          }
        `}</style>
      </header>

      <main style={{ paddingTop: 68 }}>
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          id="home"
          ref={sectionRefs.home}
          style={{
            minHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '4rem 1.5rem 3rem',
            maxWidth: 1280,
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Background glow blob */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '-5%',
              width: '55%',
              height: '70%',
              background:
                'radial-gradient(ellipse at center, rgba(255,223,48,.07) 0%, rgba(255,114,94,.04) 50%, transparent 70%)',
              pointerEvents: 'none',
              filter: 'blur(60px)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '56rem' }}>
            {/* Available badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.75rem',
              }}
            >
              <span style={{ position: 'relative', width: 12, height: 12 }}>
                <span
                  className="pulse-dot"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: S.secondary,
                    display: 'block',
                  }}
                />
                <span
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: S.secondary,
                  }}
                />
              </span>
              <span
                style={{
                  fontSize: '.7rem',
                  letterSpacing: '.22em',
                  textTransform: 'uppercase',
                  color: S.dimText,
                  fontWeight: 600,
                }}
              >
                Available for worldwide collaboration
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-headline"
              style={{
                fontSize: 'clamp(3rem, 9vw, 7rem)',
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: '-.04em',
                textTransform: 'uppercase',
                marginBottom: '1.75rem',
                color: '#fff',
              }}
            >
              Architecting
              <br />
              <span className="text-gradient">Digital</span>
              <br />
              Futures.
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                color: S.dimText,
                lineHeight: 1.65,
                maxWidth: '38rem',
                marginBottom: '2.75rem',
              }}
            >
              Software developer with 5+ years building full‑stack apps, AI/ML
              systems, and real‑world IoT solutions. Driven by the desire to
              inspire a generation of Africans to rise, lead, and redefine the
              global tech space.
              <span style={{ color: S.primary, fontWeight: 700 }}>
                {' '}
                Wakanda is the goal.
              </span>
            </p>

            {/* CTA buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
              <a
                href="#projects"
                onClick={(e) => scrollTo(e, 'projects')}
                className="font-headline"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.75rem',
                  background: S.primary,
                  color: S.surface,
                  padding: '1.1rem 2rem',
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'transform .2s, box-shadow .2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 12px 40px rgba(255,223,48,.25)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                View Projects <span style={{ fontSize: '1.1rem' }}>→</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, 'contact')}
                className="font-headline"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.75rem',
                  border: `1px solid ${S.outline}`,
                  color: '#fff',
                  padding: '1.1rem 2rem',
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background .2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = 'rgba(255,255,255,.05)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = 'transparent')
                }
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Stats row */}
          <div
            style={{
              marginTop: '5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: '2rem',
              opacity: 0.38,
              maxWidth: '36rem',
            }}
          >
            {[
              ['5+', 'Years Experience'],
              ['40+', 'Projects Completed'],
              ['3', 'Global Ventures'],
              ['100%', 'Uptime Delivery'],
            ].map(([n, l]) => (
              <div key={l}>
                <div
                  className="font-headline"
                  style={{ fontSize: '2.25rem', fontWeight: 900 }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontSize: '.6rem',
                    letterSpacing: '.18em',
                    textTransform: 'uppercase',
                    marginTop: '.25rem',
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ABOUT ─────────────────────────────────────────────────────── */}
        <section
          id="about"
          ref={sectionRefs.about}
          style={{ padding: '6rem 1.5rem', maxWidth: 1280, margin: '0 auto' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12,1fr)',
              gap: '4rem',
              alignItems: 'start',
            }}
          >
            {/* Image col */}
            <div style={{ gridColumn: 'span 5', position: 'relative' }}>
              <div
                style={{
                  aspectRatio: '4/5',
                  background: S.surfaceHigh,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={profilePic}
                  alt="Joshua Mukisa"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%) contrast(1.2)',
                    transition: 'filter .7s',
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.filter = 'grayscale(0%) contrast(1)')
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.filter = 'grayscale(100%) contrast(1.2)')
                  }
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-1.5rem',
                  right: '-1.5rem',
                  width: '7.5rem',
                  height: '7.5rem',
                  background: S.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                }}
              >
                <span
                  className="font-headline"
                  style={{
                    fontSize: '.75rem',
                    fontWeight: 900,
                    color: S.surface,
                    lineHeight: 1.2,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  }}
                >
                  Rooted in Uganda
                </span>
              </div>
            </div>

            {/* Text col */}
            <div
              style={{
                gridColumn: 'span 7',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.75rem',
              }}
            >
              <span
                style={{
                  fontSize: '.7rem',
                  letterSpacing: '.3em',
                  textTransform: 'uppercase',
                  color: S.secondary,
                  fontWeight: 700,
                }}
              >
                Biography
              </span>
              <h2
                className="font-headline"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  fontWeight: 900,
                  lineHeight: 0.95,
                  letterSpacing: '-.04em',
                  textTransform: 'uppercase',
                  color: '#fff',
                }}
              >
                Empowering Africa Through{' '}
                <span style={{ color: S.primary }}>Robust Code</span> &amp;
                Strategic Data.
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  color: S.dimText,
                  fontSize: '1.05rem',
                  lineHeight: 1.75,
                }}
              >
                <p style={{ margin: 0 }}>
                  I got into tech in March 2020, during Uganda's first COVID
                  lockdown — thirteen years old, bored, and dreaming like
                  Zuckerberg and Gates, but knowing absolutely nothing. So I
                  taught myself via YouTube, janky coding apps, and online
                  courses. I just kept building.
                </p>
                <p style={{ margin: 0 }}>
                  One of those projects became my first real venture: a
                  successful e-voting platform that showed me I was capable of a
                  lot more. For the first time, I could call myself a CEO. Since
                  then I've kept learning, building, and levelling up — focused
                  on data ecosystems and full-stack architecture that
                  accelerates growth across the African continent.
                </p>
              </div>
              <div
                style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
              >
                <span style={{ height: 1, width: 48, background: S.outline }} />
                <span
                  style={{
                    fontSize: '.7rem',
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                    fontStyle: 'italic',
                    color: S.dimText,
                  }}
                >
                  Joshua Mukisa
                </span>
              </div>
              {/* Social links */}
              <div
                style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}
              >
                {[
                  {
                    label: 'GitHub',
                    url: 'https://github.com/Josh-The-Developapa',
                  },
                  {
                    label: 'LinkedIn',
                    url: 'https://www.linkedin.com/in/joshua-mukisa/',
                  },
                  {
                    label: 'Instagram',
                    url: 'https://www.instagram.com/jmuks_k/',
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-headline"
                    style={{
                      fontSize: '.7rem',
                      fontWeight: 700,
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      color: S.dimText,
                      borderBottom: `1px solid ${S.outline}`,
                      paddingBottom: 2,
                      transition: 'color .2s, border-color .2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = S.primary;
                      e.currentTarget.style.borderColor = S.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = S.dimText;
                      e.currentTarget.style.borderColor = S.outline;
                    }}
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Responsive about grid */}
          <style>{`
            @media (max-width: 768px) {
              #about > div { grid-template-columns: 1fr !important; }
              #about > div > div:first-child { grid-column: span 1 !important; }
              #about > div > div:last-child  { grid-column: span 1 !important; }
            }
          `}</style>
        </section>

        {/* ── SKILLS (BENTO) ─────────────────────────────────────────────── */}
        <section
          id="skills"
          ref={sectionRefs.skills}
          style={{ background: S.surfaceMid, padding: '6rem 1.5rem' }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '3.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '.7rem',
                    letterSpacing: '.3em',
                    textTransform: 'uppercase',
                    color: S.primary,
                    fontWeight: 700,
                  }}
                >
                  Capabilities
                </span>
                <h2
                  className="font-headline"
                  style={{
                    fontSize: 'clamp(2.25rem,5vw,3.5rem)',
                    fontWeight: 900,
                    letterSpacing: '-.04em',
                    textTransform: 'uppercase',
                    marginTop: '.5rem',
                    color: '#fff',
                  }}
                >
                  Technical Stack
                </h2>
              </div>
              <p
                style={{
                  color: S.dimText,
                  maxWidth: '22rem',
                  textAlign: 'right',
                  fontSize: '.95rem',
                  lineHeight: 1.65,
                }}
              >
                A curated selection of technologies and methodologies I employ
                to build scalable digital experiences.
              </p>
            </div>

            {/* Bento grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4,1fr)',
                gridTemplateRows: 'auto auto',
                gap: '1rem',
              }}
            >
              {/* Core Languages — spans 2 */}
              <div
                className="bento-card"
                style={{
                  gridColumn: 'span 2',
                  background: S.surface,
                  border: `1px solid rgba(255,255,255,.05)`,
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                }}
              >
                <span style={{ fontSize: '2rem' }}>{'</>'}</span>
                <div>
                  <h3
                    className="font-headline"
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      marginBottom: '1rem',
                      color: '#fff',
                    }}
                  >
                    Core Languages
                  </h3>
                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}
                  >
                    {['JavaScript', 'TypeScript', 'Python', 'C++'].map((t) => (
                      <span
                        key={t}
                        style={{
                          background: S.surfaceHigh,
                          padding: '.3rem .75rem',
                          fontSize: '.65rem',
                          letterSpacing: '.15em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Frontend */}
              <div
                className="bento-card"
                style={{
                  background: S.surfaceHigh,
                  border: `1px solid rgba(255,255,255,.05)`,
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  transition: 'background .2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = '#2c2c2c')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = S.surfaceHigh)
                }
              >
                <span style={{ fontSize: '2rem', color: S.primary }}>⚛</span>
                <h3
                  className="font-headline"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#fff',
                  }}
                >
                  Frontend Systems
                </h3>
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}
                >
                  {['React.js', 'Tailwind', 'Vite', 'Figma'].map((t) => (
                    <span
                      key={t}
                      style={{
                        background: 'rgba(255,255,255,.06)',
                        padding: '.25rem .6rem',
                        fontSize: '.6rem',
                        letterSpacing: '.12em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div
                className="bento-card"
                style={{
                  background: '#191919',
                  border: `1px solid rgba(255,255,255,.05)`,
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  transition: 'background .2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = '#2c2c2c')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = '#191919')
                }
              >
                <span style={{ fontSize: '2rem', color: S.secondary }}>🛢</span>
                <h3
                  className="font-headline"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#fff',
                  }}
                >
                  Backend &amp; Cloud
                </h3>
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}
                >
                  {['Node.js', 'NestJS', 'Express', 'Supabase'].map((t) => (
                    <span
                      key={t}
                      style={{
                        background: 'rgba(255,255,255,.06)',
                        padding: '.25rem .6rem',
                        fontSize: '.6rem',
                        letterSpacing: '.12em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI / ML — spans 2 */}
              <div
                className="bento-card"
                style={{
                  gridColumn: 'span 2',
                  background: S.surfaceMid,
                  border: `1px solid rgba(255,255,255,.05)`,
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '.75rem',
                  transition: 'background .2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = '#2c2c2c')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = S.surfaceMid)
                }
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>🤖</span>
                  <span
                    style={{
                      background: `rgba(255,114,94,.12)`,
                      color: S.secondary,
                      fontSize: '.6rem',
                      padding: '.25rem .6rem',
                      letterSpacing: '.15em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                    }}
                  >
                    Advancing
                  </span>
                </div>
                <div>
                  <h3
                    className="font-headline"
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      marginBottom: '.5rem',
                      color: '#fff',
                    }}
                  >
                    AI &amp; Machine Learning
                  </h3>
                  <p
                    style={{
                      fontSize: '.9rem',
                      color: S.dimText,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    Building and training ML models with PyTorch and TensorFlow,
                    plus integrating pre-trained models into custom apps.
                  </p>
                </div>
              </div>

              {/* Data */}
              <div
                className="bento-card"
                style={{
                  background: S.surface,
                  border: `1px solid rgba(255,255,255,.05)`,
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '.75rem',
                }}
              >
                <span style={{ fontSize: '2rem', color: S.secondary }}>📊</span>
                <h3
                  className="font-headline"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#fff',
                  }}
                >
                  Data Ecosystems
                </h3>
              </div>

              {/* IoT */}
              <div
                className="bento-card"
                style={{
                  background: S.surfaceHigh,
                  border: `1px solid rgba(255,255,255,.05)`,
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '.75rem',
                }}
              >
                <span style={{ fontSize: '2rem' }}>🔌</span>
                <h3
                  className="font-headline"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#fff',
                  }}
                >
                  IoT &amp; Embedded
                </h3>
              </div>
            </div>

            {/* Additional + Soft skills pills */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginTop: '1rem',
              }}
            >
              {[
                { heading: 'Additional Tools', items: additionalSkills },
                { heading: 'Soft Skills', items: softSkills },
              ].map(({ heading, items }) => (
                <div
                  key={heading}
                  style={{
                    background: S.surface,
                    border: `1px solid rgba(255,255,255,.05)`,
                    padding: '1.75rem',
                  }}
                >
                  <h3
                    className="font-headline"
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      marginBottom: '1rem',
                      color: '#fff',
                    }}
                  >
                    {heading}
                  </h3>
                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}
                  >
                    {items.map((s) => (
                      <span
                        key={s}
                        style={{
                          background: S.surfaceHigh,
                          padding: '.3rem .75rem',
                          fontSize: '.65rem',
                          letterSpacing: '.12em',
                          textTransform: 'uppercase',
                          color: S.dimText,
                          transition: 'background .2s, color .2s',
                          cursor: 'default',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `rgba(255,223,48,.1)`;
                          e.currentTarget.style.color = S.primary;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = S.surfaceHigh;
                          e.currentTarget.style.color = S.dimText;
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bento responsive */}
            <style>{`
              @media (max-width: 900px) {
                #skills .bento-card { grid-column: span 2 !important; }
              }
              @media (max-width: 640px) {
                #skills .bento-card { grid-column: span 4 !important; }
              }
            `}</style>
          </div>
        </section>

        {/* ── EXPERIENCE ─────────────────────────────────────────────────── */}
        <section
          id="experience"
          ref={sectionRefs.experience}
          style={{ padding: '6rem 1.5rem', maxWidth: 1280, margin: '0 auto' }}
        >
          <span
            style={{
              fontSize: '.7rem',
              letterSpacing: '.3em',
              textTransform: 'uppercase',
              color: S.secondary,
              fontWeight: 700,
              display: 'block',
              marginBottom: '.75rem',
            }}
          >
            Journey
          </span>
          <h2
            className="font-headline"
            style={{
              fontSize: 'clamp(2.25rem,5vw,3.5rem)',
              fontWeight: 900,
              letterSpacing: '-.04em',
              textTransform: 'uppercase',
              marginBottom: '4rem',
              color: '#fff',
            }}
          >
            Work Experience
          </h2>

          {experiences.map((exp, i) => (
            <div
              key={i}
              className="timeline-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '3fr 5fr 4fr',
                padding: '2.5rem 1rem',
                gap: '2rem',
                alignItems: 'start',
                ...(i === experiences.length - 1
                  ? { borderBottom: '1px solid rgba(255,255,255,.05)' }
                  : {}),
              }}
            >
              <span
                style={{
                  fontSize: '.75rem',
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: S.dimText,
                  paddingTop: '.25rem',
                  fontWeight: 600,
                }}
              >
                {exp.period}
              </span>
              <div>
                <h3
                  className="font-headline"
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#fff',
                    marginBottom: '.35rem',
                  }}
                >
                  {exp.role}
                </h3>
                <p
                  style={{
                    fontSize: '.7rem',
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: S.primary,
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {exp.company}
                </p>
              </div>
              <p
                style={{
                  color: S.dimText,
                  lineHeight: 1.7,
                  fontSize: '.95rem',
                  margin: 0,
                }}
              >
                {exp.desc}
              </p>
            </div>
          ))}

          {/* Experience responsive */}
          <style>{`
            @media (max-width: 768px) {
              #experience .timeline-row {
                grid-template-columns: 1fr !important;
                gap: .75rem !important;
              }
            }
          `}</style>
        </section>

        {/* ── PROJECTS ──────────────────────────────────────────────────── */}
        <section
          id="projects"
          ref={sectionRefs.projects}
          style={{ background: S.surface, padding: '6rem 1.5rem' }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '4rem',
              }}
            >
              <h2
                className="font-headline"
                style={{
                  fontSize: 'clamp(2.25rem,5vw,3.5rem)',
                  fontWeight: 900,
                  letterSpacing: '-.04em',
                  textTransform: 'uppercase',
                  color: '#fff',
                }}
              >
                Selected Works
              </h2>
              <a
                href="https://github.com/Josh-The-Developapa"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '.7rem',
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: S.dimText,
                  textDecoration: 'none',
                  transition: 'color .2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = S.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = S.dimText)}
              >
                View GitHub ↗
              </a>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '3rem',
              }}
            >
              {projects.map((p, i) => (
                <div
                  key={p.title}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    marginTop: i === 1 ? '5rem' : 0,
                  }}
                  className="project-card-wrap"
                >
                  {/* Image */}
                  <div
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      aspectRatio: '16/9',
                      background: S.surfaceHigh,
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition:
                          'transform .7s cubic-bezier(.25,.46,.45,.94)',
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.transform = 'scale(1.07)')
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.transform = 'scale(1)')
                      }
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to top, rgba(14,14,14,.7) 0%, transparent 60%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '1.5rem',
                        left: '1.5rem',
                        display: 'flex',
                        gap: '.5rem',
                      }}
                    >
                      <span
                        style={{
                          background: S.primary,
                          color: S.surface,
                          padding: '.25rem .75rem',
                          fontSize: '.6rem',
                          letterSpacing: '.15em',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                        }}
                      >
                        {p.badge1}
                      </span>
                      <span
                        style={{
                          background: 'rgba(14,14,14,.75)',
                          backdropFilter: 'blur(6px)',
                          color: '#fff',
                          padding: '.25rem .75rem',
                          fontSize: '.6rem',
                          letterSpacing: '.15em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {p.badge2}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <h3
                      className="font-headline"
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '-.03em',
                        color: '#fff',
                        marginBottom: '.5rem',
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        color: S.dimText,
                        lineHeight: 1.65,
                        marginBottom: '1.25rem',
                        fontSize: '.95rem',
                      }}
                    >
                      {p.desc}
                    </p>
                    {/* Tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '.5rem',
                        marginBottom: '1.25rem',
                      }}
                    >
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            background: S.surfaceHigh,
                            padding: '.25rem .6rem',
                            fontSize: '.6rem',
                            letterSpacing: '.12em',
                            textTransform: 'uppercase',
                            color: S.dimText,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-headline"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '.5rem',
                          fontSize: '.7rem',
                          letterSpacing: '.15em',
                          textTransform: 'uppercase',
                          color: S.primary,
                          borderBottom: `1px solid rgba(255,223,48,.2)`,
                          paddingBottom: 2,
                          textDecoration: 'none',
                          fontWeight: 700,
                          transition: 'border-color .2s',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.borderColor = S.primary)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.borderColor =
                            'rgba(255,223,48,.2)')
                        }
                      >
                        Live Site ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 768px) {
              #projects .project-card-wrap { margin-top: 0 !important; }
              #projects > div > div:last-child { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* ── CONTACT ───────────────────────────────────────────────────── */}
        <section
          id="contact"
          ref={sectionRefs.contact}
          style={{ padding: '8rem 1.5rem', maxWidth: 1280, margin: '0 auto' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '5rem',
              alignItems: 'start',
            }}
          >
            {/* Left info */}
            <div>
              <h2
                className="font-headline"
                style={{
                  fontSize: 'clamp(3rem,7vw,5.5rem)',
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: '-.04em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  marginBottom: '2rem',
                }}
              >
                Let's Start a <span style={{ color: S.secondary }}>Pulse.</span>
              </h2>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: S.dimText,
                  lineHeight: 1.7,
                  marginBottom: '3rem',
                }}
              >
                I'm currently open to high-impact projects, interesting collabs,
                and strategic partnerships. Let's talk tech and build something
                meaningful.
              </p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.25rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '.65rem',
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      color: S.dimText,
                      fontWeight: 600,
                    }}
                  >
                    General Inquiries
                  </span>
                  <a
                    href="mailto:kiryowajoshua22@gmail.com"
                    className="font-headline"
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'color .2s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = S.primary)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
                  >
                    kiryowajoshua22@gmail.com
                  </a>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.25rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '.65rem',
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      color: S.dimText,
                      fontWeight: 600,
                    }}
                  >
                    Phone / WhatsApp
                  </span>
                  <a
                    href="tel:+12544009785"
                    className="font-headline"
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'color .2s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = S.primary)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
                  >
                    +1 254 400 9785
                  </a>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    marginTop: '.5rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {[
                    {
                      label: 'LinkedIn',
                      url: 'https://www.linkedin.com/in/joshua-mukisa/',
                    },
                    {
                      label: 'GitHub',
                      url: 'https://github.com/Josh-The-Developapa',
                    },
                    {
                      label: 'Instagram',
                      url: 'https://www.instagram.com/jmuks_k/',
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-headline"
                      style={{
                        fontSize: '.7rem',
                        fontWeight: 700,
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        color: S.dimText,
                        borderBottom: `1px solid ${S.outline}`,
                        paddingBottom: 2,
                        transition: 'color .2s, border-color .2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = S.secondary;
                        e.currentTarget.style.borderColor = S.secondary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = S.dimText;
                        e.currentTarget.style.borderColor = S.outline;
                      }}
                    >
                      {s.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2.25rem',
                background: S.surfaceMid,
                padding: '3rem',
              }}
            >
              {[
                {
                  label: 'Full Name',
                  name: 'name',
                  type: 'text',
                  placeholder: 'Type your name here',
                  required: true,
                },
                {
                  label: 'Email Address',
                  name: 'email',
                  type: 'email',
                  placeholder: 'name@company.com',
                  required: true,
                },
                {
                  label: 'Subject',
                  name: 'subject',
                  type: 'text',
                  placeholder: 'What is this about?',
                  required: false,
                },
              ].map((f) => (
                <div key={f.name}>
                  <label
                    className="font-headline"
                    style={{
                      display: 'block',
                      fontSize: '.65rem',
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      color: S.dimText,
                      marginBottom: '.5rem',
                      fontWeight: 700,
                    }}
                  >
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    required={f.required}
                    disabled={isSubmitting}
                    className="field-input"
                  />
                </div>
              ))}
              <div>
                <label
                  className="font-headline"
                  style={{
                    display: 'block',
                    fontSize: '.65rem',
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                    color: S.dimText,
                    marginBottom: '.5rem',
                    fontWeight: 700,
                  }}
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Briefly describe your project"
                  required
                  disabled={isSubmitting}
                  className="field-input"
                  style={{ resize: 'none' }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-headline"
                style={{
                  background: isSubmitting ? 'rgba(255,223,48,.5)' : S.primary,
                  color: S.surface,
                  padding: '1.2rem',
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '.75rem',
                  transition: 'opacity .2s, transform .15s',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) e.currentTarget.style.opacity = '.88';
                }}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {isSubmitting ? (
                  <>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        border: '2px solid rgba(93,80,0,.4)',
                        borderTop: `2px solid ${S.surface}`,
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        display: 'inline-block',
                      }}
                    />{' '}
                    Sending…
                  </>
                ) : (
                  'Initiate Connection →'
                )}
              </button>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </form>
          </div>

          <style>{`
            @media (max-width: 768px) {
              #contact > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
            }
          `}</style>
        </section>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,.05)',
          background: S.surface,
          padding: '3rem 1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span
              className="font-headline"
              style={{
                fontWeight: 900,
                letterSpacing: '-.04em',
                color: '#fff',
                fontSize: '1.1rem',
                textTransform: 'uppercase',
              }}
            >
              JM
            </span>
            <span
              style={{
                fontSize: '.65rem',
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,.2)',
                fontWeight: 600,
              }}
            >
              © {new Date().getFullYear()} Joshua Mukisa · Engineered in Uganda
            </span>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {[
              {
                label: 'GitHub',
                url: 'https://github.com/Josh-The-Developapa',
              },
              {
                label: 'LinkedIn',
                url: 'https://www.linkedin.com/in/joshua-mukisa/',
              },
              { label: 'Instagram', url: 'https://www.instagram.com/jmuks_k/' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '.65rem',
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,.3)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'color .2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = S.secondary)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'rgba(255,255,255,.3)')
                }
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── FAB ───────────────────────────────────────────────────────────── */}
      <a
        href="#contact"
        onClick={(e) => scrollTo(e, 'contact')}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 40,
          background: S.secondary,
          color: '#fff',
          width: 56,
          height: 56,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          fontSize: '1.3rem',
          boxShadow: '0 8px 32px rgba(255,114,94,.35)',
          transition: 'transform .2s, box-shadow .2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 12px 48px rgba(255,114,94,.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,114,94,.35)';
        }}
        title="Start a Project"
      >
        ✉
      </a>
    </div>
  );
};

export default Home;