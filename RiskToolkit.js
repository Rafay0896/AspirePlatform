import React from "react";
import { CL } from "../data/theme";
import { RISK_TOOLKIT } from "../data/simulations";

export default function RiskToolkit({ setShowPay, T }) {
  const mono = { fontFamily:"'JetBrains Mono', monospace" };
  const card = { background:T.s1, border:`1px solid ${T.bdr}`, borderRadius:10 };
  const tag = (color) => ({ ...mono, fontSize:10, fontWeight:500, padding:"3px 8px", borderRadius:4, color, background:`${color}12` });

  return (
    <div className="fi" style={{ maxWidth:880, margin:"0 auto", padding:"32px 20px" }}>
      <div style={{ ...mono, fontSize:10, color:T.t3, letterSpacing:".08em", marginBottom:6 }}>RISK &amp; AUDIT TOOLKIT</div>
      <h1 style={{ fontSize:24, fontWeight:700, color:T.t1, marginBottom:4, fontFamily:"'Space Grotesk'" }}>Big 4-aligned consulting templates</h1>
      <p style={{ fontSize:13, color:T.t2, marginBottom:20 }}>8 components covering the full internal audit lifecycle. KPMG methodology aligned.</p>

      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {RISK_TOOLKIT.map((item, i) => {
          const isLocked = item.tier !== "free";
          const tierColor = item.tier === "free" ? CL.green : item.tier === "pro" ? CL.accent : CL.pink;
          return (
            <div
              key={i}
              style={{ ...card, padding:16, opacity:isLocked ? .85 : 1, cursor:isLocked ? "pointer" : "default" }}
              onClick={() => isLocked && setShowPay(true)}
            >
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:T.t1 }}>{item.title}</span>
                    <span style={tag(tierColor)}>{item.tier.toUpperCase()}</span>
                  </div>
                  <p style={{ fontSize:12, color:T.t2, lineHeight:1.45 }}>{item.desc}</p>
                </div>
                {isLocked && (
                  <span style={{ ...mono, fontSize:10, color:T.t3 }}>Unlock</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
