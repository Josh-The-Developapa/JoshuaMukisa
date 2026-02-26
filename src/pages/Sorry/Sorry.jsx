import { useState, useEffect, useRef } from 'react';

const SECTIONS = [
  'hero',
  'what-it-did',
  'how-i-changed',
  'her-change',
  'where-wrong',
  'choosing-now',
  'protect',
  'close-past',
  'final-vow',
];

// ── Hooks ────────────────────────────────────────────────
function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Kintsugi SVG ─────────────────────────────────────────
function KintsugiVessel({ animate }) {
  return (
    <div style={{ width: 240, height: 240, margin: '0 auto 3.5rem' }}>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <ellipse
          cx="100"
          cy="110"
          rx="70"
          ry="78"
          fill="#1e1b18"
          stroke="#2a2520"
          strokeWidth="0.5"
        />
        {[
          { d: 'M100 32 L88 75 L95 110 L78 145 L85 188', delay: 0.5 },
          { d: 'M88 75 L62 90 L55 115', delay: 0.9 },
          { d: 'M95 110 L118 125 L130 155', delay: 1.3 },
          { d: 'M78 145 L105 148 L130 155', delay: 1.7 },
        ].map((p, i) => (
          <path
            key={i}
            d={p.d}
            stroke="#c9943a"
            strokeWidth="1.5"
            fill="none"
            style={{
              filter: 'drop-shadow(0 0 5px #c9943a88)',
              strokeDasharray: 600,
              strokeDashoffset: animate ? 0 : 600,
              transition: animate
                ? `stroke-dashoffset 2.5s ease ${p.delay}s`
                : 'none',
            }}
          />
        ))}
        {[
          { cx: 88, cy: 75, delay: '1s' },
          { cx: 95, cy: 110, delay: '1.5s' },
          { cx: 78, cy: 145, delay: '2s' },
          { cx: 130, cy: 155, delay: '2.5s' },
        ].map((g, i) => (
          <circle
            key={i}
            cx={g.cx}
            cy={g.cy}
            r="3"
            fill="#e5b86a"
            style={{
              animation: 'pulseGlow 2s ease-in-out infinite',
              animationDelay: g.delay,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// ── Affirmation Button ────────────────────────────────────
function AffirmBtn({ children }) {
  const [active, setActive] = useState(false);
  return (
    <button
      onClick={() => setActive(!active)}
      style={{
        background: active ? '#15100a' : 'transparent',
        border: `1px solid ${active ? '#c9943a' : '#2c2820'}`,
        color: active ? '#f5e4b8' : '#7a7068',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '1.05rem',
        fontStyle: 'italic',
        padding: '1.2rem 1.8rem',
        textAlign: 'left',
        cursor: 'pointer',
        width: '100%',
        lineHeight: 1.6,
        transition: 'all 0.3s',
        marginBottom: '0.8rem',
      }}
    >
      {active && (
        <span
          style={{ color: '#c9943a', fontStyle: 'normal', fontSize: '0.8em' }}
        >
          ✦{' '}
        </span>
      )}
      {children}
    </button>
  );
}

// ── Pull Quote ────────────────────────────────────────────
function PullQuote({ children }) {
  return (
    <blockquote
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(1.2rem, 2.8vw, 1.8rem)',
        fontStyle: 'italic',
        fontWeight: 300,
        color: '#f5e4b8',
        borderLeft: '2px solid #c9943a',
        padding: '1.2rem 0 1.2rem 2rem',
        margin: '3rem 0',
        lineHeight: 1.65,
      }}
    >
      {children}
    </blockquote>
  );
}

// ── Section Wrapper ───────────────────────────────────────
function Section({ id, num, title, children, bg }) {
  return (
    <section
      id={id}
      style={{ background: bg || 'transparent', padding: '5rem 0' }}
    >
      <FadeIn>
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 2rem' }}>
          {num && (
            <span
              style={{
                fontFamily: "'Karla', sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#c9943a',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              {num}
            </span>
          )}
          {title && (
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#f0ebe3',
                marginBottom: '2.5rem',
              }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
          {children}
        </div>
      </FadeIn>
    </section>
  );
}

function Body({ children, style = {} }) {
  return (
    <p
      style={{
        fontSize: '1.05rem',
        lineHeight: 1.95,
        color: '#c4bdb4',
        marginBottom: '1.6rem',
        fontWeight: 300,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: 60,
        height: 1,
        background:
          'linear-gradient(to right, transparent, #c9943a, transparent)',
        margin: '4rem auto',
      }}
    />
  );
}

// ── Main App ──────────────────────────────────────────────
export default function RebuiltInGold() {
  const [gateOpen, setGateOpen] = useState(false);
  const [gateGone, setGateGone] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [crackAnimate, setCrackAnimate] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pastClosed, setPastClosed] = useState(false);

  function openGate() {
    setGateOpen(true);
    setTimeout(() => {
      setGateGone(true);
      setHeroVisible(true);
      setCrackAnimate(true);
    }, 1300);
  }

  useEffect(() => {
    function onScroll() {
      const top = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((top / total) * 100);

      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) setActiveSection(i);
        }
      });
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const styles = {
    app: {
      background: '#0a0806',
      color: '#f0ebe3',
      fontFamily: "'Karla', sans-serif",
      fontWeight: 300,
      overflowX: 'hidden',
      minHeight: '100vh',
    },
    progress: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: 2,
      width: `${scrollProgress}%`,
      background: 'linear-gradient(to right, #8b4a2a, #c9943a)',
      zIndex: 900,
      transition: 'width 0.1s',
    },
    gate: {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: '#0a0806',
      display: gateGone ? 'none' : 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: gateOpen ? 0 : 1,
      transform: gateOpen ? 'scale(1.04)' : 'scale(1)',
      transition: 'opacity 1.2s ease, transform 1.2s ease',
      pointerEvents: gateOpen ? 'none' : 'auto',
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Karla:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes growLine {
          to { height: 80px; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0; r: 3; }
          50% { opacity: 0.7; r: 5; }
        }
        .gate-line {
          width: 1px;
          height: 0;
          background: #c9943a;
          margin: 0 auto 3rem;
          animation: growLine 1.5s ease 0.3s forwards;
        }
        .gate-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.1rem, 2.5vw, 1.6rem);
          font-style: italic;
          color: #4a4540;
          letter-spacing: 0.06em;
          text-align: center;
          max-width: 480px;
          padding: 0 2rem;
          line-height: 1.8;
          margin-bottom: 3rem;
          opacity: 0;
          animation: fadeUp 1.2s ease 0.5s forwards;
        }
        .gate-btn {
          font-family: 'Karla', sans-serif;
          font-weight: 400;
          font-size: 0.8rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #0a0806;
          background: #c9943a;
          border: none;
          padding: 0.85rem 2.5rem;
          cursor: pointer;
          opacity: 0;
          animation: fadeUp 1s ease 1.5s forwards;
          transition: background 0.3s, transform 0.2s;
        }
        .gate-btn:hover { background: #e5b86a; transform: translateY(-2px); }
        .close-btn {
          font-family: 'Karla', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          background: transparent;
          border: 1px solid #c9943a;
          color: #c9943a;
          padding: 1rem 3rem;
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
        }
        .close-btn:hover { background: #c9943a; color: #0a0806; }
      `}</style>

      {/* Progress */}
      <div style={styles.progress} />

      {/* Nav Dots */}
      <nav
        style={{
          position: 'fixed',
          right: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          zIndex: 800,
        }}
      >
        {SECTIONS.map((id, i) => (
          <div
            key={id}
            onClick={() =>
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: i === activeSection ? '#c9943a' : '#2c2820',
              cursor: 'pointer',
              transform: i === activeSection ? 'scale(1.6)' : 'scale(1)',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </nav>

      {/* Gate */}
      <div style={styles.gate}>
        <div className="gate-line" />
        <p className="gate-text">
          There are things that broke us.
          <br />
          This is about choosing to rebuild — not pretending they didn't.
        </p>
        <button className="gate-btn" onClick={openGate}>
          Enter
        </button>
      </div>

      <div style={styles.app}>
        {/* HERO */}
        <section
          id="hero"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'radial-gradient(ellipse at 30% 60%, #1a1208 0%, #0a0806 65%)',
            padding: '6rem 2rem',
            textAlign: 'center',
          }}
        >
          <KintsugiVessel animate={crackAnimate} />
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              color: '#f0ebe3',
              lineHeight: 1.2,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s',
            }}
          >
            Rebuilt
            <br />
            in <em style={{ color: '#c9943a' }}>Gold</em>
          </h1>
          <p
            style={{
              fontFamily: "'Karla', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#4a4540',
              marginTop: '1.5rem',
              opacity: heroVisible ? 1 : 0,
              transition: 'opacity 1s ease 1s',
            }}
          >
            A reckoning. A reconciliation. A choice.
          </p>
        </section>

        {/* WHAT IT DID */}
        <Section
          id="what-it-did"
          num="01 — What It Did To Me"
          title="The damage<br/>was <em style='color:#c9943a'>real</em>."
        >
          <Body>
            Betrayal is not just heartbreak. It is a rewriting of reality. The
            person I trusted most became someone I didn't recognize, and in
            turn, I started not recognizing myself — because I had let you in
            completely, and that felt like the worst mistake I'd ever made.
          </Body>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginTop: '3rem',
            }}
          >
            {[
              {
                label: 'Humiliation',
                text: "It wasn't private pain. It was public. People saw. People laughed. People asked questions I couldn't answer. My dignity felt like it had been handed to someone else to play with.",
              },
              {
                label: 'Mental Health',
                text: "I stopped sleeping right. I replayed things. I analyzed every word you'd ever said to me for signs I'd missed. The betrayal affected me more deeply than I let on — to you, to anyone.",
              },
              {
                label: 'Self-worth',
                text: "That comparison. His skin, mine. I know you probably wish you never said it. But it entered me and asked a question I'm still learning not to believe: Was I not enough?",
              },
              {
                label: 'Distance',
                text: 'I moved to the U.S. Not only because of this, but the distance added a layer of isolation to the wound. There were nights when the time difference felt like a metaphor for everything.',
              },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  padding: '1.8rem',
                  background: '#100d0a',
                  border: '1px solid #1e1b18',
                  borderTop: '2px solid #4a4540',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background:
                      'linear-gradient(to right, #8b4a2a, transparent)',
                  }}
                />
                <p
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#4a4540',
                    marginBottom: '0.8rem',
                  }}
                >
                  {c.label}
                </p>
                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.75,
                    color: '#8a8278',
                  }}
                >
                  {c.text}
                </p>
              </div>
            ))}
          </div>
          <PullQuote>
            "I am not listing this to punish you. I am listing it because it is
            the truth of what I carried — and the truth of what I am choosing to
            set down."
          </PullQuote>
        </Section>

        <Divider />

        {/* HOW I CHANGED */}
        <Section
          id="how-i-changed"
          num="02 — How I Changed After"
          title="Hurt made me<br/><em style='color:#c9943a'>harder</em>."
        >
          <Body>
            I want to be honest about who I became after what happened. Not to
            excuse it. Not to make you feel guilty for it. But because you
            deserve to understand that the coldness you've experienced in me —
            the shutting down, the hypervigilance, the walls — these were not
            indifference. They were armor.
          </Body>
          <Body>
            <strong style={{ color: '#f0ebe3' }}>
              I became someone who watched for proof of betrayal in everything
              you did.
            </strong>{' '}
            I read your silences. I analyzed your hesitations. When something
            triggered me — even something as indirect as a false accusation from
            that same person months later — I reacted as though I was back at
            the beginning of the worst of it. My nervous system had been trained
            to prepare for pain.
          </Body>
          <Body>
            I became emotionally inconsistent. I could be warm and then cold
            without warning, and I know that was destabilizing for you. I
            overthought everything. I sometimes chose the protection of distance
            over the courage of presence, and that was not fair — not to you,
            not to us, not to the version of me I want to be.
          </Body>
          <PullQuote>
            "Being hurt does not excuse me from the ways I handled my hurt.
            Trauma is real. But so is the impact of how I used it."
          </PullQuote>
        </Section>

        <Divider />

        {/* HER CHANGE */}
        <Section
          id="her-change"
          num="03 — How You've Changed"
          title="I see who you<br/>are <em style='color:#c9943a'>becoming</em>."
          bg="linear-gradient(to bottom, #12100e, #170f08)"
        >
          <Body>
            You are the only person I talk to. I am the same for you. There is
            nothing about you I don't know, and nothing about me you haven't
            seen. That kind of closeness is rare — and I do not take it for
            granted. I have been paying attention. Even in the moments I was
            cold, I was watching.
          </Body>
          <ul style={{ listStyle: 'none', marginTop: '2.5rem' }}>
            {[
              "You have told me about men who have approached you — and you've turned them down. You didn't have to tell me. You chose to.",
              "When that same person tried to cause trouble again with a false accusation, you didn't hide. You faced it — even when my reaction wasn't calm.",
              'You have stayed. Through my coldness. Through my inconsistency. Through the distance — both physical and emotional. That is not nothing.',
              "You have not asked me to pretend the past didn't happen. You have not demanded forgiveness on a timeline. That tells me something about how you've grown.",
              'The girl who made those choices — who refused to block him, who sought something outside of us — I do not see her in how you act now. That matters.',
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <li
                  style={{
                    display: 'flex',
                    gap: '1.2rem',
                    marginBottom: '1.4rem',
                  }}
                >
                  <span style={{ color: '#c9943a', flexShrink: 0 }}>—</span>
                  <span
                    style={{
                      fontSize: '1rem',
                      color: '#b0a898',
                      lineHeight: 1.75,
                    }}
                  >
                    {item}
                  </span>
                </li>
              </FadeIn>
            ))}
          </ul>
          <PullQuote>
            "You know you have changed. And in my clearest moments, I know it
            too. But my nervous system hasn't caught up. Sometimes my brain lags
            behind what my heart already understands. So I am making a choice —
            to put my faith in you, even while parts of me are still learning
            to."
          </PullQuote>
        </Section>

        <Divider />

        {/* WHERE I WAS WRONG */}
        <Section
          id="where-wrong"
          num="04 — Where I Was Wrong"
          title="I owned my pain<br/>in ways that <em style='color:#c9943a'>cost us</em>."
          bg="linear-gradient(to bottom, #170f08, #1a1208)"
        >
          <Body>
            This is not an apology that erases your responsibility. It is its
            own thing, standing separately. I caused damage too — not through
            cheating, but through how I handled what I could not process.
          </Body>
          <div
            style={{
              background: '#0e0c09',
              border: '1px solid #201d19',
              padding: '2.5rem',
              margin: '2.5rem 0',
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1.5rem',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '6rem',
                color: '#1c1914',
                lineHeight: 1,
              }}
            >
              "
            </span>
            <Body>
              I blocked you without warning during moments of overwhelm — not as
              a decision, but as an escape. I was emotionally inconsistent in
              ways that made you feel unstable, like the ground between us kept
              shifting. I was cold when you needed warmth, and I confused
              punishing you with protecting myself. I sometimes kept score when
              I should have been choosing to let go. I let the most recent
              trigger from the past — his false accusation — become evidence of
              something you hadn't done, and I made you answer for it anyway.
            </Body>
          </div>
          <Body>
            None of that was strength. It was fear wearing the mask of control.
            I know that now.
          </Body>
          <div style={{ marginTop: '3rem' }}>
            <p
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#7a7068',
                marginBottom: '1rem',
              }}
            >
              Click what resonates:
            </p>
            {[
              'I understand that being the one who was hurt does not make all of my reactions okay.',
              'I acknowledge that shutting down was protection, but it also became punishment.',
              'I take responsibility for the emotional inconsistency I brought into this.',
              'I want to be the kind of person who responds, not reacts.',
            ].map((text, i) => (
              <AffirmBtn key={i}>{text}</AffirmBtn>
            ))}
          </div>
        </Section>

        <Divider />

        {/* CHOOSING NOW */}
        <Section
          id="choosing-now"
          num="05 — What I Am Choosing Now"
          title="Not forgiveness<br/>as a <em style='color:#c9943a'>performance</em>."
          bg="linear-gradient(to bottom, #1a1208, #1f1509)"
        >
          <Body>
            I have tried halfway forgiveness. The kind where you say the words
            but keep the wound open as insurance — so that if it happens again,
            you have proof you were right to be afraid. That is not forgiveness.
            That is leverage. And I am done with it.
          </Body>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.4rem, 3.2vw, 2rem)',
              fontWeight: 300,
              color: '#f5e4b8',
              lineHeight: 1.6,
              margin: '2.5rem 0',
            }}
          >
            If you are not that girl anymore — and I believe you are not — then
            I refuse to keep{' '}
            <em style={{ color: '#c9943a' }}>loving you like you still are</em>.
          </p>
          <Body>
            That means releasing the comparison. It means accepting that you
            made choices I deserved better than, without using those choices as
            a quiet explanation for every difficult moment between us. It means
            letting what you did be something that happened — not the permanent
            lens through which I see everything you do.
          </Body>
          <Body>
            This is not easy. I will not pretend it is. Forgiveness is not a
            feeling that arrives. It is a decision that has to be remade, some
            days multiple times, until the habit of protection becomes the habit
            of trust.
          </Body>
          <PullQuote>
            "I am not forgiving you for your sake. I am choosing it because the
            version of me that stays wounded is not the version of me I want to
            be — and it is not the kind of love you deserve from me, or that I
            deserve to give."
          </PullQuote>
          <div style={{ marginTop: '2rem' }}>
            <p
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#7a7068',
                marginBottom: '1rem',
              }}
            >
              Mark what you're choosing:
            </p>
            {[
              'I am choosing to forgive fully — not halfway.',
              'I am choosing to stop using the past as evidence against the present.',
              'I am choosing to see who you are now, not who you were then.',
              'I am choosing to be present instead of hypervigilant.',
            ].map((text, i) => (
              <AffirmBtn key={i}>{text}</AffirmBtn>
            ))}
          </div>
        </Section>

        <Divider />

        {/* PROTECT */}
        <Section
          id="protect"
          num="06 — What We Must Protect"
          title="Us — against<br/><em style='color:#c9943a'>everything</em>."
          bg="linear-gradient(to bottom, #1f1509, #1a1208)"
        >
          <Body>
            The noise is real. Distance is real. His attempts to destabilize
            this — real. The trauma-response versions of us that sometimes show
            up unannounced — real. If we are going to do this, we have to agree
            to protect what we are building against all of it.
          </Body>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 1,
              background: '#1e1b18',
              marginTop: '3rem',
            }}
          >
            {[
              {
                label: 'Against External Noise',
                text: 'What other people say — him, friends, rumors, accusations — does not get to determine what is true between us. We talk to each other before we react.',
              },
              {
                label: 'Against Distance',
                text: 'Miles between us cannot be an excuse for emotional withdrawal. If something hurts, we say it. Silence when there should be words is its own kind of abandonment.',
              },
              {
                label: 'Against Old Wounds',
                text: 'The past can be acknowledged without being weaponized. Neither of us uses what happened as a reason to avoid accountability in the present.',
              },
              {
                label: 'Against Giving Up',
                text: 'When it gets hard — and it will — neither of us gets to disappear. Difficulty is not a sign we were wrong to try. It is a test of whether we mean it.',
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{ background: '#0a0806', padding: '2rem' }}
              >
                <p
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#c9943a',
                    marginBottom: '0.8rem',
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    color: '#9a9288',
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* CLOSE THE PAST */}
        <section
          id="close-past"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
            padding: '5rem 2rem',
            textAlign: 'center',
          }}
        >
          <FadeIn>
            <p
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#7a7068',
                marginBottom: '1.5rem',
              }}
            >
              A Ritual
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 300,
                color: '#f0ebe3',
                lineHeight: 1.3,
                marginBottom: '3rem',
              }}
            >
              Before we enter
              <br />
              the next chapter —<br />
              close the last one.
            </h2>
            <Body
              style={{
                maxWidth: 500,
                margin: '0 auto 3rem',
                textAlign: 'center',
              }}
            >
              Everything above has been said. The pain has been named. The
              wrongs have been owned. Now, intentionally, we close the door on
              who we were — not to pretend it didn't exist, but to stop living
              inside it.
            </Body>
            {!pastClosed ? (
              <button className="close-btn" onClick={() => setPastClosed(true)}>
                Close the Past
              </button>
            ) : (
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.4rem',
                  fontStyle: 'italic',
                  color: '#c9943a',
                  animation: 'fadeUp 1s ease forwards',
                }}
              >
                The door is closed. What's next is yours to choose.
              </p>
            )}
          </FadeIn>
        </section>

        <Divider />

        {/* FINAL VOW */}
        <FinalVow />

        <footer
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: '#0a0806',
          }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: '#2c2820',
              textTransform: 'uppercase',
            }}
          >
            Rebuilt in Gold &nbsp;·&nbsp; Kintsugi &nbsp;·&nbsp; The art of
            repair
          </p>
        </footer>
      </div>
    </>
  );
}

function FinalVow() {
  const ref = useRef(null);
  const visible = useInView(ref, 0.2);
  return (
    <section
      id="final-vow"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 2rem',
        background:
          'radial-gradient(ellipse at 50% 50%, #1c1409 0%, #0a0806 70%)',
      }}
    >
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.3rem, 3.2vw, 2rem)',
          fontWeight: 300,
          lineHeight: 1.85,
          color: '#e8d9c0',
          maxWidth: 700,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1.2s ease, transform 1.2s ease',
        }}
      >
        I was hurt. <em style={{ color: '#c9943a' }}>You were wrong.</em>
        <br />
        <br />
        I reacted in ways that weren't always healthy.
        <br />
        I became guarded when I needed to be open.
        <br />
        I punished you with silence when I should have spoken.
        <br />
        <br />
        But if you are not that girl anymore —<br />
        <em style={{ color: '#c9943a' }}>
          then I refuse to keep loving you like you still are.
        </em>
        <br />
        <br />
        If we move forward, we move forward{' '}
        <em style={{ color: '#c9943a' }}>intentionally</em>.<br />
        Not as victims of the past,
        <br />
        but as two people{' '}
        <em style={{ color: '#c9943a' }}>choosing each other</em> — fully.
      </p>

      <div
        style={{
          width: 100,
          height: 1,
          background: '#c9943a',
          margin: '3rem auto',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease 0.4s',
        }}
      />

      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
          fontStyle: 'italic',
          color: '#4a4540',
          maxWidth: 560,
          lineHeight: 1.85,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.2s ease 0.6s',
        }}
      >
        And this is the one line we do not cross:
        <br />
        <br />
        If either of us ever chooses distance over repair — if we reach for a
        break instead of a conversation, an escape instead of effort — we do not
        call it a pause. We call it what it is. An ending.
        <br />
        <br />
        Because love deserves more than survival. It deserves intention.
      </p>

      <div
        style={{
          width: 100,
          height: 1,
          background: '#c9943a',
          margin: '3rem auto',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease 0.8s',
        }}
      />

      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.1rem',
          fontStyle: 'italic',
          color: '#c9943a',
          letterSpacing: '0.05em',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease 1s',
        }}
      >
        — Written in love. With open eyes. By choice.
      </p>
    </section>
  );
}
