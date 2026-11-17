'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'motion/react';

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      if (href === '#') {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.0 });
        return;
      }

      const el = document.querySelector(href);
      if (el instanceof HTMLElement) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -20, duration: 1.05 });
      }
    };

    const handleScrollTopEvent = () => {
      lenis.scrollTo(0, { duration: 1.05 });
    };

    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('hirush:scroll-top', handleScrollTopEvent);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('hirush:scroll-top', handleScrollTopEvent);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
