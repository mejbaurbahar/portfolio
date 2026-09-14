import React, { useState } from 'react';
import { Mail, Send, Copy, Check, CheckCircle2, MessageSquare, Clock, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  isDark: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isDark }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'automation',
    timeline: 'immediate',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setFormSubmitted(false);
    setFormData({
      name: '',
      email: '',
      serviceType: 'automation',
      timeline: 'immediate',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-16 scroll-mt-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-cyan-400 mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-display text-balance">
            Let's Architect <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Resilient Systems</span> Together
          </h2>
          <p className={`mt-2 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Available for Senior / Lead SDET consulting, automated framework audits, penetration testing engagements, or enterprise team training.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Contact Info & Direct Links */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Email Card */}
            <div className={`rounded-2xl border p-6 ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Direct Email Inquiries
              </div>
              
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-700/50 bg-slate-950/40 font-mono text-xs sm:text-sm">
                <span className="text-cyan-400 font-semibold truncate">
                  {PERSONAL_INFO.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-sans font-medium bg-slate-800 text-slate-200 hover:text-white transition-colors shrink-0"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Typical response time: Under 24 hours</span>
              </div>
            </div>

            {/* Availability & Location Card */}
            <div className={`rounded-2xl border p-6 space-y-4 ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">Current Status</div>
                  <div className="text-xs text-emerald-400 font-mono">Open for Senior Engagements</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">Location & Timezone</div>
                  <div className="text-xs text-slate-400 font-mono">UTC+6 · Remote Worldwide</div>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-semibold transition-colors ${
                  isDark ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-200' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>GitHub @mejbaurbahar</span>
              </a>

              <a
                href="https://sqatesting.com"
                target="_blank"
                rel="noreferrer"
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-semibold transition-colors ${
                  isDark ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-cyan-400' : 'border-slate-300 bg-white hover:bg-slate-100 text-cyan-700'
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>SQATesting.com</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Consultation & Project Inquiry Form */}
          <div className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xl'
          }`}>
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-display tracking-tight">
                  Inquiry Dispatched Successfully!
                </h3>
                <p className={`text-sm max-w-md mx-auto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Thank you, <span className="text-cyan-400 font-semibold">{formData.name}</span>. Your project request has been logged. Fagun will review your scope and follow up directly at <span className="font-mono text-slate-200">{formData.email}</span> within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleResetForm}
                    className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-700 hover:bg-slate-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1 font-bold">
                  Technical Project / Consultation Request
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl border text-sm outline-none transition-colors ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. s.jenkins@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl border text-sm outline-none transition-colors ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Service / Objective</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl border text-sm outline-none cursor-pointer ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="automation">Test Automation Architecture (Playwright/Cypress)</option>
                      <option value="security">Application Security / OWASP Penetration Audit</option>
                      <option value="performance">Load & Performance Engineering (k6)</option>
                      <option value="ai-qa">AI/LLM Model Quality & Guardrails</option>
                      <option value="lead-sdet">Full-Time / Contract Senior SDET Role</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Target Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl border text-sm outline-none cursor-pointer ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="immediate">Immediate / Urgent (&lt; 2 weeks)</option>
                      <option value="month">Within next 30 days</option>
                      <option value="quarter">Next Quarter / Planning</option>
                      <option value="flexible">Exploratory Discussion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Project Scope / Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your tech stack, testing pain points, framework requirements, or audit objectives..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full p-3.5 rounded-xl border text-sm outline-none resize-none transition-colors ${
                      isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Technical Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
