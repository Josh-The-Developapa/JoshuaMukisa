import React from 'react';
import VideraLogo from '../../assets/Videra Logo.png';
import VoteAbleLogo from '../../assets/VoteAble-Logo.jpg';
import ElectoralComission from '../../assets/Electoral Comission.png';
import UpLift from '../../assets/UpLift.jpg';

const experiences = [
  {
    title: 'Co-Founder',
    company: 'Videra Digital',
    period: 'May 2025 — Present',
    location: 'Kampala, Uganda',
    logo: VideraLogo,
    logoAlt: 'Videra Digital logo',
    achievements: [
      'Serve as Lead Frontend Engineer and Head of Operations; manage a team of 2 developers, 1 UI/UX designer, and a Head of Finance as full-time university students, establishing contribution structures and workflows that keep the team shipping consistently.',
      'Architect and maintain the entire frontend codebase across all Videra products, ensuring pixel-perfect, fully responsive implementations across devices.',
      'When the backend engineer stepped down, independently learned NestJS, Prisma, and Supabase within two weeks to ship a critical feature on schedule and meet a client commitment without delay.',
      'Drive all product direction, technical strategy, and company roadmap as a co-founder alongside engineering responsibilities.',
    ],
  },
  {
    title: 'CEO & Founder',
    company: 'VoteAble Inc.',
    period: 'July 2022 — Present',
    location: 'Kampala, Uganda',
    website: 'https://voteable.live',
    logo: VoteAbleLogo,
    logoAlt: 'VoteAble Inc. logo',
    achievements: [
      'Built and launched a full-stack multi-tenant e-voting platform that replaced a legacy system at Aga Khan High School Kampala, part of the global Aga Khan Education Services network, and has run every student council election without issue since 2022.',
      "Compressed the school's election cycle from one month to one week by centralising candidate vetting, voting, and real-time results in one platform.",
      'Engineered secure authentication, dynamic subdomain routing, school-scoped data isolation, real-time vote tallying, and granular role-based admin dashboards.',
      'Platform draws 2,000+ monthly visits during election season; pursuing annual school subscriptions as a monetisation model.',
    ],
  },
  {
    title: 'Electoral Data & Logistics Intern',
    company: 'Electoral Commission of Uganda',
    period: 'Jun 2022',
    location: 'Kampala, Uganda',
    website: 'https://ec.or.ug',
    logo: ElectoralComission,
    logoAlt: 'Electoral Commission of Uganda logo',
    achievements: [
      'Organized and distributed voter registration books to district heads during electoral processes.',
      'Supported election logistics and district coordination with administrative precision.',
      'Conducted data analysis in Excel to extract and interpret key registration trends.',
    ],
  },
  {
    title: 'Frontend Web Developer',
    company: 'UpLift Establishment Limited',
    period: 'Apr 2023 — Sep 2023',
    location: 'Mukono, Uganda',
    website: 'https://uplift-w81m.onrender.com',
    logo: UpLift,
    logoAlt: 'UpLift Establishment Limited logo',
    achievements: [
      'Built and developed a dynamic website from the ground up.',
      'Led UI revisions to improve user experience and interface design.',
      'Collaborated with the team to integrate gallery images, enhancing visual appeal and site functionality.',
    ],
  },
];

// Editorial-style logo mark: square, bordered, no rounding/gradients — matches JMMonogram treatment
const CompanyLogo = ({ logo, logoAlt, company }) => {
  if (!logo) return null;

  return (
    <div className="w-14 h-14 sm:w-16 sm:h-16 border border-[#DDD8CC] bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
      <img
        src={logo}
        alt={logoAlt || `${company} logo`}
        className="w-full h-full object-contain p-2"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div
        className="hidden w-full h-full bg-[#181614] text-[#F5F2EB] font-[Newsreader] text-[18px] items-center justify-center"
        style={{ display: 'none' }}
      >
        {company.charAt(0)}
      </div>
    </div>
  );
};

const ExperienceCard = ({ experience }) => (
  <div className="bg-white border border-[#DDD8CC] p-6 sm:p-8 lg:p-10">
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 lg:gap-10">
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-3 sm:gap-4 mb-1">
          <CompanyLogo
            logo={experience.logo}
            logoAlt={experience.logoAlt}
            company={experience.company}
          />
          <div className="flex flex-col">
            <h3 className="font-[Newsreader] text-[22px] sm:text-[26px] text-[#181614] leading-[1.15]">
              {experience.title}
            </h3>
            {experience.website ? (
              <a
                href={experience.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[JetBrains_Mono] text-[13px] text-[#D97746] hover:text-[#181614] transition-colors duration-200 w-fit"
              >
                {experience.company}
              </a>
            ) : (
              <span className="font-[JetBrains_Mono] text-[13px] text-[#706D66]">
                {experience.company}
              </span>
            )}
          </div>
        </div>
        <span className="font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.05em] text-[#706D66] mt-2">
          {experience.period}
        </span>
        {experience.location && (
          <span className="font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.05em] text-[#706D66]">
            {experience.location}
          </span>
        )}
      </div>

      <ul className="flex flex-col gap-2.5">
        {experience.achievements.map((point, i) => (
          <li
            key={i}
            className="flex gap-3 font-[Plus_Jakarta_Sans] text-[14px] sm:text-[15px] leading-[1.6] text-[#706D66]"
          >
            <span className="mt-2 w-1.5 h-1.5 bg-[#D97746] flex-shrink-0" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ExperienceSection = ({ sectionRef }) => {
  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-28 px-6 sm:px-8 lg:px-12 border-b border-[#DDD8CC] bg-[#F5F2EB]"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10 sm:gap-12">
        <div className="pb-6 border-b border-[#181614]">
          <h2 className="font-[Newsreader] font-light text-[40px] sm:text-[52px] tracking-[-0.02em] text-[#181614]">
            Work Experience
          </h2>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.company} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
