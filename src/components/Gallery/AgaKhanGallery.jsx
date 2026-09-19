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
import pic21 from '../../assets/grad-pic2.jpg';

import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';

/**
 * Civic Impact Gallery — Aga Khan High School Election Deployment
 *
 * The marquee is now GSAP-driven instead of CSS keyframes, which buys
 * three things the CSS version couldn't do:
 *  - the rows speed up with your scroll velocity and settle back to
 *    their cruise speed, so the gallery answers the scroll
 *  - the tweens pause entirely when the section is off screen
 *  - hover pauses smoothly rather than freezing mid-frame
 *
 * Hover-pause is gated behind a `(hover: hover) and (pointer: fine)`
 * media query so it only runs on devices that actually support hover.
 * On touch screens, `mouseenter` fires on tap but there's often no
 * matching `mouseleave`, which used to leave rows stuck mid-scroll.
 */

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
  //   {
  //     image: pic21,
  //     ratio: 'aspect-[16/10]',
  //     alt: 'Graduation with an IB Diploma, Aga Khan High School 2025',
  //     caption: 'Graduation with an IB Diploma, Aga Khan High School — 2025',
  //   },
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
    className={`group relative h-full flex-shrink-0 cursor-default border border-[#DDD8CC] bg-white p-1.5 ${item.ratio}`}
  >
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={item.image}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover grayscale-[25%] transition-opacity duration-500 group-hover:opacity-0"
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
    className="h-full overflow-hidden"
    style={{ touchAction: 'pan-y' }}
  >
    <div
      data-marquee
      data-direction={direction}
      data-duration={duration}
      className="flex h-full w-max gap-4 lg:gap-6"
    >
      {/* Tripled so a -33.333% shift loops seamlessly. */}
      {[...items, ...items, ...items].map((item, i) => (
        <Plate key={`${direction}-${i}`} item={item} />
      ))}
    </div>
  </div>
);

const AgaKhanGallery = ({ sectionRef }) => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    // Mobile browsers fire a `resize` event when the address bar
    // collapses/expands mid-scroll. ScrollTrigger recalculates trigger
    // positions on resize by default, and doing that mid-transition can
    // miscalculate whether this section is active — pausing the loops
    // with nothing to un-pause them until an unrelated reflow (like a
    // stray tap) forces a refresh. This flag stops it from treating
    // browser-chrome resizes as real layout changes.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context((self) => {
      const q = self.selector;

      // Heading
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

      // Marquee tracks
      const tracks = q('[data-marquee]');
      const loops = tracks.map((track) => {
        const forward = track.dataset.direction !== 'right';
        const duration = Number(track.dataset.duration) || 40;

        gsap.set(track, { xPercent: forward ? 0 : -33.333 });

        return gsap.to(track, {
          xPercent: forward ? -33.333 : 0,
          duration,
          ease: 'none',
          repeat: -1,
        });
      });

      // Hover pause, per row — only wired up on devices that actually
      // support hover. On touch screens `mouseenter` fires on tap but
      // there's no reliable `mouseleave`, so the row would pause and
      // never resume. Gating on this media query fixes that outright
      // rather than trying to patch touch events into a hover model.
      const supportsHover = window.matchMedia(
        '(hover: hover) and (pointer: fine)',
      ).matches;

      const listeners = [];
      if (supportsHover) {
        q('[data-marquee-viewport]').forEach((viewport, i) => {
          const loop = loops[i];
          if (!loop) return;
          const pause = () => gsap.to(loop, { timeScale: 0, duration: 0.4 });
          const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.6 });
          viewport.addEventListener('mouseenter', pause);
          viewport.addEventListener('mouseleave', resume);
          listeners.push([viewport, pause, resume]);
        });
      }

      // Only run while visible, and let scroll velocity drive the speed.
      const boost = gsap.utils.clamp(1, 3.5);
      let settle;

      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (st) =>
          loops.forEach((loop) => (st.isActive ? loop.play() : loop.pause())),
        onUpdate: (st) => {
          const target = boost(1 + Math.abs(st.getVelocity()) / 1400);
          loops.forEach((loop) =>
            gsap.to(loop, {
              timeScale: target,
              duration: 0.2,
              overwrite: true,
            }),
          );
          settle?.kill();
          settle = gsap.delayedCall(0.3, () => {
            loops.forEach((loop) =>
              gsap.to(loop, { timeScale: 1, duration: 0.9, overwrite: true }),
            );
          });
        },
      });

      return () => {
        settle?.kill();
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
      className="box-border w-full border-b border-[#DDD8CC] bg-[#EFECE4] py-[clamp(4rem,9vh,7rem)]"
    >
      <div ref={rootRef}>
        <div
          data-gallery-head
          className="mx-auto mb-[clamp(2.5rem,4vw,3rem)] flex w-full max-w-[1280px] flex-col gap-6 px-[clamp(1.5rem,5vw,3rem)]"
        >
          <h2 className="max-w-[680px] font-[Newsreader] text-[clamp(2rem,4.2vw,2.75rem)] font-light leading-[1.05] tracking-[-0.02em] text-[#181614]">
            Gallery
          </h2>
          <div className="flex items-center gap-2 border-t border-[#DDD8CC] pt-3">
            <span className="font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.06em] text-[#706D66]">
              A visual record of the work, places, and experiences that have
              shaped my journey so far.
            </span>
          </div>
        </div>

        <div className="relative w-full overflow-hidden border-y border-[#DDD8CC]">
          <div className="flex flex-col gap-4 py-6 sm:gap-6 sm:py-8">
            <div className="h-[180px] sm:h-[240px] lg:h-[300px]">
              <Row items={topRow} direction="left" duration={38} />
            </div>
            <div className="h-[180px] sm:h-[240px] lg:h-[300px]">
              <Row items={bottomRow} direction="right" duration={44} />
            </div>
          </div>

          {/* Edge vignettes */}
          {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#EFECE4] to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#EFECE4] to-transparent sm:w-20" /> */}
        </div>
      </div>
    </section>
  );
};

export default AgaKhanGallery;
