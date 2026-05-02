import { useState, useEffect, useRef } from 'react';
import { animate, utils } from 'animejs';

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const navRef = useRef(null);

  // Show navbar after loader clears
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Navbar reveal animation
  useEffect(() => {
    if (!visible || !navRef.current) return;
    animate(navRef.current, {
      opacity: [0, 1],
      translateY: [-20, 0],
      easing: 'outQuart',
      duration: 800,
    });
  }, [visible]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 'var(--nav-h)',
          display: 'flex',
          alignItems: 'center',
          transition: 'none',
          backgroundColor: 'transparent',
          backdropFilter: 'none',
          borderBottom: '1px solid transparent',
          opacity: 0,
        }}
      >
        <div
          className="container-editorial"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              fontSize: '1.125rem',
              color: '#111111',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              transition: 'color 0.4s ease',
            }}
          >
            Soumyaranjan.
          </a>

          {/* Desktop links */}
          <div className="nav-desktop">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="nav-link"
                style={{
                  color: 'rgba(0,0,0,0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#111111';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(0,0,0,0.5)';
                }}
              >
                {link.label}
              </a>
            ))}
            {/* Added Social Links */}
            <a href="https://linkedin.com/in/soumyaranjansahoo97" target="_blank" rel="noreferrer" className="nav-link" style={{ color: 'rgba(0,0,0,0.5)' }}>LinkedIn</a>
            <a href="https://github.com/SoumyaranjanDS" target="_blank" rel="noreferrer" className="nav-link" style={{ color: 'rgba(0,0,0,0.5)' }}>GitHub</a>
            <a href="/DEV_Soumyaranjan.pdf" download className="nav-link" style={{ color: '#FF6B00', fontWeight: 'bold' }}>CV</a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="nav-mobile-btn"
          >
            <span className={`hamburger-line ${mobileOpen ? 'hamburger-open-1' : ''}`}
              style={{ backgroundColor: '#111111' }} />
            <span className={`hamburger-line ${mobileOpen ? 'hamburger-open-2' : ''}`}
              style={{ backgroundColor: '#111111' }} />
            <span className={`hamburger-line ${mobileOpen ? 'hamburger-open-3' : ''}`}
              style={{ backgroundColor: '#111111' }} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-inner">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="mobile-link"
              style={{ transitionDelay: mobileOpen ? `${i * 80 + 200}ms` : '0ms' }}
            >
              <span className="mobile-link-number">0{i + 1}</span>
              <span className="mobile-link-label">{link.label}</span>
            </a>
          ))}
          <a
            href="/DEV_Soumyaranjan.pdf"
            download
            className="mobile-link"
            style={{ transitionDelay: mobileOpen ? `${navLinks.length * 80 + 200}ms` : '0ms' }}
          >
            <span className="mobile-link-number">0{navLinks.length + 1}</span>
            <span className="mobile-link-label" style={{ color: '#FF6B00' }}>CV Download</span>
          </a>
          {/* Removed Mobile Email as requested */}
        </div>
      </div>

      <style>{`
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 500;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: currentColor;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* === Hamburger === */
        .nav-mobile-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          flex-direction: column;
          gap: 5px;
          z-index: 60;
        }

        .hamburger-line {
          display: block;
          width: 26px;
          height: 1.5px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center;
        }

        .hamburger-open-1 {
          transform: rotate(45deg) translate(4px, 4px);
        }
        .hamburger-open-2 {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger-open-3 {
          transform: rotate(-45deg) translate(4px, -4px);
        }

        /* === Mobile Fullscreen Menu === */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 45;
          background-color: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.5s ease, visibility 0.5s ease;
        }

        .mobile-menu-open {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-inner {
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
          padding: 0 32px;
        }

        .mobile-link {
          display: flex;
          align-items: baseline;
          gap: 16px;
          padding: 24px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          text-decoration: none;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease, color 0.3s ease;
        }

        .mobile-menu-open .mobile-link {
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-link-number {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.05em;
        }

        .mobile-link-label {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 8vw, 3.5rem);
          font-weight: 400;
          color: #ffffff;
          letter-spacing: -0.02em;
          transition: color 0.3s ease;
        }

        .mobile-link:active .mobile-link-label {
          color: #FF6B00;
        }

        .mobile-footer {
          margin-top: 48px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .mobile-menu-open .mobile-footer {
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-email {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          letter-spacing: 0.02em;
        }

        .mobile-email:active {
          color: #FF6B00;
        }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
