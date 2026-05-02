import { useState, useEffect } from 'react';

const flightData = [
  { code: 'FSP-01', destination: '4+ FULL-STACK PLATFORMS', status: 'DEPLOYED', gate: 'A1', time: 'ON TIME' },
  { code: 'MLA-02', destination: '84.08% ROC AUC IN ML MODELS', status: 'DEPLOYED', gate: 'B3', time: 'ON TIME' },
  { code: 'AIT-03', destination: 'SEAMLESS AI HEALTHCARE TRIAGE', status: 'BOARDING', gate: 'C2', time: 'ON TIME' },
  { code: 'DSA-04', destination: 'ADVANCED DSA CODE ENVIRONMENT', status: 'DEPLOYED', gate: 'D1', time: 'ON TIME' },
  { code: 'DBC-05', destination: 'COMPLEX DATABASE CLUSTERING', status: 'DEPLOYED', gate: 'A4', time: 'ON TIME' },
  { code: 'CUI-06', destination: 'CINEMATIC USER INTERFACES', status: 'BOARDING', gate: 'B2', time: 'ON TIME' },
];

/* Split-flap character animation */
function FlipChar({ char, delay }) {
  const [displayed, setDisplayed] = useState(' ');
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlipping(true);
      setTimeout(() => {
        setDisplayed(char);
        setFlipping(false);
      }, 80);
    }, delay);
    return () => clearTimeout(timer);
  }, [char, delay]);

  return (
    <span
      style={{
        display: 'inline-block',
        width: char === ' ' ? '0.35em' : '0.65em',
        textAlign: 'center',
        transition: 'transform 0.08s',
        transform: flipping ? 'scaleY(0)' : 'scaleY(1)',
      }}
    >
      {displayed}
    </span>
  );
}

function FlipText({ text, baseDelay = 0 }) {
  return (
    <span style={{ display: 'inline-flex' }}>
      {text.split('').map((char, i) => (
        <FlipChar key={i} char={char} delay={baseDelay + i * 35} />
      ))}
    </span>
  );
}

export function Metrics() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="metrics"
      className="relative overflow-hidden"
      style={{
        background: '#0A0A0A',
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        paddingLeft: 'clamp(1rem, 3vw, 3rem)',
        paddingRight: 'clamp(1rem, 3vw, 3rem)',
      }}
    >
      {/* Subtle scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
        }}
      />

      <div className="relative z-10" style={{ maxWidth: '72rem', marginLeft: 'auto', marginRight: 'auto' }}>

        {/* Board Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <div className="flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" className="opacity-60">
              <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.4-.1.9.3 1.1L11 12l-2 3H6l-2 2 4-1 1-4 5-5" />
            </svg>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase" style={{ letterSpacing: '0.25em', color: 'rgba(255,184,0,0.5)' }}>
              Departures · Achievement Terminal
            </span>
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] uppercase hidden sm:block" style={{ letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)' }}>
            Live Status
          </span>
        </div>

        {/* Column Headers */}
        <div
          className="hidden sm:grid items-center font-mono text-[8px] sm:text-[9px] uppercase"
          style={{
            gridTemplateColumns: '80px 1fr 100px 60px 70px',
            gap: '12px',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.15)',
            paddingBottom: '12px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '4px',
          }}
        >
          <span>Flight</span>
          <span>Destination</span>
          <span>Status</span>
          <span>Gate</span>
          <span>Remark</span>
        </div>

        {/* Flight Rows */}
        <div className="flex flex-col">
          {flightData.map((flight, index) => (
            <div key={flight.code}>
              {/* Desktop Row */}
              <div
                className="hidden sm:grid items-center font-mono"
                style={{
                  gridTemplateColumns: '80px 1fr 100px 60px 70px',
                  gap: '12px',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <span style={{ fontSize: '13px', color: 'rgba(255,184,0,0.7)', letterSpacing: '0.1em' }}>
                  {loaded ? <FlipText text={flight.code} baseDelay={index * 200} /> : ''}
                </span>
                <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.05em', fontWeight: 600 }}>
                  {loaded ? <FlipText text={flight.destination} baseDelay={index * 200 + 100} /> : ''}
                </span>
                <span style={{
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  color: flight.status === 'BOARDING' ? 'rgba(39,201,63,0.8)' : 'rgba(255,255,255,0.3)',
                }}>
                  {loaded ? <FlipText text={flight.status} baseDelay={index * 200 + 300} /> : ''}
                </span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
                  {loaded ? <FlipText text={flight.gate} baseDelay={index * 200 + 400} /> : ''}
                </span>
                <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(39,201,63,0.5)' }}>
                  {loaded ? <FlipText text={flight.time} baseDelay={index * 200 + 500} /> : ''}
                </span>
              </div>

              {/* Mobile Row — stacked */}
              <div
                className="sm:hidden font-mono"
                style={{
                  padding: '14px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
                  <span style={{ fontSize: '10px', color: 'rgba(255,184,0,0.7)', letterSpacing: '0.15em' }}>
                    {loaded ? <FlipText text={flight.code} baseDelay={index * 200} /> : ''}
                  </span>
                  <span style={{
                    fontSize: '9px',
                    letterSpacing: '0.15em',
                    color: flight.status === 'BOARDING' ? 'rgba(39,201,63,0.8)' : 'rgba(255,255,255,0.3)',
                  }}>
                    {loaded ? <FlipText text={flight.status} baseDelay={index * 200 + 300} /> : ''}
                  </span>
                </div>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.03em', fontWeight: 600, lineHeight: 1.4, display: 'block' }}>
                  {loaded ? <FlipText text={flight.destination} baseDelay={index * 200 + 100} /> : ''}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom ticker */}
        <div style={{ marginTop: 'clamp(1.5rem, 3vw, 2.5rem)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#27C93F' }} />
            <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.12)' }}>
              ALL SYSTEMS OPERATIONAL · LAST UPDATED {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
