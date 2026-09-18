import React from 'react';
import { ArrowIcon } from '../Header/Header';

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

const EssayRow = ({ essay }) => (
  <a
    href={essay.href}
    className="group block py-8 sm:py-10 border-t border-[#DDD8CC] first:border-t-0"
  >
    <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr_140px] gap-3 lg:gap-8 items-start lg:items-center">
      <span className="font-[JetBrains_Mono] text-[12px] text-[#706D66]">
        {essay.date}
      </span>

      <div className="flex flex-col gap-2">
        <h3 className="font-[Newsreader] text-[24px] sm:text-[28px] text-[#181614] leading-[1.2] group-hover:text-[#D97746] transition-colors duration-200">
          {essay.title}
        </h3>
        <p className="font-[Plus_Jakarta_Sans] text-[13px] sm:text-[14px] leading-[1.6] text-[#706D66] max-w-[560px]">
          {essay.description}
        </p>
      </div>

      <span className="inline-flex items-center gap-2 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.06em] text-[#181614] lg:justify-end">
        Read Essay
        <ArrowIcon className="w-2.5 h-2.5" />
      </span>
    </div>
  </a>
);

const Blog = ({ sectionRef }) => {
  return (
    <section
      id="blog"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-28 px-6 sm:px-8 lg:px-12 border-b border-[#DDD8CC] bg-[#F5F2EB]"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12 sm:gap-16">
        <div className="flex items-end justify-between gap-6 pb-6 border-b border-[#181614]">
          <h2 className="font-[Newsreader] font-light text-[40px] sm:text-[52px] tracking-[-0.02em] text-[#181614]">
            Blog
          </h2>
        </div>

        <div className="bg-white border-y border-[#DDD8CC] px-6 sm:px-10">
          {essays.map((essay) => (
            <EssayRow key={essay.title} essay={essay} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
