import React, { useState } from "react";
import { CL, TOOLTIPS } from "../data/theme";
import { SIMS } from "../data/simulations";

function Tip({ term, children, T }) {
  const [show, setShow] = useState(false);
  const def = TOOLTIPS[term];
  if (!def) return <span>{children || term}</span>;
  return (
    <span
      style={{ position:"relative", display:"inline", borderBottom:`1px dashed ${CL.accent}`, cursor:"help" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children || term}
      {show && (
        <span className="pop" style={{
          position:"absolute", bottom:"calc(100% + 8px)", left:"50%", transform:"translateX(-50%)",
          background:T.s1, border:`1px solid ${T.bdr}`, borderRadius:8, padding:"10px 14px",
          fontSize:12, color:T.t2, width:260, zIndex:50,
          boxShadow:"0 8px 24px rgba(0,0,0,.15)", lineHeight:1.5, fontWeight:400, whiteSpace:"normal",
        }}>
          <strong style={{ color:T.t1, display:"block", marginBottom:4 }}>{term}</strong>
          {def}
        </span>
      )}
    </span>
  );
}

export default function SimulationLab({ simDone, setSimDone, addXp, setShowPay, T }) {
  const [activeSim, setActiveSim] = useState(null);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const mono = { fontFamily:"'JetBrains Mono', monospace" };
  const card = { background:T.s1, border:`1px solid ${T.bdr}`, borderRadius:10 };
  const tag = (color, bg) => ({ ...mono, fontSize:10, fontWeight:500, padding:"3px 8px", borderRadius:4, color, background:bg || `${color}12` });
  const btnP = { display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6, padding:"10px 20px", borderRadius:8, fontFamily:"'Space Grotesk'", fontSize:13, fontWeight:600, border:"none", cursor:"pointer", background:CL.accent, color:"#fff" };
  const btnG = { ...btnP, background:"transparent", color:T.t2, border:`1px solid ${T.bdr}` };

  const handleAnswer = (simId, optIdx) => {
    if (answered) return;
    setSelected(optIdx);
    setAnswered(true);
    const sim = SIMS.find(s => s.id === simId);
    addXp(sim.opts[optIdx].xp);
    setSimDone(prev => ({ ...prev, [simId]: optIdx }));
  };

  // Sim list
  if (!activeSim) {
    return (
      <div className="fi" style={{ maxWidth:780, margin:"0 auto", padding:"32px 20px" }}>
        <div style={{ ...mono, fontSize:10, color:T.t3, letterSpacing:".08em", marginBottom:6 }}>SIMULATION LAB</div>
        <h1 style={{ fontSize:24, fontWeight:700, color:T.t1, marginBottom:4, fontFamily:"'Space Grotesk'" }}>Professional decision scenarios</h1>
        <p style={{ fontSize:13, color:T.t2, marginBottom:20 }}>3 free scenarios. Earn XP based on quality of your decisions. Hover underlined terms for definitions.</p>

        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {SIMS.map(sim => (
            <button
              key={sim.id}
              onClick={() => { setActiveSim(sim.id); setSelected(null); setAnswered(false); }}
              style={{ ...card, padding:16, cursor:"pointer", textAlign:"left", display:"flex", gap:14, alignItems:"flex-start", fontFamily:"'Space Grotesk'" }}
            >
              <div style={{ width:40, height:40, borderRadius:8, background:`${CL.accent}12`, display:"flex", alignItems:"center", justifyContent:"center", ...mono, fontSize:13, fontWeight:700, color:CL.accent, flexShrink:0 }}>
                {sim.icon}
              </div>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
                  <span style={{ fontSize:14, fontWeight:600, color:T.t1 }}>{sim.title}</span>
                  <span style={tag(T.t3, T.s2)}>{sim.sub}</span>
                  {simDone[sim.id] !== undefined && <span style={tag(CL.green)}>Done</span>}
                </div>
                <p style={{ fontSize:11, color:T.t2, lineHeight:1.45 }}>{sim.scenario.slice(0, 100)}...</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Active simulation
  const sim = SIMS.find(s => s.id === activeSim);

  return (
    <div className="fi" style={{ maxWidth:780, margin:"0 auto", padding:"32px 20px" }}>
      <button onClick={() => setActiveSim(null)} style={{ ...btnG, marginBottom:14, fontSize:11, padding:"6px 12px" }}>
        Back to scenarios
      </button>

      {/* Scenario */}
      <div style={{ ...card, padding:18, marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <div style={{ ...mono, fontSize:12, fontWeight:700, color:CL.accent }}>{sim.icon}</div>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:T.t1 }}>{sim.title}</div>
            <div style={{ fontSize:10, color:T.t3 }}>{sim.sub}</div>
          </div>
        </div>
        <p style={{ fontSize:12, color:T.t2, lineHeight:1.6 }}>
          {sim.scenario.split(/\b/).map((word, i) => {
            const clean = word.replace(/[^A-Za-z0-9 ]/g, "").trim();
            if (TOOLTIPS[clean]) {
              return <Tip key={i} term={clean} T={T}>{word}</Tip>;
            }
            return <span key={i}>{word}</span>;
          })}
        </p>
      </div>

      {/* Decision */}
      <div style={{ ...card, padding:18, borderColor:CL.accent }}>
        <div style={{ ...mono, fontSize:9, color:CL.accent, letterSpacing:".08em", marginBottom:6 }}>DECISION POINT</div>
        <p style={{ fontSize:13, fontWeight:600, color:T.t1, marginBottom:14, lineHeight:1.4 }}>{sim.q}</p>

        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {sim.opts.map((opt, i) => {
            const isSel = selected === i;
            const showFb = answered && isSel;
            return (
              <div key={i}>
                <button
                  onClick={() => handleAnswer(activeSim, i)}
                  style={{
                    width:"100%", textAlign:"left", padding:12, borderRadius:8,
                    cursor:answered ? "default" : "pointer",
                    background:showFb ? (opt.ok ? `${CL.green}08` : `${CL.red}08`) : T.s2,
                    border:`1px solid ${showFb ? (opt.ok ? CL.green : CL.red) : T.bdr}`,
                    fontFamily:"'Space Grotesk'", fontSize:12, color:T.t1,
                    transition:"all .15s",
                    opacity:answered && !isSel ? .35 : 1,
                  }}
                >
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span>{opt.text}</span>
                    {showFb && <span style={{ ...mono, fontSize:10, color:opt.ok ? CL.green : CL.red }}>+{opt.xp}xp</span>}
                  </div>
                </button>
                {showFb && (
                  <div style={{ padding:"8px 12px", fontSize:11, color:T.t2, lineHeight:1.5, borderLeft:`2px solid ${opt.ok ? CL.green : CL.red}`, marginTop:3, marginLeft:6 }}>
                    {opt.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {answered && (
          <div style={{ marginTop:16, padding:12, background:`${CL.pink}08`, borderRadius:8, border:`1px solid ${CL.pink}20`, textAlign:"center" }}>
            <p style={{ fontSize:13, color:T.t1, marginBottom:8 }}>Full multi-phase simulations unlock with Pro.</p>
            <button onClick={() => setShowPay(true)} style={btnP}>Unlock Full Simulation</button>
          </div>
        )}
      </div>
    </div>
  );
}
