import { useEffect, useRef, useState } from 'react';

/**
 * useParallax — Attaches a scroll-driven parallax to elements.
 * Returns a ref to attach to the container.
 * Children with `data-parallax="<speed>"` will translate based on scroll.
 * Speed: 0 = static, negative = move slower (depth), positive = move faster.
 */
export function useParallax() {
  const containerRef = useRef(null);

  useEffect(() => {
    let raf;

    const update = () => {
      if (!containerRef.current) return;

      const elements = containerRef.current.querySelectorAll('[data-parallax]');
      const scrollY = window.scrollY;

      elements.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2 + scrollY;
        const viewCenter = scrollY + window.innerHeight / 2;
        const offset = (viewCenter - elCenter) * speed;
        el.style.transform = `translateY(${offset}px)`;
      });

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return containerRef;
}
