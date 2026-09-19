import React, { useLayoutEffect, useRef } from 'react';

import pic1 from '../../assets/pic-1.jpeg';
import pic2 from '../../assets/pic-2.jpeg';
import pic3 from '../../assets/pic-3.jpeg';
import pic4 from '../../assets/pic-4.jpeg';
import pic5 from '../../assets/pic-5.jpeg';
import pic6 from '../../assets/voteable-1.jpg';
import pic7 from '../../assets/voteable-2.jpeg';
import pic8 from '../../assets/voteable-3.jpeg';
import pic9 from '../../assets/voteable-4.jpeg';
import pic10 from '../../assets/voteable-5.jpeg';
import pic11 from '../../assets/voteable-6.jpeg';
import pic12 from '../../assets/voteable-7.jpg';
import pic13 from '../../assets/voteable-8.jpeg';
import pic14 from '../../assets/voteable-9.jpg';
import pic15 from '../../assets/uni-pic1.jpg';
import pic16 from '../../assets/uni-pic2.jpeg';
import pic17 from '../../assets/uni-pic3.jpg';
import pic18 from '../../assets/uni-pic4.png';
import pic19 from '../../assets/cadera-founders.jpg';
import pic20 from '../../assets/grad-pic1.jpg';

import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';

/**
 * Civic Impact Gallery — Aga Khan High School Election Deployment
 *
 * Two GSAP-driven marquee rows.
 *
 * How it behaves:
 *  - Each row is three identical groups; the track shifts by exactly one
 *    group's width (1/3) per loop, so the repeat is seamless. Every group
 *    carries trailing padding equal to the flex gap, so the three groups are
 *    exactly equal in width.
 *  - Play/pause is driven by an IntersectionObserver, which reads live layout.
 *    (Precomputed ScrollTrigger ranges go stale on mobile when fonts, lazy
 *    images or the collapsing address bar shift the layout, which is what used
 *    to leave the rows paused.)
 *  - Scroll velocity temporarily speeds the rows up, then eases back.
 *  - Hover pauses a row smoothly, on devices with a real hover pointer only.
 *    Speed is composed as (scroll boost × hover factor), so scrolling while
 *    hovering never un-pauses the hovered row.
 *  - With prefers-reduced-motion, nothing animates and each row becomes a
 *    normal horizontally scrollable strip.
 */

// The track holds three identical groups, so one loop is one third of it.
const LOOP_SHIFT = -100 / 3;
const COPIES = [0, 1, 2];

// Scroll-velocity boost tuning.
const MAX_BOOST = 3.5;
const VELOCITY_DIVISOR = 1400;

const topRow = [
  {
    image: pic13,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'Entrepreneurship Expo, Aga Khan High School — 2022',
  },
  {
    image: pic14,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election Day, Aga Khan High School — 2023',
  },
  {
    image: pic1,
    ratio: 'aspect-[4/3]',
    alt: 'VoteAble election day, Aga Khan High School',
    caption: 'VoteAble Election Day, Aga Khan High School — 2024',
  },
  {
    image: pic20,
    ratio: 'aspect-[16/10]',
    alt: 'Graduation with an IB Diploma, Aga Khan High School 2025',
    caption: 'Graduation with an IB Diploma, Aga Khan High School — 2025',
  },
  {
    image: pic2,
    ratio: 'aspect-[3/2]',
    alt: 'VoteAble election day, Aga Khan High School',
    caption: 'VoteAble Election Day, Aga Khan High School — 2024',
  },
  {
    image: pic3,
    ratio: 'aspect-[16/10]',
    alt: 'VoteAble election day, Aga Khan High School',
    caption: 'VoteAble Election Day, Aga Khan High School — 2024',
  },
  {
    image: pic15,
    ratio: 'aspect-[16/10]',
    alt: 'Baylor University, Waco, Texas',
    caption:
      'With my best friends at a Students of East Africa meet-up, Baylor University, Waco, Texas — 2025',
  },
  {
    image: pic4,
    ratio: 'aspect-[4/3]',
    alt: 'VoteAble election day, Aga Khan High School',
    caption: 'VoteAble Election Day, Aga Khan High School — 2024',
  },
];

const bottomRow = [
  {
    image: pic6,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'Entrepreneurship Expo, Aga Khan High School — 2022',
  },
  {
    image: pic7,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election Day, Aga Khan High School — 2023',
  },
  {
    image: pic5,
    ratio: 'aspect-[3/2]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election Day, Aga Khan High School — 2024',
  },
  {
    image: pic16,
    ratio: 'aspect-[16/10]',
    alt: 'Baylor University, Waco, Texas',
    caption:
      'Picture with Students of East Africa club members, Baylor University, Waco, Texas — 2025',
  },
  {
    image: pic8,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election Day, Aga Khan High School — 2024',
  },
  {
    image: pic9,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election Day, Aga Khan High School — 2024',
  },
  {
    image: pic17,
    ratio: 'aspect-[16/10]',
    alt: 'Baylor University, Waco, Texas',
    caption:
      'Picture with Students of East Africa club members, Baylor University, Waco, Texas — 2025',
  },
  {
    image: pic10,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election Day, Aga Khan High School — 2024',
  },
  {
    image: pic11,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election Day, Aga Khan High School — 2024',
  },
  {
    image: pic18,
    ratio: 'aspect-[16/10]',
    alt: 'Baylor University, Waco, Texas',
    caption:
      'Picture with Students of East Africa club members, Baylor University, Waco, Texas — 2025',
  },
  {
    image: pic12,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election Day, Aga Khan High School — 2023',
  },
  {
    image: pic19,
    ratio: 'aspect-[16/10]',
    alt: 'Baylor University, Waco, Texas',
    caption: 'Picture with co-founders of Cadera Cloud Solutions Ltd',
  },
];

const Plate = ({ item }) => (
  <div
    className={`group relative h-full shrink-0 cursor-default border border-[#DDD8CC] bg-white p-1.5 ${item.ratio}`}
  >
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={item.image}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0 sm:grayscale-[25%]"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-white px-5 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="max-w-[26ch] font-[Newsreader] text-[15px] font-light italic leading-snug text-[#181614] sm:text-[17px]">
          {item.caption}
        </p>
      </div>
    </div>
  </div>
);

const Row = ({ items, direction, duration }) => (
  <div
    data-marquee-viewport
    className="h-full touch-pan-y overflow-hidden motion-reduce:touch-auto motion-reduce:overflow-x-auto"
  >
    <div
      data-marquee
      data-direction={direction}
      data-duration={duration}
      className="flex h-full w-max will-change-transform"
    >
      {/*
        Three identical groups. Each has trailing padding equal to the gap,
        so a group is exactly 1/3 of the track and the loop is seamless.
        Duplicates are hidden from assistive tech, and dropped entirely
        when the visitor prefers reduced motion (the row is scrollable then).
      */}
      {COPIES.map((copy) => (
        <div
          key={copy}
          aria-hidden={copy > 0 ? true : undefined}
          className={`flex h-full shrink-0 gap-4 pr-4 lg:gap-6 lg:pr-6 ${
            copy > 0 ? 'motion-reduce:hidden' : ''
          }`}
        >
          {items.map((item, i) => (
            <Plate key={`${direction}-${copy}-${i}`} item={item} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

const AgaKhanGallery = ({ sectionRef }) => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context((self) => {
      const q = self.selector;

      // Heading reveal
      gsap.from(q('[data-gallery-head] > *'), {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        scrollTrigger: {
          trigger: q('[data-gallery-head]')[0],
          start: 'top 88%',
          once: true,
        },
      });

      // Marquee loops
      const tracks = q('[data-marquee]');
      const loops = tracks.map((track) => {
        const forward = track.dataset.direction !== 'right';
        const duration = Number(track.dataset.duration) || 40;

        gsap.set(track, { xPercent: forward ? 0 : LOOP_SHIFT });

        return gsap.to(track, {
          xPercent: forward ? LOOP_SHIFT : 0,
          duration,
          ease: 'none',
          repeat: -1,
        });
      });

      // Speed = scroll boost × per-row hover factor. Keeping them separate
      // means a scroll boost can never override a hover pause (or vice versa).
      const boost = { value: 1 };
      const hover = loops.map(() => ({ value: 1 }));
      const applySpeed = () =>
        loops.forEach((loop, i) =>
          loop.timeScale(boost.value * hover[i].value),
        );

      // Hover pause, only on devices with a real hover pointer. On touch
      // screens mouseenter fires on tap without a matching mouseleave.
      const supportsHover = window.matchMedia(
        '(hover: hover) and (pointer: fine)',
      ).matches;

      const listeners = [];
      if (supportsHover) {
        q('[data-marquee-viewport]').forEach((viewport, i) => {
          const state = hover[i];
          if (!state) return;
          const pause = () =>
            gsap.to(state, {
              value: 0,
              duration: 0.4,
              overwrite: true,
              onUpdate: applySpeed,
            });
          const resume = () =>
            gsap.to(state, {
              value: 1,
              duration: 0.6,
              overwrite: true,
              onUpdate: applySpeed,
            });
          viewport.addEventListener('mouseenter', pause);
          viewport.addEventListener('mouseleave', resume);
          listeners.push([viewport, pause, resume]);
        });
      }

      // Play/pause on REAL visibility. IntersectionObserver reads live
      // layout, so it can't drift like precomputed ScrollTrigger ranges.
      // The small rootMargin starts the rows just before they scroll in.
      const stage = q('[data-marquee-stage]')[0] || root;
      let visible = true;
      let io;
      if (typeof IntersectionObserver !== 'undefined') {
        io = new IntersectionObserver(
          (entries) => {
            visible = entries[entries.length - 1].isIntersecting;
            loops.forEach((loop) => loop.paused(!visible));
          },
          { rootMargin: '150px 0px' },
        );
        io.observe(stage);
      }

      // Scroll-velocity boost.
      const clampBoost = gsap.utils.clamp(1, MAX_BOOST);
      let lastY = window.scrollY;
      let lastT = performance.now();
      let settle;

      const onScroll = () => {
        const now = performance.now();
        const y = window.scrollY;
        const velocity =
          (Math.abs(y - lastY) / Math.max(now - lastT, 1)) * 1000;
        lastY = y;
        lastT = now;
        if (!visible) return;

        gsap.to(boost, {
          value: clampBoost(1 + velocity / VELOCITY_DIVISOR),
          duration: 0.2,
          overwrite: true,
          onUpdate: applySpeed,
        });

        settle?.kill();
        settle = gsap.delayedCall(0.3, () => {
          gsap.to(boost, {
            value: 1,
            duration: 0.9,
            overwrite: true,
            onUpdate: applySpeed,
          });
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      // Runs on ctx.revert(). Tweens/listeners created after setup
      // (event handlers) aren't tracked by the context, so clean them here.
      return () => {
        io?.disconnect();
        window.removeEventListener('scroll', onScroll);
        settle?.kill();
        gsap.killTweensOf([boost, ...hover]);
        listeners.forEach(([viewport, pause, resume]) => {
          viewport.removeEventListener('mouseenter', pause);
          viewport.removeEventListener('mouseleave', resume);
        });
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      aria-labelledby="gallery-heading"
      className="box-border w-full border-b border-[#DDD8CC] bg-[#EFECE4] py-[clamp(4rem,9vh,7rem)]"
    >
      <div ref={rootRef}>
        <div
          data-gallery-head
          className="mx-auto mb-[clamp(2.5rem,4vw,3rem)] flex w-full max-w-[1280px] flex-col gap-6 px-[clamp(1.5rem,5vw,3rem)]"
        >
          <h2
            id="gallery-heading"
            className="max-w-[680px] font-[Newsreader] text-[clamp(2rem,4.2vw,2.75rem)] font-light leading-[1.05] tracking-[-0.02em] text-[#181614]"
          >
            Gallery
          </h2>
          <div className="flex items-center gap-2 border-t border-[#DDD8CC] pt-3">
            <span className="font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.06em] text-[#706D66]">
              A visual record of the work, places, and experiences that have
              shaped my journey so far.
            </span>
          </div>
        </div>

        <div
          data-marquee-stage
          className="relative w-full overflow-hidden border-y border-[#DDD8CC]"
        >
          <div className="flex flex-col gap-4 py-6 sm:gap-6 sm:py-8">
            <div className="h-[180px] sm:h-[240px] lg:h-[300px]">
              <Row items={topRow} direction="left" duration={38} />
            </div>
            <div className="h-[180px] sm:h-[240px] lg:h-[300px]">
              <Row items={bottomRow} direction="right" duration={44} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgaKhanGallery;
