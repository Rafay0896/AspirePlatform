import React from "react";
import { CL, LEVELS } from "../data/theme";
import { PROMPTS } from "../data/prompts";
import { PAPERS } from "../data/papers";

export default function Dashboard({ xp, viewed, simDone, setPage, T }) {
  const lv = LEVELS.slice().reverse().find(l => xp >= l.min) || LEVELS[0];
  const nx = LEVELS[LEVELS.indexOf(lv) + 1];
  const pct = nx ? Math.min(((xp - lv.min) / (nx.min - lv.min)) * 100, 100) : 100;

  const mono = { fontFamily:"'JetBrains Mono', monospace" };
  const card = { background:T.s1, border:`1px solid ${T.bdr}`, borderRadius:10 };

  return (
    <div className="fi" style={{ maxWidth:880, margin:"0 auto", padding:"32px 20px" }}>
      <div style={{ ...mono, fontSize:10, color:T.t3, letterSpacing:".08em", marginBottom:6 }}>DASHBOARD</div>
      <h1 style={{ fontSize:24, fontWeight:700, color:T.t1, marginBottom:4, fontFamily:"'Space Grotesk'" }}>Welcome back</h1>
      <p style={{ fontSize:13, color:T.t2, marginBottom:24 }}>Your Risk, GRC, and Finance learning hub.</p>

      <div style={{ ...card, padding:18, marginBottom:14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ ...mono, fontSize:11, fontWeight:600, color:CL.accent, background:`${CL.accent}12`, padding:"3px 8px", borderRadius:5 }}>
              Lv{LEVELS.indexOf(lv) + 1}
            </span>
            <span style={{ fontSize:13, fontWeight:600, color:T.t1 }}>{lv.name}</span>
          </div>
          <span style={{ ...mono, fontSize:10, color:T.t3 }}>{xp}/{nx?.min || "MAX"}</span>
        </div>
        <div style={{ height:4, background:T.s2, borderRadius:4, overflow:"hidden" }}>
          <div style={{ height:"100%", borderRadius:4, width:`${pct}%`, transition:"width .5s ease", background:`linear-gradient(90deg,${CL.accent},${CL.sky})` }} />
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:24 }}>
        {[
          { l:"Prompts", v:viewed.size },
          { l:"Simulations", v:Object.keys(simDone).length },
          { l:"Study Papers", v:PAPERS.filter(p => p.done > 0).length },
          { l:"XP Total", v:xp },
        ].map((s, i) => (
          <div key={i} style={{ ...card, padding:14, textAlign:"center" }}>
            <div style={{ fontSize:22, fontWeight:700, color:T.t1 }}>{s.v}</div>
            <div style={{ ...mono, fontSize:9, color:T.t3, marginTop:2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ ...card, padding:16, marginBottom:24, borderColor:CL.accent, borderLeftWidth:3 }}>
        <div style={{ fontSize:13, fontWeight:600, color:T.t1, marginBottom:4 }}>Recommended path</div>
        <div style={{ fontSize:12, color:T.t2 }}>
          Try 3 free prompts &#8594; Explore Study System &#8594; Complete 1 simulation &#8594; Upgrade when ready
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
        {[
          { l:"AI Prompts", d:`${PROMPTS.length} with anti-hallucination`, p:"prompts", c:CL.accent },
          { l:"Study System", d:`${PAPERS.length} ACCA papers`, p:"vault", c:CL.green },
          { l:"Sim Lab", d:"3 professional scenarios", p:"simlab", c:CL.pink },
        ].map((n, i) => (
          <button key={i} onClick={() => setPage(n.p)} style={{ ...card, padding:14, textAlign:"left", cursor:"pointer", border:`1px solid ${T.bdr}`, fontFamily:"'Space Grotesk'" }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:n.c, marginBottom:8 }} />
            <div style={{ fontSize:13, fontWeight:600, color:T.t1, marginBottom:2 }}>{n.l}</div>
            <div style={{ fontSize:11, color:T.t3 }}>{n.d}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
