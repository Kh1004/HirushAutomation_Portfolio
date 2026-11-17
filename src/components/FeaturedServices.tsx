'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { services, servicesSection } from '@/data/site';

export default function FeaturedServices() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = services[selectedIndex];

  const handleRequestScope = (serviceTitle: string) => {
    window.dispatchEvent(
      new CustomEvent('hirush:prefill-subject', {
        detail: { subject: serviceTitle },
      })
    );
  };

  return (
    <section
      id="services"
      className="bg-white py-14 md:py-16 scroll-mt-20 border-b border-neutral-200"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-9"
        >
          <p className="text-[13px] font-semibold text-[#B81005] tracking-wide mb-1.5">
            {servicesSection.eyebrow}
          </p>
          <h2
            className="text-[26px] md:text-[32px] font-bold text-[#111111] leading-[1.2] max-w-[780px]"
            style={{ textWrap: 'balance' }}
          >
            {servicesSection.heading}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left: Clean Typographic Index */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-neutral-200 border-y border-neutral-200">
            {services.map((service, idx) => {
              const isActive = idx === selectedIndex;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative text-left py-4 px-4 transition-colors duration-150 flex items-start gap-4 group ${
                    isActive ? 'bg-[#F6F6F7]' : 'bg-white hover:bg-neutral-50'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="service-active-indicator"
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#B81005]"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <span
                    className={`font-mono text-[13px] font-semibold tabular-nums pt-0.5 ${
                      isActive ? 'text-[#B81005]' : 'text-neutral-400 group-hover:text-neutral-600'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-[16px] font-semibold leading-snug transition-colors ${
                        isActive ? 'text-[#111111]' : 'text-[#333333] group-hover:text-[#111111]'
                      }`}
                    >
                      {service.title}
                    </div>
                    <p className="text-[13px] text-[#666666] line-clamp-1 mt-0.5">
                      {service.shortDescription}
                    </p>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 mt-1 shrink-0 transition-transform duration-150 ${
                      isActive
                        ? 'text-[#B81005] translate-x-0.5'
                        : 'text-neutral-300 group-hover:text-neutral-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Dark Charcoal Visual Stage */}
          <div className="lg:col-span-7 rounded-xl overflow-hidden bg-[#141416] text-white flex flex-col justify-between shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full justify-between"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[#111111]">
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 680px"
                    referrerPolicy="no-referrer"
                    className="object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#141416] via-[#141416]/30 to-transparent"
                  />
                </div>

                <div className="p-6 md:p-7 flex-1 flex flex-col justify-between gap-5">
                  <div>
                    <h3 className="text-[22px] font-bold text-white mb-2">{current.title}</h3>
                    <p className="text-[14.5px] text-neutral-300 leading-[1.65]">
                      {current.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-white/10">
                    {current.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2 text-[13.5px] text-neutral-200"
                      >
                        <Check className="w-4 h-4 text-[#FC542B] mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <motion.a
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      href="#contact"
                      onClick={() => handleRequestScope(current.title)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-white bg-[#B81005] hover:bg-[#940D05] rounded-md transition-colors duration-150 whitespace-nowrap"
                    >
                      {current.title}
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
