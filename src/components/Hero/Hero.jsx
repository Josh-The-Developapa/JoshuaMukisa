import React from 'react';
import { ArrowIcon } from '../Header/Header';
import PortraitPhoto from '../../assets/Joshua.png';

const PORTRAIT_SRC = PortraitPhoto;

/**
 * Hero
 *
 * Spacing notes:
 * - The section uses `min-h-[100svh]`, never a fixed `h-[100vh]`. A fixed height
 *   plus border-box padding is what let the content spill into the next section
 *   on short/mobile viewports. With min-height the section grows instead.
 * - Gutters and vertical rhythm are fluid (`clamp()`), so there are no padding
 *   jumps at the sm/lg breakpoints. `pt` reserves room for the fixed header.
 * - DOM order is text, then portrait. On mobile that is the stack order; on
 *   `lg` the grid places them side by side. No `order-*` classes needed.
 */
const Hero = ({ onNavLinkClick, portraitSrc = PORTRAIT_SRC }) => {
  const handleClick = (e, id) => {
    if (onNavLinkClick) onNavLinkClick(e, id);
    else e.preventDefault();
  };

  return (
    <section
      id="home"
      className="relative box-border flex w-full min-h-[100svh] items-center overflow-x-clip border-b border-[#DDD8CC] bg-[#F5F2EB] px-[clamp(1.5rem,5vw,3rem)] pt-[clamp(7rem,15vh,9.5rem)] pb-[clamp(4rem,10vh,7rem)]"
    >
      <div className="mx-auto grid w-full px-[10vw] grid-cols-1 items-center gap-[clamp(2.5rem,5vw,3.5rem)] lg:grid-cols-[minmax(0,1fr)_406px]">
        {/* Headline & manifesto */}
        <div className="flex min-w-0 flex-col gap-6">
          <h1 className="font-[Newsreader] text-[clamp(2.25rem,6.2vw,4rem)] font-light leading-[1.06] tracking-[-0.02em] text-[#181614] [text-wrap:balance]">
            The becoming of <br />
            Joshua Mukisa
          </h1>

          <p className="max-w-[35ch] font-[Plus_Jakarta_Sans] text-[clamp(1.0625rem,1.4vw,1.1875rem)] leading-[1.55] text-[#706D66]">
            I'm a software engineer and entrepreneur with a knack for big data.
            I build cloud-based software for data management, exploring what
            technology can do with data in an age where its quality matters more
            than ever.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap">
            <a
              href="#ventures"
              onClick={(e) => handleClick(e, 'ventures')}
              className="inline-flex items-center justify-center gap-3 bg-[#181614] px-6 py-3.5 font-[JetBrains_Mono] text-[12px] uppercase tracking-[0.1em] text-[#F5F2EB] transition-colors duration-200 hover:bg-[#302D2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97746]"
            >
              Explore My Work
              {/* <ArrowIcon /> */}
            </a>
            <a
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
        <div className="mx-auto w-full max-w-[406px] border border-[#181614] bg-white p-[clamp(1rem,3vw,1.5rem)] lg:mx-0">
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
