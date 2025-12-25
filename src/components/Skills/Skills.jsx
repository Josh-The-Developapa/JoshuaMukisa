import React from 'react';

// Configuration object for easy modification
const skillsConfig = {
  title: 'Technical Skills',
  subtitle: 'These are the tools I build with, and the traits I lead with',
  primarySkills: [
    {
      name: 'React.js',
      level: 'Advanced',
      icon: 'fab fa-react',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      name: 'Node.js',
      level: 'Advanced',
      icon: 'fab fa-node-js',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-500',
    },
    {
      name: 'Express.js',
      level: 'Advanced',
      icon: 'fas fa-network-wired',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-700',
    },
    {
      name: 'MongoDB',
      level: 'Advanced',
      icon: 'fas fa-database',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-700',
    },
    {
      name: 'JavaScript',
      level: 'Advanced',
      icon: 'fab fa-js',
      iconBg: 'bg-yellow-50',
      iconColor: 'text-yellow-500',
    },
    {
      name: 'Python',
      level: 'Advanced',
      icon: 'fab fa-python',
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-500',
    },
    {
      name: 'C++',
      level: 'Advanced',
      icon: 'fas fa-code',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-700',
    },
    {
      name: 'Arduino',
      level: 'Advanced',
      icon: 'fas fa-microchip',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-700',
    },
    {
      name: 'PyTorch',
      level: 'Moderate',
      icon: 'fas fa-fire',
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
    },
  ],
  additionalSkills: [
    'Microsoft Excel',
    'Microsoft Word',
    'Microsoft PowerPoint',
    'Notion (Organization)',
    'HTML',
    'CSS',
    'Figma',
    'Git',
    'GitHub',
    'VS Code',
    'NumPy',
    'Pandas',
    'Matplotlib',
    'REST APIs',
    'Postman',
  ],
  softSkills: [
    'Creativity',
    'Problem Solving',
    'Inquisitiveness',
    'Adaptability',
    'Jovial',
    'Lively',
    'Fast Learner',
    'Work Ethic',
    'Discipline',
    'Initiative',
  ],
};

// Reusable Skill Badge Component with responsive design
const SkillBadge = ({ skill, className = '' }) => (
  <div
    className={`skill-badge bg-white p-4 sm:p-5 lg:p-6 rounded-xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-center ${className}`}
  >
    <div
      className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 ${skill.iconBg} rounded-full flex items-center justify-center`}
    >
      <i
        className={`${skill.icon} ${skill.iconColor} text-xl sm:text-2xl lg:text-3xl`}
      ></i>
    </div>
    <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
      {skill.name}
    </h3>
    <p className="text-gray-500 text-xs sm:text-sm">{skill.level}</p>
  </div>
);

// Reusable Skill Tag Component with responsive text
const SkillTag = ({ skill, className = '' }) => (
  <span
    className={`px-3 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs sm:text-sm transition-colors duration-200 cursor-default ${className}`}
  >
    {skill}
  </span>
);

// Reusable Section Header Component with responsive typography
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

// Skill Category Card for better organization
const SkillCategory = ({ title, children, className = '' }) => (
  <div
    className={`bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
  >
    <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center sm:text-left">
      {title}
    </h3>
    {children}
  </div>
);

// Main Skills Section Component with full responsiveness
const SkillsSection = ({
  config = skillsConfig,
  sectionId = 'skills',
  containerClassName = '',
  gridClassName = '',
  showAdditionalSkills = true,
  sectionRef,
}) => {
  return (
    <section
      id={sectionId}
      ref={sectionRef}
      className={`py-15 bg-gray-50 ${containerClassName}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={config.title} subtitle={config.subtitle} />

        {/* Primary Skills Grid - Fully Responsive */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 ${gridClassName}`}
        >
          {config.primarySkills.map((skill, index) => (
            <SkillBadge key={`skill-${index}`} skill={skill} />
          ))}
        </div>

        {/* Additional Skills and Soft Skills Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Additional Skills */}
          {showAdditionalSkills &&
            config.additionalSkills &&
            config.additionalSkills.length > 0 && (
              <SkillCategory title="Additional Skills & Tools">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {config.additionalSkills.map((skill, index) => (
                    <SkillTag key={`additional-skill-${index}`} skill={skill} />
                  ))}
                </div>
              </SkillCategory>
            )}

          {/* Soft Skills */}
          {config.softSkills && config.softSkills.length > 0 && (
            <SkillCategory title="Soft Skills">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {config.softSkills.map((skill, index) => (
                  <SkillTag key={`soft-skill-${index}`} skill={skill} />
                ))}
              </div>
            </SkillCategory>
          )}
        </div>

        {/* Skills Summary for Large Screens */}
        <div className="hidden xl:block mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4">Skills Overview</h4>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {
                      config.primarySkills.filter((s) => s.level === 'Advanced')
                        .length
                    }
                  </div>
                  <p className="text-gray-600">Advanced Skills</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {config.additionalSkills?.length +
                      config.primarySkills?.length || 0}
                  </div>
                  <p className="text-gray-600">Tools & Technologies</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {config.softSkills?.length || 0}
                  </div>
                  <p className="text-gray-600">Soft Skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Export the main component
export default SkillsSection;

// Also export sub-components for maximum flexibility
export { SkillBadge, SkillTag, SectionHeader, skillsConfig };
