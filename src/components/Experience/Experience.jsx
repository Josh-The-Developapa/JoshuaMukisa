import React from 'react';
import DEI from '../../assets/DEI BioPharm Ltd.png';
import UpLift from '../../assets/UpLift.jpg';
import ElectoralComission from '../../assets/Electoral Comission.png';
import VoteAbleLogo from '../../assets/VoteAble-Logo.jpg';
import VideraLogo from '../../assets/Videra Logo.png';
import CaderaLogo from '../../assets/Cadera Logo.png';
import MakariosLogo from '../../assets/makarios.png';
import AgaKhanLogo from '../../assets/Aga-Khan.png';
import { Link } from 'react-router';

// Configuration object with company logos
const experienceConfig = {
  title: 'Work Experience',
  subtitle: '',
  experiences: [
    {
      title: 'Co-Founder',
      company: 'Videra Digital',
      period: 'May 2025 - Present',
      location: '',
      logo: VideraLogo,
      website: '',
      logoAlt: 'Videra Logo',
      showInShowcase: false, // Control showcase visibility per experience
      achievements: [
        'Co-founded Videra Digital, a SaaS company focused on building scalable data management ecosystems.',
        'Led frontend engineering across Videra products, translating UI/UX designs into performant, responsive, production-ready interfaces',
        'Spearheaded the development of Cadera, a School Information System used by real institutions to manage grading, reporting, and academic workflows',
        'Collaborated cross-functionally on product direction, system architecture, and long-term technical strategy as a co-founder',
      ],
    },
    {
      title: 'CEO & Founder',
      company: 'VoteAble Inc',
      period: 'July 2022 - Present',
      location: '',
      logo: VoteAbleLogo,
      website: 'https://voteable.live',
      logoAlt: 'VoteAble Logo',
      showInShowcase: false, // Control showcase visibility per experience
      achievements: [
        "Founded and led a full-stack e-voting platform for Ugandan schools' student council elections",
        "Architected and developed VoteAble's core codebase as the principal software engineer",
        'Managed daily operations and coordinated a team of classmates to drive product development and launch',
        'Successfully launched the platform at Aga Khan High School Kampala in 2022, with plans to expand to other schools',
        'Monetized the platform through a subscription-based service, creating a sustainable revenue model',
        'Gained hands-on experience in project management, team leadership, and stakeholder collaboration',
      ],
    },
    {
      title: 'Electoral Data & Logistics Intern',
      company: 'Electoral Commission of Uganda',
      period: 'Jun 2022',
      location: 'Kampala, Uganda',
      logo: ElectoralComission,
      website: 'https://ec.or.ug',
      logoAlt: 'Electoral Commission of Uganda Logo',
      showInShowcase: true,
      achievements: [
        'Organized and distributed voter registration books to district heads during electoral processes',
        'Supported election logistics and district coordination with administrative precision',
        'Conducted data analysis in Excel to extract and interpret key registration trends',
        'Leveraged technology to deliver data-driven insights for decision-making support',
      ],
    },
    {
      title: 'Frontend Web developer',
      company: 'UpLift Establishment Limited',
      period: 'Apr 2023 - Sep 2023',
      location: 'Mukono, Uganda',
      logo: UpLift,
      website: 'https://uplift-w81m.onrender.com',
      logoAlt: 'UpLift Establishment Limited Logo',
      showInShowcase: true,
      achievements: [
        'Built and developed a dynamic website from the ground up',
        'Led UI revisions to improve user experience and interface design',
        'Collaborated with the team to integrate gallery images, enhancing visual appeal and site functionality',
        'Strengthened web development skills and teamwork through project collaboration',
        'Gained exposure to cutting-edge web technologies and tools',
      ],
    },
  ],
  additionalClients: [
    {
      name: 'Makarios Junior School',
      logo: MakariosLogo,
      logoAlt: 'Makarios-Logo',
      showInShowcase: true,
    },
    {
      name: 'Aga Khan High School',
      logo: AgaKhanLogo,
      logoAlt: 'Aga-Khan-Logo',
      showInShowcase: true,
    },
  ],
};

// Reusable Section Header Component
const SectionHeader = ({ title, subtitle = '', className = '' }) => (
  <div className={`text-center mb-8 sm:mb-12 lg:mb-16 ${className}`}>
    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto px-4">
        {subtitle}
      </p>
    )}
    <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
  </div>
);

// Company Logo Component
const CompanyLogo = ({
  logo,
  logoAlt,
  company,
  className = '',
  width = 'w-20',
  height = 'h-15',
}) => {
  if (!logo) return null;

  return (
    <div className={`flex-shrink-0 ${className}`}>
      <div
        className={`${width} ${height} rounded-lg overflow-hidden bg-white shadow-sm border border-gray-100 flex items-center justify-center`}
      >
        <img
          src={logo}
          alt={logoAlt || `${company} logo`}
          className="w-full h-full object-contain p-1"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div
          className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg items-center justify-center rounded"
          style={{ display: 'none' }}
        >
          {company.charAt(0)}
        </div>
      </div>
    </div>
  );
};

// Flowing Company Logo Component for showcase
const FlowingCompanyLogo = ({
  logo,
  logoAlt,
  company,
  width = 'w-32',
  height = 'h-24',
}) => {
  if (!logo) return null;

  return (
    <div className="flex-shrink-0 mx-8">
      <div
        className={`${width} ${height} rounded-xl overflow-hidden bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
      >
        <img
          src={logo}
          alt={logoAlt || `${company} logo`}
          className="w-full h-full object-contain p-3"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div
          className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-2xl items-center justify-center rounded-xl"
          style={{ display: 'none' }}
        >
          {company.charAt(0)}
        </div>
      </div>
    </div>
  );
};

// Reusable Timeline Dot Component
const TimelineDot = ({
  dotColor = 'bg-blue-500',
  dotSize = 'w-4 h-4 sm:w-4 sm:h-4',
  borderColor = 'border-white',
  className = '',
}) => (
  <div
    className={`absolute ${dotSize} ${dotColor} rounded-full -left-[25px] sm:-left-[9px] lg:-left-[32.5px] mt-2 border-2 ${borderColor} ${className}`}
  ></div>
);

// Reusable Experience Card Component with Logo
const ExperienceCard = ({
  experience,
  showDot = true,
  dotColor = 'bg-blue-500',
  cardClassName = '',
  headerClassName = '',
  metaClassName = '',
  achievementsClassName = '',
  linkComponent: LinkComponent = Link, // Allow custom link component
}) => (
  <div className="mb-8 sm:mb-12 relative">
    {showDot && <TimelineDot dotColor={dotColor} />}
    <div
      className={`bg-gray-50 hover:bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${cardClassName}`}
    >
      {/* Header with Logo */}
      <div className={`flex items-start gap-4 mb-4 ${headerClassName}`}>
        {experience.website ? (
          <LinkComponent to={experience.website} target="_blank">
            <CompanyLogo
              logo={experience.logo}
              logoAlt={experience.logoAlt}
              company={experience.company}
            />
          </LinkComponent>
        ) : (
          <CompanyLogo
            logo={experience.logo}
            logoAlt={experience.logoAlt}
            company={experience.company}
          />
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
              {experience.title}
            </h3>
            {experience.website ? (
              <LinkComponent
                to={experience.website}
                target="_blank"
                className="text-blue-500 font-medium text-sm sm:text-base flex-shrink-0"
              >
                {experience.company}
              </LinkComponent>
            ) : (
              <span className="text-gray-700 font-medium text-sm sm:text-base flex-shrink-0">
                {experience.company}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Meta Information */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center text-gray-500 text-xs sm:text-sm mb-4 gap-2 sm:gap-4 ${metaClassName}`}
      >
        <span className="flex items-center">
          <i className="fas fa-calendar-alt mr-2 text-blue-400"></i>
          {experience.period}
        </span>
        {experience.location && (
          <span className="flex items-center">
            <i className="fas fa-map-marker-alt mr-2 text-red-400"></i>
            {experience.location}
          </span>
        )}
      </div>

      {/* Achievements */}
      {experience.achievements && experience.achievements.length > 0 && (
        <ul
          className={`list-disc pl-5 text-gray-600 space-y-1.5 sm:space-y-2 text-sm sm:text-base ${achievementsClassName}`}
        >
          {experience.achievements.map((achievement, index) => (
            <li key={`achievement-${index}`} className="leading-relaxed">
              {achievement}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

// Reusable Timeline Container Component
const TimelineContainer = ({
  children,
  lineColor = 'border-gray-200',
  className = '',
}) => (
  <div className={`relative pl-4 sm:pl-6 border-l-2 ${lineColor} ${className}`}>
    {children}
  </div>
);

// Modified CompanyShowcase Component - now filters based on showInShowcase flag
const CompanyShowcase = ({
  experiences,
  additionalClients = [],
  className = '',
  logoWidth = 'w-32',
  logoHeight = 'h-24',
  animationSpeed = '60s',
  showcaseTitle = 'Proud to have worked with',
}) => {
  // Filter experiences that should be shown in showcase
  const showcaseExperiences = experiences.filter(
    (exp) => exp.logo && exp.showInShowcase !== false
  );

  // Filter additional clients that should be shown
  const showcaseClients = additionalClients.filter(
    (client) => client.logo && client.showInShowcase !== false
  );

  // Combine filtered companies
  const allCompanies = [...showcaseExperiences, ...showcaseClients];

  if (allCompanies.length === 0) return null;

  // Duplicate the logos to create seamless loop
  const duplicatedCompanies = [
    ...allCompanies,
    ...allCompanies,
    ...allCompanies,
  ];

  return (
    <div className={`mt-12 sm:mt-16 ${className}`}>
      <div className="text-center mb-8 sm:mb-12">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
          {showcaseTitle}
        </h3>
        <div className="w-16 sm:w-20 h-0.5 bg-gray-300 mx-auto"></div>
      </div>

      {/* Flowing Container */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-50 py-8 rounded-2xl">
        <div
          className="flex items-center animate-flow"
          style={{
            animation: `flow ${animationSpeed} linear infinite`,
            width: 'max-content',
          }}
        >
          {duplicatedCompanies.map((company, index) => (
            <FlowingCompanyLogo
              key={`flowing-company-${index}`}
              logo={company.logo}
              logoAlt={
                company.logoAlt || `${company.company || company.name} logo`
              }
              company={company.company || company.name}
              width={logoWidth}
              height={logoHeight}
            />
          ))}
        </div>

        {/* Gradient Overlays for smooth edges */}
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
      </div>

      <style jsx>{`
        @keyframes flow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-flow {
          animation: flow ${animationSpeed} linear infinite;
        }

        .animate-flow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

// Updated ExperienceSection - more configurable and reusable
const ExperienceSection = ({
  config = experienceConfig,
  sectionId = 'experience',
  sectionRef,
  containerClassName = '',
  timelineClassName = '',
  showTimeline = true,
  showCompanyShowcase = true,
  timelineLineColor = 'border-gray-200',
  dotColor = 'bg-blue-500',
  cardLayout = 'default',
  showcaseLogoWidth = 'w-40',
  showcaseLogoHeight = 'h-30',
  showcaseAnimationSpeed = '40s',
  showcaseTitle = 'Proud to have worked with',
  additionalClients,
  linkComponent, // Allow passing custom link component
}) => {
  // Use additionalClients from props if provided, otherwise use from config
  const clientsToShow =
    additionalClients !== undefined
      ? additionalClients
      : config.additionalClients;

  const renderExperiences = () => {
    const experienceElements = config.experiences.map((experience, index) => (
      <ExperienceCard
        key={`experience-${index}`}
        experience={experience}
        showDot={showTimeline}
        dotColor={dotColor}
        linkComponent={linkComponent}
        cardClassName={
          cardLayout === 'compact'
            ? 'p-3 sm:p-4'
            : cardLayout === 'detailed'
            ? 'p-6 sm:p-8'
            : ''
        }
      />
    ));

    if (showTimeline) {
      return (
        <TimelineContainer
          lineColor={timelineLineColor}
          className={timelineClassName}
        >
          {experienceElements}
        </TimelineContainer>
      );
    }

    return (
      <div className={`space-y-6 sm:space-y-8 ${timelineClassName}`}>
        {experienceElements}
      </div>
    );
  };

  return (
    <section
      id={sectionId}
      ref={sectionRef}
      className={`py-8 sm:py-12 lg:py-16 xl:py-10 bg-white ${containerClassName}`}
    >
      <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={config.title} subtitle={config.subtitle} />
        {renderExperiences()}

        {showCompanyShowcase && (
          <CompanyShowcase
            experiences={config.experiences}
            additionalClients={clientsToShow}
            logoWidth={showcaseLogoWidth}
            logoHeight={showcaseLogoHeight}
            animationSpeed={showcaseAnimationSpeed}
            showcaseTitle={showcaseTitle}
          />
        )}
      </div>
    </section>
  );
};

// Export the main component
export default ExperienceSection;

// Also export sub-components for maximum flexibility
export {
  SectionHeader,
  ExperienceCard,
  TimelineContainer,
  TimelineDot,
  CompanyLogo,
  CompanyShowcase,
  experienceConfig,
};
