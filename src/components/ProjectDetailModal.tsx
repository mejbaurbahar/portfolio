import React, { useState } from 'react';
import { X, Github, ExternalLink, Check, Copy, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  isDark: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isDark, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet?.code) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-3xl rounded-2xl border shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col ${
          isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`p-5 sm:p-6 border-b flex items-start justify-between gap-4 ${
          isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>@mejbaurbahar Architecture</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close details"
            className={`p-2 rounded-xl transition-colors shrink-0 ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Overview */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Overview & Problem Statement
            </h4>
            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {project.fullDescription}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
              Verified Production Metrics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((metric, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-lg font-bold font-mono text-cyan-400 tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Details */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Architectural Highlights & Standards
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {project.architectureDetails.map((detail, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold mt-0.5">✓</span>
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Snippet if present */}
          {project.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">
                  {project.codeSnippet.filename}
                </span>
                <button
                  onClick={handleCopyCode}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border transition-colors ${
                    isDark 
                      ? 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white' 
                      : 'border-slate-300 bg-slate-100 text-slate-700 hover:text-black'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                <pre><code>{project.codeSnippet.code}</code></pre>
              </div>
            </div>
          )}

          {/* Tags (Zero-pill text format with typographic separator) */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-400">
            <span className="font-semibold text-slate-300">Stack:</span>
            {project.tags.map((tag, idx) => (
              <React.Fragment key={idx}>
                <span className="text-cyan-400">{tag}</span>
                {idx < project.tags.length - 1 && <span className="text-slate-600">·</span>}
              </React.Fragment>
            ))}
          </div>

        </div>

        {/* Modal Footer Links */}
        <div className={`p-4 sm:p-5 border-t flex items-center justify-between gap-3 ${
          isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:underline"
              >
                <span>Live Extension / Docs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
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
