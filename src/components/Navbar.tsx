'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { nav, site } from '@/data/site';

export default function Navbar() {
  const [activeHref, setActiveHref] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 32, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);

    if (mobileOpen) {
      setHidden(false);
      return;
    }

    if (latest > 140 && latest > previous) {
      setHidden(true);
    } else if (latest < previous || latest <= 80) {
      setHidden(false);
    }
  });

  useEffect(() => {
    const sectionIds = nav.map((item) => item.href.replace('#', '')).filter(Boolean);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (href: string) => {
    setActiveHref(href);
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b transition-colors duration-200 ${
        scrolled ? 'bg-[#141416]/95 border-white/15 shadow-lg' : 'bg-[#111111]/65 border-white/10'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-[74px] flex items-center justify-between gap-8">
        {/* Zone 1: Larger Logo + Hirush Automation Brand Name */}
        <a
          href="#"
          onClick={() => handleLinkClick('')}
          className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#FC542B] rounded"
        >
          <span className="bg-white rounded-md p-1 flex items-center justify-center shrink-0">
            <Image
              src={site.logo}
              alt={site.name}
              width={44}
              height={44}
              referrerPolicy="no-referrer"
              className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
              priority
            />
          </span>
          <span className="text-[17px] sm:text-[18px] font-bold tracking-tight text-white">
            {site.name}
          </span>
        </a>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-5">
          {nav.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleLinkClick(item.href)}
                className={`relative py-2 text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#FC542B] ${
                  isActive ? 'text-white' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    aria-hidden="true"
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[#FC542B]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={() => handleLinkClick('#contact')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-[13px] font-semibold text-white bg-[#B81005] hover:bg-[#940D05] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FC542B]"
          >
            {site.contactButtonLabel}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-white hover:bg-white/10 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#FC542B]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Scroll Progress Hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="h-[2px] w-full bg-[#B81005] origin-left"
      />

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#141416] border-t border-white/10 px-5 py-4 shadow-xl">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {nav.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className={`px-3 py-2.5 text-[14px] font-medium rounded-md transition-colors duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#B81005] text-white'
                      : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => handleLinkClick('#contact')}
              className="mt-2 inline-flex items-center justify-center px-4 py-2.5 text-[14px] font-semibold text-white bg-[#B81005] hover:bg-[#940D05] rounded-md transition-colors duration-150 whitespace-nowrap"
            >
              {site.contactButtonLabel}
            </a>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
