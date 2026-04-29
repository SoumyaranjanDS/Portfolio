import { useEffect } from 'react';
import AOS from 'aos';

const servicesData = [
  {
    num: '01',
    title: 'FRONTEND ENGINEERING',
    desc: 'Crafting ultra-performant, cinematic user interfaces using React, WebGL, and advanced CSS composition.'
  },
  {
    num: '02',
    title: 'FULL STACK ARCHITECTURE',
    desc: 'Designing robust, scalable backend systems with Node.js, Express, FastAPI, and complex database clustering.'
  },
  {
    num: '03',
    title: 'MACHINE LEARNING & AI',
    desc: 'Training and deploying predictive models, integrating generative AI, and building intelligent triage platforms.'
  },
  {
    num: '04',
    title: 'CREATIVE & UI/UX DESIGN',
    desc: 'Translating brand identity into pixel-perfect, high-contrast visual systems and micro-interactions.'
  }
];

export function Services() {
  return (
    <section id="services" className="services-section h-[90vh] flex items-center justify-between bg-white py-20 md:py-32 relative text-black overflow-hidden">
      <div className="w-full px-10 md:px-12 lg:px-24 mx-auto">
        
        {/* Subtle Label */}
        <div className="w-full mb-12 md:mb-16" data-aos="fade-up">
          <div className="font-sans text-xs font-bold tracking-widest uppercase text-black/40 border-b border-black/10 pb-4">
             Offerings
          </div>
        </div>

        {/* Brutalist List */}
        <div className="services-list w-full flex flex-col">
          {servicesData.map((service, index) => (
            <div 
              key={service.num} 
              className="service-row group relative border-b border-black/10 py-10 md:py-24 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-16 cursor-crosshair overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Animated Hover Background Fill */}
              <div className="service-bg-fill absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] z-0"></div>

              {/* Left Group: Number + Title */}
              <div className="flex flex-col px-5 md:flex-row md:items-center gap-4 md:gap-8 relative z-10 w-full md:w-[45%] lg:w-[40%] xl:w-[35%] shrink-0">
                <span className="font-mono text-xl md:text-2xl text-primary group-hover:text-white transition-colors duration-400">
                  {service.num}
                </span>
                <h2 className="font-sans font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter text-black group-hover:text-white transition-colors duration-400 leading-none py-2">
                  {service.title}
                </h2>
              </div>

              {/* Right Group: Description */}
              <p className="font-sans text-sm md:text-base lg:text-lg text-black/60 group-hover:text-white/90 w-full md:max-w-md lg:max-w-xl md:text-right leading-relaxed relative z-10 transition-colors duration-400 mt-6 md:mt-0 md:ml-auto">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Smooth bezier animation for the brutalist hover block */
        .service-bg-fill {
          transform-origin: bottom center;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
