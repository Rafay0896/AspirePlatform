import React from "react";
import { CL, LEVELS } from "../data/theme";

const NAV_ITEMS = [
  { id:"home", label:"Dashboard" },
  { id:"prompts", label:"Prompts" },
  { id:"vault", label:"Study System" },
  { id:"toolkit", label:"Toolkit" },
  { id:"simlab", label:"Sim Lab" },
  { id:"pricing", label:"Pricing" },
];

export default function Navbar({ page, setPage, xp, isDark, setIsDark, T }) {
  return (
    <nav style={{
      position:"sticky", top:0, zIndex:100,
      background: isDark ? "rgba(11,15,26,.9)" : "rgba(250,251,254,.9)",
      backdropFilter:"blur(12px)",
      borderBottom:`1px solid ${T.bdr}`,
      padding:"0 20px", height:50,
      display:"flex", alignItems:"center", justifyContent:"space-between",
    }}>
      <button
        onClick={() => setPage("home")}
        style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}
      >
        <span style={{ fontSize:14, fontWeight:700, color:T.t1, letterSpacing:".02em", fontFamily:"'Space Grotesk'" }}>RAFAY ASHRAF</span>
        <span style={{ fontSize:11, color:T.t3, fontFamily:"'Space Grotesk'" }}>ACCA</span>
        <span style={{ width:16, height:2, background:CL.pink, display:"inline-block" }} />
      </button>
      <div style={{ display:"flex", alignItems:"center", gap:2 }}>
        {NAV_ITEMS.map(n => (
          <button
            key={n.id}
            onClick={() => setPage(n.id)}
            style={{
              background: page === n.id ? T.s2 : "none",
              border:"none", cursor:"pointer",
              fontSize:12, fontWeight:500,
              color: page === n.id ? T.t1 : T.t3,
              padding:"5px 10px", borderRadius:6,
              transition:"all .15s",
              fontFamily:"'Space Grotesk'",
            }}
          >
            {n.label}
          </button>
        ))}
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            background:"transparent", color:T.t2,
            border:`1px solid ${T.bdr}`,
            padding:"4px 8px", borderRadius:6, fontSize:11,
            cursor:"pointer", fontFamily:"'Space Grotesk'",
            marginLeft:6, fontWeight:500,
          }}
        >
          {isDark ? "Light" : "Dark"}
        </button>
        {xp > 0 && (
          <span style={{ fontFamily:"'JetBrains Mono'", fontSize:10, color:CL.sky, marginLeft:6 }}>
            {xp}xp
          </span>
        )}
      </div>
    </nav>
  );
}
