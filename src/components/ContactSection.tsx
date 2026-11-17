'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Globe, Mail, MapPin, Phone, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { contactSection, offices, site } from '@/data/site';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactSection() {
  const [selectedOfficeId, setSelectedOfficeId] = useState(offices[0].id);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    office: offices[0].country,
    subject: '',
    message: '',
  });
  const [error, setError] = useState<string>('');
  const [submittedSummary, setSubmittedSummary] = useState<{
    name: string;
    email: string;
    subject: string;
    office: string;
  } | null>(null);

  useEffect(() => {
    const handlePrefill = (event: Event) => {
      const custom = event as CustomEvent<{ subject?: string }>;
      if (custom.detail?.subject) {
        setSubmittedSummary(null);
        setError('');
        setFormData((prev) => ({ ...prev, subject: custom.detail.subject || '' }));
      }
    };
    window.addEventListener('hirush:prefill-subject', handlePrefill);
    return () => window.removeEventListener('hirush:prefill-subject', handlePrefill);
  }, []);

  const activeOffice = offices.find((o) => o.id === selectedOfficeId) ?? offices[0];

  const handleSelectOffice = (officeId: string, country: string) => {
    setSelectedOfficeId(officeId);
    setFormData((prev) => ({ ...prev, office: country }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setError('');
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      setError('Please complete all required fields.');
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSubmittedSummary({
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      office: formData.office,
    });
    setFormData({
      name: '',
      email: '',
      office: formData.office,
      subject: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="bg-white py-14 md:py-16 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="mb-9">
          <p className="text-[13px] font-semibold text-[#B81005] tracking-wide mb-1.5">
            {contactSection.eyebrow}
          </p>
          <h2 className="text-[28px] md:text-[34px] font-bold text-[#111111] leading-[1.18]">
            {contactSection.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Regional Office Switcher using exact offices from site.ts */}
          <div className="lg:col-span-5 bg-[#141416] text-white rounded-xl p-6 md:p-7 flex flex-col justify-between gap-6">
            <div>
              <div
                role="tablist"
                aria-label="Offices"
                className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-white/10 mb-6"
              >
                {offices.map((office) => {
                  const isActive = office.id === selectedOfficeId;
                  return (
                    <button
                      key={office.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelectOffice(office.id, office.country)}
                      className={`relative py-2 px-3 text-[13px] font-semibold rounded-md transition-colors whitespace-nowrap ${
                        isActive ? 'text-white' : 'text-neutral-300 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="contact-office-pill"
                          className="absolute inset-0 rounded-md bg-[#B81005]"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      <span className="relative z-10">{office.country}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOffice.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <div className="text-[12px] font-mono text-[#FC542B] mb-1">
                      {activeOffice.country}
                    </div>
                    <h3 className="text-[20px] font-bold text-white">{activeOffice.company}</h3>
                  </div>

                  <div className="flex items-start gap-3 text-[14px] text-neutral-300 leading-relaxed">
                    <MapPin className="w-4 h-4 text-[#FC542B] mt-1 shrink-0" />
                    <div>
                      {activeOffice.addressLines.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    {activeOffice.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="flex items-center gap-3 text-[14px] text-neutral-200 hover:text-[#FC542B] transition-colors font-mono tabular-nums"
                      >
                        <Phone className="w-4 h-4 text-[#FC542B] shrink-0" />
                        <span>{phone}</span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-5 border-t border-white/10 space-y-2.5">
              <a
                href={`mailto:${activeOffice.email}`}
                className="flex items-center gap-3 text-[14px] text-neutral-200 hover:text-[#FC542B] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FC542B] shrink-0" />
                <span>{activeOffice.email}</span>
              </a>
              <div className="flex items-center gap-3 text-[14px] text-neutral-400">
                <Globe className="w-4 h-4 text-[#FC542B] shrink-0" />
                <span>{site.domain}</span>
              </div>
            </div>
          </div>

          {/* Right: Clean Inquiry Form */}
          <div className="lg:col-span-7 bg-[#F6F6F7] border border-neutral-200 rounded-xl p-6 md:p-7">
            <AnimatePresence mode="wait">
              {submittedSummary ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full min-h-[320px] flex flex-col items-center justify-center text-center p-6 bg-white border border-neutral-200 rounded-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-[#B81005]/10 text-[#B81005] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-[20px] font-bold text-[#111111] mb-2">Message Prepared</h3>
                  <p className="text-[14px] text-[#555555] max-w-[420px] leading-[1.6] mb-5">
                    {submittedSummary.name} · {submittedSummary.subject} ({submittedSummary.office})
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSubmittedSummary(null)}
                      className="px-4 py-2 text-[13px] font-semibold text-white bg-[#B81005] hover:bg-[#940D05] rounded-md transition-colors duration-150"
                    >
                      New Message
                    </button>
                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent(
                        submittedSummary.subject
                      )}`}
                      className="px-4 py-2 text-[13px] font-medium text-[#333333] bg-white border border-neutral-300 hover:border-[#B81005] hover:text-[#B81005] rounded-md transition-colors duration-150"
                    >
                      {site.email}
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-4"
                >
                  {error && (
                    <div
                      role="alert"
                      className="p-3 rounded-md bg-[#B81005]/10 border border-[#B81005]/30 text-[13px] font-medium text-[#940D05]"
                    >
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[13px] font-medium text-[#111111] mb-1.5"
                      >
                        Name <span className="text-[#B81005]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 text-[14px] text-[#111111] bg-white border border-neutral-300 rounded-md focus:outline-none focus:border-[#B81005] focus:ring-2 focus:ring-[#B81005]/15 transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[13px] font-medium text-[#111111] mb-1.5"
                      >
                        Email <span className="text-[#B81005]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 text-[14px] text-[#111111] bg-white border border-neutral-300 rounded-md focus:outline-none focus:border-[#B81005] focus:ring-2 focus:ring-[#B81005]/15 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="contact-office"
                        className="block text-[13px] font-medium text-[#111111] mb-1.5"
                      >
                        Office
                      </label>
                      <select
                        id="contact-office"
                        name="office"
                        value={formData.office}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-[14px] text-[#111111] bg-white border border-neutral-300 rounded-md focus:outline-none focus:border-[#B81005] focus:ring-2 focus:ring-[#B81005]/15 transition-colors"
                      >
                        {offices.map((office) => (
                          <option key={office.id} value={office.country}>
                            {office.country}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="contact-subject"
                        className="block text-[13px] font-medium text-[#111111] mb-1.5"
                      >
                        Subject <span className="text-[#B81005]">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 text-[14px] text-[#111111] bg-white border border-neutral-300 rounded-md focus:outline-none focus:border-[#B81005] focus:ring-2 focus:ring-[#B81005]/15 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[13px] font-medium text-[#111111] mb-1.5"
                    >
                      Message <span className="text-[#B81005]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-3.5 py-2.5 text-[14px] text-[#111111] bg-white border border-neutral-300 rounded-md focus:outline-none focus:border-[#B81005] focus:ring-2 focus:ring-[#B81005]/15 transition-colors resize-y"
                    />
                  </div>

                  <div className="pt-1 flex items-center justify-between gap-4">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-[12.5px] font-medium text-[#B81005] hover:underline"
                    >
                      {site.email}
                    </a>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-semibold text-white bg-[#B81005] hover:bg-[#940D05] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B81005]"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
