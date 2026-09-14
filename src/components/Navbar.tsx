import React, { useState } from 'react';
import { ShieldCheck, FileText, Send, Menu, X, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onOpenResume,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-200 ${
      isDark 
        ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 text-slate-100' 
        : 'bg-white/85 backdrop-blur-md border-b border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element Brand Zone */}
        <a 
          href="#" 
          className="flex items-center gap-2 group text-base sm:text-lg font-bold tracking-tight"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-0.5 flex items-center justify-center shadow-sm shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className={`w-full h-full rounded-[6px] flex items-center justify-center ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
              <ShieldCheck className="w-4 h-4 text-cyan-500" />
            </div>
          </div>
          <span className="font-display tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent group-hover:opacity-90">
            {PERSONAL_INFO.name}
          </span>
        </a>

        {/* Zone 2: Clean text navigation links (4-6 links, no static pill enclosures) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a 
            href="#expertise" 
            className={`transition-colors hover:text-cyan-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            Expertise
          </a>
          <a 
            href="#interactive-lab" 
            className={`transition-colors hover:text-cyan-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            Live Test Lab
          </a>
          <a 
            href="#projects" 
            className={`transition-colors hover:text-cyan-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            Projects
          </a>
          <a 
            href="#credentials" 
            className={`transition-colors hover:text-cyan-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            Certifications
          </a>
          <a 
            href="#experience" 
            className={`transition-colors hover:text-cyan-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            Experience
          </a>
          <a 
            href="#sqatesting-platform" 
            className={`transition-colors hover:text-cyan-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
          >
            SQATesting.com
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme switcher */}
          <button
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`p-2 rounded-lg text-sm transition-colors ${
              isDark 
                ? 'text-slate-400 hover:text-amber-400 hover:bg-slate-800/80' 
                : 'text-slate-600 hover:text-amber-600 hover:bg-slate-100'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Resume Modal trigger */}
          <button
            onClick={onOpenResume}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
              isDark
                ? 'border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200'
                : 'border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resume</span>
          </button>

          {/* Primary CTA button */}
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-sm shadow-cyan-500/25 transition-all whitespace-nowrap active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Consultation</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className={`md:hidden p-2 rounded-lg ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 py-3 space-y-2 ${isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white border-slate-200'}`}>
          <a
            href="#expertise"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-sm font-medium ${isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-800 hover:bg-slate-100'}`}
          >
            Expertise
          </a>
          <a
            href="#interactive-lab"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-sm font-medium ${isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-800 hover:bg-slate-100'}`}
          >
            Live Test Lab
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-sm font-medium ${isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-800 hover:bg-slate-100'}`}
          >
            Projects
          </a>
          <a
            href="#credentials"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-sm font-medium ${isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-800 hover:bg-slate-100'}`}
          >
            Certifications
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-sm font-medium ${isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-800 hover:bg-slate-100'}`}
          >
            Experience
          </a>
          <a
            href="#sqatesting-platform"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-sm font-medium ${isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-800 hover:bg-slate-100'}`}
          >
            SQATesting.com
          </a>
          <div className="pt-2 border-t border-slate-700/50 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex-1 py-2 text-center text-xs font-medium rounded-lg border border-slate-700 bg-slate-800 text-slate-200"
            >
              View Full Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
