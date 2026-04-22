import { useEffect, useRef, useState, useCallback } from 'react';
import { animate, utils } from 'animejs';

export function Hero() {
  const [revealed, setRevealed] = useState(false);
  const heroRef = useRef(null);
  const nameBlockRef = useRef(null);
  const charsRef = useRef([]);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  // Wait for loader to fully clear before revealing anything
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Entry animations — blur+zoom for name, fade for others
  useEffect(() => {
    if (!revealed || !heroRef.current) return;

    // Show the name, then stagger letters up
    const nameEl = heroRef.current.querySelector('.hero-name');
    if (nameEl) nameEl.style.opacity = '1';

    const nameChars = heroRef.current.querySelectorAll('.name-char');
    animate(nameChars, {
      translateY: ['130%', '0%'],
      easing: 'outExpo',
      duration: 1400,
      delay: utils.stagger(40, { start: 200 }),
    });

    // Fade in the rest
    const fadeEls = heroRef.current.querySelectorAll('.hero-fade');
    animate(fadeEls, {
      opacity: [0, 1],
      translateY: [15, 0],
      easing: 'outQuart',
      duration: 800,
      delay: utils.stagger(120, { start: 600 }),
    });
  }, [revealed]);

  // ===== COLOR CHANGE ON HOVER =====
  const handleMouseMove = useCallback((e) => {
    if (!nameBlockRef.current) return;
    const rect = nameBlockRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  useEffect(() => {
    if (!revealed) return;

    const loop = () => {
      const chars = charsRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < chars.length; i++) {
        const el = chars[i];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const parentRect = nameBlockRef.current?.getBoundingClientRect();
        if (!parentRect) continue;

        const charCenterX = rect.left - parentRect.left + rect.width / 2;
        const charCenterY = rect.top - parentRect.top + rect.height / 2;

        const dx = mouse.x - charCenterX;
        const dy = mouse.y - charCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const radius = 180;
        let colorBlend = 0;
        if (dist < radius) {
          const falloff = 1 - (dist / radius);
          colorBlend = falloff * falloff;
        }

        // Smooth lerp
        const currentC = parseFloat(el.dataset.currentC || '0');
        const lerpedC = currentC + (colorBlend - currentC) * 0.06;
        el.dataset.currentC = lerpedC.toFixed(4);

        // white → orange
        const r = 255;
        const g = Math.round(255 - (255 - 107) * lerpedC);
        const b = Math.round(255 - 255 * lerpedC);
        el.style.color = `rgb(${r},${g},${b})`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    const startTimer = setTimeout(() => {
      rafRef.current = requestAnimationFrame(loop);
    }, 1600);

    return () => {
      clearTimeout(startTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [revealed]);

  const addCharRef = useCallback((el) => {
    if (el && !charsRef.current.includes(el)) {
      charsRef.current.push(el);
    }
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        id="hero"
        aria-label="Hero section"
        className="hero-section"
      >
        {/* Full-screen background image — parallax: slower */}
        <div className="hero-img-wrapper" data-parallax="-0.35">
          <img
            src="/heroimage.jpeg"
            alt="Soumyaranjan Sahoo — silhouette portrait"
            className="hero-bg"
          />
        </div>

        {/* Cinematic overlays */}
        <div className="hero-overlay-gradient" />
        <div className="hero-overlay-vignette" />
        <div className="hero-overlay-grain" />

        {/* Bottom Left: SOUMYA / VERSE */}
        <div
          ref={nameBlockRef}
          className="hero-name-block"
          data-parallax="0.2"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className="hero-name" style={{ opacity: 0 }}>
            <span className="hero-name-line">
              {'SOUMYA'.split('').map((ch, i) => (
                <span key={`s-${i}`} ref={addCharRef} className="name-char" data-current-c="0">{ch}</span>
              ))}
            </span>
            <span className="hero-name-line">
              {'VERSE'.split('').map((ch, i) => (
                <span key={`v-${i}`} ref={addCharRef} className="name-char" data-current-c="0">{ch}</span>
              ))}
            </span>
          </h1>
        </div>

        {/* Right side paragraphs — hidden until revealed */}
        <div className="hero-text-block hero-fade" data-parallax="0.25" style={{ opacity: 0 }}>
          <p className="hero-para">
            I craft digital experiences at the intersection of design and engineering. 
            With a focus on full-stack development and machine learning, I build products 
            that are as thoughtful in their architecture as they are in their interface.
          </p>
          <p className="hero-para-small">
            Currently pursuing MCA at Trident Academy of Creative Technology, 
            Bhubaneswar — always building, always learning.
          </p>
        </div>
      </section>

      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
        }

        .hero-img-wrapper {
          position: absolute;
          inset: -20px;
          z-index: 0;
          animation: heroZoomOut 2.5s cubic-bezier(0.16, 1, 0.3, 1) 1.0s both;
        }

        .hero-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          filter: contrast(1.08) saturate(1.1) brightness(0.95);
        }

        @keyframes heroZoomOut {
          from { transform: scale(1.25); filter: blur(12px); }
          to   { transform: scale(1.0); filter: blur(0px); }
        }

        .hero-overlay-gradient {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 40%, transparent 70%),
            linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 50%);
        }

        .hero-overlay-vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%);
        }

        .hero-overlay-grain {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.04;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 200px;
        }

        .hero-name-block {
          position: absolute;
          bottom: 20px;
          left: var(--margin-edge);
          z-index: 2;
          padding: 32px 60px 32px 0;
          cursor: default;
        }

        .hero-name {
          font-family: var(--font-serif);
          font-weight: 600;
          font-size: clamp(3.2rem, 11vw, 9rem);
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #ffffff;
          margin: 0;
          transform-origin: left bottom;
        }

        .hero-name-line {
          display: block;
          clip-path: inset(-20% 0 -15% 0);
        }

        .name-char {
          display: inline-block;
          cursor: default;
        }

        .hero-text-block {
          position: absolute;
          top: 35%;
          right: var(--margin-edge);
          max-width: 360px;
          z-index: 2;
        }

        .hero-para {
          font-family: var(--font-sans);
          font-size: clamp(0.8125rem, 1.1vw, 0.9375rem);
          line-height: 1.75;
          color: rgba(255,255,255,0.85);
          letter-spacing: -0.01em;
          margin: 0 0 20px 0;
        }

        .hero-para-small {
          font-family: var(--font-sans);
          font-size: clamp(0.6875rem, 0.9vw, 0.8125rem);
          line-height: 1.65;
          color: rgba(255,255,255,0.45);
          margin: 0;
        }

        @media (max-width: 1024px) {
          .hero-text-block {
            top: 26%;
            max-width: 280px;
          }
        }

        @media (max-width: 768px) {
          .hero-name {
            font-size: clamp(2.8rem, 16vw, 4.5rem);
          }
          .hero-name-block {
            bottom: 130px;
            left: 24px;
            padding-right: 20px;
          }
          .hero-text-block {
            top: auto;
            bottom: 44px;
            left: 24px;
            right: 24px;
            max-width: 100%;
          }
          .hero-para, .hero-para-small {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .hero-name {
            font-size: clamp(2.4rem, 18vw, 3.5rem);
          }
          .hero-name-block {
            bottom: 40px;
            left: 20px;
          }
        }

        @media (max-height: 500px) {
          .hero-name {
            font-size: clamp(2rem, 8vw, 3rem);
          }
          .hero-name-block {
            bottom: 24px;
          }
          .hero-text-block {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
