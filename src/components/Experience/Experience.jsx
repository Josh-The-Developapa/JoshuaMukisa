import React from 'react';

import useScrollReveal from '../../hooks/useScrollReveal';

import CaderaLogo from '../../assets/Cadera-Logo.png';
import VoteAbleLogo from '../../assets/VoteAble-Logo.jpg';
import ElectoralComission from '../../assets/Electoral Comission.png';
import UpLift from '../../assets/UpLift.jpg';

const experiences = [
  {
    title: 'Co-Founder & Director',
    // company: 'Cadera Cloud Solutions Ltd',
    company: 'Cadera Cloud Solutions Ltd',
    period: 'May 2025 — Present',
    location: 'Kampala, Uganda',
    logo: CaderaLogo,
    logoAlt: 'Cadera Cloud Solutions logo',
    achievements: [
      'Lead the engineering side of Cadera, from designing and building the product to maintaining it as it is used by schools.',
      'Build and maintain the frontend while also working across the backend and database when the problem requires it, using React, NestJS, Prisma, and Supabase.',
      'Set the product direction with the founding team, deciding what we build, what we improve, and what we take to schools.',
      'Run day-to-day operations with a small team of developers, design, and finance, putting the workflows and structure in place that keep the company moving.',
      'Work directly with schools during onboarding and deployment, turning what administrators and teachers need into changes to the product.',
    ],
  },

  {
    title: 'CEO & Founder',
    company: 'VoteAble',
    period: 'July 2022 — Present',
    location: 'Kampala, Uganda',
    website: 'https://voteable.live',
    logo: VoteAbleLogo,
    logoAlt: 'VoteAble logo',
    achievements: [
      'Built VoteAble from scratch after my school had to rerun a student council election, then took responsibility for running the elections myself while I was still a student.',
      'Run the technical and operational side of school elections, working with administrators and student leaders from preparation and voter registration through voting and the release of results.',
      'Build and maintain the platform behind the operation, including authentication, voter management, school-specific data, election administration, and real-time results.',
      'Expanded VoteAble from its first deployment at Aga Khan High School to support elections at other schools, adapting the platform and the way elections are run as it grows.',
      'After graduating, established a team within Aga Khan to continue running the elections without me being physically present, while I continue to oversee the platform and its operation.',
    ],
  },

  {
    title: 'Electoral Data & Logistics Intern',
    company: 'Electoral Commission of Uganda',
    period: 'June 2022',
    location: 'Kampala, Uganda',
    website: 'https://ec.or.ug',
    logo: ElectoralComission,
    logoAlt: 'Electoral Commission of Uganda logo',
    achievements: [
      'Supported the distribution and organization of voter registration materials across districts during an active electoral period.',
      'Worked with electoral staff on logistics, district coordination, and the administrative work behind voter registration.',
      'Used Excel to organize and analyse registration data and identify trends for electoral reporting.',
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
      'Designed and built the company website from the ground up.',
      'Worked on the interface and user experience, making revisions to the site as the company’s needs evolved.',
      'Managed the integration and presentation of the company’s visual content, including its gallery.',
    ],
  },
];
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

/**
 * Experience
 *
 * One reveal per card, batched — cards that share the viewport stagger
 * together. No per-bullet animation; that reads as a loading spinner.
 */
const ExperienceSection = ({ sectionRef }) => {
  const scope = useScrollReveal({ y: 30, stagger: 0.1 });

  return (
    <section
      id="experience"
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
            Work Experience
          </h2>
        </div>

        <div className="flex flex-col gap-[clamp(1.5rem,3vw,2rem)]">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.company} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
