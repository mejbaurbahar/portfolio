import React, { useState } from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Globe, Github, Check, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, CERTIFICATIONS, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  isDark: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, isDark, onClose }) => {
  if (!isOpen) return null;

  const pdfUrl = `${import.meta.env.BASE_URL || './'}MEJBAUR_BAHAR_Senior_SDET_Resume.pdf`;

  const handlePrint = () => {
    // Open original PDF directly for high-resolution print
    const printWindow = window.open(pdfUrl, '_blank');
    if (printWindow) {
      printWindow.focus();
    } else {
      window.print();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col ${
          isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between gap-4 ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span className="font-display font-bold text-base">
              Curriculum Vitae / Professional Resume
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDark ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
              }`}
              title="Print Original PDF Resume"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Print Resume</span>
            </button>

            <a
              href={pdfUrl}
              download="MEJBAUR_BAHAR_Senior_SDET_Resume.pdf"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              title="Download Original PDF Resume"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-black'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable & Scrollable Resume Canvas */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans">
          
          {/* Resume Header */}
          <div className="border-b pb-6 border-slate-700/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-cyan-400 font-mono text-sm sm:text-base font-semibold mt-0.5">
                  {PERSONAL_INFO.title}
                </p>
                <p className="text-xs text-purple-400 font-mono mt-0.5">
                  {PERSONAL_INFO.subtitle}
                </p>
              </div>

              <div className="text-xs font-mono space-y-1 text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>https://sqatesting.com</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  <span>github.com/mejbaurbahar</span>
                </div>
              </div>
            </div>

            <p className={`mt-4 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Certifications Row */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
              Certifications & Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {CERTIFICATIONS.map(c => (
                <div key={c.id} className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="font-bold font-display text-slate-200">{c.name}</div>
                  <div className="text-slate-400 font-mono mt-0.5">
                    {c.issuer} · ID: {c.credentialId}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {EXPERIENCES.map(exp => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-bold font-display text-sm sm:text-base text-slate-100">
                        {exp.role}
                      </span>
                      <span className="text-cyan-400 font-semibold text-sm"> — {exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                  </div>

                  <ul className="space-y-1.5 text-xs leading-relaxed">
                    {exp.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold mt-0.5">▪</span>
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-[11px] font-mono text-slate-400 pt-1">
                    <span className="font-semibold text-slate-300">Toolchain: </span>
                    {exp.skills.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Skills Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
              Technical Skill Spectrum
            </h2>
            <div className="space-y-2.5 text-xs">
              {SKILL_CATEGORIES.map(cat => (
                <div key={cat.title} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-bold text-slate-300 font-mono sm:w-44 shrink-0">
                    {cat.title}:
                  </span>
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    {cat.skills.map(s => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="border-t pt-4 border-slate-700/50">
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-2">
              Education & Academic Background
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
              <div>
                <span className="font-bold text-slate-200">Bachelor of Science in Computer Science & Engineering</span>
                <span className="text-slate-400 block sm:inline sm:ml-2">Major in Software Quality Assurance & Network Security</span>
              </div>
              <span className="font-mono text-slate-400">Graduated with Distinction</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className={`p-4 border-t flex items-center justify-between ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <span className="text-xs font-mono text-slate-400">
            Available for Senior / Lead SDET Roles & AppSec Audits
          </span>
          <button
            onClick={onClose}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg border ${
              isDark ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-300 hover:bg-slate-100 text-slate-700'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
