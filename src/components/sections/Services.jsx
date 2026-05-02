import { useEffect, useRef, useState } from 'react';

const servicesData = [
  {
    num: '01',
    title: 'Frontend Engineering',
    desc: 'Crafting ultra-performant, cinematic user interfaces using React, WebGL, and advanced CSS composition.',
    color: '#E74C3C',
    position: { left: '5%', top: '8%' },
    rotation: -3,
  },
  {
    num: '02',
    title: 'Full Stack Architecture',
    desc: 'Designing robust, scalable backend systems with Node.js, Express, FastAPI, and complex database clustering.',
    color: '#2980B9',
    position: { left: '52%', top: '5%' },
    rotation: 2.5,
  },
  {
    num: '03',
    title: 'Machine Learning & AI',
    desc: 'Training and deploying predictive models, integrating generative AI, and building intelligent triage platforms.',
    color: '#27AE60',
    position: { left: '8%', top: '52%' },
    rotation: 1.8,
  },
  {
    num: '04',
    title: 'Creative & UI/UX Design',
    desc: 'Translating brand identity into pixel-perfect, high-contrast visual systems and micro-interactions.',
    color: '#F39C12',
    position: { left: '55%', top: '50%' },
    rotation: -2,
  }
];

/* Thread connections between cards (index pairs) */
const threads = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [0, 3],
];

export function Services() {
  const boardRef = useRef(null);
  const [pinPositions, setPinPositions] = useState([]);

  /* Calculate pin center positions for SVG threads */
  useEffect(() => {
    const updatePins = () => {
      if (!boardRef.current) return;
      const board = boardRef.current;
      const rect = board.getBoundingClientRect();
      const cards = board.querySelectorAll('.eb-card');
      const positions = [];
      cards.forEach(card => {
        const pin = card.querySelector('.eb-pin');
        if (pin) {
          const pinRect = pin.getBoundingClientRect();
          positions.push({
            x: pinRect.left - rect.left + pinRect.width / 2,
            y: pinRect.top - rect.top + pinRect.height / 2,
          });
        }
      });
      setPinPositions(positions);
    };

    // Delay to allow layout + AOS animations to settle
    const timer = setTimeout(updatePins, 1200);
    const timer2 = setTimeout(updatePins, 2500);
    window.addEventListener('resize', updatePins);
    return () => { clearTimeout(timer); clearTimeout(timer2); window.removeEventListener('resize', updatePins); };
  }, []);

  return (
    <section id="services" className="relative overflow-hidden" style={{ background: '#6B5240', paddingTop: 'clamp(5rem, 10vw, 10rem)', paddingBottom: 'clamp(5rem, 10vw, 10rem)', paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}>

      {/* Cork texture overlay */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='c'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Subtle wood grain overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.3) 40px, rgba(0,0,0,0.3) 41px)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 pb-10 gap-2 sm:pb-14" style={{ maxWidth: '64rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="flex items-center gap-3 mb-4" data-aos="fade-up">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/25">
            Investigation Board · Case File #04
          </span>
        </div>
        <h2
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/90"
          data-aos="fade-up"
          data-aos-delay="50"
        >
          Services
        </h2>
        <div className="w-12 h-px bg-white/10 mt-5" />
      </div>

      {/* ── THE BOARD ── */}
      {/* Desktop: absolute positioned cards. Mobile: stacked column */}
      <div className="relative z-10" style={{ maxWidth: '64rem', marginLeft: 'auto', marginRight: 'auto' }}>

        {/* Desktop Board */}
        <div
          ref={boardRef}
          className="hidden md:block relative"
          style={{ height: '680px' }}
        >
          {/* SVG Threads */}
          {pinPositions.length === servicesData.length && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-1">
              {threads.map(([from, to], i) => (
                <line
                  key={i}
                  x1={pinPositions[from]?.x}
                  y1={pinPositions[from]?.y}
                  x2={pinPositions[to]?.x}
                  y2={pinPositions[to]?.y}
                  stroke="#C0392B"
                  strokeWidth="1.8"
                  opacity="0.55"
                  strokeDasharray={i % 2 === 0 ? "none" : "4 3"}
                />
              ))}
            </svg>
          )}

          {/* Cards */}
          {servicesData.map((service, index) => (
            <div
              key={service.num}
              className="eb-card absolute z-2 w-[42%] max-w-[380px]"
              style={{
                left: service.position.left,
                top: service.position.top,
                transform: `rotate(${service.rotation}deg)`,
              }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Card service={service} />
            </div>
          ))}
        </div>

        {/* Mobile: Stacked Cards */}
        <div className="md:hidden flex flex-col" style={{ gap: 'clamp(2rem, 5vw, 3rem)' }}>
          {servicesData.map((service, index) => (
            <div
              key={service.num}
              className="eb-card relative"
              style={{ transform: `rotate(${service.rotation * 0.4}deg)` }}
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <Card service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Individual Index Card ── */
function Card({ service }) {
  return (
    <div className="relative bg-[#FFFFF5] shadow-[2px_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[4px_8px_32px_rgba(0,0,0,0.22)] hover:scale-[1.02] hover:rotate-0 transition-all duration-400 ease-out cursor-default group"
      style={{ transformOrigin: 'top center', padding: 'clamp(1.5rem, 4vw, 2.2rem)' }}
    >
      {/* Push pin */}
      <div className="eb-pin absolute -top-2 left-1/2 -translate-x-1/2 z-10">
        <div
          className="w-5 h-5 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
          style={{
            background: `radial-gradient(circle at 40% 35%, ${service.color}, ${service.color}cc)`,
          }}
        />
        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-[2px] h-[5px] bg-[#888]" />
      </div>

      {/* Card header */}
      <div className="flex items-center justify-between pt-3" style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
        <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-black">
          Evidence #{service.num}
        </span>
        <div className="w-2 h-2 rounded-full opacity-60" style={{ background: service.color }} />
      </div>

      {/* Title */}
      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#222] leading-snug" style={{ marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}>
        {service.title}
      </h3>

      {/* Description */}
      <p className="font-sans text-xs sm:text-sm text-[#666] leading-relaxed">
        {service.desc}
      </p>

      {/* Bottom accent line */}
      <div style={{ marginTop: 'clamp(1rem, 2vw, 1.5rem)' }} className="h-[2px] w-8 rounded-full opacity-30 group-hover:w-12 transition-all duration-300">
        <div className="h-full w-full rounded-full" style={{ background: service.color }} />
      </div>
    </div>
  );
}
