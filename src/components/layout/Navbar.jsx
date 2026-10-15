import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  const lastScrollY = useRef(0);
  const navRef = useRef(null);

  // Reveal after initial load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Directional Scroll detection & Progress Calculation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Scrolled state
      setIsScrolled(currentScrollY > 30);

      // Smart direction detection
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current + 8) {
          setIsHidden(true);
        } else if (currentScrollY < lastScrollY.current - 10) {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section Spy (Active Section Tracking)
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'services', 'education', 'contact'];
    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-25% 0px -45% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Body scroll lock on mobile drawer open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 84;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Floating Island Navigation Container */}
      <header
        ref={navRef}
        className={`nav-header ${!isVisible ? 'nav-hidden-initial' : ''} ${isHidden ? 'nav-hidden-scroll' : ''}`}
        style={{
          top: isScrolled ? '14px' : '20px',
        }}
      >
        <div className={`nav-island ${isScrolled ? 'nav-island-scrolled' : 'nav-island-top'}`}>
          {/* 1. Left: Brand Identity & Availability Badge */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="nav-brand"
            aria-label="Back to top"
          >
            <span className="nav-brand-text">
              Soumya<span className="nav-brand-dot">.</span>
            </span>
            <span className="nav-status-badge">
              <span className="nav-status-ping" />
              Available
            </span>
          </a>

          {/* 2. Center: Desktop Navigation Links with Active State */}
          <nav className="nav-menu" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`nav-menu-link ${isActive ? 'nav-menu-link-active' : ''}`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* 3. Right: Social Icons & Resume CTA */}
          <div className="nav-actions">
            {/* Social Link: GitHub */}
            <a
              href="https://github.com/SoumyaranjanDS"
              target="_blank"
              rel="noreferrer"
              className="nav-social-btn"
              aria-label="GitHub Profile"
            >
              <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            {/* Social Link: LinkedIn */}
            <a
              href="https://linkedin.com/in/soumyafde"
              target="_blank"
              rel="noreferrer"
              className="nav-social-btn"
              aria-label="LinkedIn Profile"
            >
              <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Resume CTA Button */}
            <a
              href="/Soumyaranjan-Full stack Dev.pdf"
              download
              className="nav-resume-btn"
            >
              <span>Resume</span>
              <svg className="nav-resume-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>

          {/* 4. Mobile Right Controls: Compact CV & Animated Hamburger */}
          <div className="nav-mobile-controls">
            <a
              href="/Soumyaranjan-Full stack Dev.pdf"
              download
              className="nav-mobile-cv"
            >
              CV ↗
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileOpen}
              className="nav-hamburger-btn"
            >
              <div className="nav-hamburger-box">
                <span className={`nav-hamburger-line ${mobileOpen ? 'nav-hamburger-line-1-open' : ''}`} />
                <span className={`nav-hamburger-line ${mobileOpen ? 'nav-hamburger-line-2-open' : ''}`} />
                <span className={`nav-hamburger-line ${mobileOpen ? 'nav-hamburger-line-3-open' : ''}`} />
              </div>
            </button>
          </div>

          {/* Reading Scroll Progress Hairline Indicator */}
          <div className="nav-progress-track" aria-hidden="true">
            <div className="nav-progress-bar" style={{ width: `${scrollProgress}%` }} />
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Frosted Drawer */}
      <div className={`nav-mobile-drawer ${mobileOpen ? 'nav-mobile-drawer-open' : ''}`}>
        <div className="nav-drawer-inner">
          {/* Top header */}
          <div className="nav-drawer-header">
            <span className="nav-drawer-title">Navigation</span>
            <span className="nav-drawer-badge">
              <span className="nav-status-ping" />
              Available for Work
            </span>
          </div>

          {/* Staggered Navigation Links */}
          <nav className="nav-drawer-links" aria-label="Mobile Navigation">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="nav-drawer-link"
                  style={{
                    transitionDelay: mobileOpen ? `${idx * 60 + 100}ms` : '0ms',
                    transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                    opacity: mobileOpen ? 1 : 0,
                  }}
                >
                  <span className={`nav-drawer-link-text ${isActive ? 'nav-drawer-link-active' : ''}`}>
                    {link.label}
                  </span>
                  <span className="nav-drawer-link-num">0{idx + 1}</span>
                </a>
              );
            })}
          </nav>

          {/* Mobile Footer & Quick Socials */}
          <div
            className="nav-drawer-footer"
            style={{
              transitionDelay: mobileOpen ? '450ms' : '0ms',
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            <div className="nav-drawer-socials">
              <a
                href="https://linkedin.com/in/soumyafde"
                target="_blank"
                rel="noreferrer"
                className="nav-drawer-social-chip"
              >
                <span>LinkedIn</span>
                <span className="nav-drawer-arrow">↗</span>
              </a>
              <a
                href="https://github.com/SoumyaranjanDS"
                target="_blank"
                rel="noreferrer"
                className="nav-drawer-social-chip"
              >
                <span>GitHub</span>
                <span className="nav-drawer-arrow">↗</span>
              </a>
            </div>

            <a
              href="/Soumyaranjan-Full stack Dev.pdf"
              download
              className="nav-drawer-cta"
            >
              <span>Download Full CV / Resume</span>
              <svg className="nav-drawer-cta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>

            <p className="nav-drawer-copyright">
              Soumyaranjan Sahoo © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>

      {/* Scoped CSS with Precise Spacing, Flex Alignment & Authentic Blur */}
      <style>{`
        /* Header Container */
        .nav-header {
          position: fixed;
          left: 0;
          right: 0;
          z-index: 50;
          display: flex;
          justify-content: center;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
          pointer-events: auto;
        }
        .nav-hidden-initial {
          opacity: 0;
          transform: translateY(-24px);
          pointer-events: none;
        }
        .nav-hidden-scroll {
          opacity: 0;
          transform: translateY(-110px);
          pointer-events: none;
        }

        /* The Floating Glass Island */
        .nav-island {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: calc(100% - 32px);
          max-width: 440px;
          padding: 8px 12px 8px 16px;
          border-radius: 9999px;
          backdrop-filter: blur(28px) saturate(190%) contrast(95%);
          -webkit-backdrop-filter: blur(28px) saturate(190%) contrast(95%);
          transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        @media (min-width: 768px) {
          .nav-island {
            width: auto;
            max-width: none;
            gap: 28px; /* Roomy breathing space between Brand, Links, and Actions */
            padding: 7px 14px 7px 20px;
          }
        }

        .nav-island-top {
          background-color: transparent;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 
            0 10px 30px -10px rgba(0, 0, 0, 0.06),
            0 2px 8px -2px rgba(0, 0, 0, 0.03);
        }

        .nav-island-scrolled {
          background-color: transparent;
          border: 1px solid rgba(0, 0, 0, 0.14);
          box-shadow: 
            0 16px 36px -10px rgba(0, 0, 0, 0.10),
            0 4px 12px -2px rgba(0, 0, 0, 0.04);
        }

        /* 1. Brand */
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #111111;
          flex-shrink: 0;
        }
        .nav-brand-text {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #111111;
        }
        .nav-brand-dot {
          color: #FF6B00;
        }
        .nav-status-badge {
          display: none;
          align-items: center;
          gap: 6px;
          padding: 3px 9px;
          border-radius: 9999px;
          background: rgba(16, 185, 129, 0.12);
          color: #047857;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1;
        }
        @media (min-width: 640px) {
          .nav-status-badge {
            display: inline-flex;
          }
        }
        .nav-status-ping {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #10B981;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* 2. Menu Links */
        .nav-menu {
          display: none;
          align-items: center;
          gap: 6px; /* Definite, clean separation between each link */
        }
        @media (min-width: 768px) {
          .nav-menu {
            display: flex;
          }
        }
        .nav-menu-link {
          display: inline-block;
          padding: 6px 14px; /* Generous 28px horizontal touch area per link */
          border-radius: 9999px;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          color: rgba(0, 0, 0, 0.65);
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .nav-menu-link:hover {
          color: #000000;
          background-color: rgba(0, 0, 0, 0.05);
        }
        .nav-menu-link-active {
          color: #ffffff !important;
          background-color: #000000 !important;
          font-weight: 600;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
        }

        /* 3. Actions */
        .nav-actions {
          display: none;
          align-items: center;
          gap: 10px;
          padding-left: 16px;
          border-left: 1px solid rgba(0, 0, 0, 0.12);
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .nav-actions {
            display: flex;
          }
        }
        .nav-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          color: rgba(0, 0, 0, 0.6);
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .nav-social-btn:hover {
          color: #000000;
          background-color: rgba(0, 0, 0, 0.06);
        }
        .nav-icon {
          width: 15px;
          height: 15px;
        }
        .nav-resume-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 9999px;
          background-color: #000000;
          color: #ffffff;
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
          white-space: nowrap;
        }
        .nav-resume-btn:hover {
          background-color: #262626;
        }
        .nav-resume-btn:hover .nav-resume-arrow {
          transform: translate(1px, -1px);
        }
        .nav-resume-arrow {
          width: 11px;
          height: 11px;
          transition: transform 0.2s ease;
        }

        /* 4. Mobile Controls */
        .nav-mobile-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        @media (min-width: 768px) {
          .nav-mobile-controls {
            display: none;
          }
        }
        .nav-mobile-cv {
          padding: 4px 10px;
          border-radius: 9999px;
          background-color: #000000;
          color: #ffffff;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 600;
          text-decoration: none;
        }
        .nav-hamburger-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease;
        }
        .nav-hamburger-btn:hover {
          background-color: rgba(0, 0, 0, 0.06);
        }
        .nav-hamburger-box {
          width: 18px;
          height: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
        .nav-hamburger-line {
          width: 18px;
          height: 1.5px;
          background-color: #111111;
          border-radius: 9999px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-hamburger-line:nth-child(2) {
          width: 13px;
          align-self: flex-start;
        }
        .nav-hamburger-line-1-open {
          transform: translateY(6.25px) rotate(45deg);
        }
        .nav-hamburger-line-2-open {
          opacity: 0;
          transform: scaleX(0);
        }
        .nav-hamburger-line-3-open {
          transform: translateY(-6.25px) rotate(-45deg);
        }

        /* Progress Bar */
        .nav-progress-track {
          position: absolute;
          bottom: 0;
          left: 20px;
          right: 20px;
          height: 1.5px;
          background: transparent;
          overflow: hidden;
          border-radius: 9999px;
          pointer-events: none;
        }
        .nav-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #999999, #111111, #FF6B00);
          transition: width 0.15s ease-out;
        }

        /* Mobile Fullscreen Drawer */
        .nav-mobile-drawer {
          position: fixed;
          inset: 0;
          z-index: 40;
          background-color: rgba(12, 12, 12, 0.92);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-mobile-drawer-open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }
        .nav-drawer-inner {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 96px 24px 32px 24px;
          max-width: 440px;
          margin: 0 auto;
          width: 100%;
        }
        .nav-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .nav-drawer-title {
          font-family: var(--font-sans);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.4);
        }
        .nav-drawer-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #34d399;
          font-size: 11px;
          font-weight: 500;
        }
        .nav-drawer-links {
          display: flex;
          flex-direction: column;
          padding: 24px 0;
        }
        .nav-drawer-link {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          text-decoration: none;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .nav-drawer-link-text {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: rgba(255, 255, 255, 0.75);
          letter-spacing: -0.02em;
          transition: color 0.2s ease;
        }
        .nav-drawer-link-active {
          color: #ffffff !important;
          font-weight: 500;
        }
        .nav-drawer-link-num {
          font-family: var(--font-mono);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.3);
        }
        .nav-drawer-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 24px;
        }
        .nav-drawer-socials {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        .nav-drawer-social-chip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.85);
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }
        .nav-drawer-social-chip:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        .nav-drawer-arrow {
          color: rgba(255, 255, 255, 0.4);
        }
        .nav-drawer-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          background: #ffffff;
          color: #000000;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }
        .nav-drawer-cta:hover {
          background-color: #e5e5e5;
        }
        .nav-drawer-cta-icon {
          width: 14px;
          height: 14px;
        }
        .nav-drawer-copyright {
          text-align: center;
          color: rgba(255, 255, 255, 0.3);
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 16px;
        }
      `}</style>
    </>
  );
}

export default Navbar;
