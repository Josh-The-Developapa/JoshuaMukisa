import React from 'react';
import { ArrowIcon } from '../Header/Header';
import useScrollReveal from '../../hooks/useScrollReveal';

const essays = [
  //   {
  //     date: 'June 2026 — Kampala',
  //     title: 'On Building Software for Low-Bandwidth Realities in East Africa',
  //     description:
  //       'Why modern web bundle bloat breaks down on African telecommunication lines, and how packet frugality, aggressive client caching, and offline-first state machines preserve user trust.',
  //     href: '#',
  //   },
  //   {
  //     date: 'March 2025 — Kampala',
  //     title: 'Decommissioning Paper Ballots in Secondary Schools',
  //     description:
  //       'A technical post-mortem on the VoteAble deployment at Aga Khan High School Kampala: physical queue routing, terminal isolation, and replacing manual suspicion with cryptographic verification.',
  //     href: '#',
  //   },
  {
    date: 'September 2026',
    title: 'COMING SOON.',
    description: 'COMING SOON.',
    // href: '#',
  },
];

const EssayRow = ({ essay }) => {
  const Wrapper = essay.href ? 'a' : 'div';

  return (
    <Wrapper
      href={essay.href}
      data-reveal
      className={`block border-t border-[#DDD8CC] py-8 first:border-t-0 sm:py-10 ${
        essay.href ? 'group' : ''
      }`}
    >
      <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[140px_minmax(0,1fr)_140px] lg:items-center lg:gap-8">
        <span className="font-[JetBrains_Mono] text-[12px] text-[#706D66]">
          {essay.date}
        </span>

        <div className="flex flex-col gap-2">
          <h3 className="font-[Newsreader] text-[clamp(1.5rem,2.4vw,1.75rem)] leading-[1.2] text-[#181614] transition-colors duration-200 group-hover:text-[#D97746]">
            {essay.title}
          </h3>
          <p className="max-w-[560px] font-[Plus_Jakarta_Sans] text-[clamp(0.8125rem,1.1vw,0.875rem)] leading-[1.6] text-[#706D66]">
            {essay.description}
          </p>
        </div>

        {essay.href && (
          <span className="inline-flex items-center gap-2 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.06em] text-[#181614] lg:justify-end">
            Read Essay
            <ArrowIcon className="h-2.5 w-2.5" />
          </span>
        )}
      </div>
    </Wrapper>
  );
};

/**
 * Blog
 *
 * Rows reveal in sequence. Rows without an href render as plain divs so
 * a placeholder entry isn't an empty link for keyboard and screen readers.
 */
const Blog = ({ sectionRef }) => {
  const scope = useScrollReveal({ y: 24, stagger: 0.09 });

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="box-border w-full overflow-x-clip border-b border-[#DDD8CC] bg-[#F5F2EB] px-[clamp(1.5rem,5vw,3rem)] py-[clamp(4rem,9vh,7rem)]"
    >
      <div
        ref={scope}
        className="mx-auto flex w-full max-w-[1280px] flex-col gap-[clamp(2.5rem,4vw,3rem)]"
      >
        <div className="border-b border-[#181614] pb-6">
          <h2
            data-reveal
            className="font-[Newsreader] text-[clamp(2.5rem,4.5vw,3.25rem)] font-light tracking-[-0.02em] text-[#181614]"
          >
            Blog
          </h2>
        </div>

        <div className="border-y border-[#DDD8CC] bg-white px-[clamp(1.5rem,3vw,2.5rem)]">
          {essays.map((essay) => (
            <EssayRow key={essay.title} essay={essay} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
