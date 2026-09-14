import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Award, ExternalLink, Lock, Check } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';

interface CertificationsSectionProps {
  isDark: boolean;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ isDark }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyId = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="credentials" className="py-16 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials & Accreditations</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-display text-balance">
            Industry <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Certifications</span> & Security Badges
          </h2>
          <p className={`mt-2 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Rigorous international certifications across offensive ethical hacking, enterprise application security, and ISTQB test engineering.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert) => {
            const isSecurity = cert.badgeType === 'security';
            const isQa = cert.badgeType === 'qa';

            return (
              <div
                key={cert.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] ${
                  isDark 
                    ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/50 shadow-xl shadow-black/20' 
                    : 'bg-white border-slate-200 hover:border-emerald-400 shadow-md shadow-slate-200/50'
                }`}
              >
                <div>
                  {/* Top Credential Info */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSecurity 
                          ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30' 
                          : isQa 
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                          : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {isSecurity ? <Lock className="w-5 h-5" /> : isQa ? <CheckCircle2 className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                      </div>

                      <div>
                        <h3 className="font-display font-bold text-lg tracking-tight">
                          {cert.name}
                        </h3>
                        {/* Unboxed Metadata (Zero pill discipline) */}
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-0.5">
                          <span className="font-medium text-emerald-400">{cert.issuer}</span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span>{cert.issueDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Verified Status Tag */}
                    <div className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded shrink-0">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {cert.description}
                  </p>

                  {/* Syllabus / Skills Evaluated */}
                  <div className="space-y-1.5 mb-5">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Verified Competencies:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsCovered.map((skill, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2.5 py-1 rounded-lg border ${
                            isDark 
                              ? 'bg-slate-950/60 border-slate-800 text-slate-300' 
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer: Credential ID Copy & Verification */}
                <div className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs font-mono ${
                  isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-600'
                }`}>
                  <div className="flex items-center gap-2">
                    <span>ID: {cert.credentialId}</span>
                    <button
                      onClick={() => handleCopyId(cert.id, cert.credentialId)}
                      aria-label="Copy credential ID"
                      className="p-1 hover:text-white transition-colors"
                    >
                      {copiedId === cert.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Award className="w-3.5 h-3.5 text-cyan-400" />}
                    </button>
                  </div>

                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                  >
                    <span>Official Registry</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
