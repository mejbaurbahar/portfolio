import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Briefcase, Calendar, MapPin, Sparkles, Shield, Rocket } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { Experience } from '../types';

interface ExperienceSectionProps {
  isDark: boolean;
}

const getLogoSrc = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const baseUrl = import.meta.env.BASE_URL || './';
  const cleanUrl = url.replace(/^\//, '');
  return `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}${cleanUrl}`;
};

interface ExperienceCardProps {
  exp: Experience;
  idx: number;
  isDark: boolean;
  total: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp, idx, isDark }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of each individual card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Scroll-driven exit & reverse animation:
  // When scrolling top-to-down:
  // 1. [0.0 -> 0.15]: As card enters viewport, smoothly fades in & slides up into position
  // 2. [0.15 -> 0.65]: Full visibility in center reading view (opacity: 1, scale: 1, y: 0)
  // 3. [0.65 -> 0.95]: As user scrolls further down, previous card gracefully hides (opacity: 0.05, scale: 0.92, y: -25)
  // When scrolling down-to-top:
  // Continuous scroll mapping automatically reverses from 0.95 -> 0.65, restoring full opacity and scale!
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.65, 0.95], [0.3, 1, 1, 0.05]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.65, 0.95], [0.95, 1, 1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.65, 0.95], [30, 0, 0, -25]);

  const isLatest = idx === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale, y }}
      className="will-change-transform"
    >
      <div
        className={`relative rounded-2xl border p-6 sm:p-7 transition-colors duration-300 ${
          isLatest
            ? isDark
              ? 'bg-slate-900/90 border-cyan-500/50 shadow-2xl shadow-cyan-950/30 backdrop-blur-sm'
              : 'bg-white border-cyan-400 shadow-xl shadow-cyan-100/50'
            : isDark
              ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700/80 backdrop-blur-sm'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
        }`}
      >
        {/* Header row with Original Company Logo */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 mb-4 border-b border-slate-800/60">
          <div className="flex items-start gap-4">
            {/* Authentic Company Logo Container */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-1.5 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
              {exp.logoUrl ? (
                <img
                  src={getLogoSrc(exp.logoUrl)}
                  alt={`${exp.company} logo`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <Briefcase className="w-6 h-6 text-cyan-400" />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-display tracking-tight text-balance">
                  {exp.role}
                </h3>
                {isLatest && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    Current
                  </span>
                )}
              </div>

              {/* Unboxed Company Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-400 mt-1 font-mono">
                <span className="font-semibold text-cyan-400 text-sm sm:text-base">{exp.company}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{exp.location}</span>
                </span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="px-2 py-0.5 rounded bg-slate-800/50 text-slate-300 text-xs">{exp.type}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-300 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60 self-start sm:self-auto shrink-0 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>{exp.period}</span>
          </div>
        </div>

        {/* Highlights List */}
        <ul className="space-y-2.5 mb-5 text-xs sm:text-sm">
          {exp.highlights.map((item, hi) => (
            <li key={hi} className="flex items-start gap-2.5 leading-relaxed">
              <span className="text-cyan-400 mt-1 shrink-0 font-bold">▪</span>
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{item}</span>
            </li>
          ))}
        </ul>

        {/* Skills Used */}
        <div className="pt-3 border-t border-slate-800/50 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-400">
          <span className="font-semibold text-slate-300">Toolchain:</span>
          {exp.skills.map((skill, si) => (
            <React.Fragment key={si}>
              <span className="text-cyan-400">{skill}</span>
              {si < exp.skills.length - 1 && <span className="text-slate-600">·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isDark }) => {
  return (
    <section id="experience" className="py-16 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-400 bg-cyan-950/30 border border-cyan-800/50 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones & Proven Track Record</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-display text-balance">
            Work <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Experience</span> & Leadership
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Founder of <span className="text-cyan-400 font-medium">SQATesting.com</span>, creator of <span className="text-emerald-400 font-medium">Bug Matrix</span>, <span className="text-purple-400 font-medium">KoyJabo.com</span>, and <span className="text-indigo-400 font-medium">Fagun MCP</span>. Over 6 years delivering production resilience for high-growth tech platforms, AI/LLM models, and enterprise software.
          </p>

          {/* Quick scroll dynamic animation indicator badge */}
          <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Interactive scroll animation active · Scroll down to reveal & reverse</span>
          </div>
        </div>

        {/* Timeline Stack with Dynamic Scroll Animation */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {EXPERIENCES.map((exp, idx) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              idx={idx}
              isDark={isDark}
              total={EXPERIENCES.length}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
