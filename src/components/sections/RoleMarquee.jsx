import { useState, useEffect } from 'react';

const roles = ['Developer', 'Designer', 'ML Engineer'];

export function RoleMarquee() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % roles.length);
        setAnimating(false);
      }, 500); // half-way through the transition
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="role-marquee" aria-label="Roles">
        <div className="role-marquee-inner">
          {/* Left decorative line */}
          <div className="role-line" />

          {/* Rotating role */}
          <div className="role-slot">
            <div className={`role-text ${animating ? 'role-exit' : 'role-enter'}`}>
              {roles[activeIndex]}
            </div>
          </div>

          {/* Right decorative line */}
          <div className="role-line" />
        </div>

        {/* Background — full-width repeating ghost text */}
        <div className="role-ghost-track" aria-hidden="true">
          <div className="role-ghost-scroll">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="role-ghost-item">
                {roles.map((r) => r.toUpperCase()).join(' — ')} —{' '}
              </span>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .role-marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
          background-color: var(--color-primary);
          padding: 64px 0;
        }

        .role-marquee-inner {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(24px, 5vw, 48px);
          padding: 0 var(--margin-edge);
        }

        .role-line {
          flex: 1;
          height: 1px;
          background-color: rgba(255,255,255,0.15);
        }

        /* === Rotating Slot === */
        .role-slot {
          overflow: hidden;
          height: clamp(3rem, 8vw, 6rem);
          display: flex;
          align-items: center;
          min-width: clamp(200px, 30vw, 400px);
          justify-content: center;
        }

        .role-text {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 300;
          font-style: italic;
          color: #ffffff;
          letter-spacing: -0.03em;
          white-space: nowrap;
          will-change: transform, opacity;
        }

        .role-enter {
          animation: roleSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .role-exit {
          animation: roleSlideOut 0.5s cubic-bezier(0.7, 0, 0.84, 0) forwards;
        }

        @keyframes roleSlideIn {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes roleSlideOut {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        /* === Ghost Scrolling Background === */
        .role-ghost-track {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          overflow: hidden;
          z-index: 1;
          pointer-events: none;
        }

        .role-ghost-scroll {
          display: flex;
          white-space: nowrap;
          animation: ghostScroll 30s linear infinite;
        }

        .role-ghost-item {
          font-family: var(--font-serif);
          font-size: clamp(4rem, 10vw, 8rem);
          font-weight: 300;
          color: rgba(255,255,255,0.04);
          letter-spacing: -0.02em;
          flex-shrink: 0;
          padding-right: 16px;
        }

        @keyframes ghostScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .role-marquee {
            padding: 48px 0;
          }

          .role-line {
            display: none;
          }

          .role-slot {
            min-width: auto;
          }
        }
      `}</style>
    </>
  );
}
