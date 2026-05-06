export const CATEGORIES = [
  { id: 'risk', label: 'Risk & GRC', color: '#D97706' },
  { id: 'esg', label: 'ESG & Climate', color: '#059669' },
  { id: 'reporting', label: 'Financial Reporting', color: '#DC2626' },
  { id: 'career', label: 'Career', color: '#7C3AED' },
  { id: 'productivity', label: 'Productivity', color: '#1E49E2' },
];

export const PROMPTS = [
  {
    id: 1, cat: 'risk', free: true, tag: 'Advanced',
    title: 'Enterprise Risk Register Builder (COSO 2017)',
    use: 'Generates 18+ risks with heat map. Anti-hallucination constraints force industry-specific output with self-validation.',
    prompt: `You are a Chief Risk Officer with 15 years in [INDUSTRY]. Build a risk register for a company in [GEOGRAPHY], ~[REVENUE] revenue.

CONSTRAINTS (mandatory):
- Each risk must include a CONCRETE EXAMPLE of how it manifests in this specific industry
- All L/I ratings require 1-sentence justification
- No generic risks (reject "market risk" without specifics)

Structure (COSO ERM 2017):
1. STRATEGIC (5+): threats to strategic objectives
2. OPERATIONAL (5+): process, people, technology
3. FINANCIAL (3+): liquidity, credit, market
4. COMPLIANCE (3+): regulatory, legal, contractual
5. EMERGING (2+): AI governance, ESG, cyber

Per risk: ID | Description with example | Inherent L(1-5) with justification | Inherent I(1-5) with justification | Controls | Residual | Owner (role) | Mitigation with timeline

OUTPUT: 5x5 heat map + risk register table

VALIDATION: Before output verify (a) no duplicate descriptions (b) all ratings justified (c) mitigations have timelines`,
    why: 'Self-validation step catches the most common AI failure: duplicate generic risks. The concrete example requirement eliminates vague output.',
  },
  {
    id: 2, cat: 'risk', free: false, tag: 'Premium',
    title: 'Risk & Control Matrix (KIAM-Aligned RACM)',
    use: 'End-to-end process-to-test mapping. Mirrors KPMG KIAM Section 6.4.',
    prompt: `Design RACM for [PROCESS] at [COMPANY] in [INDUSTRY]. Min 12 rows.

Per row: Process Step | Risk (with $ or ops impact) | Category | Control (WHO does WHAT WHEN HOW) | Type (Prev/Det + Manual/Auto/ITDM) | Objective | Test (sample size + method + steps) | Evidence

CONSTRAINT: Only reference controls that exist in standard ERP systems (SAP, Oracle) or realistic manual procedures.`,
    why: 'Anti-hallucination: prevents AI from inventing controls.',
  },
  {
    id: 3, cat: 'risk', free: true, tag: 'Advanced',
    title: 'Audit Finding Writer (CCER + Calibrated Severity)',
    use: 'Board-ready findings with severity calibration that prevents over-rating.',
    prompt: `Draft finding for [PROCESS] at [COMPANY].

Issue: [DESCRIBE 2-3 FACTUAL SENTENCES]
Standard: [REFERENCE]

CCER:
- CONDITION: Observable facts only. Dates, amounts, frequencies.
- CRITERIA: Specific standard clause. If none, cite industry practice with source.
- CAUSE: Systemic root cause (not blame). Consider: process gap, resource, system, governance.
- EFFECT: Quantify as $ / hours / regulatory exposure / reputation.
- RECOMMENDATION: (a) specific (b) assigned to role (c) 90-day implementable (d) testable in follow-up

SEVERITY:
- Critical = threatens strategic objectives or regulatory compliance
- High = material financial/operational impact
- Medium = improvement opportunity
- Low = enhancement

Provide 2-sentence justification for severity chosen.`,
    why: 'Severity calibration prevents over-rating. CCER with constraints produces partner-review-ready output.',
  },
  {
    id: 4, cat: 'risk', free: false, tag: 'Premium',
    title: 'ISO 31000 Maturity Gap Analysis',
    use: 'Structured maturity assessment with evidence-based ratings.',
    prompt: `Gap analysis against ISO 31000:2018. Assess 8 elements: Leadership, Integration, Design, Implementation, Evaluation, Improvement, Risk Assessment Process, Risk Treatment.

Per element: Maturity (1-5 with defined criteria) | Evidence required | Gap | Action (with role) | Priority | Timeline

CONSTRAINT: If insufficient info provided by user, state "Cannot rate - insufficient data" rather than guessing.`,
    why: 'Forces intellectual honesty over plausible fabrication.',
  },
  {
    id: 5, cat: 'risk', free: false, tag: 'Premium',
    title: 'Three Lines Model Governance Assessment',
    use: 'IIA 2020 standard (not deprecated Three Lines of Defence).',
    prompt: `Assess governance against IIA Three Lines Model 2020.

Context: [SIZE], [INDUSTRY], [STRUCTURE]

Evaluate: First Line (management risk ownership), Second Line (risk/compliance challenge), Third Line (IA independence).

Assess: role clarity, independence, coordination, reporting, gaps. 5 recommendations.

NOTE: Reference 2020 IIA Position Paper, not outdated materials.`,
    why: 'Catches AI models still referencing the deprecated framework.',
  },
  {
    id: 6, cat: 'esg', free: true, tag: 'Advanced',
    title: 'Double Materiality Assessment Engine',
    use: '15-topic matrix with framework mapping. Replaces a $20K consulting engagement.',
    prompt: `Double materiality for [INDUSTRY] in [GEOGRAPHY], [EMPLOYEES] employees, ~[REVENUE] revenue.

1. Identify 15 ESG topics (GRI Universal 2021 + ISSB S1/S2)
2. Rate impact materiality (1-5) and financial materiality (1-5) with justification
3. Map to quadrants: High-High (Report+Act), High Impact (Report), High Financial (Monitor), Low-Low (Track)
4. Top 5 for immediate action
5. Framework mapping: GRI standard number, ISSB paragraph, TCFD pillar, CDP section
6. 90-day data collection plan

VALIDATION: Verify GRI standard numbers are real. No topic in multiple quadrants.`,
    why: 'Validation catches hallucinated GRI numbers.',
  },
  {
    id: 7, cat: 'esg', free: false, tag: 'Premium',
    title: 'ISSB S1/S2 Readiness Checker',
    use: 'Gap assessment against mandatory sustainability standards.',
    prompt: `Review disclosures against IFRS S1 and S2. Assess: Governance, Strategy, Risk management, Metrics & targets. Rate: Fully/Partially/Not Disclosed. Top 5 gaps with remediation steps and effort estimate.`,
    why: 'Catches gaps before external assurance.',
  },
  {
    id: 8, cat: 'esg', free: false, tag: 'Premium',
    title: 'TCFD Climate Scenario Analysis',
    use: 'Three-scenario analysis with financial impact assessment.',
    prompt: `Climate scenarios for [COMPANY] in [INDUSTRY]: Orderly 1.5C, Disorderly <2C, Hot house 3C+. Per scenario: physical risks (acute+chronic), transition risks (policy, tech, market, reputation), opportunities, financial impact (revenue, costs, assets, capital), time horizon (short <3yr, medium 3-10, long 10-30).`,
    why: 'Structures the hardest part of climate disclosure.',
  },
  {
    id: 9, cat: 'reporting', free: true, tag: 'Advanced',
    title: 'IFRS 16 Disclosure Drafter',
    use: 'Complete lease disclosures with cross-references to specific paragraphs.',
    prompt: `IFRS 16 for [COMPANY], year ended [DATE]. Portfolio: Property [N] avg [X]yr, Vehicles [N], Equipment [N].

1. Accounting policy (entity-specific, not boilerplate)
2. ROU asset movement: Opening | Additions | Depreciation | Impairment | Closing
3. Lease liability maturity: <1yr | 1-5yr | >5yr | Total undiscounted | Finance cost adj | PV
4. P&L: Depreciation | Interest | Short-term | Low-value
5. Cash flow: Principal (financing) | Interest (operating/financing)
6. Judgements: IBR method | Term assessment | Extension evaluation

Cross-ref: IFRS 16.47, 16.53, 16.58.

VALIDATION: Sum undiscounted - finance cost adjustment = PV of liabilities.`,
    why: 'Mathematical validation catches inconsistent totals.',
  },
  {
    id: 10, cat: 'reporting', free: false, tag: 'Premium',
    title: 'IFRS 9 Expected Credit Loss Model',
    use: 'Simplified ECL with provision matrix and IFRS 7 disclosures.',
    prompt: `ECL for [COMPANY] receivables. Portfolio [BALANCE], [CUSTOMER TYPE], [GEOGRAPHY]. Build: provision matrix (aging buckets), historical default rates, forward-looking adjustment (GDP, industry), ECL by bucket, assumptions, IFRS 7.35F-35N disclosures.`,
    why: 'Embeds exact IFRS 7 paragraph references.',
  },
  {
    id: 11, cat: 'reporting', free: false, tag: 'Advanced',
    title: 'Variance Analysis with RAG Status',
    use: 'Management reporting with root cause classification.',
    prompt: `Variance for [COMPANY], [PERIOD]. [PASTE BUDGET vs ACTUAL]. Per line >5%: amount, root cause (volume/price/timing/one-off/FX), controllable or external, action + owner, forecast impact if trend continues. RAG status per line. Top 5 narrative.`,
    why: 'RAG forces prioritisation over exhaustive listing.',
  },
  {
    id: 12, cat: 'career', free: true, tag: 'Advanced',
    title: 'Big 4 ATS CV Rewriter',
    use: 'Reverse-engineers application tracking filters.',
    prompt: `Rewrite CV for [ROLE] at [FIRM] in [GEOGRAPHY]: [PASTE CV]

1. ATS keywords: IFRS, ISA, SOX, ERM, COSO, GRC, data analytics, stakeholder management
2. Impact bullets: [Strong verb] + [Specific deliverable] + [Quantified outcome with $ or %]
3. Remove: passive voice, job-description language, vague adjectives
4. Professional summary: 3 lines aligned to [FIRM] published values
5. Format: single-column, no graphics, 1-2 pages, 10-11pt
6. Generate 5 keywords from current [FIRM] job postings

OUTPUT: Highlight all changes in [BRACKETS] for user review.`,
    why: 'Bracket-highlighting prevents blind trust in AI output.',
  },
  {
    id: 13, cat: 'career', free: false, tag: 'Premium',
    title: '10 STAR Interview Answers',
    use: 'Quantified competency answers for Big 4 interviews.',
    prompt: `10 STAR answers for [ROLE] at [FIRM]. Background: [SUMMARY]. Questions: yourself, stakeholder mgmt, deadline pressure, risk identification, team leadership, ambiguity, senior disagreement, technology, why firm, 5-year plan. Per answer: S(2 specific sentences) T(1) A(3-4 YOUR actions) R(quantified).`,
    why: 'Forces quantification in every result.',
  },
  {
    id: 14, cat: 'career', free: false, tag: 'Premium',
    title: 'GCC Salary Negotiation Brief',
    use: 'Market data and counter-offer strategy for Gulf roles.',
    prompt: `Brief for [ROLE] at [COMPANY] in [GCC COUNTRY] offered [SALARY]. Profile: [QUALIFICATION], [X] years. Generate: market benchmark (low/mid/high), total comp beyond base, cost-of-living comparison (tax-free adjusted), 3 talking points, counter strategy with number, walk-away threshold, non-monetary items.`,
    why: 'Provides data leverage candidates typically lack.',
  },
  {
    id: 15, cat: 'productivity', free: true, tag: 'Advanced',
    title: 'MECE Problem Structuring Engine',
    use: 'Turns any problem into a prioritised issue tree.',
    prompt: `You are an MBB consultant. Structure this: "[PROBLEM IN 2-3 SENTENCES]"

1. Restate as testable hypothesis
2. Break into 3-4 MECE buckets
3. Per bucket: 2-3 sub-issues
4. Per sub-issue: data source, analysis method, owner
5. Priority bucket (with justification)
6. Quick wins (48-hour answers)

Output: issue tree + 4-week workplan with milestones.

CONSTRAINT: Self-test buckets against MECE criteria before output. Restructure if any overlap detected.`,
    why: 'Self-test forces logical validation.',
  },
  {
    id: 16, cat: 'productivity', free: true, tag: 'Advanced',
    title: 'Meeting Notes to Action Tracker',
    use: '60-second conversion with owners and deadlines.',
    prompt: `Convert notes: Meeting [NAME] | [DATE] | [ATTENDEES]

[PASTE NOTES]

Output: 1. Decisions (numbered, decision-maker) 2. Actions: # | Action | Owner | Deadline | Priority | Dependencies 3. Open questions (with suggested owner) 4. Risks flagged 5. Next meeting agenda

If deadline unstated, suggest one. If owner unassigned, flag "TBD - assign by [DATE]".`,
    why: 'Saves 30+ minutes per meeting.',
  },
  {
    id: 17, cat: 'productivity', free: false, tag: 'Premium',
    title: 'Executive Summary Generator',
    use: 'One-page C-suite summary.',
    prompt: `Summary for [PROJECT] at [CLIENT]. Context [2-3 SENTENCES], Findings [3-5 BULLETS], Recommendations [3-5 BULLETS]. Output: strategic headline, context (3-4 sentences), findings as insights (each implies action), recommendations (priority order with owner and deadline), next steps. Max 1 page. Every sentence earns its place.`,
    why: 'Tight constraint produces executive-grade output.',
  },
  {
    id: 18, cat: 'productivity', free: false, tag: 'Premium',
    title: 'Stakeholder Influence Mapper',
    use: 'Power/Interest matrix with engagement strategy.',
    prompt: `Map for [PROJECT]. Stakeholders: [LIST]. Objective: [WHAT]. Timeline: [WHEN]. Output: Power vs Interest matrix (4 quadrants), per-stakeholder strategy (influence, attitude, approach), comms plan (who/what/frequency/channel), blocker risk + mitigation, quick win stakeholder, escalation path.`,
    why: 'Prevents the #1 cause of project failure.',
  },
];
