import React from 'react';

const aboutConfig = {
  title: 'About Me',
  subtitle: '',
  whoAmI: {
    heading: 'Who I Am',
    description:
      "I got into tech back in March 2020, during Uganda's first COVID lockdown. I was thirteen, bored out of my mind, dreaming big like the Zuckerbergs and Gates of the world, but knowing absolutely nothing. So I taught myself using YouTube tutorials, janky coding apps, and online courses. I just kept building. One of those projects became my first real venture: a successful e-voting platform that showed me I was capable of a lot more. For the first time, I could call myself a CEO. Since then, I've just kept learning, building, and leveling up. My goal is to see more Africans in the global tech conversation, not just as users, but as leaders and pioneers.",
    image: {
      src: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      alt: 'Alex working',
    },
  },
  expertise: [
    {
      title: 'Full-Stack Development',
      description:
        'Expertise in both frontend and backend technologies to deliver complete solutions.',
      icon: 'fas fa-code',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500',
    },
    {
      title: 'AI & Machine Learning',
      description:
        'Building and training ML models with PyTorch and TensorFlow, plus integrating pre-trained models into custom apps.',
      icon: 'fas fa-brain',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-500',
    },
    {
      title: 'IoT & Embedded Systems',
      description:
        'Developing real-world hardware-software solutions using Arduino and sensor interfacing for IoT projects.',
      icon: 'fas fa-microchip',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500',
    },
    {
      title: 'UI/UX Design',
      description:
        'Designing intuitive, aesthetic user experiences with Figma, currently honing skills toward mastery.',
      icon: 'fas fa-pencil-ruler',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-500',
    },
  ],
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/Josh-The-Developapa',
      icon: 'fab fa-github',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/joshua-mukisa/',
      icon: 'fab fa-linkedin',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/jmuks_k/',
      icon: 'fab fa-instagram',
    },
    {
      name: 'Resume',
      url: '/joshua-mukisa-resume.pdf',
      icon: 'fas fa-file-alt',
    },
  ],
};

const SectionHeader = ({ title, subtitle = '', className = '' }) => (
  <div className={`text-center mb-4 sm:mb-6 ${className}`}>
    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{title}</h2>
    {subtitle && (
      <p className="text-gray-600 text-sm sm:text-base">{subtitle}</p>
    )}
    <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-2" />
  </div>
);

const ProfileImage = ({ image }) => (
  <div className="h-full w-full">
    <img
      src={image.src}
      alt={image.alt}
      className="w-full h-full object-cover"
    />
  </div>
);

const ExpertiseCard = ({ expertise }) => (
  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center mb-2">
      <div
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${expertise.iconBg} flex items-center justify-center mr-3 flex-shrink-0`}
      >
        <i
          className={`${expertise.icon} ${expertise.iconColor} text-sm sm:text-base`}
        ></i>
      </div>
      <h4 className="font-medium text-sm sm:text-base">{expertise.title}</h4>
    </div>
    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
      {expertise.description}
    </p>
  </div>
);

const SocialLink = ({ link }) => (
  <a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-300 text-sm sm:text-base py-1"
  >
    <i className={`${link.icon} mr-2 w-4 text-center`}></i>
    <span className="truncate">{link.name}</span>
  </a>
);

const AboutSection = ({
  config = aboutConfig,
  sectionId = 'about',
  sectionRef,
}) => {
  return (
    <section className="w-full bg-gray-50" ref={sectionRef} id={sectionId}>
      {/* Mobile-first approach with flex container */}
      <div className="flex flex-col lg:flex-row w-full">
        {/* Image Section - will match content height on desktop */}
        <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-[950px]">
          <ProfileImage image={config.whoAmI.image} />
        </div>

        {/* Content Section - this determines the height */}
        <div className="w-full lg:w-1/2 flex items-start justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <div className="w-full max-w-lg xl:max-w-xl">
            <SectionHeader title={config.title} subtitle={config.subtitle} />

            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4">
              {config.whoAmI.heading}
            </h3>

            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed text-justify">
              {config.whoAmI.description}
            </p>

            {/* Expertise Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-4 xl:gap-6 mb-4 sm:mb-6">
              {config.expertise.map((expertise, index) => (
                <ExpertiseCard
                  key={`expertise-${index}`}
                  expertise={expertise}
                />
              ))}
            </div>

            {/* Social Links - Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-3">
              {config.socialLinks.map((link, index) => (
                <SocialLink key={`social-${index}`} link={link} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
