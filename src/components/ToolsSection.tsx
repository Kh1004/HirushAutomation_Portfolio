'use client';

import React, { useState } from 'react';
import { Activity, Cable, CircuitBoard, Compass, Cpu, LayoutGrid, Sliders } from 'lucide-react';
import { motion } from 'motion/react';
import { tools, toolsSection } from '@/data/site';
import type { ToolIconKey } from '@/data/site';

const iconMap: Record<ToolIconKey, React.ReactNode> = {
  cad: <Compass className="w-5 h-5" />,
  lines: <Cable className="w-5 h-5" />,
  panel: <LayoutGrid className="w-5 h-5" />,
  chart: <Activity className="w-5 h-5" />,
  plc: <Cpu className="w-5 h-5" />,
};

const toolLogoMap: Record<string, React.ReactNode> = {
  autocad: <Compass className="w-6 h-6" />,
  'eplan-electric': <Cable className="w-6 h-6" />,
  paneldraw: <LayoutGrid className="w-6 h-6" />,
  pscad: <Activity className="w-6 h-6" />,
  'siemens-tia-portal': <Cpu className="w-6 h-6" />,
  'allen-bradley': <CircuitBoard className="w-6 h-6" />,
  'schneider-ecostruxure': <Sliders className="w-6 h-6" />,
};

export default function ToolsSection() {
  const [marqueePaused, setMarqueePaused] = useState(false);

  const topRow = tools.slice(0, 4);
  const bottomRow = tools.slice(4);

  return (
    <section
      id="tools"
      className="bg-[#141416] text-white py-14 md:py-16 scroll-mt-20 border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-[640px] mx-auto mb-10"
        >
          <p className="text-[13px] font-semibold text-[#FC542B] tracking-wide mb-1.5">
            {toolsSection.eyebrow}
          </p>
          <h2 className="text-[28px] md:text-[34px] font-bold text-white leading-[1.2]">
            {toolsSection.heading}
          </h2>
        </motion.div>

        {/* Manual Architectural Logo + Name Showcase (no filters, no long descriptions) */}
        <div className="space-y-4 mb-10">
          {/* Row 1: 4 tools */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {topRow.map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
                className="group flex items-center gap-4 px-5 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#FC542B]/50 transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-[#B81005]/15 border border-[#B81005]/30 text-[#FC542B] group-hover:bg-[#B81005] group-hover:text-white transition-colors duration-200 flex items-center justify-center shrink-0">
                  {toolLogoMap[tool.id] ?? iconMap[tool.icon]}
                </div>
                <span className="text-[15.5px] font-semibold text-white leading-snug">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Row 2: 3 centered tools */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:max-w-[900px] lg:mx-auto">
            {bottomRow.map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: (idx + 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
                className="group flex items-center gap-4 px-5 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#FC542B]/50 transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-[#B81005]/15 border border-[#B81005]/30 text-[#FC542B] group-hover:bg-[#B81005] group-hover:text-white transition-colors duration-200 flex items-center justify-center shrink-0">
                  {toolLogoMap[tool.id] ?? iconMap[tool.icon]}
                </div>
                <span className="text-[15.5px] font-semibold text-white leading-snug">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Continuous Platform Ticker Ribbon */}
      <div
        onMouseEnter={() => setMarqueePaused(true)}
        onMouseLeave={() => setMarqueePaused(false)}
        className="border-t border-white/10 pt-6 overflow-hidden select-none"
      >
        <motion.div
          animate={{ x: marqueePaused ? undefined : ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-8 whitespace-nowrap w-max"
        >
          {[...tools, ...tools].map((tool, i) => (
            <div
              key={`${tool.id}-${i}`}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-md bg-white/[0.03] border border-white/10 text-neutral-300"
            >
              <span className="text-[#FC542B]">{toolLogoMap[tool.id] ?? iconMap[tool.icon]}</span>
              <span className="text-[13.5px] font-medium text-white">{tool.name}</span>
              <span className="text-[12px] text-neutral-400">· {tool.category}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
