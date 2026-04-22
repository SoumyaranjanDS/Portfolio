import { useState, useEffect } from 'react';
import { animate, utils } from 'animejs';

/**
 * Curtain Loader — 5 orange strips slide up to reveal the site.
 */
export function Loader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      const strips = document.querySelectorAll('.loader-strip');

      animate(strips, {
        translateY: [0, '-100%'],
        easing: 'inOutQuart',
        duration: 700,
        delay: utils.stagger(90, { from: 'last' }),
        onComplete: () => {
          setDone(true);
          document.body.style.overflow = '';
          setTimeout(() => setHidden(true), 300);
        },
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        pointerEvents: done ? 'none' : 'auto',
        opacity: done ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="loader-strip"
          style={{
            flex: 1,
            height: '100%',
            backgroundColor: '#FF6B00',
            willChange: 'transform',
            /* overlap strips by 1px to kill sub-pixel gap */
            marginLeft: i > 0 ? '-1px' : 0,
            position: 'relative',
            zIndex: 5 - i,
          }}
        />
      ))}
    </div>
  );
}
