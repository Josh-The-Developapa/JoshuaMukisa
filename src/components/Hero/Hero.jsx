import React, { useLayoutEffect, useRef } from 'react';
import { ArrowIcon } from '../Header/Header';
import PortraitPhoto from '../../assets/Joshua\ Mukisa.png';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

const PORTRAIT_SRC = PortraitPhoto;

/**
 * Hero
 *
 * Two animation moments, no more:
 *  1. A single orchestrated entrance on load — headline lines, portrait,
 *     copy, then the CTAs. This is the page's one showpiece.
 *  2. A scrubbed hand-off as the hero leaves: the stage drifts up and
 *     dims so About feels like it's arriving rather than colliding.
 */
const Hero = ({ onNavLinkClick, portraitSrc = PORTRAIT_SRC }) => {
  const rootRef = useRef(null);

  const handleClick = (e, id) => {
    if (onNavLinkClick) onNavLinkClick(e, id);
    else e.preventDefault();
  };

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context((self) => {
      const q = self.selector;
      const lines = q('[data-hero-line]');
      const copy = q('[data-hero-copy]');
      const ctas = q('[data-hero-cta]');
      const portrait = q('[data-hero-portrait]');

      gsap.set([...lines, ...copy, ...ctas], { opacity: 0, yPercent: 18 });
      gsap.set(portrait, { opacity: 0, y: 36, scale: 0.97 });

      const tl = gsap.timeline({ delay: 0.12 });

      tl.to(lines, { opacity: 1, yPercent: 0, duration: 1, stagger: 0.1 })
        .to(portrait, { opacity: 1, y: 0, scale: 1, duration: 1.15 }, 0.2)
        .to(copy, { opacity: 1, yPercent: 0, duration: 0.85 }, 0.45)
        .to(
          ctas,
          { opacity: 1, yPercent: 0, duration: 0.7, stagger: 0.08 },
          0.6,
        )
        .set([...lines, ...copy, ...ctas, ...portrait], {
          clearProps: 'transform,opacity',
        });

      gsap.to(q('[data-hero-stage]'), {
        yPercent: -5,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative box-border flex w-full min-h-[100svh] items-center overflow-x-clip border-b border-[#DDD8CC] bg-[#F5F2EB] px-[clamp(1.5rem,5vw,3rem)] pt-[clamp(7rem,15vh,9.5rem)] pb-[clamp(4rem,10vh,7rem)]"
    >
      <div
        data-hero-stage
        className="mx-auto grid w-full grid-cols-1 items-center gap-[clamp(2.5rem,5vw,3.5rem)] px-[10vw] lg:grid-cols-[minmax(0,1fr)_406px]"
      >
        {/* Headline & manifesto */}
        <div className="flex min-w-0 flex-col gap-6">
          <h1 className="font-[Newsreader] text-[clamp(2.25rem,6.2vw,4rem)] font-light leading-[1.06] tracking-[-0.02em] text-[#181614] [text-wrap:balance]">
            {/* Each line is its own element so the entrance can stagger.
                `overflow-hidden` gives the lines a masked rise. */}
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-hero-line className="block">
                The becoming of
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-hero-line className="block">
                Joshua Mukisa
              </span>
            </span>
          </h1>

          <p
            data-hero-copy
            className="max-w-[35ch] font-[Plus_Jakarta_Sans] text-[clamp(1.0625rem,1.4vw,1.1875rem)] leading-[1.55] text-[#706D66]"
          >
            I'm a software engineer and entrepreneur with a knack for big data.
            I build cloud-based software for data management, exploring what
            technology can do with data in an age where its quality matters more
            than ever.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap">
            <a
              data-hero-cta
              href="#ventures"
              onClick={(e) => handleClick(e, 'ventures')}
              className="inline-flex items-center justify-center gap-3 bg-[#181614] px-6 py-3.5 font-[JetBrains_Mono] text-[12px] uppercase tracking-[0.1em] text-[#F5F2EB] transition-colors duration-200 hover:bg-[#302D2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97746]"
            >
              Explore My Work
              {/* <ArrowIcon /> */}
            </a>
            <a
              data-hero-cta
              href="#about"
              onClick={(e) => handleClick(e, 'about')}
              className="inline-flex items-center justify-center gap-3 border border-[#181614] px-6 py-3.5 font-[JetBrains_Mono] text-[12px] uppercase tracking-[0.1em] text-[#181614] transition-colors duration-200 hover:bg-[#181614] hover:text-[#F5F2EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97746]"
            >
              My Story
              {/* <ArrowIcon /> */}
            </a>
          </div>
        </div>

        {/* Archival framed portrait — stacks below the copy on small screens */}
        <div
          data-hero-portrait
          className="mx-auto w-full max-w-[406px] border border-[#181614] bg-white p-[clamp(1rem,3vw,1.5rem)] lg:mx-0"
        >
          <div className="border border-[#DDD8CC] bg-[#F5F2EB] p-2">
            <div className="flex aspect-square items-center justify-center overflow-hidden bg-[#EFECE4]">
              {portraitSrc ? (
                <img
                  src={portraitSrc}
                  alt="Joshua Mukisa — Software Engineer, Venture Founder & Systems Architect"
                  width="406"
                  height="406"
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-[Newsreader] text-[64px] text-[#181614]/30">
                  JM
                </span>
              )}
            </div>
          </div>
          <div className="mt-3 flex items-end justify-between gap-3 border-t border-[#DDD8CC] pt-3">
            <span className="font-[Newsreader] text-[18px] italic text-[#181614]">
              Joshua Mukisa
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
