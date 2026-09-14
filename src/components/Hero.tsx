import React from 'react';
import { 
  Play, 
  ShieldCheck, 
  Terminal, 
  FileDown, 
  Github, 
  Linkedin, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Lock
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import portraitImg from '../assets/images/fagun_real_profile.jpg';

interface HeroProps {
  isDark: boolean;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ isDark, onOpenResume, onOpenContact }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Dynamic colorful background ambient mesh & gradients */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-[28rem] h-[28rem] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic & Messaging Anchor */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Availability Status */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md transition-all">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                {PERSONAL_INFO.availability}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-wider uppercase text-cyan-400 font-mono">
                  Mejbaur Bahar Fagun
                </span>
                <span className="text-slate-500" aria-hidden="true">·</span>
                <span className="text-xs font-mono text-purple-400">
                  Senior SDET & Ethical Hacker
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-balance font-display">
                Building <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Zero-Defect</span> Test Pipelines & <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">AppSec</span> Defenses.
              </h1>
            </div>

            {/* Core Bio Description */}
            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Senior Software QA Engineer & Certified Ethical Hacker (CEH) with 6+ years specializing in enterprise Playwright & Cypress automation, deep OWASP vulnerability testing, and AI model quality evaluation. Founder of{' '}
              <a 
                href="https://sqatesting.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-cyan-400 underline decoration-cyan-400/50 hover:decoration-cyan-400 font-medium inline-flex items-center gap-1"
              >
                SQATesting.com
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              , and creator of{' '}
              <a
                href="https://github.com/mejbaurbahar/fagun"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 underline decoration-indigo-400/50 hover:decoration-indigo-400 font-medium inline-flex items-center gap-1"
              >
                Fagun MCP
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              ,{' '}
              <span className="text-purple-400 font-medium">Bug Matrix</span>, and{' '}
              <a
                href="https://koyjabo.com"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 underline decoration-emerald-400/50 hover:decoration-emerald-400 font-medium inline-flex items-center gap-1"
              >
                KoyJabo.com
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              .
            </p>

            {/* Verified Unboxed Credentials (Zero-pill discipline with typographic separators) */}
            <div className={`flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <div className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>CEH Certified</span>
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div className="flex items-center gap-1 text-purple-400 font-medium">
                <Lock className="w-4 h-4" />
                <span>CAP AppSec</span>
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div className="flex items-center gap-1 text-cyan-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>ISTQB CTFL</span>
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="tabular-nums">6+ Years Exp</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="tabular-nums">12,500+ Tests</span>
            </div>

            {/* Primary Action Button Cluster */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#interactive-lab"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Run Interactive Test Lab</span>
              </a>

              <a
                href="#projects"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm border transition-all ${
                  isDark
                    ? 'border-slate-700 bg-slate-900/70 hover:bg-slate-800 text-slate-200'
                    : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-sm'
                }`}
              >
                <Terminal className="w-4 h-4 text-purple-400" />
                <span>Explore Projects & Frameworks</span>
              </a>

              <button
                onClick={onOpenResume}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  isDark 
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>CV / Resume</span>
              </button>
            </div>

            {/* External Links & Profiles */}
            <div className="pt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 transition-colors ${isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-600'}`}
              >
                <Github className="w-4 h-4" />
                <span className="font-mono text-xs">@mejbaurbahar</span>
              </a>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <a
                href="https://sqatesting.com"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 transition-colors ${isDark ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-600'}`}
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs">sqatesting.com</span>
              </a>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <a
                href="https://github.com/mejbaurbahar/fagun"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 transition-colors ${isDark ? 'text-slate-400 hover:text-indigo-400' : 'text-slate-600 hover:text-indigo-600'}`}
              >
                <span className="font-mono text-xs text-indigo-400">fagun-mcp</span>
              </a>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <a
                href="https://koyjabo.com"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 transition-colors ${isDark ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'}`}
              >
                <span className="font-mono text-xs text-emerald-400">koyjabo.com</span>
              </a>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <button
                onClick={onOpenContact}
                className={`text-xs underline decoration-dotted transition-colors ${isDark ? 'text-slate-400 hover:text-indigo-300' : 'text-slate-600 hover:text-indigo-600'}`}
              >
                Schedule Technical Audit
              </button>
            </div>
          </div>

          {/* Right Column: Visual Anchor & Animated Glassmorphism Stat Cards */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Colorful halo background glow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-600 to-emerald-400 opacity-20 blur-2xl transform rotate-2 pointer-events-none" />

            <div className={`relative w-full max-w-sm sm:max-w-md rounded-2xl p-4 border transition-all ${
              isDark 
                ? 'bg-slate-900/80 border-slate-700/70 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl' 
                : 'bg-white/90 border-slate-200 shadow-2xl shadow-slate-200 backdrop-blur-xl'
            }`}>
              
              {/* Profile image with stylish gradient frame */}
              <div className="relative rounded-xl overflow-hidden aspect-square bg-slate-950/20 mb-4 group">
                <img 
                  src={portraitImg} 
                  alt="Mejbaur Bahar Fagun - Senior QA Engineer & Cybersecurity Expert"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient vignette scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-70 pointer-events-none" />

                {/* Overlaid quick-tag in corner */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold drop-shadow-md">Mejbaur Bahar Fagun</span>
                  <span className="font-mono text-cyan-300 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[11px]">
                    @mejbaurbahar
                  </span>
                </div>
              </div>

              {/* Floating Stat Metric Tiles inside Card */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Flakiness Rate</span>
                  </div>
                  <div className="text-xl font-bold font-mono tracking-tight text-cyan-300">
                    &lt; 0.08%
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Self-healing locators
                  </div>
                </div>

                <div className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-1.5 text-xs text-purple-400 font-mono mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>AppSec Score</span>
                  </div>
                  <div className="text-xl font-bold font-mono tracking-tight text-purple-300">
                    100%
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    OWASP Top 10 Coverage
                  </div>
                </div>
              </div>

              {/* Flagship Creations Badges */}
              <div className="mt-3 space-y-1.5">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider px-1">
                  Creator & Founder
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href="https://sqatesting.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`p-2 rounded-xl border transition-all flex items-center gap-2 ${
                      isDark ? 'bg-slate-950/60 border-slate-800 hover:border-cyan-500/50 text-slate-300' : 'bg-slate-50 border-slate-200 hover:border-cyan-400 text-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                    <div className="truncate">
                      <div className="font-medium text-cyan-400 truncate">SQATesting.com</div>
                      <div className="text-[10px] text-slate-400 font-mono">Founder · 50K+ QA</div>
                    </div>
                  </a>

                  <a
                    href="https://github.com/mejbaurbahar/fagun"
                    target="_blank"
                    rel="noreferrer"
                    className={`p-2 rounded-xl border transition-all flex items-center gap-2 ${
                      isDark ? 'bg-slate-950/60 border-slate-800 hover:border-indigo-500/50 text-slate-300' : 'bg-slate-50 border-slate-200 hover:border-indigo-400 text-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0"></span>
                    <div className="truncate">
                      <div className="font-medium text-indigo-400 truncate">Fagun MCP</div>
                      <div className="text-[10px] text-slate-400 font-mono">Creator · Agent QA</div>
                    </div>
                  </a>

                  <a
                    href="https://chromewebstore.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`p-2 rounded-xl border transition-all flex items-center gap-2 ${
                      isDark ? 'bg-slate-950/60 border-slate-800 hover:border-purple-500/50 text-slate-300' : 'bg-slate-50 border-slate-200 hover:border-purple-400 text-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0"></span>
                    <div className="truncate">
                      <div className="font-medium text-purple-400 truncate">Bug Matrix</div>
                      <div className="text-[10px] text-slate-400 font-mono">Creator · Extension</div>
                    </div>
                  </a>

                  <a
                    href="https://koyjabo.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`p-2 rounded-xl border transition-all flex items-center gap-2 ${
                      isDark ? 'bg-slate-950/60 border-slate-800 hover:border-emerald-500/50 text-slate-300' : 'bg-slate-50 border-slate-200 hover:border-emerald-400 text-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    <div className="truncate">
                      <div className="font-medium text-emerald-400 truncate">KoyJabo.com</div>
                      <div className="text-[10px] text-slate-400 font-mono">Creator · Transit</div>
                    </div>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
