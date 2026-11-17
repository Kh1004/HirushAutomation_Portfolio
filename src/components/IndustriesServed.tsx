'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { industries, industriesClosing, industriesSection } from '@/data/site';

export default function IndustriesServed() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = industries[selectedIdx];
  const stageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section id="industries" className="bg-[#18181B] text-white py-14 md:py-16 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-9"
        >
          <h2 className="text-[28px] md:text-[34px] font-bold text-white leading-[1.18]">
            {industriesSection.heading}
          </h2>
        </motion.div>

        <motion.div
          ref={stageRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          <div className="lg:col-span-5 flex flex-col divide-y divide-white/10 border-y border-white/10">
            {industries.map((ind, idx) => {
              const isActive = idx === selectedIdx;
              return (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`relative text-left py-3.5 px-4 flex items-center justify-between gap-3 transition-colors duration-150 ${
                    isActive ? 'bg-white/[0.07]' : 'hover:bg-white/[0.03]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="industry-active-bar"
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FC542B]"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <div className="flex items-baseline gap-3.5">
                    <span
                      className={`font-mono text-[12px] tabular-nums ${
                        isActive ? 'text-[#FC542B]' : 'text-neutral-500'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-[15.5px] font-semibold ${
                        isActive ? 'text-white' : 'text-neutral-300'
                      }`}
                    >
                      {ind.name}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                      isActive ? 'text-[#FC542B] translate-x-0.5' : 'text-neutral-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 rounded-xl overflow-hidden bg-[#111111] border border-white/10 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col h-full justify-between"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <motion.div
                    style={{ y: photoY }}
                    className="absolute -inset-y-5 inset-x-0 will-change-transform"
                  >
                    <Image
                      src={current.image}
                      alt={current.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 680px"
                      referrerPolicy="no-referrer"
                      className="object-cover object-center"
                    />
                  </motion.div>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/35 to-transparent"
                  />
                  <div className="absolute bottom-3.5 left-6 right-6 flex items-center justify-between z-10">
                    <span className="font-mono text-[12px] text-[#FC542B] tabular-nums">
                      0{selectedIdx + 1} / 0{industries.length}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-7 space-y-4">
                  <div>
                    <h3 className="text-[22px] font-bold text-white mb-2">{current.name}</h3>
                    <p className="text-[15px] text-neutral-200 leading-[1.65]">
                      {current.description}
                    </p>
                  </div>

                  <p className="text-[13px] text-neutral-400 leading-[1.6] pt-4 border-t border-white/10">
                    {industriesClosing}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
