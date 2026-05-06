export const ACCA_PAPERS = [
  { code: 'BT', name: 'Business and Technology', level: 'AK', ch: 9, done: 7, conf: 4, mock: 68,
    topics: ['Business organisation and structure', 'Information technology and systems', 'Governance and regulation', 'Professional ethics', 'Corporate and business law basics', 'Business mathematics and statistics', 'Principles of accounting', 'Financial reporting framework', 'Managing information systems'] },
  { code: 'MA', name: 'Management Accounting', level: 'AK', ch: 12, done: 4, conf: 3, mock: 54,
    topics: ['Cost classification and behaviour', 'Material costs and inventory', 'Labour costs and remuneration', 'Overhead allocation and absorption', 'Absorption vs marginal costing', 'Job and batch costing', 'Process costing', 'Budgeting and budgetary control', 'Standard costing systems', 'Variance analysis', 'Performance measurement', 'Spreadsheet techniques'] },
  { code: 'FA', name: 'Financial Accounting', level: 'AK', ch: 14, done: 0, conf: 0, mock: null,
    topics: ['Double entry bookkeeping', 'Books of prime entry', 'Trial balance preparation', 'Control accounts', 'Bank reconciliation', 'Suspense accounts', 'Accruals and prepayments', 'Inventory valuation', 'Non-current assets', 'Depreciation methods', 'Provisions and contingencies', 'Financial statement preparation', 'Incomplete records', 'Company financial statements'] },
  { code: 'LW', name: 'Corporate and Business Law', level: 'AS', ch: 10, done: 0, conf: 0, mock: null, topics: [] },
  { code: 'PM', name: 'Performance Management', level: 'AS', ch: 15, done: 0, conf: 0, mock: null, topics: [] },
  { code: 'TX', name: 'Taxation', level: 'AS', ch: 14, done: 0, conf: 0, mock: null, topics: [] },
  { code: 'FR', name: 'Financial Reporting', level: 'AS', ch: 18, done: 0, conf: 0, mock: null, topics: [] },
  { code: 'AA', name: 'Audit and Assurance', level: 'AS', ch: 16, done: 0, conf: 0, mock: null, topics: [] },
  { code: 'FM', name: 'Financial Management', level: 'AS', ch: 16, done: 0, conf: 0, mock: null, topics: [] },
  { code: 'SBL', name: 'Strategic Business Leader', level: 'SP', ch: 12, done: 0, conf: 0, mock: null, topics: [] },
  { code: 'SBR', name: 'Strategic Business Reporting', level: 'SP', ch: 10, done: 0, conf: 0, mock: null, topics: [] },
];

export const ICAP_PAPERS = [
  { code: 'CFAP1', name: 'Accounting Standards and Financial Reporting', level: 'CFAP', ch: 12, done: 0, conf: 0, mock: null, topics: ['IAS 1 Presentation', 'IAS 16 PPE', 'IFRS 15 Revenue', 'IFRS 16 Leases', 'IAS 12 Income Taxes', 'Group accounts', 'Business combinations', 'Interim reporting', 'Segment reporting', 'First-time adoption', 'Islamic accounting', 'Sustainability reporting'] },
  { code: 'CFAP2', name: 'Assurance', level: 'CFAP', ch: 10, done: 0, conf: 0, mock: null, topics: ['ISA Framework', 'Planning and risk', 'Internal controls', 'Audit evidence', 'Using work of others', 'Group audits', 'Reporting', 'Special purpose', 'Ethics', 'Quality management'] },
  { code: 'CFAP3', name: 'Business Management and Strategy', level: 'CFAP', ch: 8, done: 0, conf: 0, mock: null, topics: [] },
  { code: 'CFAP4', name: 'Tax Practices', level: 'CFAP', ch: 10, done: 0, conf: 0, mock: null, topics: [] },
  { code: 'CFAP5', name: 'Business Finance', level: 'CFAP', ch: 10, done: 0, conf: 0, mock: null, topics: [] },
  { code: 'MSA', name: 'Multi-Subject Assessment', level: 'MSA', ch: 6, done: 0, conf: 0, mock: null, topics: [] },
];

export const CHECKLIST_ITEMS = [
  { id: 1, text: 'Latest examiner report reviewed', done: true },
  { id: 2, text: 'Technical articles for this sitting covered', done: false },
  { id: 3, text: 'Minimum 3 mock exams attempted', done: false },
  { id: 4, text: 'Weak areas identified and revision plan created', done: true },
  { id: 5, text: 'Past paper question patterns analysed', done: false },
  { id: 6, text: 'Time management strategy per question type defined', done: false },
];

export const CHEATSHEETS = [
  { title: 'IFRS 16 Key Triggers', items: [
    'ROU asset = PV of lease payments at commencement',
    'Discount rate = lessee incremental borrowing rate',
    'Reassess on modification, index change, or extension exercise',
    'Short-term exemption: < 12 months at commencement',
    'Low-value exemption: underlying asset < $5,000 when new',
  ]},
  { title: 'Audit Risk Model (ISA 315)', items: [
    'Audit Risk = Inherent Risk x Control Risk x Detection Risk',
    'High IR + High CR = set detection risk LOW (more substantive)',
    'Significant risks require specific response (ISA 330)',
    'Understanding entity and environment is mandatory (ISA 315.11)',
  ]},
  { title: 'COSO ERM 2017', items: [
    'Governance and Culture',
    'Strategy and Objective-Setting',
    'Performance (identification, assessment, prioritisation)',
    'Review and Revision',
    'Information, Communication, and Reporting',
  ]},
  { title: 'Three Lines Model (IIA 2020)', items: [
    'First Line: Management (owns and manages risk)',
    'Second Line: Risk & Compliance (expertise, monitoring, challenge)',
    'Third Line: Internal Audit (independent assurance to governing body)',
    'Key shift: alignment and collaboration, not just defence',
  ]},
];
