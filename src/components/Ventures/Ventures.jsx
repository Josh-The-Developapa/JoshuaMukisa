import React from 'react';

import { ArrowIcon } from '../Header/Header';

import VoteAbleImg from '../../assets/VoteAble.png';
import CaderaImg from '../../assets/Cadera.png';
import CImageAIImg from '../../assets/CImage-AI.png';
import TumorVisionImg from '../../assets/TumorVision.webp';

const SpecRow = ({ label, value }) => (
  <div className="flex items-start justify-between gap-6 py-2 border-b border-[#DDD8CC] last:border-b-0">
    <span className="font-[JetBrains_Mono] text-[11px] sm:text-[12px] text-[#706D66] flex-shrink-0">
      {label}
    </span>

    <span className="font-[JetBrains_Mono] text-[11px] sm:text-[12px] font-medium text-[#181614] text-right">
      {value}
    </span>
  </div>
);

const CasePlate = ({ image, alt }) => (
  <div className="bg-white border border-[#181614] p-2 w-full">
    <div className="aspect-[16/10] bg-[#181614] overflow-hidden flex items-center justify-center">
      {image ? (
        <img src={image} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.1em] text-[#F5F2EB]/40">
          {alt}
        </span>
      )}
    </div>
  </div>
);

const CaseStudy = ({
  reverse = false,
  eyebrow,
  title,
  description,
  specs,
  image,
  primaryAction,
  secondaryAction,
}) => (
  <article className="bg-white border border-[#DDD8CC] grid grid-cols-1 lg:grid-cols-2">
    <div
      className={`p-8 sm:p-12 flex flex-col justify-between gap-8 ${
        reverse ? 'lg:order-2' : ''
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-[Newsreader] text-[30px] sm:text-[36px] text-[#181614]">
            {title}
          </h3>

          <p className="font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.05em] text-[#706D66]">
            {eyebrow}
          </p>
        </div>

        <p className="font-[Plus_Jakarta_Sans] text-[15px] sm:text-[16px] leading-[1.55] text-[#706D66]">
          {description}
        </p>

        <div className="bg-[#F5F2EB] border border-[#DDD8CC] p-4">
          {specs.map((row) => (
            <SpecRow key={row.label} {...row} />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#DDD8CC]">
        {primaryAction && (
          <a
            href={primaryAction.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#181614] text-[#F5F2EB] px-5 py-2.5 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.08em] hover:bg-[#302D2A] transition-colors duration-200"
          >
            {primaryAction.text}
            {/* <ArrowIcon /> */}
          </a>
        )}

        {secondaryAction && secondaryAction.href ? (
          <a
            href={secondaryAction.href}
            onClick={secondaryAction.onClick}
            className="inline-flex items-center gap-2 border border-[#181614] text-[#181614] px-5 py-2.5 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.08em] hover:bg-[#181614] hover:text-[#F5F2EB] transition-colors duration-200"
          >
            {secondaryAction.text}
            {/* <ArrowIcon /> */}
          </a>
        ) : secondaryAction ? (
          <span className="font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.08em] text-[#706D66]">
            {secondaryAction.text}
          </span>
        ) : null}
      </div>
    </div>

    <div
      className={`bg-[#EFECE4] p-8 sm:p-12 flex items-center ${
        reverse
          ? 'lg:order-1 lg:border-r border-[#DDD8CC]'
          : 'lg:border-l border-[#DDD8CC]'
      }`}
    >
      <CasePlate image={image} alt={title} />
    </div>
  </article>
);

const MiniCase = ({ eyebrow, title, description, image, link }) => (
  <article className="bg-white border border-[#DDD8CC] p-8 sm:p-10 flex flex-col justify-between gap-6 h-full">
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="font-[Newsreader] text-[26px] sm:text-[28px] text-[#181614]">
          {title}
        </h3>

        <p className="font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.05em] text-[#706D66]">
          {eyebrow}
        </p>
      </div>

      <div className="bg-[#EFECE4] border border-[#181614] p-2">
        <div className="aspect-[16/10] bg-white overflow-hidden flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.1em] text-[#181614]/30">
              {title}
            </span>
          )}
        </div>
      </div>

      <p className="font-[Plus_Jakarta_Sans] text-[13px] sm:text-[14px] leading-[1.6] text-[#706D66]">
        {description}
      </p>
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-[#DDD8CC]">
      <span className="font-[JetBrains_Mono] text-[12px] font-medium text-[#181614]">
        {link.status}
      </span>

      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.05em] text-[#D97746] hover:text-[#181614] transition-colors duration-200"
      >
        {link.text}
        {/* <ArrowIcon className="w-2 h-2" /> */}
      </a>
    </div>
  </article>
);

const Ventures = ({ sectionRef }) => {
  return (
    <section
      id="ventures"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-28 px-6 sm:px-8 lg:px-12 border-b border-[#DDD8CC] bg-[#F5F2EB]"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12 sm:gap-16">
        <div className="flex items-end justify-between gap-6 pb-6 border-b border-[#181614]">
          <h2 className="font-[Newsreader] font-light text-[40px] sm:text-[52px] tracking-[-0.02em] text-[#181614]">
            Ventures &amp; Flagship Works
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          <CaseStudy
            eyebrow="Cloud-Based School Information System"
            title="Cadera"
            description="A cloud-based School Information System built to give schools a single place to manage academic data and turn it into useful information. Cadera brings grading, reporting, analytics, attendance, and student records into one system, replacing scattered spreadsheets and paper-based workflows with structured, accessible data."
            specs={[
              {
                label: 'STACK',
                value: 'React · NestJS · Prisma · Supabase',
              },
              {
                label: 'ARCHITECTURE',
                value: 'Multi-tenant cloud platform',
              },
              {
                label: 'CORE FOCUS',
                value: 'Academic data & reporting',
              },
              {
                label: 'DEPLOYMENT',
                value: 'Makarios Junior School',
              },
            ]}
            image={CaderaImg}
            primaryAction={{
              text: 'Visit Cadera.app',
              href: 'https://cadera.app',
            }}
            secondaryAction={{
              text: 'In Production — Makarios Junior School',
            }}
          />

          <CaseStudy
            reverse
            eyebrow="Electronic Voting Platform"
            title="VoteAble"
            description="An electronic voting platform I built after my school had to rerun a student council election. VoteAble replaces paper ballots and manual counting with a controlled digital election process, allowing schools to register voters, conduct elections, and produce results quickly and transparently."
            specs={[
              {
                label: 'STACK',
                value: 'React · Node.js · Express · MongoDB',
              },
              {
                label: 'SECURITY',
                value: 'JWT authentication · Unique voter tokens',
              },
              {
                label: 'DEPLOYED',
                value: 'Aga Khan High School, since 2022',
              },
              {
                label: 'SCOPE',
                value: 'Student council elections',
              },
            ]}
            image={VoteAbleImg}
            primaryAction={{
              text: 'Visit VoteAble.live',
              href: 'https://voteable.live',
            }}
            secondaryAction={{
              text: 'In Production — Aga Khan High School',
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <MiniCase
            eyebrow="Browser-Based Computer Vision"
            title="CImage AI"
            description="An experiment in bringing image classification directly into the browser. CImage AI uses TensorFlow.js and a lightweight MobileNet model to perform inference on the client, exploring what machine learning applications can do without sending images to a remote inference server."
            image={CImageAIImg}
            link={{
              status: 'On GitHub',
              text: 'View Repository',
              href: 'https://github.com/Josh-The-Developapa/CImage-AI',
            }}
          />

          <MiniCase
            eyebrow="Brain Tumor Classification"
            title="TumorVision"
            description="A series of computer vision models exploring automated brain tumor classification from medical images. The latest generation, TVRN50, uses approximately 23.64M parameters and achieved 92.16% accuracy on its test dataset."
            image={TumorVisionImg}
            link={{
              status: 'TVRN50 · 92.16% test accuracy',
              text: 'View Repository',
              href: 'https://github.com/Josh-The-Developapa/TumorVision',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Ventures;
