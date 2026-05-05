import React, { useState } from "react";
import { CL, lightTheme, darkTheme } from "./data/theme";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import PromptLibrary from "./components/PromptLibrary";
import StudySystem from "./components/StudySystem";
import RiskToolkit from "./components/RiskToolkit";
import SimulationLab from "./components/SimulationLab";
import Pricing from "./components/Pricing";

export default function App() {
  // All hooks at top level — never conditional
  const [isDark, setIsDark] = useState(false);
  const [page, setPage] = useState("home");
  const [showEntry, setShowEntry] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [xp, setXp] = useState(0);
  const [viewed, setViewed] = useState(new Set());
  const [simDone, setSimDone] = useState({});
  const [studyTrack, setStudyTrack] = useState(null);

  const T = isDark ? darkTheme : lightTheme;
  const addXp = (n) => setXp(prev => prev + n);

  const onViewPrompt = (id) => {
    if (!viewed.has(id)) {
      setViewed(new Set([...viewed, id]));
      addXp(2);
    }
  };

  const btnP = {
    display:"inline-flex", alignItems:"center", justifyContent:"center",
    gap:6, padding:"10px 20px", borderRadius:8,
    fontFamily:"'Space Grotesk'", fontSize:13, fontWeight:600,
    border:"none", cursor:"pointer", background:CL.accent, color:"#fff",
  };
  const btnG = { ...btnP, background:"transparent", color:T.t2, border:`1px solid ${T.bdr}` };
  const card = { background:T.s1, border:`1px solid ${T.bdr}`, borderRadius:10 };
  const mono = { fontFamily:"'JetBrains Mono', monospace" };

  // ═══ TERMS POPUP ═══
  if (showTerms) {
    return (
      <div style={{
        position:"fixed", inset:0, zIndex:999,
        background:"rgba(0,0,0,.6)", backdropFilter:"blur(4px)",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontFamily:"'Space Grotesk'",
      }}>
        <div className="pop" style={{ ...card, padding:32, maxWidth:440, width:"90%", textAlign:"center" }}>
          <div style={{ ...mono, fontSize:10, color:CL.pink, letterSpacing:".12em", marginBottom:12 }}>TERMS OF USE</div>
          <h2 style={{ fontSize:18, fontWeight:700, color:T.t1, marginBottom:12 }}>Content is proprietary</h2>
          <p style={{ fontSize:13, color:T.t2, lineHeight:1.6, marginBottom:24 }}>
            All prompts, templates, simulations, and educational content on this platform are original intellectual property of Rafay Ashraf. Redistribution, resale, or sharing of content is prohibited. By proceeding, you agree to these terms.
          </p>
          <button onClick={() => { setShowTerms(false); setShowEntry(false); }} style={{ ...btnP, padding:"12px 28px", fontSize:14 }}>
            I Agree &mdash; Enter Platform
          </button>
        </div>
      </div>
    );
  }

  // ═══ ENTRY OVERLAY ═══
  if (showEntry) {
    return (
      <div style={{
        position:"fixed", inset:0, zIndex:999,
        background:T.bg,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontFamily:"'Space Grotesk'",
      }}>
        <div className="fi" style={{ maxWidth:540, width:"90%", textAlign:"center" }}>
          <div style={{ ...mono, fontSize:10, color:CL.pink, letterSpacing:".15em", marginBottom:16 }}>RAFAY ASHRAF, ACCA</div>
          <h1 style={{ fontSize:28, fontWeight:700, color:T.t1, marginBottom:8, lineHeight:1.25 }}>
            Built for the next generation of<br />
            <span style={{ color:CL.accent }}>Risk, GRC, and Finance professionals.</span>
          </h1>
          <p style={{ fontSize:14, color:T.t2, marginBottom:28, lineHeight:1.6 }}>
            A structured learning and productivity platform. Not a course. Not a blog. A professional operating system.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:28, textAlign:"left" }}>
            {[
              { t:"AI Prompt Intelligence", d:"Eliminate hallucinations. Structured output with validation layers.", c:CL.accent },
              { t:"Study Tracker", d:"Structured preparation for ACCA, ICAP, and finance qualifications.", c:CL.green },
              { t:"Risk & Audit Toolkit", d:"Real consulting methodologies. Big 4 aligned templates.", c:CL.amber },
              { t:"Simulation Lab", d:"Experience real audit, risk, and consulting decision scenarios.", c:CL.pink },
            ].map((p, i) => (
              <div key={i} style={{ ...card, padding:16 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:p.c, marginBottom:10 }} />
                <div style={{ fontSize:13, fontWeight:600, color:T.t1, marginBottom:3 }}>{p.t}</div>
                <div style={{ fontSize:11, color:T.t2, lineHeight:1.45 }}>{p.d}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setShowTerms(true)} style={{ ...btnP, padding:"12px 28px", fontSize:14 }}>
            Enter Platform
          </button>
        </div>
      </div>
    );
  }

  // ═══ PAYWALL MODAL ═══
  const PaywallModal = showPay ? (
    <div
      style={{
        position:"fixed", inset:0, zIndex:200,
        background:"rgba(0,0,0,.5)", backdropFilter:"blur(4px)",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}
      onClick={() => setShowPay(false)}
    >
      <div className="pop" style={{ ...card, padding:28, maxWidth:380, width:"90%", textAlign:"center" }} onClick={e => e.stopPropagation()}>
        <div style={{ ...mono, fontSize:10, color:CL.accent, letterSpacing:".08em", marginBottom:10 }}>UPGRADE REQUIRED</div>
        <h2 style={{ fontSize:17, fontWeight:700, color:T.t1, marginBottom:6 }}>Unlock this content</h2>
        <p style={{ fontSize:13, color:T.t2, lineHeight:1.5, marginBottom:20 }}>
          Available with Pro ($7/mo) or Premium Toolkit ($24 one-time).
        </p>
        <button style={{ ...btnP, width:"100%", marginBottom:8 }}>Start 7-Day Free Trial</button>
        <button onClick={() => setShowPay(false)} style={{ ...btnG, width:"100%" }}>Maybe later</button>
      </div>
    </div>
  ) : null;

  // ═══ MAIN RENDER ═══
  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.t1, fontFamily:"'Space Grotesk', sans-serif" }}>
      {PaywallModal}

      <Navbar page={page} setPage={setPage} xp={xp} isDark={isDark} setIsDark={setIsDark} T={T} />

      {page === "home" && (
        <Dashboard xp={xp} viewed={viewed} simDone={simDone} setPage={setPage} T={T} />
      )}

      {page === "prompts" && (
        <PromptLibrary viewed={viewed} onView={onViewPrompt} setShowPay={setShowPay} T={T} />
      )}

      {page === "vault" && (
        <StudySystem studyTrack={studyTrack} setStudyTrack={setStudyTrack} T={T} />
      )}

      {page === "toolkit" && (
        <RiskToolkit setShowPay={setShowPay} T={T} />
      )}

      {page === "simlab" && (
        <SimulationLab simDone={simDone} setSimDone={setSimDone} addXp={addXp} setShowPay={setShowPay} T={T} />
      )}

      {page === "pricing" && (
        <Pricing T={T} />
      )}

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${T.bdr}`, padding:18, marginTop:36 }}>
        <div style={{ maxWidth:880, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:11, fontWeight:600, color:T.t1 }}>RAFAY ASHRAF</span>
            <span style={{ fontSize:10, color:T.t3 }}>ACCA</span>
            <span style={{ width:14, height:2, background:CL.pink, display:"inline-block" }} />
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ ...mono, fontSize:9, color:T.t3 }}>
              7+ yrs KPMG | Lean Six Sigma (2nd, Singapore QI) | 100+ mentored
            </span>
            <div style={{ display:"flex", gap:2 }}>
              <div style={{ width:4, height:4, borderRadius:"50%", background:CL.primary }} />
              <div style={{ width:4, height:4, borderRadius:"50%", background:CL.accent }} />
              <div style={{ width:4, height:4, borderRadius:"50%", background:CL.pink }} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
