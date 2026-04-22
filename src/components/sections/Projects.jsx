import { useEffect, useRef, useState } from 'react';

const projectsData = [
  {
    id: 1,
    title: 'Veda AI',
    subtitle: 'AI-Assisted Healthcare Triage Platform',
    description: 'Built an AI-assisted healthcare platform for symptom triage, private concerns, and doctor connection. Developed seamless patient and doctor dashboards with comprehensive reports, real-time notifications, and structured consultation workflows.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveLink: 'https://veda-ai-one-psi.vercel.app/',
    repoLink: 'https://github.com/subhransu-mishra/VEDA-AI',
    image: '/vedaai.png'
  },
  {
    id: 2,
    title: 'Nexus.sys',
    subtitle: 'Job Finder Aggregator',
    description: 'Built a full-stack job aggregator using Python scraping to collect and display job listings from external platforms. Implemented REST APIs, pagination, filtering, and local bookmarking for an improved job discovery experience. Deployed on Render and Netlify.',
    stack: ['React', 'FastAPI', 'Python', 'Render', 'Netlify'],
    liveLink: 'https://nexusys.netlify.app/',
    repoLink: 'https://github.com/SoumyaranjanDS/JobFinderFastAPI',
    image: '/nexus.png'
  },
  {
    id: 3,
    title: 'RetainQ',
    subtitle: 'Customer Prediction System',
    description: 'Built a full-stack ML prediction platform featuring an interactive dashboard for visualizing customer churn risk. Achieved 84.08% ROC AUC and 77.71% test accuracy using Logistic Regression algorithms to accurately forecast customer retention.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Logistic Regression'],
    liveLink: 'https://retainq.netlify.app/',
    repoLink: 'https://github.com/SoumyaranjanDS/churnFlow',
    image: '/retainq.png'
  },
  {
    id: 4,
    title: 'Aura',
    subtitle: 'DSA Based Code Editor',
    description: 'A high-performance algorithmic code editor focused on Data Structures and Algorithms. Designed to compile and execute complex logic efficiently with a highly immersive development interface.',
    stack: ['React', 'Node.js', 'WebSockets', 'Monaco Editor'],
    liveLink: 'https://auraeditor.netlify.app/',
    repoLink: 'https://github.com/SoumyaranjanDS/CodeEditor',
    image: '/aura.png'
  }
];

// A simple utility to map a value from one range to another, clamped.
function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = Math.max(0, Math.min(1, (value - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

export function Projects() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hoveredProj, setHoveredProj] = useState(projectsData[0].id);
  const [modalProj, setModalProj] = useState(null);

  // Stop body scroll when modal is open
  useEffect(() => {
    if (modalProj) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [modalProj]);

  // Animation values mapped from scroll
  const [progress, setProgress] = useState(0);

  // Scroll observer to reveal the section label initially
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // rAF loop for high-performance scroll-linked animations
  useEffect(() => {
    let raf;
    const update = () => {
      if (!containerRef.current) {
        raf = requestAnimationFrame(update);
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      const scrolled = -rect.top / totalScroll;
      setProgress(Math.max(0, Math.min(1, scrolled)));
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ---- TIMELINE CALCULATIONS ----

  // 1. Cursor Movement (0% - 25%)
  // Cursor starts off-screen bottom right -> moves to center
  const cursorX = mapRange(progress, 0, 0.25, 40, 0);
  const cursorY = mapRange(progress, 0, 0.25, 40, 0);
  
  // 2. Cursor Click (25% - 30%)
  let cursorScale = 1;
  let rippleScale = 0;
  let rippleOpacity = 0;
  if (progress > 0.25 && progress <= 0.28) {
    cursorScale = 0.8; // Press down
  } else if (progress > 0.28 && progress <= 0.35) {
    cursorScale = 1; // Release
    rippleScale = mapRange(progress, 0.28, 0.35, 0.2, 2.5);
    rippleOpacity = mapRange(progress, 0.28, 0.35, 0.6, 0);
  } else if (progress > 0.35) {
    // Fade out cursor after click
    cursorScale = mapRange(progress, 0.35, 0.4, 1, 0);
  }

  // 3. Folder Open (30% - 60%)
  // Flap uses rotateX. 0 = closed, -180 = completely open and flipped back
  const flapAngle = mapRange(progress, 0.30, 0.60, 0, -180);
  
  // Z-index trick: When the flap passes 90 degrees, we need its back to be invisible 
  // or style it properly. preserve-3d handles most of this.

  // 4. Folder Drop & Blur (60% - 90%)
  // Folder scales down, pushes backwards (Y drop), blurs heavily, and fades.
  const folderScale = mapRange(progress, 0.60, 0.90, 1, 0.4);
  const folderY = mapRange(progress, 0.60, 0.90, 0, 150);
  const folderBlur = mapRange(progress, 0.60, 0.90, 0, 24);
  const folderOpacity = mapRange(progress, 0.75, 0.90, 1, 0);

  // 5. Content Reveal (75% - 95%)
  // "Selected Works" drops down from ceiling
  const contentOpacity = mapRange(progress, 0.75, 0.95, 0, 1);
  const contentY = mapRange(progress, 0.75, 0.95, -60, 0);

  return (
    <>
      <section ref={containerRef} id="projects" className="proj-scroll-runway" aria-label="Projects">
        <div className="proj-sticky">
          
          {/* Label */}
          <div className="proj-label-container">
            <span className={`proj-label ${visible ? 'proj-visible' : ''}`}>
              Selected Works
            </span>
          </div>

          {/* === CINEMATIC RIG === */}
          <div className="proj-rig" style={{ pointerEvents: 'none' }}>
            
            {/* The Folder Wrapper — Scales down, blur, drops Y, fades out */}
            <div 
              className="proj-folder-wrapper"
              style={{
                transform: `translateY(${folderY}px) scale(${folderScale})`,
                opacity: folderOpacity,
                filter: `blur(${folderBlur}px)`
              }}
            >
              <div className="proj-folder-3d">
                
                {/* Back flap */}
                <div className="folder-back" />
                
                {/* Paper inside the folder (Dummy Content) */}
                <div className="folder-paper">
                  <div className="paper-lines" />
                  <span className="paper-text">TOP SECRET</span>
                </div>

                {/* Front flap (Lid) — hinged at the bottom */}
                <div 
                  className="folder-front"
                  style={{
                    transform: `rotateX(${flapAngle}deg)`,
                  }}
                >
                  <div className="folder-front-inner" />
                  <div className="folder-tab">
                    <span>PROJECTS</span>
                  </div>
                </div>

                {/* Ghost Cursor */}
                <div 
                  className="ghost-cursor"
                  style={{
                    transform: `translate(${cursorX}vw, ${cursorY}vh) scale(${cursorScale})`
                  }}
                >
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4L10.2857 22L13.4286 14.5714L20.8571 11.4286L4 4Z" fill="white" stroke="#111" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>

                  {/* Click Ripple Effect */}
                  {progress > 0.28 && progress < 0.35 && (
                    <div 
                      className="click-ripple"
                      style={{
                        transform: `scale(${rippleScale})`,
                        opacity: rippleOpacity
                      }}
                    />
                  )}
                </div>

              </div>
            </div>

            {/* === FINAL CONTENT === 
                Sitting absolutely positioned behind the folder, fades in as folder zooms/fades out */}
            <div 
              className="proj-real-content"
              style={{
                opacity: contentOpacity,
                transform: `translateY(${contentY}px)`,
                pointerEvents: progress > 0.9 ? 'auto' : 'none'
              }}
            >
              {/* We replaced the grid inside the folder with just the title. 
                  The title reveals, then automatically scrolls away 
                  as the user continues down into the stacking cards. */}
              <div className="proj-page" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h2 className="proj-page-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', margin: 0 }}>Selected Works</h2>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* === LIST & PREVIEW SEQUENCE === */}
      <section className="lp-section">
        <div className="lp-container">
          
          {/* Left Side: Typography List */}
          <div className="lp-left">
            <div className="lp-list">
              {projectsData.map(proj => (
                <div
                  key={proj.id}
                  className={`lp-item ${hoveredProj === proj.id ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredProj(proj.id)}
                  onClick={() => setModalProj(proj)}
                >
                  <div className="lp-item-header">
                    <span className="lp-item-num">0{proj.id}</span>
                    <h2 className="lp-item-title">{proj.title}</h2>
                    <span className="lp-item-arrow">→</span>
                  </div>

                  {/* Mobile Accordion Content (Only visible on small screens) */}
                  <div className="lp-item-mobile-content">
                    <img src={proj.image} alt={proj.title} className="lp-mobile-img" />
                    <button className="lp-mobile-btn" onClick={(e) => { e.stopPropagation(); setModalProj(proj); }}>
                      View Project Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Image Preview */}
          <div className="lp-right">
            <div className="lp-preview-window">
              {projectsData.map(proj => (
                <img 
                  key={proj.id}
                  src={proj.image} 
                  alt={proj.title}
                  className={`lp-preview-img ${hoveredProj === proj.id ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* === PROJECT SPLIT-SCREEN MODAL === */}
      <div className={`proj-modal-overlay ${modalProj ? 'open' : ''}`} onClick={() => setModalProj(null)}>
        <div className={`proj-modal ${modalProj ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
          {modalProj && (
            <>
              <button className="modal-close" onClick={() => setModalProj(null)} aria-label="Close Project Modal">✕</button>
              
              <div className="modal-left">
                <img src={modalProj.image} alt={modalProj.title} className="modal-hero-img" />
              </div>
              
              <div className="modal-right">
                <div className="modal-header">
                  <h2 className="modal-title">{modalProj.title}</h2>
                  <h3 className="modal-subtitle">{modalProj.subtitle}</h3>
                </div>
                
                <p className="modal-desc">{modalProj.description}</p>
                
                <div className="modal-stack">
                  <span className="modal-label">Tech Stack</span>
                  <div className="modal-tags">
                    {modalProj.stack.map(s => <span key={s} className="modal-tag">{s}</span>)}
                  </div>
                </div>
                
                <div className="modal-links">
                  <a href={modalProj.liveLink} target="_blank" rel="noreferrer" className="modal-btn modal-btn-primary">
                    View Live Site
                  </a>
                  <a href={modalProj.repoLink} target="_blank" rel="noreferrer" className="modal-btn modal-btn-secondary">
                    GitHub Repo
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        /* ===== FOLDER ANIMATION ===== */
        .proj-scroll-runway {
          position: relative;
          height: 450vh; /* 4.5 screens of scrolling for the sequence */
          /* Bold orange background as requested */
          background: linear-gradient(135deg, #FF6B00 0%, #E63900 100%);
        }

        .proj-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .proj-label-container {
          position: absolute;
          top: clamp(80px, 15vh, 120px);
          left: clamp(20px, 5vw, 60px);
          z-index: 10;
        }

        .proj-label {
          font-family: var(--font-sans);
          font-size: clamp(0.6875rem, 0.9vw, 0.75rem);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.6); /* Adjusted to black for orange background */
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .proj-label.proj-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* RIG */
        .proj-rig {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
        }

        .proj-folder-wrapper {
          position: relative;
          z-index: 2;
          /* Will-change smooths out the massive scale animation */
          will-change: transform, opacity;
        }

        /* 3D FOLDER */
        .proj-folder-3d {
          position: relative;
          width: clamp(260px, 40vw, 400px);
          aspect-ratio: 4 / 3;
          transform-style: preserve-3d;
        }

        .folder-back {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #FF7A00 0%, #CC3A00 100%); /* Original Orange */
          border-radius: 8px 12px 8px 8px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.7); /* Subtle but deep shadow for orange-on-orange separation */
          transform: translateZ(-2px);
        }

        .folder-paper {
          position: absolute;
          inset: 8px;
          background: #0a0a0a; /* Dark interior matches site */
          border-radius: 4px;
          transform: translateZ(-1px);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 4px 20px rgba(0,0,0,0.8);
          overflow: hidden;
        }

        /* Add some lines to look like blueprints/specs */
        .paper-lines {
          position: absolute;
          inset: 20px;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 100% 20px;
        }

        .paper-text {
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 800;
          color: rgba(255,255,255,0.05); /* Light text for dark paper */
          letter-spacing: 0.2em;
          transform: rotate(-15deg);
        }

        .folder-front {
          position: absolute;
          inset: 0;
          transform-origin: bottom center;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .folder-front-inner {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #FF8B00 0%, #FF5A00 100%);
          border-radius: 8px;
          box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 -10px 40px rgba(0,0,0,0.3);
          backface-visibility: hidden;
        }

        /* Backface of the front flap (what you see when it opens) */
        .folder-front-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #E65C00 0%, #B33D00 100%);
          border-radius: 8px;
          transform: rotateY(180deg);
          backface-visibility: hidden;
        }

        .folder-tab {
          position: absolute;
          top: -24px;
          right: 24px;
          width: 100px;
          height: 32px;
          background: linear-gradient(180deg, #FF8B00 0%, #FF6B00 100%);
          border-radius: 8px 8px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 2px 0 rgba(255,255,255,0.2);
          backface-visibility: hidden;
        }

        .folder-tab span {
          font-family: var(--font-sans);
          font-size: 0.6rem;
          font-weight: 800;
          color: rgba(0,0,0,0.4);
          letter-spacing: 0.1em;
        }

        /* GHOST CURSOR */
        .ghost-cursor {
          position: absolute;
          bottom: 20%;
          right: 20%;
          width: 42px;
          height: 42px;
          z-index: 10;
          transform-origin: top left;
          will-change: transform;
        }

        .click-ripple {
          position: absolute;
          top: 0;
          left: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: transparent;
          border: 2px solid white;
          transform-origin: center;
        }

        /* REAL CONTENT */
        .proj-real-content {
          position: absolute;
          inset: 0;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-void);
          will-change: opacity, transform;
        }

        .dummy-page {
          width: 100%;
          max-width: 1200px;
          padding: 0 var(--margin-edge);
        }

        .proj-page {
          width: 100%;
          max-width: 1200px;
          padding: 0 var(--margin-edge);
        }

        .proj-page-title {
          font-family: var(--font-serif);
          font-weight: 300;
          color: var(--color-on-surface);
          letter-spacing: -0.03em;
          text-align: center;
        }

        /* ===== LIST & PREVIEW (LP) ===== */
        .lp-section {
          padding: 120px 0;
          background: radial-gradient(circle at 50% 100%, rgba(255,107,0,0.15) 0%, var(--color-void) 80%);
          color: white;
        }

        .lp-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 var(--margin-edge);
          display: flex;
          gap: 60px;
        }

        /* Left List */
        .lp-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .lp-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .lp-item {
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 40px 32px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        /* Orange Gradient Fill on Action */
        .lp-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #FF6B00 0%, #FF2A00 100%);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.6s cubic-bezier(0.85, 0, 0.15, 1);
          z-index: 0;
        }

        .lp-item:hover::before,
        .lp-item:focus::before,
        .lp-item:active::before {
          transform: scaleY(1);
          transform-origin: top;
        }

        .lp-item-header {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .lp-item-num {
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--color-primary);
          opacity: 0.6;
          transition: color 0.4s ease, opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lp-item:hover .lp-item-num,
        .lp-item:active .lp-item-num {
          color: #000;
          opacity: 1;
          transform: translateX(12px);
          font-weight: 600;
        }

        .lp-item-title {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 300;
          line-height: 1;
          color: var(--color-primary); /* Initially orange */
          margin: 0;
          letter-spacing: -0.02em;
          transition: color 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lp-item:hover .lp-item-title,
        .lp-item:active .lp-item-title {
          color: #000; /* Turns black */
          font-weight: 500;
          transform: translateX(12px);
        }

        .lp-item-arrow {
          font-family: var(--font-sans);
          font-size: 2.5rem;
          font-weight: 300;
          color: #000;
          margin-left: auto;
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lp-item:hover .lp-item-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .lp-item-mobile-content {
          display: none; /* Hide on desktop */
          margin-top: 24px;
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s;
        }

        /* Right Preview */
        .lp-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: sticky;
          top: 100px; /* keep it centered in view while hovering left */
          height: calc(100vh - 200px);
        }

        .lp-preview-window {
          width: 100%;
          aspect-ratio: 16 / 9; /* Converted to support 16:9 images */
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: #111;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }

        .lp-preview-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          /* Smooth Curtain Reveal */
          clip-path: inset(100% 0 0 0);
          transform: scale(1.1);
          transition: clip-path 0.8s cubic-bezier(0.85, 0, 0.15, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .lp-preview-img.active {
          clip-path: inset(0 0 0 0);
          transform: scale(1);
          z-index: 2;
        }


        /* ===== PROJECT SPLIT-SCREEN MODAL ===== */
        .proj-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s ease;
          padding: 24px; /* padding for when it scales down on tablet */
        }

        .proj-modal-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .proj-modal {
          width: 100%;
          max-width: 1200px;
          height: 80vh;
          min-height: 500px;
          background: #ffffff; /* Light Mode Modal! */
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          transform: scale(0.95) translateY(20px);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
          position: relative;
        }

        .proj-modal.open {
          transform: scale(1) translateY(0);
        }

        .modal-close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
          color: #000;
          font-size: 1.2rem;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background: #000;
          color: #fff;
          transform: scale(1.1);
        }

        .modal-left {
          width: 50%;
          height: 100%;
          background: #111;
          position: relative;
        }

        .modal-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }

        .modal-right {
          width: 50%;
          height: 100%;
          padding: 60px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          overflow-y: auto;
          color: #0a0a0a; /* Black Text! */
        }

        .modal-header {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .modal-title {
          font-family: var(--font-serif);
          font-size: clamp(3rem, 4vw, 4rem);
          font-weight: 300;
          color: #000;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .modal-subtitle {
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--color-primary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0;
          font-weight: 600;
        }

        .modal-desc {
          font-family: var(--font-sans);
          font-size: 1.125rem;
          line-height: 1.6;
          color: #444; /* Dark gray for deep readability */
          margin: 0;
        }

        .modal-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .modal-label {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 700;
          color: #888;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .modal-tag {
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 600;
          padding: 6px 14px;
          background: rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 100px;
          color: #111;
        }

        .modal-links {
          display: flex;
          gap: 16px;
          margin-top: auto; /* Push to bottom if content is short */
        }

        .modal-btn {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          font-weight: 600;
          padding: 16px 24px;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .modal-btn:hover {
          transform: translateY(-2px);
        }

        .modal-btn-primary {
          background: #000;
          color: #fff;
          flex: 1;
        }

        .modal-btn-primary:hover {
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .modal-btn-secondary {
          background: transparent;
          color: #000;
          border: 1px solid rgba(0,0,0,0.2);
          flex: 1;
        }

        .modal-btn-secondary:hover {
          background: rgba(0,0,0,0.05);
        }

        /* ===== RESPONSIVE overrides ===== */
        @media (max-width: 992px) {
          .lp-right {
            display: none; /* Hide preview window entirely on mobile/tablet */
          }
          
          .lp-item {
            padding: 32px 16px; /* give touch targets padding */
          }

          .lp-item-header {
            gap: 16px; /* Tighter gap on tablet */
          }

          .lp-item-arrow {
            display: none; /* remove hover arrow */
          }

          .lp-item.active .lp-item-mobile-content {
            max-height: 800px; /* arbitrary large enough value */
            opacity: 1;
            margin-top: 24px;
          }

          .lp-mobile-img {
            width: 100%;
            aspect-ratio: 16 / 10;
            object-fit: cover;
            object-position: top;
            border-radius: 8px;
            margin-bottom: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }

          .lp-mobile-btn {
            width: 100%;
            padding: 18px;
            background: linear-gradient(135deg, #FF6B00 0%, #CC5500 100%);
            border: none;
            color: black;
            font-family: var(--font-sans);
            font-size: 1rem;
            font-weight: 700;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(255,107,0,0.2);
            transition: transform 0.2s, box-shadow 0.2s;
          }

          .lp-mobile-btn:active {
            transform: scale(0.98);
          }
        }

        @media (max-width: 992px) {
          .proj-modal {
            flex-direction: column;
            height: 90vh; /* Takes up more height on tablet */
            overflow-y: auto;
          }
          .modal-left {
            width: 100%;
            height: 40%;
            flex-shrink: 0;
          }
          .modal-right {
            width: 100%;
            height: auto;
            padding: 40px;
            overflow: visible;
          }
        }

        @media (max-width: 480px) {
          .modal-links {
            flex-direction: column;
          }
          .modal-right {
            padding: 24px;
          }
          .modal-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </>
  );
}
