import React from 'react';
import { JMMonogram } from '../Header/Header';

const indexRegister = [
  '01. The Story',
  '02. Ventures',
  '03. Experience',
  '04. Gallery',
  '05. Technical Skillset',
  '06. Blog',
];

const externalWires = [
  { label: 'Instagram', href: 'https://www.instagram.com/jmuks_k/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/joshua-mukisa/' },
  { label: 'GitHub', href: 'https://github.com/Josh-The-Developapa' },

  // { label: 'Website', href: 'https://joshuamukisa.com' },
];

const Footer = () => {
  return (
    <footer className="bg-[#181614] border-t border-[#DDD8CC]">
      {/* Top colophon strip */}
      {/* <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#302D2A]">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-[#D97746] flex-shrink-0" />
          <span className="font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.08em] text-[#E6C9A9]">
            Currently available for new engagements
          </span>
        </div>
        <span className="font-[JetBrains_Mono] text-[11px] text-[#E6C9A9]/80">
          Systems Architect · Venture Founder · Kampala, Uganda
        </span>
      </div> */}

      {/* 4-column grid */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {/* Col 1: profile lockup */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3.5">
            <JMMonogram inverted />
            <div className="flex flex-col">
              <span className="font-[Newsreader] text-[22px] text-white leading-none">
                Joshua Mukisa
              </span>
              {/* <span className="font-[JetBrains_Mono] text-[9px] uppercase tracking-[0.1em] text-[#D97746] mt-1">
                Systems Architect
              </span> */}
            </div>
          </div>
          <p className="font-[Plus_Jakarta_Sans] text-[12px] leading-[1.6] text-[#E6C9A9]/70">
            A software engineer and entrepreneur with a knack for big data. I
            build cloud-based software for data management, exploring what
            technology can do with data in an age where its quality matters more
            than ever.
          </p>
        </div>

        {/* Col 2: index register */}
        <div className="flex flex-col gap-4">
          <p className="font-[JetBrains_Mono] text-[12px] uppercase tracking-[0.08em] text-[#D97746]">
            Site Map
          </p>
          <ul className="flex flex-col gap-2">
            {indexRegister.map((item) => (
              <li
                key={item}
                className="font-[JetBrains_Mono] text-[12px] uppercase text-[#E6C9A9]/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: external wires */}
        <div className="flex flex-col gap-4">
          <p className="font-[JetBrains_Mono] text-[12px] uppercase tracking-[0.08em] text-[#D97746]">
            Socials
          </p>
          <ul className="flex flex-col gap-2">
            {externalWires.map((wire) => (
              <li key={wire.label}>
                <a
                  href={wire.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between font-[JetBrains_Mono] text-[12px] uppercase text-[#E6C9A9]/80 hover:text-white transition-colors duration-200"
                >
                  {wire.label}
                  <span>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: station time */}
        {/* <div className="bg-[#23201D] border border-[#302D2A] p-6 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-1">
            <p className="font-[JetBrains_Mono] text-[10px] uppercase tracking-[0.08em] text-[#D97746]">
              Station Time
            </p>
            <p className="font-[Newsreader] text-[20px] text-white">
              East Africa Time
            </p>
            <p className="font-[JetBrains_Mono] text-[12px] text-[#E6C9A9]/70">
              UTC +03:00 (Kampala)
            </p>
          </div>
          <a
            href="#contact"
            className="block text-center bg-[#F5F2EB] text-[#181614] py-2.5 font-[JetBrains_Mono] text-[10px] uppercase tracking-[0.08em] hover:bg-white transition-colors duration-200"
          >
            Contact
          </a>
        </div> */}
      </div>

      {/* Bottom copyright */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-6 border-t border-[#302D2A] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="font-[JetBrains_Mono] text-[11px] uppercase text-[#E6C9A9]/60">
          © {new Date().getFullYear()} Joshua Mukisa. All Rights Reserved
        </p>
        {/* <div className="flex items-center gap-4">
          <span className="font-[JetBrains_Mono] text-[11px] uppercase text-[#E6C9A9]/60">
            Built With React &amp; Tailwind
          </span>
          <span className="font-[JetBrains_Mono] text-[11px] text-[#E6C9A9]/60">
            ·
          </span>
          <span className="font-[JetBrains_Mono] text-[11px] uppercase text-[#E6C9A9]/60">
            Kampala, Uganda
          </span>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
