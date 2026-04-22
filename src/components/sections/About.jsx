import { useEffect, useRef, useState, useMemo } from 'react';

/**
 * Full-width text reveal — each word unmasks as you scroll,
 * going from dim gray to full black. Apple "Privacy page" style.
 */
export function About() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Scroll tracking
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

  // Content blocks — each word will be individually animated
  const blocks = useMemo(() => [
    {
      type: 'label',
      text: 'Know About Me',
    },
    {
      type: 'headline',
      text: 'I build things that exist at the edge of design and engineering — where form meets function and every pixel has a purpose.',
    },
    {
      type: 'body',
      text: 'Started with curiosity and a broken laptop. My first line of code was a Python print statement — and I\'ve been hooked on building ever since. From fixing bugs at 2 AM to shipping full-stack apps, the process of creating something from nothing is what drives me.',
    },
    {
      type: 'body',
      text: 'Currently pursuing MCA at Trident Academy of Creative Technology, Bhubaneswar. My work sits at the intersection of full-stack development and machine learning — building systems that are both technically robust and genuinely beautiful.',
    },
  ], []);

  // Split all words with their global index for scroll-linked reveal
  const allWords = useMemo(() => {
    const words = [];
    blocks.forEach((block) => {
      const blockWords = block.text.split(' ').map((word) => ({
        word,
        type: block.type,
      }));
      words.push(...blockWords);
    });
    return words;
  }, [blocks]);

  const totalWords = allWords.length;

  // Calculate word opacity based on scroll progress
  const getWordOpacity = (wordIndex) => {
    // Each word occupies a small slice of the total progress
    // Words reveal progressively — earlier words reveal first
    const wordStart = (wordIndex / totalWords) * 0.85; // compress to 85% of scroll
    const wordEnd = wordStart + 0.08; // each word takes 8% of scroll to fully reveal
    
    if (progress <= wordStart) return 0.12;
    if (progress >= wordEnd) return 1;
    
    const wordProgress = (progress - wordStart) / (wordEnd - wordStart);
    return 0.12 + wordProgress * 0.88;
  };

  // Render words grouped by block
  const renderBlocks = () => {
    let globalIndex = 0;
    
    return blocks.map((block, blockIdx) => {
      const words = block.text.split(' ');
      const renderedWords = words.map((word, wordIdx) => {
        const opacity = getWordOpacity(globalIndex);
        globalIndex++;
        return (
          <span
            key={`${blockIdx}-${wordIdx}`}
            style={{
              opacity,
              transition: 'opacity 0.05s linear',
              display: 'inline',
            }}
          >
            {word}{' '}
          </span>
        );
      });

      if (block.type === 'label') {
        return (
          <div key={blockIdx} className="reveal-label">
            {renderedWords}
          </div>
        );
      }

      if (block.type === 'headline') {
        return (
          <h2 key={blockIdx} className="reveal-headline">
            {renderedWords}
          </h2>
        );
      }

      return (
        <p key={blockIdx} className="reveal-body">
          {renderedWords}
        </p>
      );
    });
  };

  // Stats — reveal based on final 15% of scroll
  const statsOpacity = Math.max(0, (progress - 0.82) / 0.18);
  const stats = [
    { value: '4+', label: 'Projects Shipped' },
    { value: '3', label: 'Languages Spoken' },
    { value: '2027', label: 'MCA Graduation' },
    { value: '100%', label: 'Curiosity Driven' },
  ];

  return (
    <>
      <section ref={containerRef} id="about" className="text-reveal-container">
        <div className="text-reveal-sticky">
          <div className="text-reveal-content">
            {renderBlocks()}

            {/* Stats */}
            <div
              className="reveal-stats"
              style={{
                opacity: statsOpacity,
                transform: `translateY(${(1 - statsOpacity) * 20}px)`,
              }}
            >
              <div className="reveal-stats-line" />
              <div className="reveal-stats-grid">
                {stats.map((stat) => (
                  <div key={stat.label} className="reveal-stat">
                    <span className="reveal-stat-value">{stat.value}</span>
                    <span className="reveal-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .text-reveal-container {
          position: relative;
          height: 300vh;
          background-color: var(--color-surface);
        }

        .text-reveal-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .text-reveal-content {
          max-width: 960px;
          padding: 0 var(--margin-edge);
          width: 100%;
        }

        /* Label */
        .reveal-label {
          font-family: var(--font-sans);
          font-size: clamp(0.6875rem, 0.9vw, 0.75rem);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-outline);
          margin-bottom: 32px;
        }

        /* Headline — giant serif */
        .reveal-headline {
          font-family: var(--font-serif);
          font-size: clamp(1.75rem, 4vw, 3.25rem);
          font-weight: 300;
          line-height: 1.25;
          letter-spacing: -0.025em;
          color: var(--color-primary);
          margin: 0 0 40px 0;
        }

        /* Body */
        .reveal-body {
          font-family: var(--font-sans);
          font-size: clamp(0.875rem, 1.3vw, 1.0625rem);
          line-height: 1.7;
          color: var(--color-on-surface-variant);
          letter-spacing: -0.01em;
          margin: 0 0 20px 0;
          max-width: 720px;
        }

        /* Stats */
        .reveal-stats {
          margin-top: 48px;
          will-change: opacity, transform;
        }

        .reveal-stats-line {
          width: 100%;
          height: 1px;
          background-color: var(--color-surface-highest);
          margin-bottom: 28px;
        }

        .reveal-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .reveal-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .reveal-stat-value {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 300;
          color: var(--color-primary);
          letter-spacing: -0.03em;
        }

        .reveal-stat-label {
          font-family: var(--font-sans);
          font-size: clamp(0.5625rem, 0.7vw, 0.6875rem);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-outline);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .text-reveal-container {
            height: 250vh;
          }

          .reveal-headline {
            margin-bottom: 28px;
          }

          .reveal-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .reveal-stats {
            margin-top: 32px;
          }
        }

        @media (max-width: 480px) {
          .text-reveal-container {
            height: 220vh;
          }
        }
      `}</style>
    </>
  );
}
