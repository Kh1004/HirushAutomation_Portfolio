'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, Compass, Eye, MapPin } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { about, mission, offices, vision } from '@/data/site';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision'>('mission');
  const photoRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      id="about"
      className="bg-[#F6F6F7] py-14 md:py-16 scroll-mt-20 border-b border-neutral-200"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Unboxed Editorial Story + Spacious 2x2 Capabilities Grid */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <h2 className="text-[28px] md:text-[34px] font-bold text-[#111111] leading-[1.18] mb-4">
                {about.title}
              </h2>
              <div className="space-y-3 text-[15px] text-[#444444] leading-[1.7]">
                {about.intro.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Spacious 2x2 Capabilities Grid */}
            <div className="pt-5 border-t border-neutral-300/80">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {about.capabilities.map((step, idx) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    className="flex items-center gap-3.5 bg-white border border-neutral-200 rounded-lg px-4 py-3.5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#B81005] shrink-0" />
                    <div>
                      <span className="font-mono text-[11px] text-[#B81005] tabular-nums block">
                        0{idx + 1}
                      </span>
                      <span className="text-[14.5px] font-semibold text-[#111111] leading-snug block">
                        {step}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Regional Offices */}
            <div className="pt-4 border-t border-neutral-300/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offices.map((office) => (
                <div key={office.id} className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#B81005] mt-1 shrink-0" />
                  <div>
                    <div className="text-[12.5px] font-semibold text-[#B81005]">
                      {office.country}
                    </div>
                    <div className="text-[13.5px] font-medium text-[#111111]">{office.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Control Panel Visual + Preserved Mission/Vision Switcher */}
          <motion.div
            ref={photoRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-xl overflow-hidden bg-[#18181B] text-white shadow-lg"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <motion.div
                style={{ y: imageY }}
                className="absolute -inset-y-6 inset-x-0 will-change-transform"
              >
                <Image
                  src={about.image}
                  alt={about.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  referrerPolicy="no-referrer"
                  className="object-cover object-center"
                />
              </motion.div>
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#18181B] via-[#18181B]/35 to-transparent"
              />
            </div>

            <div className="p-6">
              <div
                role="tablist"
                aria-label="Mission and Vision"
                className="inline-flex items-center gap-1 p-1 rounded-lg bg-white/10 mb-4"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'mission'}
                  onClick={() => setActiveTab('mission')}
                  className={`relative px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-colors duration-150 inline-flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'mission' ? 'text-white' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {activeTab === 'mission' && (
                    <motion.span
                      layoutId="about-mv-pill"
                      className="absolute inset-0 rounded-md bg-[#B81005]"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <Compass className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">{mission.title}</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'vision'}
                  onClick={() => setActiveTab('vision')}
                  className={`relative px-3.5 py-1.5 text-[13px] font-medium rounded-md transition-colors duration-150 inline-flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'vision' ? 'text-white' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {activeTab === 'vision' && (
                    <motion.span
                      layoutId="about-mv-pill"
                      className="absolute inset-0 rounded-md bg-[#B81005]"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <Eye className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">{vision.title}</span>
                </button>
              </div>

              <div className="min-h-[84px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeTab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="text-[14.5px] text-neutral-200 leading-[1.65]"
                  >
                    {activeTab === 'mission' ? mission.description : vision.description}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
