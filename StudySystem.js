import React, { useState } from "react";
import { CL } from "../data/theme";
import { PAPERS, CHECKLIST_INIT, CHEATSHEETS } from "../data/papers";

export default function StudySystem({ studyTrack, setStudyTrack, T }) {
  const [levelFilter, setLevelFilter] = useState("all");
  const [checks, setChecks] = useState(CHECKLIST_INIT);
  const [showCheat, setShowCheat] = useState(null);
  const [expandedPaper, setExpandedPaper] = useState(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const mono = { fontFamily:"'JetBrains Mono', monospace" };
  const card = { background:T.s1, border:`1px solid ${T.bdr}`, borderRadius:10 };
  const pBar = { height:4, background:T.s2, borderRadius:4, overflow:"hidden" };
  const pFill = (w, c) => ({ height:"100%", borderRadius:4, width:`${w}%`, transition:"width .5s", background:c || `linear-gradient(90deg,${CL.accent},${CL.sky})` });
  const tag = (color, bg) => ({ ...mono, fontSize:10, fontWeight:500, padding:"3px 8px", borderRadius:4, color, background:bg || `${color}12` });
  const btnG = { background:"transparent", color:T.t2, border:`1px solid ${T.bdr}`, padding:"6px 10px", borderRadius:6, fontSize:11, cursor:"pointer", fontFamily:"'Space Grotesk'", fontWeight:500 };

  // Track selection screen
  if (!studyTrack) {
    return (
      <div className="fi" style={{ maxWidth:500, margin:"0 auto", padding:"60px 20px", textAlign:"center" }}>
        <div style={{ ...mono, fontSize:10, color:T.t3, letterSpacing:".08em", marginBottom:8 }}>STUDY SYSTEM</div>
        <h1 style={{ fontSize:24, fontWeight:700, color:T.t1, marginBottom:6, fontFamily:"'Space Grotesk'" }}>Select your qualification track</h1>
        <p style={{ fontSize:13, color:T.t2, marginBottom:28 }}>Choose your exam body to see the relevant syllabus and tracking system.</p>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {[
            { id:"acca", label:"ACCA", sub:"Association of Chartered Certified Accountants", active:true },
            { id:"icap", label:"ICAP", sub:"Institute of Chartered Accountants of Pakistan", active:false },
            { id:"degree", label:"Bachelor's / Master's", sub:"Coming soon", active:false },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => t.active && setStudyTrack(t.id)}
              style={{ ...card, padding:16, textAlign:"left", cursor:t.active ? "pointer" : "default", opacity:t.active ? 1 : .5, fontFamily:"'Space Grotesk'" }}
            >
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:T.t1 }}>{t.label}</div>
                  <div style={{ fontSize:11, color:T.t3 }}>{t.sub}</div>
                </div>
                {!t.active && <span style={tag(T.t3, T.s2)}>Soon</span>}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Main study system
  const filtered = levelFilter === "all" ? PAPERS : PAPERS.filter(p => p.level === levelFilter);
  const totalCh = PAPERS.reduce((a, p) => a + p.ch, 0);
  const totalDone = PAPERS.reduce((a, p) => a + p.done, 0);
  const overallPct = Math.round((totalDone / totalCh) * 100);
  const checkDone = checks.filter(c => c.done).length;

  return (
    <div className="fi" style={{ maxWidth:880, margin:"0 auto", padding:"32px 20px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18 }}>
        <div>
          <div style={{ ...mono, fontSize:10, color:T.t3, letterSpacing:".08em", marginBottom:6 }}>STUDY SYSTEM &mdash; ACCA</div>
          <h1 style={{ fontSize:24, fontWeight:700, color:T.t1, marginBottom:2, fontFamily:"'Space Grotesk'" }}>Exam preparation engine</h1>
          <p style={{ fontSize:13, color:T.t2 }}>Demo view. Full editing unlocks with Pro.</p>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          <button onClick={() => setShowHowTo(!showHowTo)} style={btnG}>How to use</button>
          <button onClick={() => setStudyTrack(null)} style={btnG}>Change track</button>
        </div>
      </div>

      {showHowTo && (
        <div style={{ ...card, padding:16, marginBottom:14, borderColor:CL.accent }}>
          <div style={{ fontSize:13, fontWeight:600, color:T.t1, marginBottom:6 }}>How the Study System works</div>
          <div style={{ fontSize:12, color:T.t2, lineHeight:1.6 }}>
            <strong>Confidence score (0-5):</strong> Your self-assessed confidence per paper. 0 = not started, 5 = exam-ready.<br />
            <strong>Progress bar:</strong> Chapters completed out of total. Click any paper to expand topics.<br />
            <strong>Mock score:</strong> Your latest mock exam percentage. Target: 60%+ for exam readiness.<br />
            <strong>Pre-exam checklist:</strong> Key preparation steps. Complete all before sitting the exam.
          </div>
        </div>
      )}

      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:14 }}>
        {[
          { l:"Papers", v:PAPERS.length },
          { l:"Chapters", v:`${totalDone}/${totalCh}` },
          { l:"Progress", v:`${overallPct}%` },
          { l:"Checklist", v:`${checkDone}/${checks.length}` },
        ].map((s, i) => (
          <div key={i} style={{ ...card, padding:12, textAlign:"center" }}>
            <div style={{ fontSize:20, fontWeight:700, color:T.t1 }}>{s.v}</div>
            <div style={{ ...mono, fontSize:9, color:T.t3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Overall progress */}
      <div style={{ ...card, padding:14, marginBottom:14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
          <span style={{ fontSize:12, fontWeight:600, color:T.t1 }}>Overall Progress</span>
          <span style={{ ...mono, fontSize:11, color:T.t2 }}>{overallPct}%</span>
        </div>
        <div style={{ ...pBar, height:6 }}><div style={pFill(overallPct, `linear-gradient(90deg,${CL.green},${CL.sky})`)} /></div>
      </div>

      {/* Pre-exam checklist */}
      <div style={{ ...card, padding:14, marginBottom:14 }}>
        <div style={{ fontSize:12, fontWeight:600, color:T.t1, marginBottom:8 }}>Pre-Exam Checklist</div>
        {checks.map(c => (
          <label key={c.id} style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 0", fontSize:12, color:c.done ? T.t1 : T.t2, cursor:"pointer" }}>
            <input
              type="checkbox"
              checked={c.done}
              onChange={() => setChecks(checks.map(x => x.id === c.id ? { ...x, done: !x.done } : x))}
            />
            <span style={{ textDecoration:c.done ? "line-through" : "none" }}>{c.text}</span>
          </label>
        ))}
      </div>

      {/* Level filter */}
      <div style={{ display:"flex", gap:4, marginBottom:12 }}>
        {["all","AK","AS","SP"].map(l => (
          <button
            key={l}
            onClick={() => setLevelFilter(l)}
            style={{ ...tag(levelFilter === l ? "#fff" : T.t2, levelFilter === l ? CL.accent : T.s2), border:"none", cursor:"pointer", padding:"5px 10px", borderRadius:6, fontSize:11 }}
          >
            {l === "all" ? "All" : l === "AK" ? "Applied Knowledge" : l === "AS" ? "Applied Skills" : "Strategic"}
          </button>
        ))}
      </div>

      {/* Paper list */}
      <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:14 }}>
        {filtered.map(paper => {
          const pp = Math.round((paper.done / paper.ch) * 100);
          const isExpanded = expandedPaper === paper.code;
          return (
            <div key={paper.code}>
              <div
                style={{ ...card, padding:12, cursor:"pointer" }}
                onClick={() => setExpandedPaper(isExpanded ? null : paper.code)}
              >
                <div style={{ display:"grid", gridTemplateColumns:"50px 1fr 70px 60px 50px 20px", alignItems:"center", gap:10 }}>
                  <div style={{ ...mono, fontSize:12, fontWeight:600, color:CL.accent }}>{paper.code}</div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:500, color:T.t1, marginBottom:3 }}>{paper.name}</div>
                    <div style={pBar}><div style={pFill(pp)} /></div>
                  </div>
                  <div style={{ textAlign:"center" }}>
                    {paper.conf > 0
                      ? <span style={{ ...mono, fontSize:10, color:paper.conf >= 4 ? CL.green : paper.conf >= 2 ? CL.amber : CL.red }}>{paper.conf}/5</span>
                      : <span style={{ fontSize:10, color:T.t3 }}>--</span>
                    }
                  </div>
                  <div style={{ ...mono, fontSize:11, color:T.t2, textAlign:"center" }}>{paper.done}/{paper.ch}</div>
                  <div style={{ textAlign:"center" }}>
                    {paper.mock !== null
                      ? <span style={{ ...mono, fontSize:11, color:paper.mock >= 50 ? CL.green : CL.red }}>{paper.mock}%</span>
                      : <span style={{ fontSize:10, color:T.t3 }}>--</span>
                    }
                  </div>
                  <span style={{ fontSize:10, color:T.t3 }}>{isExpanded ? "v" : ">"}</span>
                </div>
              </div>
              {isExpanded && paper.topics.length > 0 && (
                <div style={{ padding:"8px 0 8px 60px", display:"flex", flexDirection:"column", gap:2 }}>
                  {paper.topics.map((topic, i) => (
                    <div key={i} style={{ fontSize:11, color:i < paper.done ? CL.green : T.t3, padding:"3px 0", display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ ...mono, fontSize:10, width:16 }}>{i < paper.done ? "+" : "-"}</span>
                      {topic}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Cheatsheets */}
      <div style={{ ...mono, fontSize:10, color:T.t3, letterSpacing:".08em", marginBottom:6, marginTop:18 }}>CHEATSHEETS</div>
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {CHEATSHEETS.map((cs, i) => (
          <div key={i} style={card}>
            <button
              onClick={() => setShowCheat(showCheat === i ? null : i)}
              style={{ background:"none", border:"none", cursor:"pointer", width:"100%", textAlign:"left", padding:12, display:"flex", justifyContent:"space-between", alignItems:"center", fontFamily:"'Space Grotesk'" }}
            >
              <span style={{ fontSize:12, fontWeight:600, color:T.t1 }}>{cs.title}</span>
              <span style={{ fontSize:10, color:T.t3 }}>{showCheat === i ? "Hide" : "Show"}</span>
            </button>
            {showCheat === i && (
              <div style={{ padding:"0 12px 12px", borderTop:`1px solid ${T.bdr}`, paddingTop:10 }}>
                {cs.items.map((item, j) => (
                  <div key={j} style={{ fontSize:11, color:T.t2, padding:"3px 0 3px 10px", borderLeft:`2px solid ${CL.accent}`, marginBottom:3, lineHeight:1.4 }}>{item}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
