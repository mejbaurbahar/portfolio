import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveLab } from './components/InteractiveLab';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CertificationsSection } from './components/CertificationsSection';
import { SqaPlatformSection } from './components/SqaPlatformSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  // Sync html element class for theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleOpenContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 selection:bg-cyan-500 selection:text-white ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Navigation Header */}
      <Navbar
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={handleOpenContact}
      />

      {/* Main Content Area */}
      <main>
        {/* Dynamic Colorful Hero Section */}
        <Hero
          isDark={isDark}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={handleOpenContact}
        />

        {/* Technical Competencies & Skill Matrix */}
        <SkillsSection isDark={isDark} />

        {/* Live Interactive Engineering Lab (Playwright Runner, XSS Recon, ROI Calculator) */}
        <InteractiveLab isDark={isDark} />

        {/* Architectural Projects & Open Source Tooling */}
        <ProjectsSection isDark={isDark} />

        {/* Industry Certifications & Verified Credentials */}
        <CertificationsSection isDark={isDark} />

        {/* Career Journey & Leadership Timeline */}
        <ExperienceSection isDark={isDark} />

        {/* SQATesting.com Platform & Community Impact */}
        <SqaPlatformSection isDark={isDark} />

        {/* Direct Contact & Technical Consultation Inquiry */}
        <ContactSection isDark={isDark} />
      </main>

      {/* Clean Footer */}
      <Footer
        isDark={isDark}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Comprehensive Resume / CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        isDark={isDark}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
