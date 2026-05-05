export const PAPERS = [
  { code:"BT",name:"Business and Technology",level:"AK",ch:9,done:7,conf:4,mock:68,
    topics:["Business organisation","Information technology","Governance","Ethics","Law","Business mathematics","Accounting","Financial reporting framework","Managing information"] },
  { code:"MA",name:"Management Accounting",level:"AK",ch:12,done:4,conf:3,mock:54,
    topics:["Cost classification","Material costs","Labour costs","Overheads","Absorption vs marginal","Job costing","Process costing","Budgeting","Standard costing","Variance analysis","Performance measurement","Spreadsheets"] },
  { code:"FA",name:"Financial Accounting",level:"AK",ch:14,done:0,conf:0,mock:null,
    topics:["Double entry","Books of prime entry","Trial balance","Control accounts","Bank reconciliation","Suspense accounts","Accruals","Inventory","Non-current assets","Depreciation","Provisions","Financial statements","Incomplete records","Company accounts"] },
  { code:"PM",name:"Performance Management",level:"AS",ch:15,done:0,conf:0,mock:null,topics:[] },
  { code:"FR",name:"Financial Reporting",level:"AS",ch:18,done:0,conf:0,mock:null,topics:[] },
  { code:"AA",name:"Audit and Assurance",level:"AS",ch:16,done:0,conf:0,mock:null,topics:[] },
  { code:"SBL",name:"Strategic Business Leader",level:"SP",ch:12,done:0,conf:0,mock:null,topics:[] },
  { code:"SBR",name:"Strategic Business Reporting",level:"SP",ch:10,done:0,conf:0,mock:null,topics:[] },
];

export const CHECKLIST_INIT = [
  { id:1, text:"Latest examiner report reviewed", done:true },
  { id:2, text:"Technical articles for this sitting covered", done:false },
  { id:3, text:"Minimum 3 mock exams attempted", done:false },
  { id:4, text:"Weak areas identified and revision plan created", done:true },
  { id:5, text:"Past paper question patterns analysed", done:false },
  { id:6, text:"Time management strategy defined per question type", done:false },
];

export const CHEATSHEETS = [
  { title:"IFRS 16 Key Triggers", items:[
    "ROU asset = PV of lease payments at commencement",
    "Discount rate = lessee incremental borrowing rate",
    "Reassess on modification, index change, or extension exercise",
    "Short-term exemption: lease term < 12 months at commencement date",
    "Low-value exemption: underlying asset < $5,000 when new",
  ]},
  { title:"Audit Risk Model (ISA 315)", items:[
    "Audit Risk = Inherent Risk x Control Risk x Detection Risk",
    "High IR + High CR = set detection risk LOW (more substantive work)",
    "Significant risks require specific audit response (ISA 330)",
    "Understanding the entity and its environment is mandatory (ISA 315.11)",
  ]},
  { title:"COSO ERM 2017 Components", items:[
    "Governance and Culture",
    "Strategy and Objective-Setting",
    "Performance (identification, assessment, prioritisation)",
    "Review and Revision",
    "Information, Communication, and Reporting",
  ]},
  { title:"Three Lines Model (IIA 2020)", items:[
    "First Line: Management (owns and manages risk)",
    "Second Line: Risk & Compliance (provides expertise, monitoring, challenge)",
    "Third Line: Internal Audit (independent assurance to governing body)",
    "Key shift from 2020: alignment and collaboration, not just defence",
  ]},
];
