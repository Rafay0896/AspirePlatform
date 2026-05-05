export const CATS = [
  { id: "risk", label: "Risk & GRC", color: "#D97706" },
  { id: "esg", label: "ESG & Climate", color: "#059669" },
  { id: "reporting", label: "Financial Reporting", color: "#DC2626" },
  { id: "career", label: "Career", color: "#7C3AED" },
  { id: "productivity", label: "Productivity", color: "#1E49E2" },
];

export const PROMPTS = [
  { id:1,c:"risk",f:true,tag:"Advanced",t:"Enterprise Risk Register Builder (COSO 2017)",
    u:"Generates 18+ risks with heat map. Anti-hallucination constraints force industry-specific output with self-validation.",
    pr:"You are a Chief Risk Officer with 15 years in [INDUSTRY]. Build a risk register for a company in [GEOGRAPHY], ~[REVENUE] revenue.\n\nCONSTRAINTS (mandatory):\n- Each risk must include a CONCRETE EXAMPLE of how it manifests in this specific industry\n- All L/I ratings require 1-sentence justification\n- No generic risks (reject \"market risk\" without specifics)\n\nStructure (COSO ERM 2017):\n1. STRATEGIC (5+): threats to strategic objectives\n2. OPERATIONAL (5+): process, people, technology\n3. FINANCIAL (3+): liquidity, credit, market\n4. COMPLIANCE (3+): regulatory, legal, contractual\n5. EMERGING (2+): AI governance, ESG, cyber\n\nPer risk: ID | Description with example | Inherent L(1-5) with justification | Inherent I(1-5) with justification | Controls | Residual | Owner (role) | Mitigation with timeline\n\nOUTPUT: 5x5 heat map + risk register table\n\nVALIDATION: Before output verify (a) no duplicate descriptions (b) all ratings justified (c) mitigations have timelines",
    why:"Self-validation step catches the most common AI failure: duplicate generic risks. The concrete example requirement eliminates vague output." },

  { id:2,c:"risk",f:false,tag:"Premium",t:"Risk & Control Matrix (KIAM-Aligned RACM)",
    u:"End-to-end process-to-test mapping. Mirrors KPMG KIAM Section 6.4 methodology.",
    pr:"Design RACM for [PROCESS] at [COMPANY] in [INDUSTRY]. Min 12 rows.\n\nPer row: Process Step | Risk (with $ or ops impact) | Category | Control (WHO does WHAT WHEN HOW) | Type (Prev/Det + Manual/Auto/ITDM) | Objective | Test (sample size + method + steps) | Evidence\n\nCONSTRAINT: Only reference controls that exist in standard ERP systems (SAP, Oracle) or realistic manual procedures.",
    why:"Anti-hallucination: prevents AI from inventing controls that don't exist in practice." },

  { id:3,c:"risk",f:true,tag:"Advanced",t:"Audit Finding Writer (CCER + Calibrated Severity)",
    u:"Board-ready findings with severity calibration that prevents the common error of over-rating everything as High.",
    pr:"Draft finding for [PROCESS] at [COMPANY].\n\nIssue: [DESCRIBE 2-3 FACTUAL SENTENCES]\nStandard: [REFERENCE]\n\nCCER:\n- CONDITION: Observable facts only. Dates, amounts, frequencies.\n- CRITERIA: Specific standard clause. If none, cite industry practice with source.\n- CAUSE: Systemic root cause (not blame). Consider: process gap, resource, system, governance.\n- EFFECT: Quantify as $ / hours / regulatory exposure / reputation.\n- RECOMMENDATION: (a) specific (b) assigned to role (c) 90-day implementable (d) testable in follow-up\n\nSEVERITY:\n- Critical = threatens strategic objectives or regulatory compliance\n- High = material financial/operational impact\n- Medium = improvement opportunity\n- Low = enhancement\n\nProvide 2-sentence justification for severity chosen.",
    why:"Severity calibration prevents over-rating. CCER with constraints produces partner-review-ready output." },

  { id:4,c:"risk",f:false,tag:"Premium",t:"ISO 31000 Maturity Gap Analysis",
    u:"Structured maturity assessment with evidence-based ratings and remediation roadmap.",
    pr:"Gap analysis against ISO 31000:2018.\n\nCurrent state: [DESCRIBE IN 3-5 SENTENCES]\n\nFor each of 8 elements (Leadership, Integration, Design, Implementation, Evaluation, Improvement, Risk Assessment, Risk Treatment):\n1. Maturity (1-5)\n2. Evidence\n3. Gap\n4. Action + owner\n5. Priority\n6. Timeline\n\nCONSTRAINT: If insufficient info to rate, state 'Cannot rate' rather than guessing.",
    why:"Forces intellectual honesty over plausible-sounding fabrication." },

  { id:5,c:"risk",f:false,tag:"Premium",t:"Three Lines Model Governance Assessment",
    u:"IIA 2020 standard (not deprecated Three Lines of Defence). 5 specific recommendations.",
    pr:"Assess governance against IIA Three Lines Model (2020, not deprecated version).\n\nContext: [SIZE, INDUSTRY, STRUCTURE]\n\nEvaluate: role clarity, independence, coordination, reporting, gaps.\n5 recommendations referencing 2020 IIA Position Paper.",
    why:"Catches AI models still referencing the deprecated framework." },

  { id:6,c:"esg",f:true,tag:"Advanced",t:"Double Materiality Assessment Engine",
    u:"15-topic matrix with framework mapping. Replaces a $20K+ consulting engagement.",
    pr:"Double materiality for [INDUSTRY] in [GEOGRAPHY], [EMPLOYEES] employees, ~[REVENUE] revenue.\n\n1. 15 ESG topics (GRI Universal Standards 2021 + ISSB S1/S2)\n2. Rate impact materiality (1-5) and financial materiality (1-5) with 1-sentence justification each\n3. Map to quadrants: High-High / High Impact / High Financial / Low-Low\n4. Top 5 for immediate action\n5. Framework mapping (GRI number, ISSB paragraph, TCFD pillar, CDP section)\n6. 90-day data collection plan\n\nVALIDATION: Verify all GRI standard numbers are real.",
    why:"Validation catches hallucinated GRI standard numbers, the most common ESG prompt error." },

  { id:7,c:"esg",f:false,tag:"Premium",t:"ISSB S1/S2 Readiness Checker",
    u:"Gap assessment against mandatory IFRS sustainability standards.",
    pr:"Review disclosures against IFRS S1 and S2.\n\nAssess: Governance, Strategy, Risk management, Metrics/targets.\nRate: Fully / Partially / Not Disclosed.\nTop 5 gaps with remediation steps and effort estimates.",
    why:"Catches disclosure gaps before external assurance identifies them." },

  { id:8,c:"esg",f:false,tag:"Premium",t:"TCFD Climate Scenario Analysis",
    u:"Three-scenario analysis with financial impact assessment aligned to TCFD pillars.",
    pr:"Climate scenarios for [COMPANY] in [INDUSTRY]:\n1. Orderly 1.5C | 2. Disorderly <2C | 3. Hot house 3C+\n\nPer scenario: physical risks (acute + chronic), transition risks (policy, tech, market, reputation), opportunities, financial impact (revenue, costs, assets), time horizon (short/medium/long).\n\nFormat as TCFD-aligned table.",
    why:"Structures the hardest part of climate disclosure into a usable framework." },

  { id:9,c:"reporting",f:true,tag:"Advanced",t:"IFRS 16 Disclosure Drafter",
    u:"Complete lease disclosures with cross-references to specific IFRS 16 paragraphs.",
    pr:"IFRS 16 for [COMPANY], year ended [DATE].\n\nPortfolio: Property [N] avg [X]yr, Vehicles [N], Equipment [N].\n\n1. Accounting policy (entity-specific)\n2. ROU schedule: Opening | Additions | Depreciation | Impairment | Closing\n3. Maturity: <1yr | 1-5yr | >5yr | Undiscounted total | Finance cost adj | PV\n4. P&L: Depreciation | Interest | Short-term | Low-value\n5. Cash flow: Principal (financing) | Interest\n6. Judgements: IBR method | Term assessment | Extensions\n\nCross-ref IFRS 16.47, 16.53, 16.58.\n\nVALIDATION: Verify undiscounted total minus finance cost = PV of liabilities.",
    why:"Mathematical validation catches the most common AI error in lease disclosures: inconsistent totals." },

  { id:10,c:"reporting",f:false,tag:"Premium",t:"IFRS 9 Expected Credit Loss Model",
    u:"Simplified ECL with provision matrix and IFRS 7 disclosures.",
    pr:"IFRS 9 ECL for [COMPANY] receivables.\n\nPortfolio: [BALANCE], [CUSTOMER TYPE], [GEOGRAPHY].\n\n1. Provision matrix (aging buckets)\n2. Historical default rates\n3. Forward-looking adjustment (GDP, industry, concentration)\n4. ECL calculation\n5. Assumptions documented\n6. IFRS 7.35F-35N disclosures",
    why:"Embeds exact IFRS 7 paragraph references that auditors check." },

  { id:11,c:"reporting",f:false,tag:"Advanced",t:"Variance Analysis with RAG Status",
    u:"Management reporting with root cause classification and forecast impact.",
    pr:"Variance for [COMPANY], [PERIOD].\n\n[PASTE BUDGET vs ACTUAL]\n\nPer variance >5%: amount, %, root cause (volume/price/timing/one-off/FX), controllable or external?, action + owner, forecast impact.\n\nFormat: RAG-rated management report. Narrative for top 5.",
    why:"RAG forces prioritisation over exhaustive listing." },

  { id:12,c:"career",f:true,tag:"Advanced",t:"Big 4 ATS CV Rewriter",
    u:"Reverse-engineers Big 4 application tracking filters. Highlights all changes for user review.",
    pr:"Rewrite CV for [ROLE] at [FIRM] in [GEOGRAPHY]:\n\n[PASTE CV]\n\n1. ATS KEYWORDS: IFRS, ISA, SOX, ERM, COSO, GRC, data analytics, stakeholder management, risk assessment, controls testing\n2. IMPACT REWRITE: [Strong verb] + [Specific deliverable] + [Quantified outcome with $ or %]\n3. Remove: passive voice, job-description language, vague adjectives\n4. Professional summary: 3 lines aligned to [FIRM] values\n5. Format: single-column, no graphics, 1-2 pages, 10-11pt\n6. Generate 5 keywords from current [FIRM] postings\n\nOUTPUT: Highlight all changes in [BRACKETS] for user review.",
    why:"Bracket-highlighting prevents blind trust in AI output. Keyword list is based on actual ATS filter analysis." },

  { id:13,c:"career",f:false,tag:"Premium",t:"10 STAR Interview Answers",
    u:"Quantified competency answers tailored to your background and target firm.",
    pr:"10 STAR answers for [ROLE] at [FIRM].\n\nBackground: [2-3 SENTENCE SUMMARY]\n\nQuestions: yourself, stakeholder mgmt, deadline pressure, risk identification, team leadership, ambiguity, senior disagreement, technology, why firm, 5-year vision.\n\nPer answer: Situation (2 specific sentences) | Task (1) | Action (3-4 YOUR actions) | Result (quantified).\n\nNo generic responses. Draw from [BACKGROUND].",
    why:"Forces quantification in every result statement. The specificity instruction catches vague AI defaults." },

  { id:14,c:"career",f:false,tag:"Premium",t:"GCC Salary Negotiation Brief",
    u:"Market benchmarks, counter-offer strategy, and walk-away threshold for Gulf roles.",
    pr:"Brief for [ROLE] at [COMPANY] in [GCC COUNTRY], offered [SALARY].\n\nProfile: [QUALIFICATION], [X] years, [CURRENT FIRM].\n\n1. Market benchmark (low/mid/high)\n2. Total comp beyond base: housing, flights, education, gratuity, medical, leave\n3. Cost-of-living comparison adjusted for tax-free income\n4. 3 talking points from my profile\n5. Counter-offer: what number and why\n6. Walk-away threshold\n7. Non-monetary items if salary is fixed",
    why:"Provides data leverage that candidates from Pakistan/South Asia typically lack in Gulf negotiations." },

  { id:15,c:"productivity",f:true,tag:"Advanced",t:"MECE Problem Structuring Engine",
    u:"Turns any ambiguous problem into a prioritised issue tree with 4-week workplan.",
    pr:"You are an MBB strategy consultant. Structure this problem using MECE:\n\n\"[PROBLEM IN 2-3 SENTENCES]\"\n\n1. Restate as testable hypothesis\n2. 3-4 MECE buckets (first level)\n3. Per bucket: 2-3 sub-issues (second level)\n4. Per sub-issue: data source, analysis method, owner\n5. Priority: which bucket first and why\n6. Quick wins: answers within 48 hours\n\nOutput: Issue tree + 4-week workplan with milestones.\n\nCONSTRAINT: Self-test buckets against MECE before output. If overlap exists, restructure.",
    why:"Self-test forces logical validation. Most AI issue trees fail the 'mutually exclusive' test without this." },

  { id:16,c:"productivity",f:true,tag:"Advanced",t:"Meeting Notes to Action Tracker",
    u:"60-second conversion of raw notes to structured tracker with owners and deadlines.",
    pr:"Convert to structured tracker:\n\nMeeting: [NAME] | Date: [DATE] | Attendees: [LIST]\n\n[PASTE RAW NOTES]\n\nExtract:\n1. Key decisions (numbered, with decision-maker)\n2. Actions: # | Action | Owner | Deadline | Priority | Dependencies\n3. Open questions (with suggested owner)\n4. Risks or concerns flagged\n5. Next meeting date and agenda items\n\nRules: If deadline unstated, suggest one. If owner unassigned, flag 'TBD'.",
    why:"Saves 30+ minutes per meeting for every professional. The deadline-suggestion rule catches the most common tracker gap." },

  { id:17,c:"productivity",f:false,tag:"Premium",t:"Executive Summary Generator",
    u:"One-page C-suite summary where every sentence earns its place.",
    pr:"Executive summary for [PROJECT TYPE] at [CLIENT].\n\nContext: [2-3 SENTENCES]\nFindings: [3-5 BULLETS]\nRecommendations: [3-5 BULLETS]\n\n1. Strategic headline (the 'so what')\n2. Context (3-4 sentences)\n3. Findings as insights (each must imply action)\n4. Recommendations in priority order with owner and deadline\n5. Next steps and escalation path\n\nMax 1 page. 3-minute read for C-suite.",
    why:"The 'every sentence earns its place' constraint produces tight, executive-grade output." },

  { id:18,c:"productivity",f:false,tag:"Premium",t:"Stakeholder Influence Mapper",
    u:"Power/Interest matrix with engagement strategy and escalation paths.",
    pr:"Stakeholder map for [PROJECT].\n\nKey stakeholders: [LIST ROLES]\nObjective: [WHAT]\nTimeline: [WHEN]\n\n1. Power vs Interest matrix (4 quadrants with names)\n2. Per stakeholder: influence level, attitude (supportive/neutral/resistant), engagement strategy\n3. Communication plan: who, what, how often, channel\n4. Risk: who could block progress and specific mitigation\n5. Quick win: easiest stakeholder to get onside first\n6. Escalation path if key stakeholder becomes resistant",
    why:"Prevents the #1 cause of project failure: missed or mismanaged stakeholders." },
];
