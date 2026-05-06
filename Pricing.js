import React from "react";
import { CL } from "../data/theme";

const TIERS = [
  { n:"Free", p:"$0", pd:"forever", d:"Explore the platform.",
    yes:["6 free prompts","Study System demo","3 free simulation scenarios","Newsletter + XP tracking"],
    no:["Full library","Toolkit templates","Full study editing"],
    cta:"Get Started", primary:false },
  { n:"Pro", p:"$7", pd:"/mo", d:"Core access to everything.",
    yes:["All 18 prompts","Full Study System (all papers)","All simulation phases","Priority support","2 CV reviews/year"],
    no:["Risk Toolkit templates"],
    cta:"Start Free Trial", primary:true, note:"7-day free trial. Cancel anytime." },
  { n:"Premium Toolkit", p:"$24", pd:"one-time", d:"Risk & Audit templates + full Sim Lab.",
    yes:["Everything in Pro","8 Risk Toolkit templates","RACM + fieldwork procedures","Working paper templates","Reporting frameworks","Lifetime updates"],
    no:[],
    cta:"Get Toolkit", primary:false },
];

export default function Pricing({ T }) {
  const mono = { fontFamily:"'JetBrains Mono', monospace" };
  const card = { background:T.s1, border:`1px solid ${T.bdr}`, borderRadius:10 };
  const btnP = { display:"flex", alignItems:"center", justifyContent:"center", width:"100%", padding:"10px", borderRadius:8, fontFamily:"'Space Grotesk'", fontSize:12, fontWeight:600, border:"none", cursor:"pointer", background:CL.accent, color:"#fff" };
  const btnG = { ...btnP, background:"transparent", color:T.t2, border:`1px solid ${T.bdr}` };

  return (
    <div className="fi" style={{ maxWidth:860, margin:"0 auto", padding:"32px 20px" }}>
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <div style={{ ...mono, fontSize:10, color:T.t3, letterSpacing:".08em", marginBottom:6 }}>PRICING</div>
        <h1 style={{ fontSize:24, fontWeight:700, color:T.t1, marginBottom:4, fontFamily:"'Space Grotesk'" }}>Priced for students and early professionals</h1>
        <p style={{ fontSize:13, color:T.t2 }}>Start free. Upgrade when the tools prove their value.</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
        {TIERS.map((tier, i) => (
          <div key={i} style={{
            ...card, padding:20, position:"relative",
            borderColor:tier.primary ? CL.accent : T.bdr,
            boxShadow:tier.primary ? `0 0 0 1px ${CL.accent}` : "none",
          }}>
            {tier.primary && (
              <div style={{
                position:"absolute", top:-9, left:"50%", transform:"translateX(-50%)",
                ...mono, fontSize:9, fontWeight:600, padding:"2px 8px", borderRadius:4,
                background:CL.accent, color:"#fff", letterSpacing:".05em",
              }}>
                BEST VALUE
              </div>
            )}
            <div style={{ fontSize:14, fontWeight:600, color:T.t1, marginBottom:6 }}>{tier.n}</div>
            <div style={{ display:"flex", alignItems:"baseline", gap:2, marginBottom:3 }}>
              <span style={{ fontSize:28, fontWeight:700, color:T.t1 }}>{tier.p}</span>
              <span style={{ fontSize:12, color:T.t3 }}>{tier.pd}</span>
            </div>
            <p style={{ fontSize:11, color:T.t2, marginBottom:14 }}>{tier.d}</p>
            {tier.note && <p style={{ fontSize:10, color:CL.accent, marginBottom:6 }}>{tier.note}</p>}
            <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:14 }}>
              {tier.yes.map((f, j) => (
                <div key={j} style={{ display:"flex", gap:5, fontSize:11, color:T.t1 }}>
                  <span style={{ color:CL.green, fontWeight:700 }}>+</span>{f}
                </div>
              ))}
              {tier.no.map((f, j) => (
                <div key={`n${j}`} style={{ display:"flex", gap:5, fontSize:11, color:T.t3 }}>
                  <span>-</span>{f}
                </div>
              ))}
            </div>
            <button style={tier.primary ? btnP : btnG}>{tier.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
