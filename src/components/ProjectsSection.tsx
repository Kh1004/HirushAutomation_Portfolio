'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  Search,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  featuredProjectIds,
  hero,
  projectFilters,
  projectGallery,
  projectReference,
  projects,
} from '@/data/site';
import type { Project, ProjectFilterKey } from '@/data/site';

const flagshipStudies: Project[] = featuredProjectIds
  .map((id) => projects.find((p) => p.id === id))
  .filter((item): item is Project => item !== undefined);

const uniqueClients = Array.from(new Set(projects.map((p) => p.client)));

export default function ProjectsSection() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filter, setFilter] = useState<ProjectFilterKey>('all');
  const [query, setQuery] = useState('');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerOpen && lightboxIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        setLightboxIdx(null);
      } else if (lightboxIdx !== null && e.key === 'ArrowRight') {
        setLightboxIdx((prev) => (prev === null ? null : (prev + 1) % projectGallery.length));
      } else if (lightboxIdx !== null && e.key === 'ArrowLeft') {
        setLightboxIdx((prev) =>
          prev === null ? null : (prev - 1 + projectGallery.length) % projectGallery.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [drawerOpen, lightboxIdx]);

  const scrollStrip = (direction: 'prev' | 'next') => {
    if (!stripRef.current) return;
    const delta = direction === 'next' ? 300 : -300;
    stripRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesFilter = filter === 'all' || p.capability === filter;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const activeLightbox = lightboxIdx !== null ? projectGallery[lightboxIdx] : null;

  return (
    <section
      id="projects"
      className="bg-white py-14 md:py-16 scroll-mt-20 border-b border-neutral-200 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Header + Archive Drawer Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8"
        >
          <div>
            <p className="text-[13px] font-semibold text-[#B81005] tracking-wide mb-1.5">
              {projectReference.subtitle}
            </p>
            <h2 className="text-[28px] md:text-[34px] font-bold text-[#111111] leading-[1.18]">
              {projectReference.title}
            </h2>
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-[13.5px] font-semibold text-white bg-[#18181B] hover:bg-[#B81005] rounded-md transition-colors duration-200 whitespace-nowrap self-start md:self-auto"
          >
            <span>
              {projectReference.allProjectsLabel} ({projects.length})
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Client Trust Marquee Strip */}
        <div className="mb-9 py-3.5 border-y border-neutral-200 overflow-hidden bg-[#F6F6F7]/70 -mx-5 px-5 sm:mx-0 sm:px-0 sm:rounded-lg">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-10 whitespace-nowrap w-max"
          >
            {[...uniqueClients, ...uniqueClients].map((client, idx) => (
              <div
                key={`${client}-${idx}`}
                className="inline-flex items-center gap-2.5 text-[13.5px] font-semibold text-[#444444]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#B81005]" aria-hidden="true" />
                <span>{client}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3 Flagship Visual Spotlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flagshipStudies.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group rounded-xl overflow-hidden bg-[#141416] text-white flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image ?? hero.backgroundImage}
                    alt={project.imageAlt ?? `${project.title} — ${project.client}`}
                    fill
                    sizes="(max-width: 767px) 100vw, 380px"
                    referrerPolicy="no-referrer"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#141416] via-[#141416]/30 to-transparent"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-white bg-black/65 backdrop-blur-sm px-2.5 py-1 rounded">
                    <MapPin className="w-3.5 h-3.5 text-[#FC542B]" />
                    <span>{project.location}</span>
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-[16.5px] font-bold text-white leading-snug mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[13px] text-neutral-300 flex items-start gap-2">
                    <Building2 className="w-3.5 h-3.5 text-[#FC542B] mt-0.5 shrink-0" />
                    <span>{project.client}</span>
                  </p>
                </div>
              </div>

              <div className="px-5 py-3.5 border-t border-white/10 flex items-center justify-between gap-2 text-[12px] text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FC542B] shrink-0" />
                  <span>{project.role}</span>
                </span>
                <span className="font-mono text-neutral-500 tabular-nums shrink-0">0{idx + 1}</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Compact Horizontal Photo Filmstrip + Lightbox Trigger */}
        {projectGallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 pt-8 border-t border-neutral-200"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2.5">
                <h3 className="text-[16px] font-bold text-[#111111]">
                  {projectReference.galleryTitle}
                </h3>
                <span className="font-mono text-[12px] text-[#666666] tabular-nums">
                  ({projectGallery.length})
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollStrip('prev')}
                  aria-label="Scroll gallery left"
                  className="w-8 h-8 rounded-md border border-neutral-200 hover:border-[#B81005] hover:text-[#B81005] flex items-center justify-center text-[#333333] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollStrip('next')}
                  aria-label="Scroll gallery right"
                  className="w-8 h-8 rounded-md border border-neutral-200 hover:border-[#B81005] hover:text-[#B81005] flex items-center justify-center text-[#333333] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={stripRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
            >
              {projectGallery.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxIdx(idx)}
                  className="group relative snap-start shrink-0 w-[235px] sm:w-[265px] aspect-[16/10] rounded-lg overflow-hidden bg-[#141416] border border-neutral-200 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B81005]"
                >
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="265px"
                    referrerPolicy="no-referrer"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"
                  />
                  <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-md bg-black/55 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="text-[12.5px] font-semibold text-white truncate">
                      {item.label}
                    </span>
                    <span className="font-mono text-[11px] text-[#FC542B] tabular-nums shrink-0">
                      0{idx + 1}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && lightboxIdx !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeLightbox.label}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIdx(null)}
              className="fixed inset-0 bg-black/88 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[920px] bg-[#141416] text-white rounded-xl overflow-hidden border border-white/15 shadow-2xl"
            >
              <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-[12px] text-[#FC542B] tabular-nums shrink-0">
                    0{lightboxIdx + 1} / 0{projectGallery.length}
                  </span>
                  <span className="text-[15px] font-semibold text-white truncate">
                    {activeLightbox.label}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxIdx(null)}
                  aria-label="Close gallery"
                  className="w-8 h-8 rounded-md border border-white/15 hover:bg-white/10 flex items-center justify-center text-white shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative aspect-[16/9] bg-black">
                <Image
                  src={activeLightbox.image}
                  alt={activeLightbox.label}
                  fill
                  sizes="(max-width: 960px) 100vw, 920px"
                  referrerPolicy="no-referrer"
                  className="object-cover object-center"
                />

                <button
                  type="button"
                  onClick={() =>
                    setLightboxIdx(
                      (lightboxIdx - 1 + projectGallery.length) % projectGallery.length
                    )
                  }
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 hover:bg-[#B81005] text-white border border-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxIdx((lightboxIdx + 1) % projectGallery.length)}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 hover:bg-[#B81005] text-white border border-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 bg-[#111111] border-t border-white/10 flex items-center gap-2.5 overflow-x-auto">
                {projectGallery.map((item, idx) => {
                  const isCurrent = idx === lightboxIdx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLightboxIdx(idx)}
                      aria-label={item.label}
                      className={`relative shrink-0 w-20 aspect-[16/10] rounded overflow-hidden border transition-all ${
                        isCurrent
                          ? 'border-[#FC542B] ring-2 ring-[#FC542B]/40 opacity-100'
                          : 'border-white/10 opacity-55 hover:opacity-90'
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        sizes="80px"
                        referrerPolicy="no-referrer"
                        className="object-cover object-center"
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Project Reference Archive Slide-Over Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={projectReference.title}
            className="fixed inset-0 z-50 flex justify-end"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[680px] bg-white h-full flex flex-col shadow-2xl"
            >
              <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[12px] font-semibold text-[#B81005]">
                    {projectReference.subtitle}
                  </p>
                  <h3 className="text-[20px] font-bold text-[#111111]">
                    {projectReference.title} ({projects.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close"
                  className="w-9 h-9 rounded-md border border-neutral-200 hover:bg-neutral-100 flex items-center justify-center text-[#111111]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-6 py-4 bg-[#F6F6F7] border-b border-neutral-200 space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by project, client, or location (Singapore, Sri Lanka)..."
                    className="w-full pl-9 pr-3 py-2 text-[13.5px] bg-white border border-neutral-300 rounded-md focus:outline-none focus:border-[#B81005]"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {projectFilters.map((option) => {
                    const isActive = filter === option.key;
                    return (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => setFilter(option.key)}
                        className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-colors ${
                          isActive
                            ? 'bg-[#B81005] text-white'
                            : 'bg-white border border-neutral-200 text-[#444444] hover:border-[#B81005]'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 divide-y divide-neutral-200">
                {filtered.length === 0 ? (
                  <div className="py-16 text-center text-[14px] text-[#666666]">
                    No projects matched &ldquo;{query}&rdquo;.
                  </div>
                ) : (
                  filtered.map((project, idx) => (
                    <div key={project.id} className="py-4 flex items-start gap-4">
                      <span className="font-mono text-[12px] font-semibold text-[#B81005] tabular-nums pt-0.5">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="text-[14.5px] font-semibold text-[#111111] leading-snug">
                            {project.title}
                          </div>
                          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#555555] shrink-0">
                            <MapPin className="w-3.5 h-3.5 text-[#B81005]" />
                            <span>{project.location}</span>
                          </span>
                        </div>
                        <div className="text-[13px] text-[#555555] mt-1">{project.client}</div>
                        <div className="text-[12px] text-[#666666] mt-1 font-medium">
                          {project.role}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
