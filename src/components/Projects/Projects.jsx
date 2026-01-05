import React from 'react';
import VoteAbleImg from '../../assets/VoteAble.png';
import CaderaImg from '../../assets/Cadera.png';
import CImageAIImg from '../../assets/CImage-AI.png';
import { Link } from 'react-router';

const projectsConfig = {
  title: 'Featured Projects',
  subtitle: '',
  projects: [
    {
      title: 'VoteAble',
      description:
        'An electronic voting system revolutionizing how schools in Uganda conduct student leadership elections. Already trusted and used by Aga Khan High School, Kampala.',
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
    {
      title: 'Cadera',
      description:
        'A complete School Information System that simplifies grading, reporting, teacher management, and academic workflows through a single, integrated platform.',
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
      statusText: 'Coming Out in 2026',
    },
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
    },
  ],
  viewAllButton: {
    text: 'View My GitHub',
    url: 'https://github.com/Josh-The-Developapa',
    icon: 'fas fa-arrow-right',
  },
};

// Enhanced Project Card with optimal 320px width
const ProjectCard = ({
  project,
  className = '',
  showTags = true,
  showActions = true,
  cardHoverEffect = 'hover:shadow-lg hover:-translate-y-2',
  tagLimit = null,
}) => {
  const {
    title,
    description,
    tags = [],
    image,
    liveUrl,
    caseStudyUrl,
    storeUrl,
    statusText,
  } = project;

  const displayTags = tagLimit ? tags.slice(0, tagLimit) : tags;

  return (
    <div
      className={`
        bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden 
        ${cardHoverEffect} ${className}
        w-full max-w-[320px] mx-auto
        sm:w-[320px] sm:max-w-none
      `}
    >
      {/* Project Snapshot Image */}
      {image && (
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={`${title} snapshot`}
            className="w-full h-48 sm:h-52 md:h-48 lg:h-52 xl:h-56 object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 line-clamp-2">
          {title}
        </h3>

        {/* <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3 sm:line-clamp-4 leading-relaxed"> */}
        <p className="text-gray-600 mb-4 text-sm sm:text-base">{description}</p>

        {/* Tags */}
        {showTags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {displayTags.map((tag, i) => (
              <span
                key={`tag-${i}`}
                className={`
                  px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium
                  ${tag.color} ${tag.textColor}
                  transition-all duration-200 hover:scale-105
                `}
              >
                {tag.name}
              </span>
            ))}
            {tagLimit && tags.length > tagLimit && (
              <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 bg-gray-50 rounded-full">
                +{tags.length - tagLimit} more
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="flex gap-2 sm:gap-3">
            {statusText ? (
              <div className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-center bg-gray-100 text-gray-500 font-medium cursor-not-allowed text-sm sm:text-base">
                {statusText}
              </div>
            ) : (
              <>
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-500 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-center hover:bg-blue-600 transition-all duration-300 font-medium text-sm sm:text-base hover:shadow-md"
                  >
                    Live Demo
                  </a>
                )}
                {storeUrl && (
                  <a
                    href={storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-center hover:bg-green-600 transition-all duration-300 font-medium text-sm sm:text-base hover:shadow-md"
                  >
                    App Store
                  </a>
                )}
              </>
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
  gridClassName = '', // This will be overridden by our responsive grid
  showViewAllButton = true,
  viewAllButtonVariant = 'outline',
  cardHoverEffect = 'hover:shadow-lg hover:-translate-y-2',
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
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

        {/* Enhanced Responsive Projects Grid - Optimized for 320px cards */}
        <div
          className={`
          grid gap-6 sm:gap-8 lg:gap-10
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-3
          2xl:grid-cols-4
          justify-items-center
          place-items-center
          ${gridClassName}
        `}
        >
          {displayProjects.map((project, index) => (
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

        {/* View All Button */}
        {showViewAllButton && config.viewAllButton && (
          <div className="text-center mt-10 sm:mt-12 lg:mt-16">
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
