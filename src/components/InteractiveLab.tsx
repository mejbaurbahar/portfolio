import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Square, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  ShieldAlert, 
  Calculator, 
  Zap, 
  Lock, 
  Globe, 
  Layers, 
  Check, 
  Copy,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { TEST_SCENARIOS } from '../data/portfolioData';

interface InteractiveLabProps {
  isDark: boolean;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState<'runner' | 'security' | 'calculator'>('runner');
  
  // Test Runner State
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(TEST_SCENARIOS[0].id);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [testLogs, setTestLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [headlessMode, setHeadlessMode] = useState<boolean>(true);
  const [networkThrottling, setNetworkThrottling] = useState<boolean>(false);
  const [executionTime, setExecutionTime] = useState<number>(0);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const selectedScenario = TEST_SCENARIOS.find(s => s.id === selectedScenarioId) || TEST_SCENARIOS[0];

  // Security Scanner State
  const [targetUrl, setTargetUrl] = useState<string>('https://app.enterprise-checkout.internal/api/v2/search');
  const [testPayload, setTestPayload] = useState<string>('<script>/*fagun_audit*/alert(1)</script>');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<{
    status: 'idle' | 'scanning' | 'found' | 'safe';
    riskScore: number;
    cspStatus: string;
    sinkDetected: string;
    details: string;
    remediation: string;
  }>({
    status: 'idle',
    riskScore: 0,
    cspStatus: '',
    sinkDetected: '',
    details: '',
    remediation: ''
  });

  // ROI Calculator State
  const [manualHoursPerSprint, setManualHoursPerSprint] = useState<number>(36);
  const [sprintsPerYear, setSprintsPerYear] = useState<number>(24);
  const [hourlyRate, setHourlyRate] = useState<number>(65);

  // Auto-scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollTop = logsEndRef.current.scrollHeight;
    }
  }, [testLogs]);

  // Handle running test steps
  const handleStartTest = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsCompleted(false);
    setCurrentStepIndex(0);
    setExecutionTime(0);
    setTestLogs([
      `[INFO] Starting Playwright Test Suite: ${selectedScenario.name}`,
      `[INFO] Target: ${selectedScenario.framework} | Headless: ${headlessMode} | Throttling: ${networkThrottling ? 'Fast 3G' : 'LAN'}`,
      `[CONFIG] Parallel Workers: 4 shards initialized`
    ]);

    let step = 0;
    const stepInterval = setInterval(() => {
      if (step < selectedScenario.steps.length) {
        const current = selectedScenario.steps[step];
        setCurrentStepIndex(step);
        setTestLogs(prev => [
          ...prev,
          `[EXEC] Step ${step + 1}/${selectedScenario.steps.length}: ${current.name}`,
          `       > ${current.action}`,
          `[PASS] ✓ ${current.log} (${current.duration})`
        ]);
        step++;
      } else {
        clearInterval(stepInterval);
        setIsRunning(false);
        setIsCompleted(true);
        setExecutionTime(selectedScenario.durationMs);
        setTestLogs(prev => [
          ...prev,
          `----------------------------------------------------`,
          `[SUCCESS] All ${selectedScenario.steps.length} assertions passed! (Duration: ${(selectedScenario.durationMs / 1000).toFixed(2)}s)`,
          `[REPORT] Playwright HTML report and Allure trace saved to artifacts/allure-results`
        ]);
      }
    }, networkThrottling ? 900 : 550);
  };

  const handleResetTest = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setCurrentStepIndex(-1);
    setTestLogs([]);
    setExecutionTime(0);
  };

  // Run security scan
  const handleRunSecurityScan = () => {
    setIsScanning(true);
    setScanResult({
      status: 'scanning',
      riskScore: 0,
      cspStatus: 'Evaluating Content-Security-Policy headers...',
      sinkDetected: 'Tracing AST calls in document context...',
      details: 'Analyzing parameter reflection and DOM sink injection...',
      remediation: ''
    });

    setTimeout(() => {
      const isXssPayload = testPayload.includes('<') || testPayload.includes('alert') || testPayload.includes('javascript:');
      
      if (isXssPayload) {
        setScanResult({
          status: 'found',
          riskScore: 8.8,
          cspStatus: "WEAK: 'unsafe-inline' detected in script-src; Nonce absent",
          sinkDetected: "DANGEROUS SINK: Element.innerHTML receives unescaped parameter 'q'",
          details: `Reflected DOM XSS verified. Input payload was echoed directly without context-aware HTML entity encoding. An attacker can hijack user session cookies or trigger unauthorized actions.`,
          remediation: `Implement context-aware HTML entity encoding (e.g. DOMPurify.sanitize()), remove 'unsafe-inline' from CSP directives, and bind values strictly via .textContent or framework-safe JSX bindings.`
        });
      } else {
        setScanResult({
          status: 'safe',
          riskScore: 1.2,
          cspStatus: "SECURE: Strict CSP with cryptographic nonces and frame-ancestors 'none'",
          sinkDetected: 'NO DANGEROUS SINK: Value rendered via textContent',
          details: `Payload safely parsed. Input passed strict boundary verification, no executable script tags or javascript: URIs were evaluated in the DOM.`,
          remediation: `Current hardening matches OWASP ASVS Level 2 standards. Continue monitoring for third-party script supply-chain injections.`
        });
      }
      setIsScanning(false);
    }, 1400);
  };

  // Calculate ROI metrics
  const totalManualHoursPerYear = manualHoursPerSprint * sprintsPerYear;
  const automatedHoursPerYear = Math.round(sprintsPerYear * 1.5); // only 1.5 hrs per sprint with Playwright
  const hoursSavedPerYear = totalManualHoursPerYear - automatedHoursPerYear;
  const costSavings = hoursSavedPerYear * hourlyRate;
  const timeToMarketSpeedup = ((manualHoursPerSprint / 1.5)).toFixed(1);

  return (
    <section id="interactive-lab" className="py-16 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Engineering Lab</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight font-display text-balance">
            Test Automation & AppSec <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Simulator</span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Experience Fagun's engineering methodology live. Run automated Playwright test suites, audit reflected XSS vectors, or calculate framework cost savings.
          </p>

          {/* Interactive Mode Segmented Tabs (Functional Buttons) */}
          <div className={`mt-6 inline-flex p-1 rounded-xl border ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200 shadow-inner'
          }`}>
            <button
              onClick={() => setActiveTab('runner')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'runner'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Playwright Test Runner</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'security'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md shadow-purple-500/20'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>XSS Recon Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'calculator'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Automation ROI</span>
            </button>
          </div>
        </div>

        {/* TAB 1: PLAYWRIGHT TEST RUNNER */}
        {activeTab === 'runner' && (
          <div className={`rounded-2xl border overflow-hidden transition-all shadow-2xl ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {/* Top Toolbar */}
            <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-4 ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex flex-wrap items-center gap-3">
                <label className="text-xs font-medium text-slate-400">Select Test Scenario:</label>
                <select
                  value={selectedScenarioId}
                  onChange={(e) => {
                    setSelectedScenarioId(e.target.value);
                    handleResetTest();
                  }}
                  disabled={isRunning}
                  className={`text-xs sm:text-sm font-medium rounded-lg px-3 py-1.5 border outline-none cursor-pointer ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                >
                  {TEST_SCENARIOS.map(scenario => (
                    <option key={scenario.id} value={scenario.id}>
                      {scenario.name} ({scenario.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Execution Controls */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs cursor-pointer select-none text-slate-400">
                  <input
                    type="checkbox"
                    checked={headlessMode}
                    onChange={(e) => setHeadlessMode(e.target.checked)}
                    disabled={isRunning}
                    className="rounded text-cyan-500 focus:ring-cyan-400"
                  />
                  <span>Headless</span>
                </label>

                <label className="flex items-center gap-1.5 text-xs cursor-pointer select-none text-slate-400">
                  <input
                    type="checkbox"
                    checked={networkThrottling}
                    onChange={(e) => setNetworkThrottling(e.target.checked)}
                    disabled={isRunning}
                    className="rounded text-cyan-500 focus:ring-cyan-400"
                  />
                  <span>Throttle 3G</span>
                </label>

                {!isRunning ? (
                  <button
                    onClick={handleStartTest}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-sm active:scale-95 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Run Suite</span>
                  </button>
                ) : (
                  <button
                    onClick={handleResetTest}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-sm active:scale-95 transition-all"
                  >
                    <Square className="w-3.5 h-3.5 fill-white" />
                    <span>Stop</span>
                  </button>
                )}

                <button
                  onClick={handleResetTest}
                  disabled={isRunning}
                  aria-label="Reset Test"
                  className={`p-1.5 rounded-lg border text-slate-400 hover:text-slate-200 transition-colors ${
                    isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-300 bg-slate-100'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Split Screen: Test Steps List & Live Terminal Console */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
              
              {/* Left Column: Test Steps Checklist */}
              <div className={`lg:col-span-6 p-5 border-r ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                    Step-by-Step Assertions
                  </span>
                  <span className="text-xs font-mono text-cyan-400 tabular-nums">
                    {currentStepIndex >= 0 ? `${Math.min(currentStepIndex + 1, selectedScenario.steps.length)} / ${selectedScenario.steps.length} Steps` : `Ready (${selectedScenario.steps.length} Steps)`}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {selectedScenario.steps.map((step, idx) => {
                    const isPassed = isCompleted || (currentStepIndex > idx);
                    const isCurrent = isRunning && currentStepIndex === idx;
                    const isPending = currentStepIndex < idx;

                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border transition-all ${
                          isCurrent
                            ? isDark ? 'bg-cyan-950/30 border-cyan-500/60 shadow-sm' : 'bg-cyan-50 border-cyan-300 shadow-sm'
                            : isPassed
                            ? isDark ? 'bg-slate-900/40 border-emerald-900/40' : 'bg-emerald-50/50 border-emerald-200'
                            : isDark ? 'bg-slate-950/30 border-slate-800/60' : 'bg-slate-50/60 border-slate-200/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <div className="mt-0.5">
                              {isPassed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : isCurrent ? (
                                <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-slate-600 text-[10px] flex items-center justify-center text-slate-400 font-mono">
                                  {idx + 1}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className={`text-xs sm:text-sm font-medium ${
                                isPassed ? 'text-emerald-400' : isCurrent ? 'text-cyan-300 font-semibold' : isDark ? 'text-slate-300' : 'text-slate-700'
                              }`}>
                                {step.name}
                              </div>
                              <div className="text-[11px] font-mono text-slate-400 mt-0.5 break-all">
                                {step.action}
                              </div>
                            </div>
                          </div>

                          <span className="text-[11px] font-mono text-slate-400 shrink-0 tabular-nums">
                            {isPassed || isCurrent ? step.duration : '--'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {isCompleted && (
                  <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>TestSuite Passed: 0 Flakiness Detected</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-300 tabular-nums">
                      {(executionTime / 1000).toFixed(2)}s runtime
                    </span>
                  </div>
                )}
              </div>

              {/* Right Column: Live Terminal Stdout / Log Window */}
              <div className={`lg:col-span-6 p-4 flex flex-col font-mono text-xs ${
                isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-900 text-slate-200'
              }`}>
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-[11px] ml-1 text-slate-400">pw-runner@fagun-sdet: ~</span>
                  </div>
                  <span className="text-[11px] text-cyan-400">Playwright v1.50+</span>
                </div>

                <div 
                  ref={logsEndRef}
                  className="flex-1 overflow-y-auto space-y-1.5 pr-2 max-h-[340px] font-mono text-[11px] leading-relaxed select-text"
                >
                  {testLogs.length === 0 ? (
                    <div className="text-slate-500 py-12 text-center">
                      <Terminal className="w-8 h-8 mx-auto mb-2 opacity-40 text-cyan-400" />
                      <div>Ready to execute automated test runner.</div>
                      <div className="text-[10px] text-slate-600 mt-1">Click "Run Suite" above to simulate live execution.</div>
                    </div>
                  ) : (
                    testLogs.map((log, i) => (
                      <div 
                        key={i} 
                        className={
                          log.includes('[PASS]') || log.includes('[SUCCESS]')
                            ? 'text-emerald-400 font-semibold'
                            : log.includes('[EXEC]')
                            ? 'text-cyan-300'
                            : log.includes('[INFO]') || log.includes('[CONFIG]')
                            ? 'text-slate-400'
                            : 'text-slate-300'
                        }
                      >
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: XSS RECON & VULNERABILITY AUDITOR */}
        {activeTab === 'security' && (
          <div className={`rounded-2xl border p-6 shadow-2xl transition-all ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Config Column */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-400 mb-1.5">
                    Target URL / Endpoint:
                  </label>
                  <div className={`flex items-center px-3 py-2 rounded-xl border ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
                  }`}>
                    <Globe className="w-4 h-4 text-purple-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      className="bg-transparent text-xs sm:text-sm font-mono outline-none w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-400 mb-1.5">
                    Injection Payload / Vector:
                  </label>
                  <textarea
                    rows={3}
                    value={testPayload}
                    onChange={(e) => setTestPayload(e.target.value)}
                    className={`w-full p-3 rounded-xl border text-xs sm:text-sm font-mono outline-none resize-none ${
                      isDark ? 'bg-slate-950 border-slate-800 text-purple-300 focus:border-purple-500' : 'bg-slate-50 border-slate-300 text-purple-700 focus:border-purple-500'
                    }`}
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[11px] text-slate-400 self-center mr-1">Presets:</span>
                    <button
                      onClick={() => setTestPayload("<script>/*fagun_audit*/alert(1)</script>")}
                      className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                        isDark ? 'border-slate-800 bg-slate-950 text-slate-300 hover:text-white' : 'border-slate-300 bg-white text-slate-700 hover:text-black'
                      }`}
                    >
                      Script Tag
                    </button>
                    <button
                      onClick={() => setTestPayload('\"><svg/onload=confirm(document.domain)>')}
                      className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                        isDark ? 'border-slate-800 bg-slate-950 text-slate-300 hover:text-white' : 'border-slate-300 bg-white text-slate-700 hover:text-black'
                      }`}
                    >
                      SVG Polyglot
                    </button>
                    <button
                      onClick={() => setTestPayload('javascript:eval(atob("YWxlcnQoMSk="))')}
                      className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                        isDark ? 'border-slate-800 bg-slate-950 text-slate-300 hover:text-white' : 'border-slate-300 bg-white text-slate-700 hover:text-black'
                      }`}
                    >
                      Base64 Eval
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleRunSecurityScan}
                  disabled={isScanning}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-600 to-rose-600 hover:from-purple-400 hover:to-rose-500 shadow-md shadow-purple-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isScanning ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Fagun XSS Recon Scanning...</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4" />
                      <span>Launch XSS Recon Audit</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Results Column */}
              <div className={`lg:col-span-7 rounded-xl border p-5 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700/50">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                    Vulnerability Assessment Report
                  </span>
                  {scanResult.status !== 'idle' && (
                    <span className={`text-xs font-mono px-2 py-0.5 rounded font-bold ${
                      scanResult.status === 'found'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : scanResult.status === 'safe'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      CVSS 3.1: {scanResult.riskScore}
                    </span>
                  )}
                </div>

                {scanResult.status === 'idle' ? (
                  <div className="py-14 text-center text-slate-500">
                    <Lock className="w-8 h-8 mx-auto mb-2 opacity-40 text-purple-400" />
                    <p className="text-sm">Ready to audit reflection context and Content Security Policy.</p>
                    <p className="text-xs text-slate-600 mt-1">Select a payload and click "Launch XSS Recon Audit".</p>
                  </div>
                ) : (
                  <div className="space-y-3.5 text-xs sm:text-sm">
                    <div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase">CSP Policy Analysis:</div>
                      <div className={`mt-1 font-mono text-xs p-2 rounded-lg ${
                        scanResult.cspStatus.includes('WEAK')
                          ? 'bg-rose-950/30 text-rose-300 border border-rose-900/40'
                          : 'bg-emerald-950/30 text-emerald-300 border border-emerald-900/40'
                      }`}>
                        {scanResult.cspStatus}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase">DOM Sink Status:</div>
                      <div className="mt-1 font-mono text-xs text-slate-300 p-2 rounded-lg bg-slate-900 border border-slate-800">
                        {scanResult.sinkDetected}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Impact & Findings:</div>
                      <p className={`mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {scanResult.details}
                      </p>
                    </div>

                    {scanResult.remediation && (
                      <div className="pt-2 border-t border-slate-800">
                        <div className="text-[11px] font-mono text-cyan-400 uppercase">Remediation Guidelines:</div>
                        <p className={`mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {scanResult.remediation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: QA ROI & AUTOMATION CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className={`rounded-2xl border p-6 shadow-2xl transition-all ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Sliders on Left */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2 text-xs sm:text-sm">
                    <span className="font-medium">Manual Regression Testing per Sprint:</span>
                    <span className="font-mono text-cyan-400 font-bold tabular-nums">{manualHoursPerSprint} hours</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="2"
                    value={manualHoursPerSprint}
                    onChange={(e) => setManualHoursPerSprint(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                    <span>10 hrs</span>
                    <span>50 hrs</span>
                    <span>100 hrs</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2 text-xs sm:text-sm">
                    <span className="font-medium">Production Releases per Year:</span>
                    <span className="font-mono text-emerald-400 font-bold tabular-nums">{sprintsPerYear} releases</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="52"
                    step="2"
                    value={sprintsPerYear}
                    onChange={(e) => setSprintsPerYear(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                    <span>6 (Bi-monthly)</span>
                    <span>26 (Bi-weekly)</span>
                    <span>52 (Weekly)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2 text-xs sm:text-sm">
                    <span className="font-medium">Average Engineering Blended Rate:</span>
                    <span className="font-mono text-purple-400 font-bold tabular-nums">${hourlyRate} / hour</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="150"
                    step="5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                    <span>$30/hr</span>
                    <span>$80/hr</span>
                    <span>$150/hr</span>
                  </div>
                </div>
              </div>

              {/* Calculated Metrics on Right */}
              <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                <div className={`p-5 rounded-xl border ${
                  isDark ? 'bg-gradient-to-br from-emerald-950/40 to-slate-900 border-emerald-800/60' : 'bg-emerald-50 border-emerald-200'
                }`}>
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
                    Estimated Annual Cost Saved
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-300 tabular-nums">
                    ${costSavings.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Direct engineering capital recovered via parallel test execution.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-4 rounded-xl border ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="text-[11px] font-mono text-cyan-400 mb-0.5">Hours Saved / Year</div>
                    <div className="text-2xl font-bold font-mono text-cyan-300 tabular-nums">
                      {hoursSavedPerYear.toLocaleString()} hrs
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      From {totalManualHoursPerYear}h down to {automatedHoursPerYear}h
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="text-[11px] font-mono text-purple-400 mb-0.5">Cycle Acceleration</div>
                    <div className="text-2xl font-bold font-mono text-purple-300 tabular-nums">
                      {timeToMarketSpeedup}x Faster
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Same-day feature releases
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
