import React, { useState } from "react";
import { CL } from "../data/theme";
import { CATS, PROMPTS } from "../data/prompts";

export default function PromptLibrary({ viewed, onView, setShowPay, T }) {
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState(null);
  const [copied, setCopied] = useState(null);

  const filtered = cat === "all" ? PROMPTS : PROMPTS.filter(p => p.c === cat);
  const mono = { fontFamily:"'JetBrains Mono', monospace" };
  const card = { background:T.s1, border:`1px solid ${T.bdr}`, borderRadius:10, transition:"border-color .15s" };
  const tag = (color, bg) => ({ ...mono, fontSize:10, fontWeight:500, padding:"3px 8px", borderRadius:4, letterSpacing:".03em", color, background: bg || `${color}12` });

  return (
    <div className="fi" style={{ maxWidth:1000, margin:"0 auto", padding:"32px 20px" }}>
      <div style={{ ...mono, fontSize:10, color:T.t3, letterSpacing:".08em", marginBottom:6 }}>AI PROMPT LIBRARY</div>
      <h1 style={{ fontSize:24, fontWeight:700, color:T.t1, marginBottom:4, fontFamily:"'Space Grotesk'" }}>
        {PROMPTS.length} prompts for Risk, GRC, Audit &amp; Finance
      </h1>
      <p style={{ fontSize:13, color:T.t2, marginBottom:18 }}>
        Each includes anti-hallucination constraints and self-validation. +2 XP per prompt explored.
      </p>

      <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:18 }}>
        <button
          onClick={() => { setCat("all"); setOpen(null); }}
          style={{ ...tag(cat === "all" ? "#fff" : T.t2, cat === "all" ? CL.accent : T.s2), border:"none", cursor:"pointer", padding:"6px 12px", borderRadius:6, fontSize:11 }}
        >
          All ({PROMPTS.length})
        </button>
        {CATS.map(c => (
          <button
            key={c.id}
            onClick={() => { setCat(c.id); setOpen(null); }}
            style={{ ...tag(cat === c.id ? "#fff" : T.t2, cat === c.id ? c.color : T.s2), border:"none", cursor:"pointer", padding:"6px 12px", borderRadius:6, fontSize:11 }}
          >
            {c.label} ({PROMPTS.filter(p => p.c === c.id).length})
          </button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(310px, 1fr))", gap:8 }}>
        {filtered.map(p => {
          const c = CATS.find(x => x.id === p.c);
          const isOpen = open === p.id;
          return (
            <div
              key={p.id}
              style={{ ...card, padding:16, cursor:"pointer", borderColor: isOpen ? CL.accent : T.bdr }}
              onClick={() => {
                setOpen(isOpen ? null : p.id);
                if (!viewed.has(p.id)) onView(p.id);
              }}
            >
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={tag(c?.color)}>{c?.label}</span>
                <div style={{ display:"flex", gap:3 }}>
                  <span style={tag(p.tag === "Premium" ? CL.pink : CL.sky)}>
                    {p.tag}
                  </span>
                  <span style={tag(p.f ? CL.green : T.t3, p.f ? `${CL.green}12` : T.s2)}>
                    {p.f ? "FREE" : "PRO"}
                  </span>
                </div>
              </div>
              <h3 style={{ fontSize:13, fontWeight:600, color:T.t1, marginBottom:4, lineHeight:1.3 }}>{p.t}</h3>
              <p style={{ fontSize:11, color:T.t3, lineHeight:1.4 }}>{p.u}</p>

              {isOpen && (
                <div style={{ marginTop:10 }} onClick={e => e.stopPropagation()}>
                  {p.f ? (
                    <div>
                      <pre style={{
                        fontFamily:"'JetBrains Mono'", fontSize:11, lineHeight:1.5,
                        whiteSpace:"pre-wrap", color:T.t2,
                        background:T.bg, border:`1px solid ${T.bdr}`,
                        borderRadius:8, padding:12, marginBottom:6,
                      }}>
                        {p.pr}
                      </pre>
                      {p.why && (
                        <details style={{ marginBottom:6 }}>
                          <summary style={{ fontSize:11, color:CL.accent, fontWeight:500, fontFamily:"'Space Grotesk'" }}>
                            Why this works
                          </summary>
                          <p style={{ fontSize:11, color:T.t2, lineHeight:1.5, marginTop:4, paddingLeft:10, borderLeft:`2px solid ${CL.accent}` }}>
                            {p.why}
                          </p>
                        </details>
                      )}
                      <button
                        style={{
                          display:"flex", alignItems:"center", justifyContent:"center",
                          width:"100%", padding:"10px", borderRadius:8,
                          background:CL.accent, color:"#fff",
                          border:"none", cursor:"pointer",
                          fontSize:12, fontWeight:600, fontFamily:"'Space Grotesk'",
                        }}
                        onClick={() => {
                          navigator.clipboard?.writeText(p.pr);
                          setCopied(p.id);
                          setTimeout(() => setCopied(null), 2000);
                        }}
                      >
                        {copied === p.id ? "Copied!" : "Copy Prompt"}
                      </button>
                    </div>
                  ) : (
                    <div style={{ background:T.s2, borderRadius:8, padding:16, textAlign:"center" }}>
                      <p style={{ fontSize:12, fontWeight:600, color:T.t1, marginBottom:3 }}>Pro content</p>
                      <p style={{ fontSize:11, color:T.t3, marginBottom:10 }}>{p.u}</p>
                      <button
                        onClick={() => setShowPay(true)}
                        style={{
                          padding:"8px 20px", borderRadius:8,
                          background:CL.accent, color:"#fff",
                          border:"none", cursor:"pointer",
                          fontSize:12, fontWeight:600, fontFamily:"'Space Grotesk'",
                        }}
                      >
                        Unlock
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
