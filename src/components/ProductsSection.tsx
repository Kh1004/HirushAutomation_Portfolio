'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  AppWindow,
  ArrowRight,
  BellRing,
  Check,
  Database,
  Monitor,
  ShieldAlert,
  Smartphone,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { products, productsSection } from '@/data/site';
import type { ProductIconKey } from '@/data/site';

const iconMap: Record<ProductIconKey, React.ReactNode> = {
  scada: <Monitor className="w-4 h-4" />,
  alert: <BellRing className="w-4 h-4" />,
  sentinel: <ShieldAlert className="w-4 h-4" />,
  collector: <Database className="w-4 h-4" />,
  appstudio: <AppWindow className="w-4 h-4" />,
  app: <Smartphone className="w-4 h-4" />,
};

export default function ProductsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = products[activeIdx];

  const handleProductInquiry = (productName: string) => {
    window.dispatchEvent(
      new CustomEvent('hirush:prefill-subject', {
        detail: { subject: productName },
      })
    );
  };

  return (
    <section
      id="products"
      className="bg-[#F6F6F7] py-14 md:py-16 scroll-mt-20 border-b border-neutral-200"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <p className="text-[13px] font-semibold text-[#B81005] tracking-wide mb-1.5">
            {productsSection.eyebrow}
          </p>
          <h2 className="text-[28px] md:text-[34px] font-bold text-[#111111] leading-[1.18]">
            {productsSection.heading}
          </h2>
        </motion.div>

        <div
          role="tablist"
          aria-label="HirushCore products"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6"
        >
          {products.map((product, idx) => {
            const isActive = idx === activeIdx;
            const shortName = product.name.replace('HirushCore ', '');
            return (
              <button
                key={product.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIdx(idx)}
                className={`relative flex items-center justify-center gap-2 px-3 py-3 text-[13px] font-semibold rounded-lg border transition-colors duration-150 whitespace-nowrap ${
                  isActive
                    ? 'border-[#B81005] text-white'
                    : 'bg-white border-neutral-200 text-[#333333] hover:border-[#B81005]/50 hover:text-[#111111]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="product-dock-pill"
                    className="absolute inset-0 rounded-lg bg-[#B81005]"
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span className="relative z-10 shrink-0">{iconMap[product.icon]}</span>
                <span className="relative z-10 truncate">{shortName}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-neutral-200 rounded-xl p-5 md:p-7 shadow-sm"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch"
            >
              {/* Left: Engineering Visual Frame */}
              <div className="lg:col-span-6 relative rounded-lg overflow-hidden bg-[#141416] text-white min-h-[280px] flex flex-col justify-end">
                <Image
                  src={current.image}
                  alt={`${current.name} — ${current.tagline}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  referrerPolicy="no-referrer"
                  className="object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/45 to-transparent"
                />
                <div className="relative z-10 p-5 md:p-6">
                  <span className="font-mono text-[12px] text-[#FC542B] tabular-nums block mb-1">
                    {String(activeIdx + 1).padStart(2, '0')} /{' '}
                    {String(products.length).padStart(2, '0')}
                  </span>
                  <div className="text-[20px] font-bold text-white leading-snug">
                    {current.name}
                  </div>
                  <p className="text-[13.5px] text-neutral-300 mt-1">{current.tagline}</p>
                </div>
              </div>

              {/* Right: Original Product Details & Features */}
              <div className="lg:col-span-6 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-md bg-[#B81005]/10 text-[#B81005] flex items-center justify-center shrink-0">
                      {iconMap[current.icon]}
                    </div>
                    <span className="text-[13.5px] font-medium text-[#555555]">
                      {current.tagline}
                    </span>
                  </div>

                  <h3 className="text-[24px] font-bold text-[#111111] mb-4">{current.name}</h3>

                  <ul className="space-y-2.5 mb-6">
                    {current.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-[14.5px] text-[#333333]"
                      >
                        <Check className="w-4 h-4 text-[#B81005] mt-1 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex items-center justify-between gap-4">
                  <span className="font-mono text-[12px] text-[#666666] tabular-nums">
                    {String(activeIdx + 1).padStart(2, '0')} /{' '}
                    {String(products.length).padStart(2, '0')}
                  </span>
                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href="#contact"
                    onClick={() => handleProductInquiry(current.name)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-[13.5px] font-semibold text-white bg-[#B81005] hover:bg-[#940D05] rounded-md transition-colors duration-150 whitespace-nowrap"
                  >
                    {current.name}
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
