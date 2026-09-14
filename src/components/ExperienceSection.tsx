import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

interface ExperienceSectionProps {
  isDark: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isDark }) => {
  return (
    <section id="experience" className="py-16 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-cyan-400 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-display text-balance">
            Work <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Experience</span> & Leadership
          </h2>
          <p className={`mt-2 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Over 6 years delivering production resilience for high-growth tech platforms, enterprise web portals, and international QA communities.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {EXPERIENCES.map((exp, idx) => {
            const isLatest = idx === 0;

            return (
              <div
                key={exp.id}
                className={`relative rounded-2xl border p-6 sm:p-7 transition-all duration-300 ${
                  isLatest
                    ? isDark 
                      ? 'bg-slate-900/80 border-cyan-500/40 shadow-xl shadow-cyan-950/20' 
                      : 'bg-white border-cyan-300 shadow-lg shadow-cyan-50'
                    : isDark 
                      ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold font-display tracking-tight text-balance">
                        {exp.role}
                      </h3>
                      {isLatest && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                          Current
                        </span>
                      )}
                    </div>
                    
                    {/* Unboxed Company Metadata (Zero pill discipline) */}
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-400 mt-1 font-mono">
                      <span className="font-semibold text-cyan-400">{exp.company}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{exp.location}</span>
                      </span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{exp.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-400 bg-slate-800/40 px-3 py-1 rounded-lg border border-slate-700/50 self-start sm:self-auto shrink-0">
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

                {/* Skills used */}
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
            );
          })}
        </div>

      </div>
    </section>
  );
};
