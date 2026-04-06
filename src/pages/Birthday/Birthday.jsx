import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import Pic1 from '../../assets/pic-1.jpeg';
import Pic7 from '../../assets/pic-7.jpg';
import Pic9 from '../../assets/pic-9.jpg';
import Pic10 from '../../assets/pic-10.jpg';
import Pic11 from '../../assets/pic-11.jpg';
import Pic12 from '../../assets/pic-12.jpg';
import Pic13 from '../../assets/pic-13.jpg';
import Pic14 from '../../assets/pic-14.jpg';
import Pic15 from '../../assets/pic-15.jpg';
import Pic16 from '../../assets/pic-41.jpg';
import Pic17 from '../../assets/pic-17.jpeg';
import Pic18 from '../../assets/pic-18.jpg';
import Pic19 from '../../assets/pic-19.jpg';
import Pic20 from '../../assets/pic-20.jpg';
import Pic21 from '../../assets/pic-21.jpg';
import Pic22 from '../../assets/pic-22.jpg';
import Pic23 from '../../assets/pic-23.jpg';
import Pic24 from '../../assets/pic-24.jpg';
import Pic25 from '../../assets/pic-25.jpg';
import Pic26 from '../../assets/pic-26.png';
import Pic27 from '../../assets/pic-27.png';
import Pic28 from '../../assets/pic-28.png';
import Pic29 from '../../assets/pic-29.jpg';
import Pic30 from '../../assets/pic-30.jpg';
import Pic31 from '../../assets/pic-31.jpg';
import Pic32 from '../../assets/pic-32.jpg';
import Pic33 from '../../assets/pic-40.png';
import Pic34 from '../../assets/pic-34.jpg';
import Pic35 from '../../assets/pic-35.jpg';
import Pic36 from '../../assets/pic-50.jpg';
import Pic37 from '../../assets/pic-37.jpg';
import Pic38 from '../../assets/pic-38.jpg';
import Pic39 from '../../assets/pic-39.jpg';
import Pic40 from '../../assets/pic-40.jpg';
import Pic41 from '../../assets/pic-41.jpg';
import Pic42 from '../../assets/pic-42.jpg';
import Pic43 from '../../assets/pic-43.jpg';
import Pic44 from '../../assets/pic-44.jpg';
import Pic45 from '../../assets/pic-45.jpg';
import Pic46 from '../../assets/pic-47.jpg';
import Pic50 from '../../assets/pic-60.jpg';
import Pic70 from '../../assets/pic-70.jpg';

/* ─── Reveal on scroll ─── */
function Reveal({ children, delay = 0, y = 40, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Horizontal Marquee ─── */
function Marquee({ images, speed = 35, reverse = false }) {
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee-slide ${speed}s linear infinite ${reverse ? 'reverse' : ''}`,
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 h-52 md:h-72 w-40 md:w-56 rounded-2xl overflow-hidden border-2 border-gold/30 shadow-xl"
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile swipe carousel ─── */
function SwipeCarousel({ images, intervalMs = 4000 }) {
  const [[cur, dir], setPage] = useState([0, 1]);
  const timer = useRef(null);
  const dragX = useRef(0);
  const n = images.length;

  const go = useCallback((idx, d) => setPage([((idx % n) + n) % n, d]), [n]);

  const resetTimer = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(
      () => setPage(([c]) => [(c + 1) % n, 1]),
      intervalMs,
    );
  }, [n, intervalMs]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timer.current);
  }, [resetTimer]);

  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0 }),
  };

  return (
    <div className="md:hidden w-full select-none">
      <div
        className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl border-2 border-gold/40 shadow-2xl"
        onTouchStart={(e) => (dragX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const d = dragX.current - e.changedTouches[0].clientX;
          if (Math.abs(d) > 40) {
            d > 0 ? go(cur + 1, 1) : go(cur - 1, -1);
            resetTimer();
          }
        }}
        style={{ touchAction: 'pan-y' }}
      >
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={cur}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <img
              src={images[cur]}
              alt=""
              draggable={false}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              go(i, i > cur ? 1 : -1);
              resetTimer();
            }}
            style={{
              width: i === cur ? 24 : 8,
              height: 8,
              borderRadius: 999,
              background: i === cur ? '#c9a84c' : '#c9a84c44',
              transition: 'all 0.3s ease',
              border: 'none',
              padding: 0,
              outline: 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Polaroid card ─── */
function Polaroid({ src, rotate = 0, label = '' }) {
  return (
    <div
      className="bg-[#1a1a1a] p-3 pb-8 shadow-2xl border border-white/5"
      style={{ transform: `rotate(${rotate}deg)`, transformOrigin: 'center' }}
    >
      <div className="w-full aspect-square overflow-hidden">
        <img src={src} alt="" className="w-full h-full object-cover" />
      </div>
      {label && (
        <p className="text-center text-[#c9a84c] text-xs mt-3 font-light tracking-widest uppercase">
          {label}
        </p>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────
   MAIN PAGE
──────────────────────────────────────────── */
export default function BirthdayForMonica() {
  const [opened, setOpened] = useState(false);
  const [envelopeDone, setEnvelopeDone] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  /* ── Envelope opener ── */
  if (!opened) {
    return (
      <div className="fixed inset-0 bg-[#07070a] flex flex-col items-center justify-center z-50 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, #c9a84c33 0%, transparent 70%)',
          }}
        />

        {/* Stars */}
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.1,
              animation: `star-twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}

        <AnimatePresence>
          {!envelopeDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, y: -60 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-8 text-center px-6"
              onAnimationComplete={() => {
                if (envelopeDone) setOpened(true);
              }}
            >
              <p className="text-[#c9a84c]/60 tracking-[0.4em] text-xs uppercase">
                A message just for you
              </p>
              <h1
                className="text-5xl sm:text-7xl md:text-8xl font-bold text-white"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  letterSpacing: '-0.02em',
                }}
              >
                Monica
              </h1>
              <p className="text-[#c9a84c] text-xl sm:text-2xl font-light tracking-widest">
                Nalwoga ✦ Mukisa to Be
              </p>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#c9a84c] to-transparent" />
              <p className="text-white/50 text-sm tracking-[0.3em] uppercase">
                Tap to open your gift
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEnvelopeDone(true);
                  setTimeout(() => setOpened(true), 800);
                }}
                className="relative z-10 mt-4 px-12 py-5 border border-[#c9a84c]/60 text-[#c9a84c] tracking-[0.3em] text-sm uppercase
                           hover:bg-[#c9a84c] hover:text-[#07070a] transition-all duration-500 font-medium"
              >
                Open ♡
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          @keyframes star-twinkle {
            0%, 100% { opacity: 0.1; } 50% { opacity: 0.8; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="bg-[#07070a] text-white overflow-x-hidden"
    >
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#c9a84c] to-[#e8a87c] z-50 origin-left"
        style={{ width: progressWidth }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Cinzel+Decorative:wght@400;700&display=swap');

        * { -webkit-font-smoothing: antialiased; }
        body { background: #07070a; }

        .font-display { font-family: 'DM Serif Display', serif; }
        .font-body { font-family: 'EB Garamond', serif; }
        .font-cinzel { font-family: 'Cinzel Decorative', serif; }

        @keyframes marquee-slide {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
          50%       { transform: translateY(-12px) rotate(var(--r, 0deg)); }
        }
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 0 0 #c9a84c44; }
          50%       { box-shadow: 0 0 40px 10px #c9a84c22; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.15); }
          30% { transform: scale(1); }
          45% { transform: scale(1.08); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(110px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
        }

        .text-gold { color: #c9a84c; }
        .border-gold { border-color: #c9a84c; }
        .bg-gold { background-color: #c9a84c; }
        .text-cream { color: #f5f0e8; }

        .shimmer-text {
          background: linear-gradient(90deg, #c9a84c 0%, #f5d78e 30%, #e8a87c 50%, #f5d78e 70%, #c9a84c 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .noise-overlay::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 999;
          opacity: 0.4;
        }

        .divider {
          width: 1px;
          background: linear-gradient(to bottom, transparent, #c9a84c66, transparent);
        }
      `}</style>

      <div className="noise-overlay" />

      {/* ═══════════════════════════════════════════
          SECTION 1   CINEMATIC HERO
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <img
            src={Pic13}
            alt=""
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07070a] via-[#07070a]/60 to-[#07070a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07070a]/80 via-transparent to-[#07070a]/80" />
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#c9a84c]/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.8em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="text-gold text-xs sm:text-sm uppercase tracking-[0.4em] mb-8 font-body"
          >
            April 2025 A Celebration for
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[13vw] sm:text-[11vw] md:text-[9vw] leading-[0.9] mb-4"
          >
            <span className="shimmer-text">Happy</span>
            <br />
            <span className="text-white">Birthday</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="w-full h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent my-8"
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl text-cream italic mb-3"
          >
            Monica Nalwoga
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="text-gold/70 tracking-[0.3em] text-sm font-body"
          >
            Mukisa to be ✦
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <div className="w-px h-12 bg-gradient-to-b from-[#c9a84c] to-transparent" />
            <p className="text-white/30 text-xs tracking-widest uppercase">
              Scroll
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2   SWEET 17 TYPOGRAPHIC
      ═══════════════════════════════════════════ */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="font-cinzel font-bold text-white/[0.03] select-none leading-none"
            style={{ fontSize: 'clamp(200px, 40vw, 600px)' }}
          >
            17
          </span>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <Reveal delay={0.1}>
              <div className="space-y-6">
                <p className="text-gold tracking-[0.4em] text-xs uppercase font-body">
                  Sweet Seventeen
                </p>
                <h2 className="font-display text-6xl sm:text-7xl md:text-8xl text-cream leading-none">
                  17
                  <br />
                  <span className="text-gold italic">Reasons</span>
                  <br />
                  <span className="text-white/60 text-4xl sm:text-5xl">
                    I'm yours
                  </span>
                </h2>
                <div className="w-12 h-px bg-gold/50" />
                <p className="font-body text-lg sm:text-xl text-white/60 leading-relaxed italic">
                  "Eleven months ago, a simple DM changed everything. What
                  started on Instagram became the greatest story of my life."
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3} y={60}>
              <div className="grid grid-cols-2 gap-4">
                {[Pic7, Pic10, Pic14, Pic12].map((src, i) => (
                  <div
                    key={i}
                    className={`overflow-hidden border border-white/5 ${i === 1 ? 'mt-8' : i === 3 ? 'mt-8' : ''}`}
                    style={{ aspectRatio: i % 2 === 0 ? '3/4' : '4/3' }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3   MARQUEE STRIP 1
      ═══════════════════════════════════════════ */}
      <div className="py-8 border-y border-white/5 space-y-4">
        <Marquee
          images={[Pic11, Pic14, Pic15, Pic16, Pic17, Pic18, Pic19, Pic20]}
          speed={40}
        />
        <Marquee
          images={[Pic21, Pic22, Pic23, Pic24, Pic25, Pic26, Pic27, Pic28]}
          speed={50}
          reverse
        />
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 4   THE SPARK YOU BROUGHT BACK
      ═══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-40 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Big editorial pull-quote */}
          <Reveal delay={0.1} y={30}>
            <div className="border-l-2 border-gold/60 pl-6 md:pl-10 mb-20 md:mb-32">
              <p className="font-display text-3xl sm:text-5xl md:text-6xl text-cream leading-tight">
                "You brought my spark back.
                <br />
                <em className="text-gold">You gave me a reason</em>
                <br />
                to smile again."
              </p>
              <p className="text-white/30 text-sm tracking-widest mt-6 font-body uppercase">
                Joshua
              </p>
            </div>
          </Reveal>

          {/* Three-column story */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-start">
            {/* Image left */}
            <Reveal delay={0} y={50}>
              <div className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden border border-white/5">
                  <img
                    src={Pic33}
                    alt=""
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p className="text-gold/50 text-xs tracking-widest uppercase text-center font-body">
                  Before & After You
                </p>
              </div>
            </Reveal>

            {/* Text center */}
            <Reveal delay={0.2} y={50} className="md:pt-20">
              <div className="space-y-8">
                <div>
                  <p className="text-gold tracking-[0.3em] text-xs uppercase mb-3 font-body">
                    What You Did For Me
                  </p>
                  <h3 className="font-display text-4xl sm:text-5xl text-cream mb-6 leading-tight">
                    You Restored My Faith in People
                  </h3>
                  <p className="font-body text-white/60 text-lg leading-relaxed">
                    I had seen so much darkness in people enough to make me
                    believe that goodness was rare and unreachable. Then you
                    walked in and showed me, effortlessly, that someone could
                    simply be good. Simply be kind. Simply be safe.
                  </p>
                </div>
                <div className="w-full h-px bg-white/5" />
                <p className="font-body text-white/60 text-lg leading-relaxed italic">
                  You were the first safe space I had known in a long time and I
                  want you to know how rare and precious that is.
                </p>
              </div>
            </Reveal>

            {/* Image right */}
            <Reveal delay={0.4} y={50}>
              <div className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden border border-white/5">
                  <img
                    src={Pic34}
                    alt=""
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden border border-white/5 mt-4">
                  <img
                    src={Pic35}
                    alt=""
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5   FULL BLEED DARK QUOTE
      ═══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-48 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={Pic1}
            alt=""
            className="w-full h-full object-cover object-top opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07070a] via-[#07070a]/80 to-[#07070a]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c9a84c]/5 blur-[150px] pointer-events-none" />

        <Reveal
          delay={0.2}
          y={20}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <span className="font-cinzel text-gold/30 text-8xl md:text-[12rem] leading-none select-none">
            "
          </span>
          <p className="font-display text-3xl sm:text-5xl md:text-6xl text-cream leading-tight -mt-8 md:-mt-16">
            You are my favorite addiction,
            <br />
            <span className="text-gold italic">and I am proud</span>
            <br />
            to be addicted to you.
          </p>
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gold/30" />
            <span className="text-gold/60 text-sm tracking-widest uppercase font-body">
              My person
            </span>
            <div className="w-16 h-px bg-gold/30" />
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6   WHAT YOU MEAN TO ME (ROLES)
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal delay={0.1}>
            <p className="text-gold tracking-[0.4em] text-xs uppercase text-center mb-16 font-body">
              The many ways you love me
            </p>
          </Reveal>

          {/* Stacked horizontal roles */}
          <div className="space-y-6 md:space-y-0 md:divide-y md:divide-white/5">
            {[
              {
                role: 'My Girlfriend',
                desc: "Who chose me when she didn't have to, and stayed when it would have been easier to leave.",
                img: Pic29,
              },
              {
                role: 'My Best Friend',
                desc: 'Who knows the real Joshua   not the one who has it together on paper, but the one still figuring it out.',
                img: Pic30,
              },
              {
                role: 'My Safe Space',
                desc: 'The first person who made me feel like the broken parts of me were still worth loving.',
                img: Pic31,
              },
              {
                role: 'My Sunshine',
                desc: 'You lit up rooms I had closed off. You brought back colour into a life that had gone grey.',
                img: Pic32,
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 py-8 group cursor-default">
                  <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-full border border-gold/20 group-hover:border-gold/60 transition-all duration-500">
                    <img
                      src={item.img}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-px h-8 divider hidden md:block mx-8" />
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl text-cream group-hover:text-gold transition-colors duration-500 min-w-[200px]">
                    {item.role}
                  </h3>
                  <div className="flex-shrink-0">
                    <div className="w-px h-8 divider hidden md:block mx-8" />
                  </div>
                  <p className="font-body text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors duration-500 max-w-xl">
                    {item.desc}
                  </p>
                  <div className="ml-auto hidden md:block text-white/10 group-hover:text-gold/40 transition-colors duration-500 text-2xl">
                    ✦
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7   SCATTERED GALLERY (POLAROID)
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 bg-[#0d0d10] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-cream text-center mb-4">
              Our <span className="text-gold italic">Moments</span>
            </h2>
            <p className="text-center text-white/30 tracking-widest text-sm font-body mb-16">
              Eleven months of magic
            </p>
          </Reveal>

          {/* Mobile carousel */}
          <SwipeCarousel
            images={[
              Pic36,
              Pic37,
              Pic38,
              Pic39,
              Pic40,
              Pic41,
              Pic42,
              Pic43,
              Pic44,
            ]}
            intervalMs={3800}
          />

          {/* Desktop polaroid scatter */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-6 items-end">
              <Reveal delay={0.1} y={30}>
                <div
                  style={{
                    '--r': '-4deg',
                    animation: 'float-gentle 6s ease-in-out infinite',
                  }}
                >
                  <Polaroid src={Pic36} rotate={-4} label="us ♡" />
                </div>
              </Reveal>
              <Reveal delay={0.2} y={50}>
                <div
                  style={{
                    animation: 'float-gentle 7s ease-in-out infinite',
                    animationDelay: '1s',
                  }}
                >
                  <Polaroid src={Pic37} rotate={2} label="my mami" />
                </div>
              </Reveal>
              <Reveal delay={0.15} y={40}>
                <div
                  style={{
                    animation: 'float-gentle 5s ease-in-out infinite',
                    animationDelay: '2s',
                  }}
                >
                  <Polaroid src={Pic38} rotate={-2} label="always" />
                </div>
              </Reveal>
              <Reveal delay={0.3} y={30}>
                <div
                  style={{
                    animation: 'float-gentle 8s ease-in-out infinite',
                    animationDelay: '0.5s',
                  }}
                >
                  <Polaroid src={Pic39} rotate={3} label="beautiful" />
                </div>
              </Reveal>
            </div>
            <div className="grid grid-cols-5 gap-4 mt-6 items-start">
              {[Pic40, Pic41, Pic42, Pic43, Pic44].map((src, i) => (
                <Reveal key={i} delay={i * 0.08} y={20}>
                  <div
                    style={{
                      animation: `float-gentle ${5 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.7}s`,
                    }}
                  >
                    <Polaroid src={src} rotate={[-3, 2, -5, 4, -1][i]} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8   YOU ARE STUNNING
      ═══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-40 overflow-hidden">
        {/* Vertical text */}
        <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 -rotate-90 text-white/5 font-cinzel text-sm tracking-[0.6em] uppercase select-none whitespace-nowrap">
          Monica Nalwoga ✦ Mukisa to Be ✦ Sweet Seventeen
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Text left */}
            <div className="md:col-span-5 space-y-8">
              <Reveal delay={0.1}>
                <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-cream leading-tight">
                  You Are
                  <br />
                  <span className="shimmer-text">SOOO HOOTTTT</span>
                </h2>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="space-y-4">
                  <p className="font-body text-white/60 text-lg leading-relaxed">
                    I noticed you the moment you walked in. Your beauty was
                    impossible to ignore not just how you look, but the way you
                    carry yourself. The quiet confidence. The warmth you give
                    off without even trying.
                  </p>
                  <p className="font-body text-white/60 text-lg leading-relaxed">
                    Every single day, I thank God that I found you before I left
                    Uganda. That my heart found its forever home before distance
                    ever tried to test it.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-gold/40" />
                  <p className="text-gold font-body italic text-lg">
                    "You made me believe I could be a 9, even a 10."
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Big center image */}
            <div className="md:col-span-4 md:col-start-7">
              <Reveal delay={0.2} y={60}>
                <div className="relative">
                  <div className="aspect-[3/4] overflow-hidden border border-white/5 shadow-2xl">
                    <img
                      src={Pic70}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07070a]/60 via-transparent to-transparent" />
                  </div>
                  {/* Floating small photos */}
                  <div
                    className="absolute -right-6 -top-6 w-28 h-28 overflow-hidden border-2 border-[#07070a] shadow-2xl hidden md:block"
                    style={{
                      animation: 'float-gentle 5s ease-in-out infinite',
                    }}
                  >
                    <img
                      src={Pic50}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="absolute -left-6 -bottom-6 w-24 h-24 overflow-hidden border-2 border-[#07070a] shadow-2xl hidden md:block"
                    style={{
                      animation: 'float-gentle 7s ease-in-out infinite',
                      animationDelay: '1.5s',
                    }}
                  >
                    <img
                      src={Pic33}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Extra portrait row */}
          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[Pic22, Pic23, Pic24, Pic25].map((src, i) => (
              <Reveal key={i} delay={i * 0.1} y={30}>
                <div className="aspect-square overflow-hidden border border-white/5">
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 9   MARQUEE STRIP 2
      ═══════════════════════════════════════════ */}
      <div className="py-6 border-y border-white/5">
        <Marquee
          images={[Pic26, Pic27, Pic28, Pic45, Pic46, Pic16, Pic18, Pic19]}
          speed={45}
        />
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 10   LOVE LETTER SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-40 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal delay={0.1}>
            <div className="text-center mb-16">
              <p className="text-gold tracking-[0.4em] text-xs uppercase font-body mb-4">
                A note from your boyfriend
              </p>
              <div className="w-px h-16 bg-gradient-to-b from-gold/60 to-transparent mx-auto" />
            </div>
          </Reveal>

          {/* Letter style */}
          <Reveal delay={0.2} y={30}>
            <div className="border border-white/5 bg-[#0d0d10] p-8 md:p-14 relative">
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-gold/30" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/30" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gold/30" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-gold/30" />

              <p className="font-display text-cream text-lg italic mb-8">
                My dearest Monica,
              </p>

              <div className="space-y-6 font-body text-white/65 text-lg leading-relaxed">
                <p>
                  I cannot imagine what I stumbled on when we first started
                  talking. You have been, without exaggeration, the single
                  greatest thing to happen to me. And I mean that from the
                  deepest part of me.
                </p>
                <p>
                  I have spent most of my life being strong for everyone else,
                  grinding while I was breaking inside, smiling while I was
                  aching for all of it to stop. But with you, I never had to
                  perform. You saw the boy beneath all of it the one who just
                  wanted stability, unconditional love, someone to confide in
                  and you loved him anyway.
                </p>
                <p>
                  When Miss Comfort said you brought my spark back, she was
                  right.
                  <span className="text-cream">
                    You made me believe in goodness again. In people again. In
                    myself again.
                  </span>
                  I remember telling you I thought I was a 6 at best you helped
                  me see that maybe I was an 8, maybe even a 9. One day if
                  possible, a 10.
                </p>
                <p>
                  Our relationship has been through soo much fire. Extremely hot
                  fire. I don't know whether you can define the world extremely.
                  But I have never once stopped believing that what we have is
                  worth every battle. Because the peace and okayness you
                  deserve?
                  <span className="text-gold italic">
                    It is coming. For both of us.
                  </span>
                </p>
                <p>
                  So on this day, your 17th birthday, I want you to feel every
                  ounce of the love I carry for you the kind that doesn't have
                  conditions, the kind that sees you fully and chooses you
                  completely.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <p className="font-display text-cream text-2xl italic">
                  Forever yours
                </p>
                <p className="font-cinzel text-gold text-xl mt-2">
                  Joshua Mukisa
                </p>
                <p className="text-white/30 text-sm font-body mt-1">
                  Your boyfriend. Your husband. The love of your life. Your
                  Dada. Your DADDY. Your Pépé. Your Best Friend. Your Father.
                  Your Son. Your Life's Co-Founder, Your forever person. The
                  sugar in your tea, and juice to your biscuit.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 11   PÉPÉ & MÉMÉ
      ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-40 px-6 bg-[#0d0d10] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal delay={0.1}>
            <h2 className="font-display text-6xl sm:text-8xl md:text-[10rem] text-center leading-none mb-4">
              <span className="text-white">Pépé</span>{' '}
              <span className="text-gold italic">&</span>{' '}
              <span className="text-white">Mémé</span>
            </h2>
            <p className="text-center text-white/30 font-body text-lg italic mb-16">
              I cannot wait to spend the rest of my life with you, boo boo.
            </p>
          </Reveal>

          {/* Mobile carousel */}
          <SwipeCarousel images={[Pic45, Pic46]} intervalMs={5000} />

          {/* Desktop layout */}
          <div className="hidden md:grid grid-cols-2 gap-8">
            {[Pic45, Pic46].map((src, i) => (
              <Reveal key={i} delay={i * 0.2} y={40}>
                <div
                  className="relative aspect-[3/4] overflow-hidden border border-white/5 group"
                  style={{
                    animation: `pulse-gold ${3 + i}s ease-in-out infinite`,
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070a]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-gold font-display text-2xl italic">
                      {i === 0 ? 'Pépé' : 'Mémé'}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-16 md:mt-24 text-center space-y-4">
              <p className="font-display text-3xl sm:text-5xl text-cream">
                Us. Always. <span className="text-gold italic">Forever.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 12   THE FINAL WISH (BIRTHDAY CLOSE)
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden">
        {/* Background collage */}
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 opacity-10">
          {[
            Pic11,
            Pic12,
            Pic13,
            Pic14,
            Pic15,
            Pic1,
            Pic7,
            Pic9,
            Pic16,
            Pic17,
            Pic18,
            Pic19,
          ].map((src, i) => (
            <div key={i} className="overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070a] via-[#07070a]/90 to-[#07070a]" />

        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c9a84c]/8 blur-[150px] pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <Reveal delay={0.1}>
            <p className="text-gold tracking-[0.5em] text-xs uppercase font-body mb-8">
              April 2025
            </p>
          </Reveal>

          <Reveal delay={0.2} y={30}>
            <h2 className="font-display text-[15vw] sm:text-[12vw] md:text-[10vw] leading-none text-cream mb-6">
              Sweet
              <br />
              <span className="shimmer-text">Seventeen</span>
            </h2>
          </Reveal>

          <Reveal delay={0.4} y={20}>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mb-8" />
            <p className="font-body text-white/60 text-xl sm:text-2xl leading-relaxed mb-12">
              I wish you, in Jesus' name, that you live to blow out many, many
              more. That every year brings you more joy than the last. That you
              are protected, celebrated, and deeply loved. And I pray I truly
              pray that I get to be the one standing right beside you for every
              single one.
            </p>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="flex flex-col items-center gap-6 mb-16">
              {/* Animated heart */}
              <div
                className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
                style={{ animation: 'heartbeat 2s ease-in-out infinite' }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="#c9a84c"
                  className="w-full h-full"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>

              <p className="font-display text-4xl sm:text-5xl md:text-6xl text-cream">
                I Love You.
              </p>
              <p className="font-body text-white/50 text-lg">
                More than words. More than distance. More than anything.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.7}>
            <div className="border border-white/5 bg-[#0d0d10]/80 backdrop-blur-sm px-8 py-8 inline-block">
              <p className="font-cinzel text-gold text-xl md:text-2xl mb-2">
                Joshua Mukisa
              </p>
              <div className="w-full h-px bg-gold/20 my-3" />
              <p className="font-body text-white/40 text-sm tracking-widest">
                Your boyfriend ✦ Your husband ✦ The love of your life
                <br />
                Your Daddy ✦ Your Dada ✦ Pépé
              </p>
            </div>
          </Reveal>

          {/* Bottom star strip */}
          <Reveal delay={0.85}>
            <div className="mt-16 flex items-center justify-center gap-3 text-gold/30 text-xs tracking-widest">
              <span>✦</span>
              <span className="font-body uppercase">Monica Nalwoga Mukisa</span>
              <span>✦</span>
              <span className="font-body uppercase">Sweet 17</span>
              <span>✦</span>
              <span className="font-body uppercase">April 2025</span>
              <span>✦</span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
