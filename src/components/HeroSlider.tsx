'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { hero, site } from '@/data/site';

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const slides = hero.slides;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[activeSlide] ?? slides[0];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] pt-[74px] bg-[#111111] text-white overflow-hidden flex flex-col justify-between"
    >
      {/* Full-Viewport Parallax Background */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 opacity-35 pointer-events-none will-change-transform"
      >
        <Image
          src={hero.backgroundImage}
          alt={site.name}
          fill
          priority
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 via-[#111111]/65 to-[#111111]"
        />
      </motion.div>

      {/* Main Centered Full-Window Composition */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Original Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <p className="text-[13px] sm:text-[14px] font-semibold text-[#FC542B] tracking-wide mb-3">
                {hero.subheading}
              </p>

              <h1
                className="text-[36px] sm:text-[46px] lg:text-[54px] font-bold leading-[1.1] tracking-[-0.025em] text-white mb-5"
                style={{ textWrap: 'balance' }}
              >
                {hero.heading}
              </h1>

              <p className="text-[15.5px] sm:text-[17px] leading-[1.7] text-neutral-200 mb-8 max-w-[580px]">
                {hero.description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={hero.primaryCta.href}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-[14px] font-semibold text-white bg-[#B81005] hover:bg-[#940D05] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FC542B]"
                >
                  {hero.primaryCta.label}
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center gap-1.5 px-6 py-3.5 text-[14px] font-medium text-white border border-white/30 hover:border-white/70 hover:bg-white/10 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  {hero.secondaryCta.label}
                  <ArrowUpRight className="w-4 h-4 text-neutral-300" />
                </motion.a>
              </div>
            </motion.div>

            {/* Right: Visual Engineering Showcase */}
            {current && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5"
              >
                <div className="rounded-xl overflow-hidden border border-white/15 bg-[#18181B] shadow-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#111111]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={current.id}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={current.image}
                          alt={current.label}
                          fill
                          sizes="(max-width: 1024px) 100vw, 480px"
                          referrerPolicy="no-referrer"
                          className="object-cover object-center"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/25 to-transparent"
                        />
                      </motion.div>
                    </AnimatePresence>

                    <div className="absolute bottom-4 left-5 right-5 z-10 flex items-end justify-between gap-3">
                      <div>
                        <span className="font-mono text-[12px] text-[#FC542B] tabular-nums block mb-0.5">
                          0{activeSlide + 1} / 0{slides.length}
                        </span>
                        <div className="text-[17px] font-semibold text-white">{current.label}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-t border-white/10 divide-x divide-white/10">
                    {slides.map((slide, idx) => {
                      const isActive = idx === activeSlide;
                      return (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => setActiveSlide(idx)}
                          aria-label={slide.label}
                          className={`relative py-3 px-2 text-center transition-colors duration-150 ${
                            isActive
                              ? 'bg-white/10 text-white'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="hero-story-indicator"
                              className="absolute top-0 inset-x-0 h-[2px] bg-[#FC542B]"
                            />
                          )}
                          <span className="font-mono text-[12px] tabular-nums block">
                            0{idx + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Scroll Down Cue */}
      <div className="relative z-10 pb-6 flex justify-center">
        <motion.a
          href="#about"
          aria-label="Scroll to About Us"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-neutral-300 hover:text-white hover:border-white/50 transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.a>
      </div>
    </section>
  );
}
