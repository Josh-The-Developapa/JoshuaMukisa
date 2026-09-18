import React from 'react';

const cells = [
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
      { label: 'TensorFlow.js', value: 'Client Runtime' },
      { label: 'PyTorch / ResNet', value: 'Vision Modeling' },
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
    title: 'Tooling & Infrastructure',
    description:
      'Reproducible build pipelines, systems administration, and production-grade delivery workflows.',
    rows: [
      { label: 'Git / GitHub', value: 'Daily' },
      { label: 'VS Code', value: 'Fluent' },
      { label: 'Figma', value: 'Working' },
      { label: 'Postman', value: 'Advanced' },
    ],
  },
  {
    title: 'Venture Leadership',
    description:
      'Translating institutional needs into technical roadmaps, shipping software, and coordinating teams.',
    rows: [
      { label: 'Co-Founding (Videra)', value: 'Ongoing' },
      { label: 'Product Direction', value: 'Advanced' },
      { label: 'Team Coordination', value: 'Applied' },
    ],
  },
];

const Cell = ({ cell }) => (
  <div className="bg-white border border-[#DDD8CC] p-6 sm:p-8 flex flex-col justify-between gap-8 h-full">
    <div className="flex flex-col gap-3">
      <h3 className="font-[Newsreader] text-[22px] sm:text-[24px] text-[#181614]">
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
          className="flex items-center justify-between py-1 border-b border-[#F5F2EB] last:border-b-0"
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

const Skills = ({ sectionRef }) => {
  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-28 px-6 sm:px-8 lg:px-12 border-b border-[#DDD8CC] bg-[#F5F2EB]"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12 sm:gap-16">
        <div className="flex items-end justify-between gap-6 pb-6 border-b border-[#181614]">
          <h2 className="font-[Newsreader] font-light text-[40px] sm:text-[52px] tracking-[-0.02em] text-[#181614]">
            Technical Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cells.map((cell) => (
            <Cell key={cell.title} cell={cell} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
