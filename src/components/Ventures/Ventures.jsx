import React, { useLayoutEffect, useRef } from 'react';
import { ArrowIcon } from '../Header/Header';

import VoteAbleImg from '../../assets/VoteAble.png';
import CaderaImg from '../../assets/Cadera.png';
import CImageAIImg from '../../assets/CImage-AI.png';
import TumorVisionImg from '../../assets/TumorVision.webp';

import { gsap, prefersReducedMotion } from '../../lib/gsap';

const SpecRow = ({ label, value }) => (
  <div className="flex items-start justify-between gap-6 border-b border-[#DDD8CC] py-2 last:border-b-0">
    <span className="flex-shrink-0 font-[JetBrains_Mono] text-[11px] text-[#706D66] sm:text-[12px]">
      {label}
    </span>
    <span className="text-right font-[JetBrains_Mono] text-[11px] font-medium text-[#181614] sm:text-[12px]">
      {value}
    </span>
  </div>
);

const CasePlate = ({ image, alt }) => (
  <div className="w-full  bg-white">
    <div className="flex items-center justify-center">
      {image ? (
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
        />
      ) : (
        <span className="p-6 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.1em] text-[#181614]/30">
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
  <article
    data-case
    className="grid grid-cols-1 border border-[#DDD8CC] bg-white lg:grid-cols-2"
  >
    <div
      className={`flex flex-col justify-between gap-8 p-[clamp(2rem,4vw,3rem)] ${
        reverse ? 'lg:order-2' : ''
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-[Newsreader] text-[clamp(1.875rem,3vw,2.25rem)] text-[#181614]">
            {title}
          </h3>
          <p className="font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.05em] text-[#706D66]">
            {eyebrow}
          </p>
        </div>

        <p className="max-w-[62ch] font-[Plus_Jakarta_Sans] text-[clamp(0.9375rem,1.2vw,1rem)] leading-[1.55] text-[#706D66]">
          {description}
        </p>

        <div className="border border-[#DDD8CC] bg-[#F5F2EB] p-4">
          {specs.map((row) => (
            <SpecRow key={row.label} {...row} />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-[#DDD8CC] pt-4">
        {primaryAction && (
          <a
            href={primaryAction.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#181614] px-5 py-2.5 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.08em] text-[#F5F2EB] transition-colors duration-200 hover:bg-[#302D2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97746]"
          >
            {primaryAction.text}
            {/* <ArrowIcon /> */}
          </a>
        )}
        {secondaryAction && secondaryAction.href ? (
          <a
            href={secondaryAction.href}
            onClick={secondaryAction.onClick}
            className="inline-flex items-center gap-2 border border-[#181614] px-5 py-2.5 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.08em] text-[#181614] transition-colors duration-200 hover:bg-[#181614] hover:text-[#F5F2EB]"
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
      className={`flex items-center bg-[#EFECE4] p-4 sm:p-8 lg:p-[clamp(2rem,4vw,3rem)] ${
        reverse
          ? 'border-[#DDD8CC] lg:order-1 lg:border-r'
          : 'border-[#DDD8CC] lg:border-l'
      }`}
    >
      <CasePlate image={image} alt={title} />
    </div>
  </article>
);

const MiniCase = ({ eyebrow, title, description, image, link }) => (
  <article
    data-mini
    className="flex h-full flex-col justify-between gap-6 border border-[#DDD8CC] bg-white p-[clamp(2rem,3vw,2.5rem)]"
  >
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="font-[Newsreader] text-[clamp(1.625rem,2.4vw,1.75rem)] text-[#181614]">
          {title}
        </h3>
        <p className="font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.05em] text-[#706D66]">
          {eyebrow}
        </p>
      </div>

      <div className=" bg-[#EFECE4] p-2">
        <div className="flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          ) : (
            <span className="font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.1em] text-[#181614]/30">
              {title}
            </span>
          )}
        </div>
      </div>

      <p className="font-[Plus_Jakarta_Sans] text-[clamp(0.8125rem,1.1vw,0.875rem)] leading-[1.6] text-[#706D66]">
        {description}
      </p>
    </div>

    <div className="flex items-center justify-between border-t border-[#DDD8CC] pt-4">
      <span className="font-[JetBrains_Mono] text-[12px] font-medium text-[#181614]">
        {link.status}
      </span>
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.05em] text-[#D97746] transition-colors duration-200 hover:text-[#181614]"
      >
        {link.text}
        {/* <ArrowIcon className="h-2 w-2" /> */}
      </a>
    </div>
  </article>
);

/**
 * Ventures
 *
 * Choreography: the section rule wipes in, each case study rises once
 * as it enters the viewport. Screenshots render at their natural aspect
 * ratio, scaled to the width of their plate — nothing is cropped.
 */
const Ventures = ({ sectionRef }) => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context((self) => {
      const q = self.selector;

      const heading = q('[data-section-head]')[0];
      if (heading) {
        gsap.from(heading, {
          opacity: 0,
          y: 24,
          scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
        });
        gsap.from(q('[data-section-rule]')[0], {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.1,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
        });
      }

      [...q('[data-case]'), ...q('[data-mini]')].forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 36,
          duration: 0.9,
          scrollTrigger: { trigger: card, start: 'top 84%', once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ventures"
      ref={sectionRef}
      className="box-border w-full overflow-x-clip border-b border-[#DDD8CC] bg-[#F5F2EB] px-[clamp(1.5rem,5vw,3rem)] py-[clamp(4rem,9vh,7rem)]"
    >
      <div
        ref={rootRef}
        className="mx-auto flex w-full max-w-[1280px] flex-col gap-[clamp(3rem,5vw,4rem)]"
      >
        <div className="relative pb-6">
          <h2
            data-section-head
            className="font-[Newsreader] text-[clamp(2.5rem,4.5vw,3.25rem)] font-light tracking-[-0.02em] text-[#181614]"
          >
            Ventures &amp; Flagship Works
          </h2>
          <span
            data-section-rule
            aria-hidden="true"
            className="absolute bottom-0 left-0 block h-px w-full bg-[#181614]"
          />
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
                value: 'Makarios School',
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
                value: 'Aga Khan High School, Makarios School',
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
              text: 'In Production — Aga Khan High School, Makarios School',
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
