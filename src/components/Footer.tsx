import React from 'react';
import { footer, offices, site } from '@/data/site';

export default function Footer() {
  return (
    <footer className="bg-[#18181B] text-neutral-300 border-t-4 border-[#B81005]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-white/10">
          {/* Brand Summary */}
          <div className="lg:col-span-3 space-y-2.5">
            <div className="text-[18px] font-bold text-white tracking-tight">{site.name}</div>
            {footer.description && (
              <p className="text-[13.5px] text-neutral-400 leading-[1.6]">{footer.description}</p>
            )}
            <p className="text-[13px] text-neutral-400">
              <a
                href={`mailto:${site.email}`}
                className="text-neutral-200 hover:text-[#FC542B] transition-colors"
              >
                {site.email}
              </a>
            </p>
            <p className="text-[12.5px] text-neutral-500">{site.domain}</p>
          </div>

          {/* All 5 Navigation Columns from site.ts */}
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[12.5px] font-semibold text-white tracking-wide mb-3">
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a
                        href={col.href}
                        className="text-[13px] text-neutral-400 hover:text-white transition-colors duration-150"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Strip */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12.5px] text-neutral-400">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>{offices.map((o) => o.country).join(' · ')}</p>
        </div>
      </div>
    </footer>
  );
}
