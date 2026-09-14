import React, { useState } from 'react';
import { 
  Terminal, 
  ShieldAlert, 
  Cpu, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Zap, 
  ArrowUpRight,
  Layers
} from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsSectionProps {
  isDark: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isDark }) => {
  const [filter, setFilter] = useState<'all' | 'automation' | 'security' | 'tools' | 'performance' | 'ai-qa'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-16 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-purple-400 mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>Architectural Works & Open Source</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-display text-balance">
              Featured <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Frameworks</span> & Tooling
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Production-grade test automation suites, ethical hacking utilities, and developer extensions engineered for scale and speed.
            </p>
          </div>

          {/* Interactive Category Filter Tabs (Compliant segmented control) */}
          <div className={`flex flex-wrap items-center gap-1 p-1 rounded-xl border self-start md:self-auto ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Works ({PROJECTS.length})
            </button>
            <button
              onClick={() => setFilter('automation')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'automation'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Automation & SDET
            </button>
            <button
              onClick={() => setFilter('security')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'security'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AppSec & Recon
            </button>
            <button
              onClick={() => setFilter('tools')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'tools'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dev Tools
            </button>
            <button
              onClick={() => setFilter('ai-qa')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'ai-qa'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-sm'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AI/ML QA
            </button>
          </div>
        </div>

        {/* Dynamic Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const isWide = index === 0 && filter === 'all';

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] cursor-pointer ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                } ${
                  isDark
                    ? 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800/90 hover:border-cyan-500/50 shadow-lg shadow-black/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-cyan-400 shadow-md shadow-slate-200/50'
                }`}
              >
                {/* Subtle colorful ambient corner glow */}
                <div className={`absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-opacity opacity-0 group-hover:opacity-20 ${
                  project.colorScheme === 'cyan' ? 'bg-cyan-500' :
                  project.colorScheme === 'purple' ? 'bg-purple-500' :
                  project.colorScheme === 'emerald' ? 'bg-emerald-500' :
                  project.colorScheme === 'rose' ? 'bg-rose-500' : 'bg-amber-500'
                }`} />

                <div>
                  {/* Unboxed Metadata Header (No pills, clean typographic separators) */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={
                        project.colorScheme === 'cyan' ? 'text-cyan-400 font-semibold' :
                        project.colorScheme === 'purple' ? 'text-purple-400 font-semibold' :
                        project.colorScheme === 'emerald' ? 'text-emerald-400 font-semibold' :
                        project.colorScheme === 'rose' ? 'text-rose-400 font-semibold' : 'text-amber-400 font-semibold'
                      }>
                        {project.categoryLabel}
                      </span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>Production Verified</span>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold font-display tracking-tight text-balance mb-2.5 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Short description */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {project.shortDescription}
                  </p>

                  {/* Key Metrics row */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
                    {project.metrics.slice(0, isWide ? 3 : 2).map((m, mi) => (
                      <div 
                        key={mi} 
                        className={`p-2 rounded-lg border ${
                          isDark ? 'bg-slate-950/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="text-xs font-mono font-bold text-cyan-400 tabular-nums">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Unboxed tags & Action CTA */}
                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-slate-400">
                    {project.tags.slice(0, 3).map((tag, ti) => (
                      <React.Fragment key={ti}>
                        <span>{tag}</span>
                        {ti < Math.min(project.tags.length - 1, 2) && <span className="text-slate-600">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <span className="font-semibold text-cyan-400 text-xs inline-flex items-center gap-1">
                    View Architecture
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          isDark={isDark}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
