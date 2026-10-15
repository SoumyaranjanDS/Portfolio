import { useState } from 'react';

export function About() {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      id: '01',
      tag: 'SCALE & ARCHITECTURE',
      title: 'Monolith to Microservices',
      summary: 'Migrated 10K+ active-user monolith into event-driven microservices at Infotattva. Designed multi-tenant backends with row-level isolation, RBAC, Docker, and automated CI/CD pipelines.',
      metrics: '10K+ Users • Event-Driven • Docker CI/CD'
    },
    {
      id: '02',
      tag: 'REAL-TIME & INFRASTRUCTURE',
      title: 'Distributed Systems & Cloud',
      summary: 'Engineered high-throughput platforms like Bangalore Rapids (real-time driver tracking) and SOLITX (architected for 20K DAU). Heavy optimization with PostgreSQL, Redis, and AWS EC2/S3.',
      metrics: 'Sub-second Latency • AWS Scaled • 100K+ Total Reach'
    },
    {
      id: '03',
      tag: 'AI & INTELLIGENT SYSTEMS',
      title: 'Production LLMs & Machine Learning',
      summary: 'Integrated generative models (OpenAI, Gemini) into 5+ client applications for analysis and automated scoring. Experienced with PyTorch, Scikit-learn, and Agno agentic frameworks.',
      metrics: '5+ Client AI Deployments • Agno • Python ML'
    }
  ];

  return (
    <>
      <section id="about" className="about-dossier-section">
        <div className="container-editorial">
          {/* Top Label & Coordinate Header */}
          <div className="dossier-topbar">
            <div className="dossier-meta">
              <span className="dossier-tag">SYS_01 // ARCHITECT DOSSIER</span>
              <span className="dossier-status">
                <span className="dossier-status-dot" />
                ACTIVE ENGINE
              </span>
            </div>
            <span className="dossier-location">BHUBANESWAR, IN • 20.2961° N, 85.8245° E</span>
          </div>

          {/* Minimalist Bold Typographic Statement */}
          <div className="dossier-statement-wrap">
            <h2 className="dossier-headline">
              Engineering <span className="font-serif italic font-normal text-black">scalable distributed systems</span>, real-time architectures, and AI-powered platforms that stay fast under load.
            </h2>
          </div>

          {/* Unique 3-Pillar Architectural Ledger Cards */}
          <div className="dossier-grid">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                className={`dossier-card ${activeTab === idx ? 'dossier-card-active' : ''}`}
                onMouseEnter={() => setActiveTab(idx)}
              >
                <div className="dossier-card-top">
                  <span className="dossier-card-num">{pillar.id}</span>
                  <span className="dossier-card-tag">{pillar.tag}</span>
                </div>

                <h3 className="dossier-card-title">{pillar.title}</h3>
                <p className="dossier-card-desc">{pillar.summary}</p>

                <div className="dossier-card-footer">
                  <span className="dossier-card-metric">{pillar.metrics}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Compact Architectural Bottom Strip */}
          <div className="dossier-footer-bar">
            <div className="dossier-key-stats">
              <div className="dossier-stat-item">
                <span className="stat-label">PRODUCTION REACH</span>
                <span className="stat-value">100K+ Users</span>
              </div>
              <div className="dossier-stat-item">
                <span className="stat-label">HACKATHON RANK</span>
                <span className="stat-value">Top 7 / 450+ Teams</span>
              </div>
              <div className="dossier-stat-item">
                <span className="stat-label">EDUCATION</span>
                <span className="stat-value">MCA @ Trident ('27)</span>
              </div>
            </div>

            <a
              href="/Soumyaranjan-Full stack Dev.pdf"
              download
              className="dossier-action-btn"
            >
              <span>Download CV</span>
              <span className="dossier-action-arrow">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Scoped CSS for Modern Architectural Dossier Style */}
      <style>{`
        .about-dossier-section {
          position: relative;
          background-color: var(--color-surface);
          padding-top: clamp(60px, 8vw, 100px);
          padding-bottom: clamp(60px, 8vw, 100px);
          border-bottom: 1px solid var(--color-surface-highest);
        }

        /* Top Bar */
        .dossier-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--color-surface-highest);
          margin-bottom: clamp(32px, 5vw, 48px);
        }

        .dossier-meta {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .dossier-tag {
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--color-outline);
        }

        .dossier-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 2px 8px;
          border-radius: 9999px;
          background-color: rgba(16, 185, 129, 0.08);
          color: #059669;
          font-family: var(--font-mono, monospace);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.08em;
        }

        .dossier-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #10B981;
        }

        .dossier-location {
          font-family: var(--font-mono, monospace);
          font-size: 0.6875rem;
          color: var(--color-outline);
          letter-spacing: 0.08em;
        }

        /* Punchy Typographic Statement */
        .dossier-statement-wrap {
          margin-bottom: clamp(40px, 6vw, 64px);
          max-width: 1040px;
        }

        .dossier-headline {
          font-family: var(--font-sans);
          font-size: clamp(1.75rem, 3.4vw, 2.75rem);
          font-weight: 400;
          line-height: 1.3;
          letter-spacing: -0.025em;
          color: var(--color-on-surface);
        }

        /* 3-Pillar Architectural Cards */
        .dossier-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background-color: var(--color-surface-highest);
          border: 1px solid var(--color-surface-highest);
          margin-bottom: clamp(32px, 5vw, 48px);
        }

        .dossier-card {
          background-color: var(--color-surface-lowest);
          padding: clamp(24px, 3vw, 36px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 280px;
          transition: background-color 0.25s ease, transform 0.25s ease;
          position: relative;
        }

        .dossier-card:hover,
        .dossier-card-active {
          background-color: #ffffff;
        }

        .dossier-card-top {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .dossier-card-num {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--color-outline-variant);
          line-height: 1;
        }

        .dossier-card:hover .dossier-card-num {
          color: #FF6B00;
        }

        .dossier-card-tag {
          font-family: var(--font-mono, monospace);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--color-outline);
          text-transform: uppercase;
        }

        .dossier-card-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 500;
          color: var(--color-primary);
          letter-spacing: -0.015em;
          margin-bottom: 12px;
          line-height: 1.25;
        }

        .dossier-card-desc {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--color-on-surface-variant);
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .dossier-card-footer {
          padding-top: 16px;
          border-top: 1px dashed var(--color-surface-highest);
        }

        .dossier-card-metric {
          font-family: var(--font-mono, monospace);
          font-size: 0.6875rem;
          font-weight: 500;
          color: #111111;
          letter-spacing: 0.02em;
        }

        /* Bottom Footer Bar */
        .dossier-footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          background-color: var(--color-surface-lowest);
          border: 1px solid var(--color-surface-highest);
          gap: 24px;
        }

        .dossier-key-stats {
          display: flex;
          align-items: center;
          gap: clamp(24px, 4vw, 48px);
          flex-wrap: wrap;
        }

        .dossier-stat-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stat-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.625rem;
          font-weight: 600;
          color: var(--color-outline);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .stat-value {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-primary);
        }

        .dossier-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background-color: var(--color-primary);
          color: var(--color-on-primary);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background-color 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .dossier-action-btn:hover {
          background-color: #222222;
        }

        .dossier-action-arrow {
          font-size: 0.875rem;
        }

        /* Mobile Responsiveness */
        @media (max-width: 900px) {
          .dossier-grid {
            grid-template-columns: 1fr;
          }

          .dossier-card {
            min-height: auto;
          }

          .dossier-footer-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
          }

          .dossier-action-btn {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .dossier-location {
            display: none;
          }

          .dossier-key-stats {
            gap: 20px;
          }
        }
      `}</style>
    </>
  );
}

export default About;
