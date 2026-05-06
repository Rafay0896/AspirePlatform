import { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, PaywallModal } from './components/ui';
import Dashboard from './pages/Dashboard';
import PromptLibrary from './pages/PromptLibrary';
import StudySystem from './pages/StudySystem';
import RiskToolkit from './pages/RiskToolkit';
import SimulationLab from './pages/SimulationLab';
import Pricing from './pages/Pricing';

const LEVELS = [
  { name: 'Explorer', min: 0 },
  { name: 'Practitioner', min: 10 },
  { name: 'Specialist', min: 30 },
  { name: 'Expert', min: 60 },
  { name: 'Authority', min: 100 },
];

function EntryOverlay({ onEnter }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="fade-in" style={{ maxWidth: 540, width: '90%', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--pink)', letterSpacing: '.15em', marginBottom: 16 }}>
          RAFAY ASHRAF, ACCA
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--t1)', marginBottom: 8, lineHeight: 1.25 }}>
          Built for the next generation of<br />
          <span style={{ color: 'var(--accent)' }}>Risk, GRC, and Finance professionals.</span>
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t2)', marginBottom: 28, lineHeight: 1.6 }}>
          A structured learning and productivity platform. Not a course. Not a blog. A professional operating system.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28, textAlign: 'left' }}>
          {[
            { t: 'AI Prompt Intelligence', d: 'Eliminate hallucinations. Structured output with validation.', c: 'var(--accent)' },
            { t: 'Study Tracker', d: 'Structured preparation for ACCA, ICAP, and finance qualifications.', c: 'var(--green)' },
            { t: 'Risk & Audit Toolkit', d: 'Real consulting methodologies. Big 4 aligned templates.', c: 'var(--amber)' },
            { t: 'Simulation Lab', d: 'Experience real audit and consulting decision scenarios.', c: 'var(--pink)' },
          ].map((p, i) => (
            <div key={i} style={{ background: 'var(--s1)', border: '1px solid var(--bdr)', borderRadius: 10, padding: 16 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.c, marginBottom: 10 }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: 'var(--t1)', marginBottom: 3 }}>{p.t}</div>
              <div style={{ fontSize: 11, color: 'var(--t2)', lineHeight: 1.45 }}>{p.d}</div>
            </div>
          ))}
        </div>

        <button onClick={onEnter} style={{
          padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer',
          background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 600,
          fontFamily: 'var(--font-display)',
        }}>
          Enter Platform
        </button>
      </div>
    </div>
  );
}

function TermsModal({ onAccept }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="pop-in" style={{ background: 'var(--s1)', border: '1px solid var(--bdr)', borderRadius: 14, padding: 32, maxWidth: 440, width: '90%', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--pink)', letterSpacing: '.12em', marginBottom: 12 }}>
          TERMS OF USE
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--t1)', marginBottom: 12 }}>
          Content is proprietary
        </h2>
        <p style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.6, marginBottom: 24 }}>
          All prompts, templates, simulations, and educational content are original intellectual property of Rafay Ashraf. Redistribution, resale, or sharing is prohibited. By proceeding, you agree to these terms.
        </p>
        <button onClick={onAccept} style={{
          width: '100%', padding: '10px 20px', borderRadius: 8, border: 'none',
          background: 'var(--accent)', color: '#fff', fontSize: 13, fontWeight: 600,
          fontFamily: 'var(--font-display)', cursor: 'pointer',
        }}>
          I Agree &mdash; Enter Platform
        </button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--bdr)', padding: 18, marginTop: 36 }}>
      <div style={{ maxWidth: 880, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 600 }}>RAFAY ASHRAF</span>
          <span style={{ fontSize: 10, color: 'var(--t3)' }}>ACCA</span>
          <span style={{ width: 14, height: 2, background: 'var(--accent)' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--t3)' }}>
            7+ yrs KPMG | Lean Six Sigma (2nd, Singapore QI) | 100+ mentored
          </span>
          <a href="https://forms.gle/placeholder" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--accent)', textDecoration: 'none' }}>
            Feedback
          </a>
          <div style={{ display: 'flex', gap: 2 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--primary)' }} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--pink)' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [showEntry, setShowEntry] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [xp, setXp] = useState(0);
  const [viewed, setViewed] = useState(new Set());
  const [simDone, setSimDone] = useState({});
  const [showPay, setShowPay] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const addXp = useCallback((n) => setXp((p) => p + n), []);

  const onViewPrompt = useCallback((id) => {
    setViewed((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    addXp(2);
  }, [addXp]);

  if (showEntry) {
    return (
      <>
        <style>{`[data-theme="light"] body, body { background: var(--bg); }`}</style>
        <EntryOverlay onEnter={() => setShowTerms(true)} />
        {showTerms && <TermsModal onAccept={() => { setShowTerms(false); setShowEntry(false); }} />}
      </>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--t1)' }}>
      <Navbar xp={xp} isDark={isDark} setIsDark={setIsDark} levels={LEVELS} />
      {showPay && <PaywallModal onClose={() => setShowPay(false)} />}

      <Routes>
        <Route path="/" element={<Dashboard xp={xp} viewed={viewed} simDone={simDone} levels={LEVELS} />} />
        <Route path="/prompts" element={<PromptLibrary onView={onViewPrompt} viewed={viewed} onPaywall={() => setShowPay(true)} />} />
        <Route path="/study" element={<StudySystem />} />
        <Route path="/toolkit" element={<RiskToolkit onPaywall={() => setShowPay(true)} />} />
        <Route path="/simlab" element={<SimulationLab addXp={addXp} simDone={simDone} setSimDone={setSimDone} />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>

      <Footer />
    </div>
  );
}
