export const SIMS = [
  { id:"ia", title:"Internal Audit: Scope Creep", sub:"KPMG-style engagement", icon:"IA",
    scenario:"You are the Engagement Manager for an internal audit of the Procure-to-Pay (P2P) process at a mid-size manufacturing company in Bahrain. The CFO has raised concerns about unauthorised purchases exceeding budget approvals. Your team of 3 starts fieldwork on Monday.",
    terms:["P2P","RACM"],
    q:"The CFO asks you to also review the entire finance function. Your original scope is P2P only. What do you do?",
    opts:[
      { text:"Accept the expanded scope to maintain the client relationship", fb:"Risky. Scope creep without resource adjustment leads to quality issues and violates engagement management principles. The correct approach is to assess impact before responding.", xp:3, ok:false },
      { text:"Document the request, assess timeline and resource impact, discuss with the Engagement Leader before responding to the CFO", fb:"Correct. Scope changes must be formally assessed, documented, and approved through the proper governance chain. This protects quality while showing the client you take their concerns seriously.", xp:20, ok:true },
      { text:"Decline outright and explain you can only cover P2P", fb:"Too rigid. While protecting scope matters, outright refusal without analysis damages the client relationship. Assess first, then discuss professionally.", xp:5, ok:false },
    ]},
  { id:"ea", title:"External Audit: Revenue Fraud Indicators", sub:"Big 4 listed company audit", icon:"EA",
    scenario:"You are the audit senior on a listed company engagement. During substantive testing of revenue, you identify a $2.4M journal entry posted on the last day of the reporting period. No supporting documentation exists. The entry increases reported revenue by 8%.",
    terms:["ISA 240","TCWG"],
    q:"You have identified the unsupported $2.4M journal entry. What is your immediate next step?",
    opts:[
      { text:"Ask the client finance team to provide supporting documentation", fb:"Partially correct but insufficient. Before approaching the client, you must first assess fraud risk indicators per ISA 240 and escalate to the engagement partner. Approaching the client first could compromise evidence.", xp:8, ok:false },
      { text:"Document the finding, assess fraud risk indicators per ISA 240, and escalate to the engagement partner immediately", fb:"Correct. An unsupported journal entry of this magnitude on the last day of the period is a fraud risk indicator. ISA 240 requires immediate escalation. Documentation preserves audit evidence before any client interaction.", xp:20, ok:true },
      { text:"Extend your sample size to test more journal entries before escalating", fb:"Valid audit response but misses the critical step. Before extending testing, you must assess whether this is a potential fraud indicator. ISA 240 requires escalation before additional procedures.", xp:8, ok:false },
    ]},
  { id:"pro", title:"Professional Judgement: Client Pressure", sub:"Fieldwork scenario", icon:"PJ",
    scenario:"During fieldwork at a retail client, the Finance Director tells you privately: 'Our bonus depends on hitting revenue targets. I need you to be reasonable about the cut-off testing. A few days either way should not matter for your audit.' The cut-off testing has revealed transactions dated in January that were recorded in December.",
    terms:["TCWG"],
    q:"How do you respond to the Finance Director's request?",
    opts:[
      { text:"Accommodate the request since it is only a few days and the amounts may be immaterial", fb:"Professional failure. Regardless of materiality, accommodating a request to overlook misstatements compromises independence and violates ISA 700. The intent behind the request (bonus motivation) is itself a fraud risk indicator.", xp:3, ok:false },
      { text:"Politely but firmly explain that cut-off testing must follow ISA standards, document the conversation, and report to the engagement partner as a potential management bias indicator", fb:"Correct. You must maintain professional scepticism, document the interaction as it reveals potential management bias (ISA 240), and escalate. Being professional does not mean being confrontational, but it does mean being clear.", xp:20, ok:true },
      { text:"Ignore the comment and continue testing normally without documenting it", fb:"Dangerous omission. The Finance Director's comment is evidence of management attitude and potential bias. ISA 240 requires documentation of fraud risk indicators. Failing to document could be a professional conduct issue.", xp:5, ok:false },
    ]},
];

export const RISK_TOOLKIT = [
  { title:"Risk Universe Template", desc:"Map all auditable entities across 4 quadrants: Core Ops, External, Emerging, Business Change. KIAM Section 3.2 aligned.", tier:"free" },
  { title:"Risk Assessment Framework", desc:"5x5 matrix with defined likelihood and impact scales. Inherent to residual methodology with control effectiveness overlay.", tier:"free" },
  { title:"Risk & Control Matrix (RACM)", desc:"Process-to-risk-to-control-to-test mapping. 8-column professional template. KIAM Section 6.4.", tier:"pro" },
  { title:"Audit Planning Checklist", desc:"10-item pre-engagement checklist: ToR, scope, resources, prior findings, data analytics. KIAM Section 5.", tier:"pro" },
  { title:"Fieldwork Procedures Library", desc:"Test procedures for P2P, O2C, R2R, HR/Payroll, ITGC, Treasury. Sample sizes and evidence requirements.", tier:"toolkit" },
  { title:"Working Paper Templates", desc:"6-section structure: Purpose, Population, Sample, Testing, Exceptions, Conclusion. KIAM Section 6.5.1.", tier:"toolkit" },
  { title:"Observation & Change Log", desc:"Real-time issue tracking: reference, date, severity, auditee notified, management response, status.", tier:"toolkit" },
  { title:"Reporting Templates", desc:"Executive summary, scope, assurance rating (Green/Amber-Green/Amber-Red/Red), CCER findings, management action plan.", tier:"toolkit" },
];
