import React from 'react';
import { Globe, Users, BookOpen, Chrome, ExternalLink, ArrowUpRight, Sparkles, Github } from 'lucide-react';
import { SQATESTING_PLATFORM } from '../data/portfolioData';

interface SqaPlatformSectionProps {
  isDark: boolean;
}

export const SqaPlatformSection: React.FC<SqaPlatformSectionProps> = ({ isDark }) => {
  return (
    <section id="sqatesting-platform" className="py-16 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <div className={`relative rounded-3xl border overflow-hidden p-8 sm:p-12 transition-all ${
          isDark 
            ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 border-cyan-500/30 shadow-2xl shadow-cyan-950/40' 
            : 'bg-gradient-to-br from-white via-cyan-50/40 to-blue-50/40 border-cyan-200 shadow-xl'
        }`}>
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Platform Mission & Community Stats */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1 rounded-full">
                <Globe className="w-3.5 h-3.5" />
                <span>Founder Spotlight</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-balance">
                  Founder & Architect at <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">SQATesting.com</span>
                </h2>
                <p className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {SQATESTING_PLATFORM.mission}
                </p>
              </div>

              {/* High-Impact Proof Metrics (Adjacent to claim) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
                    {SQATESTING_PLATFORM.monthlyReaders}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Monthly QA Readers</div>
                </div>

                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                    {SQATESTING_PLATFORM.countriesReached}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Countries Reached</div>
                </div>

                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="text-2xl font-bold font-mono text-purple-400 tabular-nums">
                    {SQATESTING_PLATFORM.freeGuidesCount}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Free SQA Guides</div>
                </div>

                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                    4.9 ★
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Extension Rating</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://sqatesting.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  <span>Visit SQATesting.com</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href="https://github.com/mejbaurbahar/fagun"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm border transition-colors ${
                    isDark ? 'border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <Github className="w-4 h-4 text-indigo-400" />
                  <span>Fagun MCP (GitHub)</span>
                </a>

                <a
                  href="https://chromewebstore.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm border transition-colors ${
                    isDark ? 'border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <Chrome className="w-4 h-4 text-cyan-400" />
                  <span>Bug Matrix</span>
                </a>

                <a
                  href="https://koyjabo.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm border transition-colors ${
                    isDark ? 'border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>KoyJabo.com</span>
                </a>
              </div>
            </div>

            {/* Right Column: Trending Articles / Guides on the Platform */}
            <div className={`lg:col-span-5 rounded-2xl border p-5 ${
              isDark ? 'bg-slate-950/70 border-slate-800/90' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono">
                <span className="font-semibold text-cyan-400 uppercase">Top Community Guides</span>
                <span className="text-slate-400">sqatesting.com/articles</span>
              </div>

              <div className="space-y-3">
                {SQATESTING_PLATFORM.topArticles.map((article, i) => (
                  <a
                    key={i}
                    href="https://sqatesting.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`block p-3 rounded-xl border transition-all group ${
                      isDark 
                        ? 'border-slate-800/80 hover:border-cyan-500/40 bg-slate-900/40 hover:bg-slate-900/80' 
                        : 'border-slate-200 hover:border-cyan-400 bg-slate-50/60 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-medium group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-2">
                      <span className="text-purple-400">{article.category}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="tabular-nums">{article.reads}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
