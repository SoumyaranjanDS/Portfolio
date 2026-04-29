import React from "react";

const educationData = [
  {
    id: "01",
    degree: "Master of Computer Applications (MCA)",
    period: "2025 — 2027",
    institution: "Trident Academy of Creative Technology",
    description:
      "Advanced studies in computer applications, focusing on modern software engineering, system architecture, and advanced computing principles.",
  },
  {
    id: "02",
    degree: "Bachelor of Science in Computer Science",
    period: "2022 — 2025",
    institution: "Banki Autonomous College",
    description:
      "Foundation in computer science principles, data structures, algorithms, and core software development methodologies. Graduated with honors.",
  },
];

export function Education() {
  return (
    <section
      id="education"
      className="py-24 px-3 h-[90vh] flex items-center sm:py-32 bg-[#F9F9F8] text-[#111111] relative border-y border-black/5"
    >
      <div className="container-editorial max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24" data-aos="fade-up">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#111111]">
            Education
          </h2>
          <div className="w-12 h-px bg-black/20 mt-6" />
        </div>

        {/* Education List */}
        <div className="flex flex-col gap-16 md:gap-24 relative">
          {/* Subtle vertical connecting line on desktop */}
          <div className="hidden md:block absolute left-[25%] top-2 bottom-2 w-[1px] bg-black/5" />

          {educationData.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-6 md:gap-16 group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Timeline / Period */}
              <div className="md:w-1/4 shrink-0 flex items-start md:justify-end relative">
                {/* Connector Dot */}
                <div className="hidden md:block absolute right-[-32.5px] top-[10px] w-2 h-2 rounded-full bg-black/20 group-hover:bg-[#FF6B1A] transition-colors duration-500" />

                <p className="font-mono text-sm text-[#111111]/50 mt-1">
                  {item.period}
                </p>
              </div>

              {/* Details */}
              <div className="md:w-3/4 max-w-2xl">
                <h3 className="font-serif text-2xl md:text-3xl text-[#111111] mb-2 leading-snug">
                  {item.degree}
                </h3>

                <p className="font-sans text-xs md:text-sm uppercase tracking-[0.15em] text-[#111111]/60 mb-6 font-medium">
                  {item.institution}
                </p>

                <p className="font-sans text-sm md:text-base text-[#111111]/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
