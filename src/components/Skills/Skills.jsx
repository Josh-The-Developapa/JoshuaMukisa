import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

const cells = [
  {
    title: 'Frontend & UI',
    description:
      'Component-driven interfaces built for craft as much as function, from layout systems to motion and interaction detail.',
    rows: [
      { label: 'React.js', value: 'Advanced' },
      { label: 'Tailwind CSS', value: 'Advanced' },
      { label: 'Material UI', value: 'Production' },
      { label: 'Bootstrap', value: 'Production' },
      { label: 'HTML / CSS', value: 'Advanced' },
    ],
  },
  {
    title: 'Systems & Backends',
    description:
      'Constructing end-to-end resilient web services with strict contract guarantees and low payload overhead.',
    rows: [
      { label: 'Node.js / Express', value: 'Advanced' },
      { label: 'NestJS', value: 'Advanced' },
      { label: 'REST APIs', value: 'Production' },
      { label: 'JavaScript', value: 'Advanced' },
    ],
  },
  {
    title: 'Data Architecture',
    description:
      'High-throughput relational normalization, row-level tenant security, and atomic transactional integrity.',
    rows: [
      { label: 'PostgreSQL', value: 'Row-Level Security' },
      { label: 'MongoDB', value: 'Schema Design' },
      { label: 'Prisma ORM', value: 'Migrations' },
      { label: 'Supabase', value: 'Advanced' },
    ],
  },
  {
    title: 'Applied ML & Vision',
    description:
      'Local machine learning deployed directly to client hardware to preserve privacy and bypass GPU server costs.',
    rows: [
      { label: 'PyTorch / ResNet', value: 'Vision Modeling' },
      { label: 'TensorFlow.js', value: 'Client Runtime' },
      { label: 'MobileNet', value: 'Edge Inference' },
      { label: 'NumPy / Pandas', value: 'Moderate' },
    ],
  },
  {
    title: 'Embedded & Firmware',
    description:
      'Bridging the digital world with environmental reality through microcontroller programming and telemetry.',
    rows: [
      { label: 'C++ & Arduino', value: 'Advanced' },
      { label: 'Sensor Interfacing', value: 'Applied' },
      { label: 'Low-Power Telemetry', value: 'Design Stage' },
    ],
  },
  {
    title: 'Tooling & Workflow',
    description:
      'Reproducible build pipelines, interface prototyping, and production-grade delivery workflows.',
    rows: [
      { label: 'Git / GitHub', value: 'Daily' },
      { label: 'Figma', value: 'Working' },
      { label: 'VS Code', value: 'Fluent' },
      { label: 'Postman', value: 'Advanced' },
      { label: 'Python', value: 'Moderate' },
    ],
  },
];

const Cell = ({ cell }) => (
  <div
    data-reveal
    className="flex h-full flex-col justify-between gap-8 border border-[#DDD8CC] bg-white p-[clamp(1.5rem,3vw,2rem)]"
  >
    <div className="flex flex-col gap-3">
      <h3 className="font-[Newsreader] text-[clamp(1.375rem,2vw,1.5rem)] text-[#181614]">
        {cell.title}
      </h3>
      <p className="font-[Plus_Jakarta_Sans] text-[12px] leading-[1.6] text-[#706D66]">
        {cell.description}
      </p>
    </div>
    <div className="flex flex-col gap-2">
      {cell.rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between border-b border-[#F5F2EB] py-1 last:border-b-0"
        >
          <span className="font-[JetBrains_Mono] text-[12px] text-[#181614]">
            {row.label}
          </span>
          <span className="font-[JetBrains_Mono] text-[12px] text-[#706D66]">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Skills
 *
 * A six-up grid is where per-element animation gets noisy, so the reveal
 * is batched: whatever row of cards enters together animates together.
 */
const Skills = ({ sectionRef }) => {
  const scope = useScrollReveal({ y: 24, stagger: 0.07 });

  return (
    <section
      id="skills"
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
            Technical Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-[clamp(1.5rem,3vw,2rem)] sm:grid-cols-2 lg:grid-cols-3">
          {cells.map((cell) => (
            <Cell key={cell.title} cell={cell} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
