import React from 'react';
import VoteAbleImg from '../../assets/VoteAble.png';
import CaderaImg from '../../assets/Cadera.png';
import CImageAIImg from '../../assets/CImage-AI.png';
import AquaSenseImg from '../../assets/AquaSense.webp'; // add this asset
import TumorVisionImg from '../../assets/TumorVision.webp'; // add this asset
import { Link } from 'react-router';

const projectsConfig = {
  title: 'Featured Projects',
  subtitle: '',
  projects: [
    {
      title: 'Cadera',
      description:
        'A complete School Information System that simplifies grading, reporting, teacher management, and academic workflows through a single, integrated platform. Currently used by Makarios Schools.',
      tags: [
        { name: 'React', color: 'bg-blue-100', textColor: 'text-blue-700' },
        { name: 'NestJS', color: 'bg-green-100', textColor: 'text-green-700' },
        {
          name: 'Supabase',
          color: 'bg-yellow-100',
          textColor: 'text-yellow-700',
        },
        {
          name: 'Prisma',
          color: 'bg-purple-100',
          textColor: 'text-purple-700',
        },
      ],
      image: CaderaImg,
      statusText: '',
      liveUrl: 'https://cadera.app',
    },
    {
      title: 'VoteAble',
      description:
        'An electronic voting system revolutionizing how schools conduct student leadership elections. Trusted by schools including Aga Khan High School, Kampala, and Makarios Schools.',
      tags: [
        { name: 'React', color: 'bg-blue-100', textColor: 'text-blue-700' },
        { name: 'Node.js', color: 'bg-green-100', textColor: 'text-green-700' },
        {
          name: 'Express.js',
          color: 'bg-gray-100',
          textColor: 'text-gray-700',
        },
        {
          name: 'MongoDB',
          color: 'bg-purple-100',
          textColor: 'text-purple-700',
        },
        { name: 'JWT Auth', color: 'bg-red-100', textColor: 'text-red-700' },
      ],
      image: VoteAbleImg,
      statusText: '',
      liveUrl: 'https://voteable.live',
    },

    // {
    //   title: 'AquaSense',
    //   description:
    //     'A low-cost, Arduino-based water level monitoring system for real-time water level detection, data logging, and alerting — built for sanitation, flood prevention, and water conservation applications.',
    //   tags: [
    //     { name: 'Arduino', color: 'bg-teal-100', textColor: 'text-teal-700' },
    //     { name: 'C++', color: 'bg-blue-100', textColor: 'text-blue-700' },
    //     {
    //       name: 'PlatformIO',
    //       color: 'bg-orange-100',
    //       textColor: 'text-orange-700',
    //     },
    //     { name: 'IoT', color: 'bg-gray-100', textColor: 'text-gray-700' },
    //   ],
    //   image: AquaSenseImg,
    //   statusText: '',
    //   githubUrl: 'https://github.com/Josh-The-Developapa/AquaSense-Arduino',
    // },
    {
      title: 'CImage AI',
      description:
        'A lightweight image classification app that uses TensorFlow.js and MobileNet on the backend to identify objects from user-uploaded images. Fast and responsive.',
      tags: [
        { name: 'React', color: 'bg-blue-100', textColor: 'text-blue-700' },
        { name: 'Node.js', color: 'bg-green-100', textColor: 'text-green-700' },
        {
          name: 'Tensorflow.js',
          color: 'bg-pink-100',
          textColor: 'text-pink-700',
        },
        { name: 'MobileNet', color: 'bg-gray-100', textColor: 'text-gray-700' },
      ],
      image: CImageAIImg,
      statusText: 'On GitHub only',
      githubUrl: 'https://github.com/Josh-The-Developapa/CImage-AI',
    },
    {
      title: 'TumorVision',
      description:
        'A generational family of models advancing oncology and medical diagnosis of brain tumours. The current generation, TVRN50, runs ~23.64M parameters and hits 92.16% accuracy on test data.',
      tags: [
        { name: 'PyTorch', color: 'bg-red-100', textColor: 'text-red-700' },
        {
          name: 'ResNet50',
          color: 'bg-purple-100',
          textColor: 'text-purple-700',
        },
        { name: 'CNN', color: 'bg-pink-100', textColor: 'text-pink-700' },
        {
          name: 'Python',
          color: 'bg-yellow-100',
          textColor: 'text-yellow-700',
        },
      ],
      image: TumorVisionImg,
      statusText: '',
      githubUrl: 'https://github.com/Josh-The-Developapa/TumorVision',
    },
  ],
  viewAllButton: {
    text: 'View My GitHub',
    url: 'https://github.com/Josh-The-Developapa',
    icon: 'fas fa-arrow-right',
  },
};

// Stacked project card: image full-width on top, content below.
// The image only ever has its width constrained (height: auto), so it
// always renders at its true aspect ratio — no cropping, no letterbox
// bars, at any screen size. Cards are fluid (sized by the grid column,
// not a fixed px width), so they scale up on larger screens.
const ProjectCard = ({
  project,
  className = '',
  showTags = true,
  showActions = true,
  cardHoverEffect = 'hover:shadow-lg hover:-translate-y-1',
  tagLimit = null,
}) => {
  const {
    title,
    description,
    tags = [],
    image,
    liveUrl,
    githubUrl,
    storeUrl,
    statusText,
  } = project;

  const displayTags = tagLimit ? tags.slice(0, tagLimit) : tags;
  const hasAction = liveUrl || storeUrl || githubUrl;

  return (
    <div
      className={`
        bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden
        flex flex-col h-full
        ${cardHoverEffect} ${className}
      `}
    >
      {/* Image — width-only sizing, so the full landscape shot always shows */}
      {image && (
        <div className="w-full overflow-hidden">
          <img
            src={image}
            alt={`${title} snapshot`}
            className="w-full h-auto block transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5 sm:p-6 lg:p-7 xl:p-8 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {title}
          </h3>
          {statusText && !hasAction && (
            <span className="shrink-0 mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
              {statusText}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-4">
          {description}
        </p>

        {showTags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {displayTags.map((tag, i) => (
              <span
                key={`tag-${i}`}
                className={`
                  px-3 py-1 rounded-full text-xs sm:text-sm font-medium
                  ${tag.color} ${tag.textColor}
                `}
              >
                {tag.name}
              </span>
            ))}
            {tagLimit && tags.length > tagLimit && (
              <span className="px-3 py-1 text-xs sm:text-sm text-gray-500 bg-gray-50 rounded-full">
                +{tags.length - tagLimit} more
              </span>
            )}
          </div>
        )}

        {showActions && hasAction && (
          <div className="flex gap-3 mt-auto">
            {liveUrl && (
              <Link
                to={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center bg-blue-500 text-white py-2.5 px-5 rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium text-sm sm:text-base hover:shadow-md"
              >
                Live Demo
              </Link>
            )}

            {storeUrl && (
              <Link
                to={storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center bg-green-500 text-white py-2.5 px-5 rounded-lg hover:bg-green-600 transition-all duration-300 font-medium text-sm sm:text-base hover:shadow-md"
              >
                App Store
              </Link>
            )}

            {!liveUrl && githubUrl && (
              <Link
                to={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center bg-gray-900 text-white py-2.5 px-5 rounded-lg hover:bg-gray-700 transition-all duration-300 font-medium text-sm sm:text-base hover:shadow-md"
              >
                View Code
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function ProjectsSection({
  config = projectsConfig,
  sectionId = 'projects',
  sectionRef,
  containerClassName = '',
  gridClassName = '',
  showViewAllButton = true,
  viewAllButtonVariant = 'outline',
  cardHoverEffect = 'hover:shadow-lg hover:-translate-y-1',
  maxProjects = null,
  showCardTags = true,
  showCardActions = true,
  tagLimit = null,
}) {
  const displayProjects = maxProjects
    ? config.projects.slice(0, maxProjects)
    : config.projects;

  return (
    <section
      id={sectionId}
      ref={sectionRef}
      className={`py-12 sm:py-16 lg:py-20 bg-gray-50 ${containerClassName}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">
            {config.title}
          </h2>
          {config.subtitle && (
            <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {config.subtitle}
            </p>
          )}
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/*
          Fixed 2x2 grid from `sm` up — cards are fluid within their
          column (not a fixed px width), so they grow as the container
          grows on larger screens instead of staying pinned at 320px.
        */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 items-stretch ${gridClassName}`}
        >
          {displayProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              showTags={showCardTags}
              showActions={showCardActions}
              cardHoverEffect={cardHoverEffect}
              tagLimit={tagLimit}
            />
          ))}
        </div>

        {showViewAllButton && config.viewAllButton && (
          <div className="text-center mt-10 sm:mt-12 lg:mt-14">
            <Link
              to={config.viewAllButton.url}
              target="_blank"
              className={`
                inline-flex items-center px-6 sm:px-8 py-3 sm:py-4
                font-medium rounded-lg transition-all duration-300
                text-sm sm:text-base
                ${
                  viewAllButtonVariant === 'solid'
                    ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-0.5'
                    : viewAllButtonVariant === 'ghost'
                      ? 'text-blue-500 hover:text-blue-700 hover:bg-blue-50 border border-transparent hover:border-blue-200'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md'
                }
              `}
            >
              {config.viewAllButton.text}
              {config.viewAllButton.icon && (
                <i
                  className={`${config.viewAllButton.icon} ml-2 transition-transform duration-300 group-hover:translate-x-1`}
                ></i>
              )}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
