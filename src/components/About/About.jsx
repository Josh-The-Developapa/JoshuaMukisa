import React, { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

const pillars = [
  {
    // label: 'Pillar 01',
    title: 'Build to Learn',
    description:
      'I learn by building. Every project starts with a problem, a gap, or simply a question I want to answer.',
  },
  {
    // label: 'Pillar 02',
    title: 'Technology for Africa',
    description:
      'Building technology that solves real problems here, rather than simply importing solutions built for somewhere else.',
  },
  {
    // label: 'Pillar 03',
    title: 'Data as Infrastructure',
    description:
      'Software is only part of the equation. The systems that collect, organize, and make sense of data are what allow institutions to grow.',
  },
];

const PillarCard = ({ pillar }) => (
  <div data-pillar className="border border-[#DDD8CC] bg-white p-4">
    <p className="mb-2 font-[JetBrains_Mono] text-[10px] uppercase tracking-[0.05em] text-[#D97746]">
      {pillar.label}
    </p>
    <h4 className="mb-1 font-[Newsreader] text-[16px] text-[#181614]">
      {pillar.title}
    </h4>
    <p className="font-[Plus_Jakarta_Sans] text-[12px] leading-[1.4] text-[#706D66]">
      {pillar.description}
    </p>
  </div>
);

/**
 * About
 *
 * Choreography: the spine (heading + intro) leads, the pillar cards follow
 * as a staggered set, and the essay blocks rise one at a time as you read
 * down. The quote's accent rule draws itself — the section's one flourish.
 */
const About = ({ sectionRef }) => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context((self) => {
      const q = self.selector;

      const reveal = (targets, trigger, vars = {}) => {
        if (!targets || !targets.length) return;
        gsap.from(targets, {
          opacity: 0,
          y: 28,
          duration: 0.85,
          stagger: 0.09,
          scrollTrigger: { trigger, start: 'top 85%', once: true },
          ...vars,
        });
      };

      reveal(q('[data-spine]'), q('[data-spine]')[0]);
      reveal(q('[data-pillar]'), q('[data-pillars]')[0], { y: 20 });

      // Essay blocks each trigger off themselves, so the reading rhythm
      // follows the scroll instead of firing all at once.
      q('[data-essay]').forEach((block) => reveal([block], block, { y: 24 }));

      const rule = q('[data-quote-rule]')[0];
      if (rule) {
        gsap.from(rule, {
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: q('[data-quote]')[0],
            start: 'top 80%',
            once: true,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="box-border w-full overflow-x-clip border-b border-[#DDD8CC] bg-[#F5F2EB] px-[clamp(1.5rem,5vw,3rem)] py-[clamp(4rem,9vh,7rem)]"
    >
      <div
        ref={rootRef}
        className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-[clamp(3rem,5vw,4rem)] lg:grid-cols-[318px_minmax(0,1fr)]"
      >
        {/* Left: chapter spine */}
        <div className="flex flex-col gap-10 border-l-2 border-[#181614] pl-[clamp(1.25rem,2.5vw,2rem)] lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col gap-3">
            <h2
              data-spine
              className="font-[Newsreader] text-[clamp(2rem,4.2vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-[#181614]"
            >
              The Story <br />
              So Far
            </h2>
            <p
              data-spine
              className="font-[Plus_Jakarta_Sans] text-[14px] leading-[1.6] text-[#706D66]"
            >
              A documented account of my journey and exploration of my craft,
              and the pursuit of infrastructure that outlives its builder.
            </p>
          </div>

          <div
            data-pillars
            className="flex flex-col gap-4 border-t border-[#DDD8CC] pt-8"
          >
            {pillars.map((pillar) => (
              <PillarCard key={pillar.label} pillar={pillar} />
            ))}
          </div>
        </div>

        {/* Right: narrative essay */}
        <div className="flex min-w-0 flex-col gap-6">
          <p
            data-essay
            className="font-[Newsreader] text-[clamp(1.5rem,2.6vw,1.75rem)] italic leading-[1.3] text-[#1E293B]"
          >
            I got into tech in March 2020, during Uganda&apos;s first COVID
            lockdown. I was thirteen, bored out of my mind, dreaming big like
            the Zuckerbergs and Gates of the world, but knowing absolutely
            nothing about how any of it worked.
          </p>

          <p
            data-essay
            className="max-w-[70ch] font-[Plus_Jakarta_Sans] text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.65] text-[#706D66]"
          >
            So I started teaching myself. At first it was YouTube tutorials,
            online courses, and whatever coding apps I could find. I didn&apos;t
            have a mentor or a roadmap. I learned something, tried to build with
            it, hit a wall, learned some more, and repeated the process.
          </p>

          <blockquote
            data-quote
            data-essay
            className="relative flex flex-col gap-4 bg-[#EFECE4] p-[clamp(1.5rem,3vw,2rem)]"
          >
            {/* Accent rule as an element so it can draw on entry. */}
            <span
              data-quote-rule
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-[4px] bg-[#D97746]"
            />
            <p className="font-[Newsreader] text-[clamp(1.375rem,2.5vw,1.6875rem)] leading-[1.3] text-[#181614]">
              &quot;Learn what you need. Build what you can. Then learn what
              comes next.&quot;
            </p>
            {/* <cite className="font-[JetBrains_Mono] text-[11px] uppercase not-italic tracking-[0.08em] text-[#706D66]">
              — Joshua Mukisa, Architectural Dispatch, Kampala
            </cite> */}
          </blockquote>

          <p
            data-essay
            className="max-w-[70ch] font-[Plus_Jakarta_Sans] text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.65] text-[#706D66]"
          >
            VoteAble was the first project that made that approach real. After
            my school had to rerun its student council elections because of
            problems with the existing voting system, some friends dared me to
            build something better. I agreed as a joke, forgot about it, and
            then spent the next few months realizing I actually had to build the
            thing.
          </p>

          <p
            data-essay
            className="max-w-[70ch] font-[Plus_Jakarta_Sans] text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.65] text-[#706D66]"
          >
            I had no idea what I was doing. So I learned what I needed, built
            the next piece, broke something else, learned again, and kept going
            until the platform worked. VoteAble launched in 2022 and has since
            run student council elections at Aga Khan High School Kampala,
            becoming my first real experience turning software into something
            people depend on.
          </p>

          <p className="max-w-[70ch] font-[Plus_Jakarta_Sans] text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.65] text-[#706D66]">
            Since then, I&apos;ve built across full-stack software, AI/ML, and
            IoT, continually expanding the range of problems I can solve. Today,
            I work across both engineering and entrepreneurship, including
            Cadera, a cloud-based School Information System built for
            East-African schools, while continuing to develop VoteAble toward a
            wider market.
          </p>

          <p className="max-w-[70ch] font-[Plus_Jakarta_Sans] text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.65] text-[#706D66]">
            But the bigger ambition has never really changed. I want to see
            Africans move from being consumers of technology to builders of it.
            Not just adapting systems designed elsewhere, but creating the
            infrastructure, companies, and ideas that shape what comes next.{' '}
            <br /> <br />
            Wakanda is the goal!
          </p>

          {/* <div
            data-essay
            className="mt-4 flex flex-col gap-4 border-t border-[#DDD8CC] pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-[JetBrains_Mono] text-[12px] text-[#706D66]">
                Co-Founder &amp; Architect
              </span>
              <span className="font-[JetBrains_Mono] text-[12px] font-medium text-[#181614]">
                Joshua Mukisa // Chief Architect
              </span>
            </div>
            <div className="flex flex-col gap-0.5 sm:text-right">
              <span className="font-[JetBrains_Mono] text-[12px] text-[#706D66]">
                Origin Coordinates
              </span>
              <span className="font-[JetBrains_Mono] text-[12px] font-medium text-[#181614]">
                Kampala, Central Region, Uganda
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;
