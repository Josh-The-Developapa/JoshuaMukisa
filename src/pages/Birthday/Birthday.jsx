import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useInView,
  useSpring,
} from 'framer-motion';

/* ─────────────────────────────────────────────
   PHOTO SLOTS
   Every slot has its own name so you know exactly
   what to drop in. Swap the imports, nothing else changes.
────────────────────────────────────────────── */
import Pic7 from '../../assets/pic-7.jpg';
import Pic10 from '../../assets/pic-10.jpg';
import Pic14 from '../../assets/pic-14.jpg';
import Pic12 from '../../assets/pic-12.jpg';
import Pic34 from '../../assets/img-2.jpg';
import Pic35 from '../../assets/img-3.jpg';
import Pic70 from '../../assets/pic-11.jpg';
import Pic60 from '../../assets/img-6.jpg';
import Pic1 from '../../assets/img-1.jpg';
import Pic15 from '../../assets/pic-13.jpg';
import Pic22 from '../../assets/pic-39.jpg';
import Pic23 from '../../assets/img-4.jpg';
import Pic29 from '../../assets/img-5.jpg';
import Pic30 from '../../assets/pic-10.jpg';

// Slot labels are for editing only. Keep false for the real thing.
const SHOW_SLOT_LABELS = false;

const PHOTOS = {
  // PROLOGUE: revealed inside the merged circle. Portrait-ish photo of both of you works best.
  hero_us: Pic1,

  // ACT I: where it began
  actI_firstDays: Pic7,
  actI_herSmile: Pic10,

  // ACT II: the distance
  actII_beforeYouLeft: Pic34,
  actII_you: Pic35,

  // ACT III: the fire
  actIII_quiet: Pic12,

  // ACT IV: the vow
  actIV_her: Pic70,
  actIV_us: Pic60,

  // EPILOGUE
  epilogue_us: Pic1,

  // Gallery strip, six good moments.
  gallery: [Pic14, Pic15, Pic22, Pic23, Pic29, Pic30],
};

/* ─── palette: flat only, no gradients ─── */
const C = {
  paper: '#F2EADB',
  ink: '#1C1A18',
  clay: '#C65A3C',
  pine: '#2E4638',
  sun: '#E3A93A',
};

const SERIF = "'Cormorant Garamond', serif";
const MONO = "'DM Mono', monospace";
const EASE = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────
   COPY
   A plain string is a normal paragraph.
   { q: '...' } is set larger, as a pull line.
────────────────────────────────────────────── */
const PROLOGUE_LINE =
  'Some words cannot be taken back. But they can be acknowledged, and the person who said them can choose to do better.';

const PROLOGUE = [
  "Baby, this is something I made because I wanted to tell you what I haven't been able to express properly. Not to win an argument, not to erase what happened, and not to pressure you into forgiving me.",
  'I want to take responsibility for the way I spoke to you, to remember some of the things that have made our relationship special to me, and to tell you honestly what you mean to me.',
  {
    q: 'You deserve an apology that is about more than how I feel after hurting you. So this is me trying to give you one.',
  },
];

const ACT_ONE = [
  'We started with an Instagram DM, baby. You reached out without knowing what would come of it, and eventually I replied. Somehow, that little conversation became something I would come to care about so deeply.',
  'I still remember wondering where you got the audacity to tell me to ask you for your number. I remember those fat paragraphs you would send me about your day, how you would come to me for advice, and how much I loved hearing you talk. I remember noticing your big eyes, too. You already had those huge eyes like mine, except yours were muchhhhh bigger.',
  "I miss those little things sometimes. The way we could talk about absolutely anything, the way you would tell me what was happening in your world, and the feeling that we were slowly becoming part of each other's everyday lives.",
  'You came into my life during a season when I was carrying a lot. I was dealing with painful things in my family, trying to find my footing, and figuring out how to keep moving forward. Being with you brought joy into days that had become very heavy.',
  'You made me laugh. You gave me something to look forward to. You reminded me that life could still hold beautiful things, even when other parts of it were hurting.',
  "I don't want to put the responsibility for my happiness on you, baby. That was never supposed to be your burden. But I want you to know that the happiness we shared was real to me, and that I will always be grateful for the moments when we made each other's lives a little brighter.",
  'When I think about us at the beginning, I remember two people who were excited to know each other. Two people who wanted to share their days, their thoughts, their little jokes, and their lives.',
  {
    q: 'I wish I had protected that tenderness better, especially when things became difficult.',
  },
];

const ACT_TWO = [
  "Then life changed. Distance became part of our relationship, and so did pressures, disappointments, misunderstandings, and hurts that we didn't always know how to handle.",
  'Things that once felt natural became difficult. Sometimes we struggled to understand each other. Sometimes we both carried feelings that came out in ways that made it harder to feel close.',
  "I won't pretend that everything between us has been beautiful. We have hurt each other, and there are things between us that still need honesty, understanding, and healing. I have had my own pain, and there have been moments when I didn't know what to do with it.",
  {
    q: 'But I want to acknowledge something about myself: being hurt does not give me permission to hurt you back.',
  },
  "I have sometimes allowed my frustration to build until it came out as anger. I've wanted to be understood so badly that I haven't always stopped to consider how my words would make you feel. And when I felt disappointed or afraid of losing you, I sometimes spoke from that pain instead of speaking with the care you deserved.",
  'I wish I had handled those moments differently.',
  'Our relationship has been through a lot, and I know that loving each other does not automatically make us good at loving each other. We have to learn how to communicate, how to listen, and how to disagree without tearing each other down.',
  'I still care about what we shared, Monica. I still believe that the good moments mattered, even though we have also had painful ones.',
  "I don't want to rewrite our history as though nothing good happened. And I don't want to pretend the painful parts never happened, either.",
  { q: 'I want to learn from them.' },
];

const ACT_THREE = [
  'Baby, I am genuinely sorry for the things I said to you and for how harshly I spoke to you.',
  'I know my words were hurtful. I know that when someone you love speaks to you with cruelty, it can make you question how they see you, how they value you, and whether the love they tell you about is still there when things become difficult.',
  'I hate knowing that I may have made you feel that way.',
  'You did not deserve to be spoken to like that, Mami. Not by me. Not by someone who tells you that he loves you, who talks about a future with you, and who wants you to feel safe enough to be yourself around him.',
  "I was frustrated. I was hurt. I had feelings that I didn't know how to handle properly in that moment. But those are explanations for what was happening inside me, not excuses for what I chose to say.",
  { q: 'I was responsible for my words, and I am sorry for them.' },
  "I am also sorry if the way I expressed my anger made it harder for you to tell me when you were hurting. I don't want you to feel that opening up to me will automatically lead to another argument, that you have to hide your feelings to keep the peace, or that I will use your vulnerability against you.",
  'I want to become someone who can hear difficult things without immediately reacting in a way that makes everything worse.',
  "I cannot undo the messages you read. I cannot ask you to forget them simply because I regret sending them. And I know that an apology doesn't automatically undo the hurt it causes.",
  'All I can do is acknowledge what I did, tell you sincerely that I am sorry, and take responsibility for how I treat you going forward.',
  { q: 'I am sorry, Monica. Truly.' },
  'You deserved more care from me in that moment, and I wish I had given it to you.',
];

const INTERLUDE = [
  "These pictures don't tell the whole story of us. No collection of photographs could.",
  'But they remind me of moments when we were happy, when we laughed, when being together felt simple, and when I was grateful that our paths had crossed.',
  "I don't look at them and think that we never had problems. I look at them and remember that there was genuine affection here, that we shared things I will always value, and that you have been an important part of my life.",
  'Thank you for those moments, baby. For the laughter, the memories, the conversations, the closeness, and all the little things that might have seemed ordinary at the time but became special because they were ours.',
];

const VOW_INTRO = [
  'I cannot promise that we will never disagree, that I will always know the right thing to say, or that we will never have difficult days.',
  'But I can take responsibility for the way I respond when those days come.',
  "I don't want an apology to be something beautiful that I write once and then forget when I get upset again. I want it to mean something in the way I treat you, especially when I am frustrated.",
  'Here is what I want to work on.',
];

const VOWS = [
  {
    g: 'circle',
    c: C.sun,
    t: 'I will be more careful with my words.',
    d: 'I will not use insults, degrading language, or personal attacks to express how hurt I am. I can tell you that something has upset me without trying to hurt you in return.',
  },
  {
    g: 'half',
    c: C.paper,
    t: 'I will try to pause before reacting.',
    d: "When I feel myself becoming overwhelmed, I want to learn to step back, collect myself, and return to the conversation more calmly. I don't want every painful moment to become a bigger wound.",
  },
  {
    g: 'tri',
    c: C.sun,
    t: 'I will communicate instead of escalating.',
    d: 'I want to get better at saying what I feel and what I need without turning the conversation into a fight. I want to listen to understand you, not simply wait for my turn to explain myself.',
  },
  {
    g: 'square',
    c: C.paper,
    t: 'I will respect your feelings, even when they are difficult for me to hear.',
    d: "You don't have to experience things exactly as I do for your feelings to matter. I want to make room for your perspective without immediately becoming defensive.",
  },
  {
    g: 'diamond',
    c: C.sun,
    t: 'I will let my actions support my apologies.',
    d: 'I know that saying sorry is only the beginning. If I want you to believe that I am learning, you should be able to see that learning in how I behave over time.',
  },
];

const VOW_OUTRO = [
  'These are things I want to practise, not promises I expect you to accept without question. I know I have to live them.',
  'I also hope that if we choose to work on our relationship, we can both learn to approach difficult conversations with more honesty, care, and accountability. I want a relationship where neither of us has to be perfect, but both of us are willing to take responsibility for the ways we cause hurt.',
  {
    q: 'I want us to feel like we are on the same side, even when we disagree.',
  },
];

const HOPE = [
  'There are things in my heart that I would like to share with you, and there are things in yours that I would like to understand better.',
  'I know we have both experienced pain in this relationship. I know there have been times when we have struggled to understand what the other person was feeling, and times when our attempts to protect ourselves have only made us feel further apart.',
  'I would like us to have an honest conversation about those things one day. Not to decide who is the worse person, not to keep score, and not to make either of us carry all the blame.',
  'I want to understand your fears, the things that hurt you, and the things you may have struggled to express. I would also like you to understand the things that have hurt me and what I need from a relationship to feel loved, respected, and secure.',
  'I hope we can listen to each other without turning vulnerability into ammunition.',
  "But I understand that you may need time, and that you may not be ready to have that conversation now. I don't want this apology to become another demand placed on you.",
  {
    q: 'You are allowed to have your own feelings about what happened. You are allowed to take your time. And you are allowed to decide what you want.',
  },
  'I wanted to start by taking responsibility for my part. The rest, if we both want to explore it, deserves its own honest conversation.',
];

const EPILOGUE = [
  'For the words I chose. For the hurt I caused. For the moments when my frustration spoke louder than the love and care I wanted you to feel from me.',
  'I am sorry for yesterday, baby. I wish I had handled things differently, and I wish I had spoken to you with the tenderness you deserved, even when I was hurting.',
  "I still love you, Monica. That is the truth, and I don't want to pretend otherwise. You have been part of so many important moments in my life, and what we have shared means a great deal to me.",
  'I still think about the future we talked about. I still remember the little things that made me fall for you. And part of me still hopes that we can find a healthier way to love each other, if that is something we both genuinely want.',
  'But I know that love cannot erase hurt by itself. It has to be accompanied by honesty, respect, patience, and actions that match the words we say.',
  'I am not asking you to forget what happened because I made you a page. I am not asking you to give me an answer before you are ready. And I am not expecting you to believe that everything will change because I have written these words.',
  'I just wanted you to know that I recognise the way I hurt you, that I regret it, and that I want to do better.',
  'If you feel comfortable talking to me, I would be grateful for the chance to listen to you and to share what is in my heart, too. If you need time first, I will respect that.',
  'Whatever happens next, I want this apology to be sincere in its own right.',
];

/* ─── helpers ─── */
function Reveal({ children, delay = 0, y = 36, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Renders the copy arrays above. */
function Paras({ items, accent, align = 'left' }) {
  return (
    <>
      {items.map((item, i) =>
        typeof item === 'string' ? (
          <p key={i}>{item}</p>
        ) : (
          <p
            key={i}
            className="pl-5 italic text-2xl md:text-3xl leading-snug"
            style={{
              borderLeft: `3px solid ${accent}`,
              textAlign: align,
            }}
          >
            {item.q}
          </p>
        ),
      )}
    </>
  );
}

/* Every photo frame is a square. */
function Frame({ slot, src, className = '', tint, alt = '' }) {
  const image = src || PHOTOS[slot];
  return (
    <div
      className={`relative overflow-hidden aspect-square ${className}`}
      style={{ background: tint || C.ink }}
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover"
        draggable={false}
      />
      {SHOW_SLOT_LABELS && slot && (
        <span
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] tracking-wider whitespace-nowrap"
          style={{ background: C.sun, color: C.ink, fontFamily: MONO }}
        >
          {slot}
        </span>
      )}
    </div>
  );
}

function ActMark({ numeral, dark = false }) {
  return (
    <div
      className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shrink-0"
      style={{
        border: `2px solid ${dark ? C.paper : C.ink}`,
        color: dark ? C.paper : C.ink,
        fontFamily: SERIF,
        fontSize: 34,
        fontStyle: 'italic',
      }}
    >
      {numeral}
    </div>
  );
}

function Label({ children, color }) {
  return (
    <p
      className="text-[11px] md:text-xs uppercase mb-4"
      style={{ fontFamily: MONO, letterSpacing: '0.28em', color }}
    >
      {children}
    </p>
  );
}

/* little shape glyphs for the vows */
function Glyph({ kind, color }) {
  const s = 34;
  const common = {
    width: s,
    height: s,
    viewBox: '0 0 34 34',
    'aria-hidden': true,
  };
  switch (kind) {
    case 'circle':
      return (
        <svg {...common}>
          <circle cx="17" cy="17" r="15" fill={color} />
        </svg>
      );
    case 'half':
      return (
        <svg {...common}>
          <path d="M2 24a15 15 0 0 1 30 0z" fill={color} />
        </svg>
      );
    case 'tri':
      return (
        <svg {...common}>
          <path d="M17 3l15 28H2z" fill={color} />
        </svg>
      );
    case 'square':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="28" height="28" fill={color} />
        </svg>
      );
    case 'diamond':
      return (
        <svg {...common}>
          <path d="M17 1l16 16-16 16L1 17z" fill={color} />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="17" cy="17" r="15" fill={color} />
        </svg>
      );
  }
}

/* ─── scroll ring ─── */
function ScrollRing() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  return (
    <svg
      className="fixed top-4 right-4 z-40 mix-blend-difference"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="15"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <motion.circle
        cx="20"
        cy="20"
        r="15"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        style={{ pathLength: p, rotate: -90, transformOrigin: '20px 20px' }}
      />
    </svg>
  );
}

/* ─── theatre curtain ─── */
function Curtain({ onDone }) {
  const [parting, setParting] = useState(false);
  return (
    <div
      className="fixed inset-0 z-50 flex overflow-hidden"
      style={{ background: C.ink }}
    >
      <motion.div
        className="w-1/2 h-full"
        style={{ background: C.clay }}
        animate={{ x: parting ? '-100%' : 0 }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="w-1/2 h-full"
        style={{ background: C.pine }}
        animate={{ x: parting ? '100%' : 0 }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => parting && onDone()}
      />
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        animate={{ opacity: parting ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="pointer-events-auto flex flex-col items-center gap-8">
          <div
            className="w-24 h-24 rounded-full"
            style={{ background: C.sun }}
          />
          <p
            className="text-xs uppercase"
            style={{ fontFamily: MONO, letterSpacing: '0.3em', color: C.paper }}
          >
            For Monica
          </p>
          <h1
            className="text-5xl md:text-7xl"
            style={{ fontFamily: SERIF, color: C.paper, fontStyle: 'italic' }}
          >
            A plea in five acts
          </h1>
          <button
            onClick={() => setParting(true)}
            className="px-9 py-4 text-sm uppercase transition-transform hover:scale-105 active:scale-95"
            style={{
              background: C.paper,
              color: C.ink,
              fontFamily: MONO,
              letterSpacing: '0.25em',
              borderRadius: 999,
            }}
          >
            Raise the curtain
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── hero: two circles arrive from opposite sides, overlap into a lens that
   says "US", then keep travelling until they are ONE circle, which opens
   onto a photo of the two of you ─── */
function HeroShapes({ ready }) {
  // One shared timeline. Both circles (and the clip circles that cut the lens
  // and the photo) move together, so the lens grows into a single full circle.
  const move = {
    duration: 4.5,
    delay: 0.3,
    times: [0, 0.44, 0.7, 1], // arrive, hold as a lens (US), merge
    ease: ['easeOut', 'linear', 'easeInOut'],
  };
  const leftPath = [20, 250, 250, 300];
  const rightPath = [580, 350, 350, 300];

  const Circle = ({ side, ...props }) => (
    <motion.circle
      r="150"
      cy="170"
      initial={{ cx: side === 'left' ? 20 : 580 }}
      animate={ready ? { cx: side === 'left' ? leftPath : rightPath } : {}}
      transition={move}
      {...props}
    />
  );

  return (
    <svg
      viewBox="0 0 600 340"
      className="w-full max-w-3xl mx-auto"
      role="img"
      aria-label="Two circles meet, overlap to form a shared space that reads US, then become one circle that opens onto a photo of Joshua and Monica"
    >
      <defs>
        <clipPath id="heroClipA">
          <Circle side="left" />
        </clipPath>
        <clipPath id="heroClipB">
          <Circle side="right" />
        </clipPath>
      </defs>

      {/* the two circles, from opposite sides */}
      <Circle side="left" fill={C.clay} />
      <Circle side="right" fill={C.pine} />

      {/* names, until the circles become one */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: [0, 1, 1, 0] } : {}}
        transition={{ delay: 1.4, duration: 2.6, times: [0, 0.25, 0.7, 1] }}
      >
        <text
          x="160"
          y="178"
          textAnchor="middle"
          fill={C.paper}
          fontSize="28"
          fontStyle="italic"
          fontFamily="Cormorant Garamond, serif"
        >
          Joshua
        </text>
        <text
          x="440"
          y="178"
          textAnchor="middle"
          fill={C.paper}
          fontSize="28"
          fontStyle="italic"
          fontFamily="Cormorant Garamond, serif"
        >
          Monica
        </text>
      </motion.g>

      {/* the shared space, filled in the sun colour (follows the circles) */}
      <motion.g
        clipPath="url(#heroClipA)"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2.4, duration: 0.6 }}
      >
        <Circle side="right" fill={C.sun} />
      </motion.g>

      {/* the photo, clipped to the shared space; once merged that is the full circle */}
      <g clipPath="url(#heroClipA)">
        <g clipPath="url(#heroClipB)">
          <motion.image
            href={PHOTOS.hero_us}
            x="150"
            y="20"
            width="300"
            height="300"
            preserveAspectRatio="xMidYMid slice"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: 4.9, duration: 1.4 }}
          />
        </g>
      </g>

      {/* "US" appears in the lens, rides through the merge, then yields to the photo */}
      <motion.text
        x="300"
        y="192"
        textAnchor="middle"
        fill={C.ink}
        fontSize="64"
        fontStyle="italic"
        fontWeight="500"
        fontFamily="Cormorant Garamond, serif"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: [0, 1, 1, 0] } : {}}
        transition={{ delay: 2.5, duration: 3.3, times: [0, 0.12, 0.7, 1] }}
      >
        US
      </motion.text>
    </svg>
  );
}

/* ─── one act: copy on one side, photos stay in view on the other ─── */
function Act({ numeral, kicker, title, children, photos, bg, fg, dark, flip }) {
  return (
    <section
      className="relative px-6 py-24 md:py-36"
      style={{ background: bg, color: fg, overflowX: 'clip' }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16 items-start">
        <div className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
          <Reveal>
            <div className="flex items-center gap-5 mb-8">
              <ActMark numeral={numeral} dark={dark} />
              <Label color={dark ? C.sun : C.clay}>{kicker}</Label>
            </div>
            <h2
              className="text-4xl md:text-6xl leading-[1] mb-10"
              style={{ fontFamily: SERIF, fontWeight: 500 }}
            >
              {title}
            </h2>
            <div
              className="space-y-6 text-xl md:text-2xl leading-relaxed"
              style={{ fontFamily: SERIF, opacity: 0.94 }}
            >
              {children}
            </div>
          </Reveal>
        </div>
        <div
          className={`md:col-span-5 md:sticky md:top-24 ${flip ? 'md:order-1' : ''}`}
        >
          <Reveal delay={0.2} y={60}>
            {photos}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── page ─── */
export default function ApologyForMonica() {
  const [ready, setReady] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const previous = document.body.style.background;
    document.body.style.background = C.paper;
    return () => {
      document.body.style.background = previous;
    };
  }, []);

  return (
    <div style={{ background: C.paper, color: C.ink, overflowX: 'clip' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Mono:wght@400;500&display=swap');
        * { -webkit-font-smoothing: antialiased; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${C.sun}; color: ${C.ink}; }
      `}</style>

      {!ready && <Curtain onDone={() => setReady(true)} />}
      {ready && <ScrollRing />}

      {/* ═════════ PROLOGUE / HERO ═════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="relative z-10 w-full">
          <Label color={C.clay}>For Monica</Label>
          <HeroShapes ready={ready} />
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 6.4, duration: 1, ease: EASE }}
            className="text-[13vw] md:text-[8rem] leading-[1] mt-10"
            style={{ fontFamily: SERIF, fontWeight: 500 }}
          >
            I'm{' '}
            <span style={{ color: C.clay, fontStyle: 'italic' }}>sorry</span>,
            Mami.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: 7, duration: 1 }}
            className="mt-10 text-xl md:text-3xl max-w-2xl mx-auto"
            style={{ fontFamily: SERIF, fontStyle: 'italic' }}
          >
            {PROLOGUE_LINE}
          </motion.p>
        </div>
      </section>

      {/* ═════════ PROLOGUE TEXT ═════════ */}
      <section className="px-6 pb-24 md:pb-36" style={{ background: C.paper }}>
        <Reveal>
          <div
            className="max-w-3xl mx-auto space-y-6 text-xl md:text-2xl leading-relaxed"
            style={{ fontFamily: SERIF }}
          >
            <Paras items={PROLOGUE} accent={C.clay} />
          </div>
        </Reveal>
      </section>

      {/* ═════════ ACT I ═════════ */}
      <Act
        numeral="I"
        kicker="Act One / The Meeting"
        title="A little message that became a big part of my life"
        bg={C.paper}
        fg={C.ink}
        photos={
          <div className="relative h-[420px] md:h-[520px]">
            <div className="absolute left-0 top-0 w-[64%]">
              <Frame
                slot="actI_firstDays"
                alt="The two of us in the early days"
              />
            </div>
            <div className="absolute right-0 bottom-0 w-[52%]">
              <Frame slot="actI_herSmile" alt="Monica smiling" tint={C.clay} />
            </div>
            <div
              className="absolute right-[4%] top-[4%] w-14 h-14 rounded-full"
              style={{ background: C.sun }}
            />
          </div>
        }
      >
        <Paras items={ACT_ONE} accent={C.clay} />
      </Act>

      {/* ═════════ ACT II ═════════ */}
      <Act
        numeral="II"
        kicker="Act Two / The Distance"
        title="Somewhere along the way, we got hurt"
        bg={C.sun}
        fg={C.ink}
        flip
        photos={
          <div className="relative h-[420px] md:h-[520px]">
            <div className="absolute left-0 bottom-0 w-[62%]">
              <Frame
                slot="actII_beforeYouLeft"
                alt="The two of us before I left for the US"
                tint={C.pine}
              />
            </div>
            <div className="absolute right-0 top-0 w-[50%]">
              <Frame slot="actII_you" alt="Me, alone" tint={C.clay} />
            </div>
          </div>
        }
      >
        <Paras items={ACT_TWO} accent={C.ink} />
      </Act>

      {/* ═════════ ACT III ═════════ */}
      <Act
        numeral="III"
        kicker="Act Three / The Fire"
        title="The words I cannot take back"
        bg={C.ink}
        fg={C.paper}
        dark
        photos={
          <div className="relative flex justify-center">
            <div
              className="absolute -right-8 -top-8 w-32 h-32 md:w-48 md:h-48 rounded-full"
              style={{ background: C.clay }}
            />
            <Frame
              slot="actIII_quiet"
              alt="A quiet moment"
              className="relative w-[82%]"
              tint={C.pine}
            />
          </div>
        }
      >
        <Paras items={ACT_THREE} accent={C.sun} />
      </Act>

      {/* ═════════ INTERLUDE ═════════ */}
      <section className="py-24 md:py-32" style={{ background: C.paper }}>
        <Reveal>
          <div className="px-6 max-w-3xl mx-auto mb-14">
            <Label color={C.clay}>Interlude / The Little Things</Label>
            <h3
              className="text-5xl md:text-7xl leading-none mb-4"
              style={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontWeight: 500,
              }}
            >
              Moments I still carry with me
            </h3>
            <div
              className="mt-10 space-y-6 text-xl md:text-2xl leading-relaxed"
              style={{ fontFamily: SERIF }}
            >
              <Paras items={INTERLUDE} accent={C.clay} />
            </div>
          </div>
        </Reveal>
        <div className="flex gap-5 md:gap-8 overflow-x-auto px-6 pb-6 snap-x snap-mandatory items-center">
          {PHOTOS.gallery.map((src, i) => {
            const tints = [C.clay, C.pine, C.sun, C.ink, C.sun, C.clay];
            return (
              <div key={i} className="shrink-0 snap-center w-56 md:w-72">
                <Frame
                  src={src}
                  slot={`gallery_${i + 1}`}
                  alt={`A moment we shared, ${i + 1} of ${PHOTOS.gallery.length}`}
                  tint={tints[i]}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* ═════════ ACT IV ═════════ */}
      <section
        className="px-6 py-24 md:py-36"
        style={{ background: C.pine, color: C.paper, overflowX: 'clip' }}
      >
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-5 mb-8">
              <ActMark numeral="IV" dark />
              <Label color={C.sun}>Act Four / The Vow</Label>
            </div>
            <h2
              className="text-5xl md:text-8xl leading-[0.92] mb-10 max-w-4xl"
              style={{ fontFamily: SERIF, fontWeight: 500 }}
            >
              I want to love you better
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
            <div className="md:col-span-7">
              <Reveal>
                <div
                  className="space-y-6 text-xl md:text-2xl leading-relaxed mb-14"
                  style={{ fontFamily: SERIF, opacity: 0.94 }}
                >
                  <Paras items={VOW_INTRO} accent={C.sun} />
                </div>
              </Reveal>

              <div className="space-y-2">
                {VOWS.map((v, i) => (
                  <Reveal key={v.t} delay={0.05} y={24}>
                    <div
                      className="flex items-start gap-5 py-7"
                      style={{ borderTop: `1px solid ${C.paper}33` }}
                    >
                      <div className="mt-2 shrink-0">
                        <Glyph kind={v.g} color={v.c} />
                      </div>
                      <div>
                        <p
                          className="text-xs uppercase mb-2"
                          style={{
                            fontFamily: MONO,
                            letterSpacing: '0.25em',
                            color: C.sun,
                          }}
                        >
                          {`0${i + 1}`}
                        </p>
                        <h4
                          className="text-2xl md:text-3xl leading-tight"
                          style={{ fontFamily: SERIF, fontWeight: 600 }}
                        >
                          {v.t}
                        </h4>
                        <p
                          className="text-lg md:text-xl mt-2 leading-relaxed"
                          style={{ fontFamily: SERIF, opacity: 0.85 }}
                        >
                          {v.d}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <div
                  className="mt-10 pt-10 space-y-6 text-xl md:text-2xl leading-relaxed"
                  style={{
                    fontFamily: SERIF,
                    opacity: 0.94,
                    borderTop: `1px solid ${C.paper}33`,
                  }}
                >
                  <Paras items={VOW_OUTRO} accent={C.sun} />
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-5 md:sticky md:top-24">
              <Reveal delay={0.2} y={50}>
                <div className="relative h-[520px]">
                  <div className="absolute left-0 top-0 w-[64%]">
                    <Frame
                      slot="actIV_her"
                      alt="Monica, radiant"
                      tint={C.clay}
                    />
                  </div>
                  <div className="absolute right-0 bottom-0 w-[54%]">
                    <Frame
                      slot="actIV_us"
                      alt="The two of us, close"
                      tint={C.sun}
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ WHAT I HOPE FOR ═════════ */}
      <section
        className="px-6 py-24 md:py-36"
        style={{ background: C.sun, color: C.ink, overflowX: 'clip' }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-5 md:sticky md:top-24">
            <Reveal>
              <svg
                viewBox="0 0 200 110"
                className="w-48 mb-8"
                aria-hidden="true"
              >
                <defs>
                  <clipPath id="hopeClip">
                    <circle cx="70" cy="55" r="50" />
                  </clipPath>
                </defs>
                <g clipPath="url(#hopeClip)">
                  <circle cx="130" cy="55" r="50" fill={C.clay} />
                </g>
                <circle
                  cx="70"
                  cy="55"
                  r="50"
                  fill="none"
                  stroke={C.ink}
                  strokeWidth="2"
                />
                <circle
                  cx="130"
                  cy="55"
                  r="50"
                  fill="none"
                  stroke={C.ink}
                  strokeWidth="2"
                />
              </svg>
              <Label color={C.pine}>What I hope for, when you're ready</Label>
              <h2
                className="text-4xl md:text-6xl leading-[1]"
                style={{ fontFamily: SERIF, fontWeight: 500 }}
              >
                There is more I would like us to understand
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <div
                className="space-y-6 text-xl md:text-2xl leading-relaxed"
                style={{ fontFamily: SERIF }}
              >
                <Paras items={HOPE} accent={C.ink} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═════════ EPILOGUE ═════════ */}
      <section
        className="relative px-6 py-28 md:py-44 overflow-hidden"
        style={{ background: C.paper }}
      >
        <div
          className="absolute left-1/2 top-[22%] -translate-x-1/2 -translate-y-1/2 w-[80vmin] h-[80vmin] rounded-full"
          style={{ background: C.sun, opacity: 0.35 }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center">
              <Label color={C.clay}>Act Five / Epilogue</Label>
              <div className="flex justify-center mb-10">
                <Frame
                  slot="epilogue_us"
                  alt="Us, at our best"
                  className="w-44 md:w-60"
                  tint={C.clay}
                />
              </div>
              <h2
                className="text-[14vw] md:text-[8rem] leading-[0.9] mb-14"
                style={{ fontFamily: SERIF, fontWeight: 500 }}
              >
                I'm{' '}
                <span style={{ fontStyle: 'italic', color: C.clay }}>
                  sorry
                </span>
                , Mami.
              </h2>
            </div>
            <div
              className="space-y-6 text-xl md:text-2xl leading-relaxed"
              style={{ fontFamily: SERIF }}
            >
              <Paras items={EPILOGUE} accent={C.clay} />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setAnswer('begin')}
                className="px-8 py-4 text-sm uppercase transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: C.ink,
                  color: C.paper,
                  borderRadius: 999,
                  fontFamily: MONO,
                  letterSpacing: '0.2em',
                }}
              >
                Let's begin again
              </button>
              <button
                onClick={() => setAnswer('time')}
                className="px-8 py-4 text-sm uppercase transition-transform hover:scale-105 active:scale-95"
                style={{
                  border: `2px solid ${C.ink}`,
                  color: C.ink,
                  borderRadius: 999,
                  fontFamily: MONO,
                  letterSpacing: '0.2em',
                }}
              >
                I need a little time
              </button>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            {answer && (
              <motion.p
                key={answer}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-12 text-2xl md:text-3xl italic text-center"
                style={{ fontFamily: SERIF, color: C.pine }}
              >
                {answer === 'begin'
                  ? 'Then give me a call. Let us talk it through, properly, and begin again.'
                  : 'Then take all the time you need. I will respect that, and I will keep doing the work while I wait.'}
              </motion.p>
            )}
          </AnimatePresence>

          <Reveal delay={0.3}>
            <div className="mt-24 text-center" style={{ fontFamily: SERIF }}>
              <p className="text-3xl md:text-4xl italic">I am sorry, baby.</p>
              <p className="mt-4 text-3xl md:text-4xl italic">
                Signing Off: Your husband, your best friend, your partner, your
                lover, your family, your home, your Daddy, Your lover, the boy
                who feels your dreams, and the man who quenches your thirst, the
                father of your unborn children: Joshua Mukisa <br />I love you,
                Mami.
              </p>
              <p
                className="mt-8 text-xs uppercase"
                style={{
                  fontFamily: MONO,
                  letterSpacing: '0.3em',
                  color: C.clay,
                }}
              >
                Joshua
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
