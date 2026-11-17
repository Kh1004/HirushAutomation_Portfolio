'use client';

import React from 'react';
import { ArrowRight, Check, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { trainings, trainingsSection } from '@/data/site';

export default function TrainingsSection() {
  const handleTrainingInquiry = (title: string) => {
    window.dispatchEvent(
      new CustomEvent('hirush:prefill-subject', {
        detail: { subject: title },
      })
    );
  };

  return (
    <section
      id="trainings"
      className="bg-[#F6F6F7] py-14 md:py-16 scroll-mt-20 border-b border-neutral-200"
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
            {trainingsSection.eyebrow}
          </p>
          <h2 className="text-[28px] md:text-[34px] font-bold text-[#111111] leading-[1.18]">
            {trainingsSection.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainings.map((training, index) => (
            <motion.article
              key={training.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group bg-white border border-neutral-200 hover:border-[#B81005]/60 rounded-xl p-6 flex flex-col justify-between transition-shadow duration-200 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-neutral-200">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-[#B81005]/10 text-[#B81005] group-hover:bg-[#B81005] group-hover:text-white transition-colors duration-200 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </span>
                    <span className="font-mono text-[12px] font-semibold text-[#B81005] tabular-nums">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                <h3 className="text-[19px] font-bold text-[#111111] group-hover:text-[#B81005] transition-colors mb-2.5">
                  {training.title}
                </h3>
                <p className="text-[14px] text-[#555555] leading-[1.68] mb-5">
                  {training.description}
                </p>

                {training.topics.length > 0 && (
                  <div className="space-y-2 mb-6">
                    {training.topics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-center gap-2.5 text-[13.5px] text-[#222222]"
                      >
                        <Check className="w-4 h-4 text-[#B81005] shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-end">
                <a
                  href="#contact"
                  onClick={() => handleTrainingInquiry(training.title)}
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#B81005] hover:text-[#940D05] transition-colors"
                >
                  {training.title}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
