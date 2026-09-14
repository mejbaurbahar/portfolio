import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldAlert, 
  Zap, 
  Layers, 
  Sparkles, 
  CheckCircle2,
  Terminal,
  Search
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

interface SkillsSectionProps {
  isDark: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDark }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredCategories = SKILL_CATEGORIES.map(cat => {
    if (activeCategory !== 'all' && cat.title !== activeCategory) {
      return null;
    }
    if (!searchTerm.trim()) {
      return cat;
    }
    const matchingSkills = cat.skills.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.highlight && s.highlight.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    if (matchingSkills.length === 0) return null;
    return { ...cat, skills: matchingSkills };
  }).filter(Boolean) as typeof SKILL_CATEGORIES;

  return (
    <section id="expertise" className="py-16 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-cyan-400 mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>Full-Spectrum QA & Security Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-display text-balance">
              Technical <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Competencies</span> & Toolchain
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Over 6 years of deep specialization across end-to-end test automation frameworks, penetration testing, distributed load performance, and generative AI quality systems.
            </p>
          </div>

          {/* Quick Skill Search input */}
          <div className="w-full md:w-72">
            <div className={`flex items-center px-3 py-2 rounded-xl border ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
            }`}>
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search skills (e.g. Playwright, XSS)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-xs sm:text-sm outline-none w-full placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Skill Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-sm'
                : isDark ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-black'
            }`}
          >
            All Competencies
          </button>
          {SKILL_CATEGORIES.map(cat => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(cat.title)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat.title
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-sm'
                  : isDark ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-black'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Categories Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const isAutomation = category.color === 'cyan';
            const isSecurity = category.color === 'purple';
            const isPerf = category.color === 'amber';
            const isOps = category.color === 'emerald';

            return (
              <div
                key={category.title}
                className={`rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
                  isDark 
                    ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 shadow-xl shadow-black/20' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-md shadow-slate-200/50'
                }`}
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800/60">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isAutomation ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' :
                      isSecurity ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30' :
                      isPerf ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                      isOps ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                      'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    }`}>
                      {isAutomation && <Cpu className="w-4 h-4" />}
                      {isSecurity && <ShieldAlert className="w-4 h-4" />}
                      {isPerf && <Zap className="w-4 h-4" />}
                      {isOps && <Layers className="w-4 h-4" />}
                      {!isAutomation && !isSecurity && !isPerf && !isOps && <Sparkles className="w-4 h-4" />}
                    </div>
                    <h3 className="font-display font-bold text-base tracking-tight">
                      {category.title}
                    </h3>
                  </div>

                  <span className="text-xs font-mono text-slate-400 tabular-nums">
                    {category.skills.length} tools
                  </span>
                </div>

                {/* Skills List with Level Bars */}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">
                          {skill.name}
                        </span>
                        <span className="font-mono text-cyan-400 font-bold tabular-nums">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Smooth Progress Bar */}
                      <div className={`h-1.5 w-full rounded-full overflow-hidden ${
                        isDark ? 'bg-slate-800' : 'bg-slate-200'
                      }`}>
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isAutomation ? 'bg-gradient-to-r from-cyan-500 to-blue-500' :
                            isSecurity ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                            isPerf ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                            isOps ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                            'bg-gradient-to-r from-rose-500 to-pink-500'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      {skill.highlight && (
                        <p className="text-[11px] text-slate-400 font-mono line-clamp-1">
                          {skill.highlight}
                        </p>
                      )}
                    </div>
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
