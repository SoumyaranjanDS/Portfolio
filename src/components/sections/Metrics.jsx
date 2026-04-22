export function Metrics() {
  const metricsList = [
    "4+ ROBUST FULL-STACK PLATFORMS",
    "84.08% ROC AUC IN ML MODELS",
    "SEAMLESS AI HEALTHCARE TRIAGE",
    "ADVANCED DSA CODE ENVIRONMENT",
    "COMPLEX DATABASE CLUSTERING",
    "CINEMATIC USER INTERFACES",
  ];

  return (
    <section id="metrics" className="metrics-section relative bg-primary py-4 md:py-8 overflow-hidden flex items-center border-y border-black">
      <div className="metrics-track flex whitespace-nowrap w-max">
        {/* We output the list twice to create a seamless infinite scroll loop */}
        <div className="metrics-list flex items-center gap-8 md:gap-16 px-4 md:px-8 shrink-0">
          {metricsList.map((text, idx) => (
            <div key={`m1-${idx}`} className="metric-item flex items-center gap-4 md:gap-8">
              <span className="font-sans font-black text-white text-2xl md:text-4xl lg:text-6xl uppercase tracking-tighter">
                {text}
              </span>
              <span className="w-2 h-2 md:w-4 md:h-4 bg-white rounded-full block opacity-50"></span>
            </div>
          ))}
        </div>
        <div className="metrics-list flex items-center gap-8 md:gap-16 px-4 md:px-8 shrink-0" aria-hidden="true">
          {metricsList.map((text, idx) => (
            <div key={`m2-${idx}`} className="metric-item flex items-center gap-4 md:gap-8">
              <span className="font-sans font-black text-white text-2xl md:text-4xl lg:text-6xl uppercase tracking-tighter">
                {text}
              </span>
              <span className="w-2 h-2 md:w-4 md:h-4 bg-white rounded-full block opacity-50"></span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .metrics-track {
          animation: marquee 30s linear infinite;
        }

        .metrics-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            /* Scroll half the width since the track is duplicated */
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
