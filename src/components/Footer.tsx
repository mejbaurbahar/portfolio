import React from 'react';
import { ArrowUp, Github, Linkedin, ShieldCheck, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  isDark: boolean;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ isDark, onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t transition-colors ${
      isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Mission Statement */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span className="font-display font-bold text-base text-slate-200">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Senior SDET & Ethical Hacker · Founder of SQATesting.com
            </p>
          </div>

          {/* Clean Text Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <a href="#expertise" className="hover:text-cyan-400 transition-colors">Expertise</a>
            <a href="#interactive-lab" className="hover:text-cyan-400 transition-colors">Test Lab</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#credentials" className="hover:text-cyan-400 transition-colors">Certifications</a>
            <button onClick={onOpenResume} className="hover:text-cyan-400 transition-colors">Resume</button>
            <a href="https://sqatesting.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">SQATesting.com</a>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg border border-slate-700/60 hover:text-white hover:border-slate-500 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2 rounded-lg border border-slate-700/60 hover:text-white hover:border-slate-500 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Quiet Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Engineered for Zero-Flakiness & Bulletproof AppSec</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
