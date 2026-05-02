import React, { useEffect, useRef } from "react";

const educationData = [
  {
    id: "ST-2025",
    degree: "Master of Computer Applications",
    degreeShort: "MCA",
    from: "2025",
    to: "2027",
    institution: "Trident Academy of Creative Technology",
    gate: "TACT",
    seat: "01A",
    status: "BOARDING",
    flightClass: "Research",
    coursework: ["Cloud Computing", "Advanced Java", "AI/ML", "Software Eng."],
  },
  {
    id: "ST-2022",
    degree: "Bachelor of Science in Computer Science",
    degreeShort: "B.Sc CS",
    from: "2022",
    to: "2025",
    institution: "Banki Autonomous College",
    gate: "BAC",
    seat: "02A",
    status: "ARRIVED",
    flightClass: "Honors",
    coursework: ["Data Structures", "Algorithms", "DBMS", "Operating Systems"],
  },
];

/* Tiny barcode generator */
function Barcode() {
  const bars = Array.from({ length: 50 }, (_, i) => {
    const h = Math.random() * 18 + 14;
    const w = Math.random() > 0.3 ? 1.5 : 2.5;
    return <span key={i} style={{ display: "inline-block", width: w, height: h, background: "#111", opacity: 0.12 }} />;
  });
  return <div style={{ display: "flex", gap: 1.2, alignItems: "flex-end", height: 32 }}>{bars}</div>;
}

export function Education() {
  return (
    <>
      <section
        id="education"
        className="relative overflow-hidden"
        style={{ background: "#F0EDE6", paddingTop: 'clamp(5rem, 10vw, 10rem)', paddingBottom: 'clamp(5rem, 10vw, 10rem)', paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}
      >
        {/* ── Airport Departure Board Header ── */}
        <div className="pb-12 sm:pb-16 md:pb-20" style={{ maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto' }}>
          {/* Departure board strip */}
          <div className="flex items-center gap-3 mb-6" data-aos="fade-up">
            {/* Plane icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
              <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1L11 12l-2 3H6l-2 2 4-1 1-4 5-5" />
            </svg>
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-black/25">
              Departures · Academic Terminal
            </span>
          </div>

          <h2
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111]"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            Education
          </h2>
          <div className="w-12 h-px bg-black/10 mt-5" />
        </div>

        {/* ── Tickets ── */}
        <div className="flex flex-col gap-10 sm:gap-14" style={{ maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto' }}>
          {educationData.map((item, index) => (
            <div
              key={item.id}
              className="group"
              data-aos="fade-up"
              data-aos-delay={index * 120}
            >
              {/* ── TICKET CARD ── */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-[0_2px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:rotate-[-0.3deg] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">

                {/* Perforated cut line + semicircle cutouts */}
                <div className="hidden sm:block absolute right-[140px] md:right-[160px] top-0 bottom-0 w-px z-10"
                  style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 6px, #ddd 6px, #ddd 12px)" }}
                />
                {/* Top cutout */}
                <div className="hidden sm:block absolute right-[132px] md:right-[152px] -top-2 w-4 h-4 rounded-full z-10" style={{ background: "#F0EDE6" }} />
                {/* Bottom cutout */}
                <div className="hidden sm:block absolute right-[132px] md:right-[152px] -bottom-2 w-4 h-4 rounded-full z-10" style={{ background: "#F0EDE6" }} />

                <div className="flex flex-col sm:flex-row">

                  {/* ── LEFT: Main Ticket ── */}
                  <div className="flex-1 flex flex-col justify-between" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>

                    {/* Airline header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" className="opacity-40">
                          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1L11 12l-2 3H6l-2 2 4-1 1-4 5-5" />
                        </svg>
                        <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-black/30">
                          Soumyatech Airways
                        </span>
                      </div>
                      <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] uppercase text-black/20">
                        {item.id}
                      </span>
                    </div>

                    {/* Route: Year → Year */}
                    <div className="flex items-center gap-3 sm:gap-5" style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
                      <div>
                        <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-black/25 mb-1">Depart</p>
                        <p className="font-serif text-3xl sm:text-4xl font-bold text-[#111] leading-none">{item.from}</p>
                      </div>

                      {/* Flight path line with plane */}
                      <div className="flex-1 flex items-center gap-2 px-2">
                        <div className="w-2 h-2 rounded-full border-2 border-black/15" />
                        <div className="flex-1 h-px bg-black/10 relative">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#111" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
                            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                          </svg>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-black/15" />
                      </div>

                      <div>
                        <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-black/25 mb-1">Arrive</p>
                        <p className="font-serif text-3xl sm:text-4xl font-bold text-[#111] leading-none">{item.to}</p>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-3 mb-5">
                      <div>
                        <p className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] uppercase text-black/25">Passenger</p>
                        <p className="font-sans text-xs sm:text-sm font-semibold text-[#111] mt-0.5">Soumyaranjan</p>
                      </div>
                      <div>
                        <p className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] uppercase text-black/25">Destination</p>
                        <p className="font-sans text-xs sm:text-sm font-semibold text-[#111] mt-0.5">{item.degreeShort}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] uppercase text-black/25">Status</p>
                        <p className={`font-sans text-xs sm:text-sm font-semibold mt-0.5 ${item.status === "BOARDING" ? "text-black/60" : "text-black/40"}`}>{item.status}</p>
                      </div>
                      <div className="hidden sm:block">
                        <p className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] uppercase text-black/25">Gate</p>
                        <p className="font-sans text-xs sm:text-sm font-semibold text-[#111] mt-0.5">{item.gate}</p>
                      </div>
                    </div>

                    {/* Coursework as "baggage tags" */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.coursework.map(c => (
                        <span key={c} className="font-mono text-[8px] sm:text-[9px] tracking-wider uppercase text-black/30 bg-black/[0.03] px-2 py-0.5 rounded-sm">
                          {c}
                        </span>
                      ))}
                    </div>

                    {/* Barcode */}
                    <Barcode />
                  </div>

                  {/* ── RIGHT: Tear-off Stub ── */}
                  <div className="sm:w-[140px] md:w-[160px] bg-[#111] text-white p-5 sm:p-6 flex sm:flex-col items-center sm:items-center justify-between sm:justify-center gap-4 sm:gap-6 shrink-0">
                    <p className="font-serif text-xs sm:text-sm sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 tracking-wide text-center leading-snug flex-1 sm:flex-1">
                      {item.degree}
                    </p>
                    <div className="text-center shrink-0">
                      <p className="font-mono text-[8px] tracking-[0.15em] uppercase text-white/30 mb-1">Seat</p>
                      <p className="font-mono text-lg sm:text-xl font-bold">{item.seat}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        #education * {
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </>
  );
}
