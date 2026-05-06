export const TOOLTIPS = {
  'P2P': 'Procure-to-Pay: the full cycle from purchase requisition through payment',
  'O2C': 'Order-to-Cash: from customer order through invoicing and cash collection',
  'R2R': 'Record-to-Report: journal entries through financial close and reporting',
  'RACM': 'Risk and Control Matrix: maps risks to controls to test procedures',
  'CCER': 'Condition, Criteria, Cause, Effect, Recommendation: standard finding format',
  'ISA 240': 'International Standard on Auditing: Auditor Responsibilities Relating to Fraud',
  'ISA 315': 'Understanding the Entity and Its Environment (risk assessment standard)',
  'ISA 330': 'The Auditor\'s Responses to Assessed Risks',
  'TCWG': 'Those Charged With Governance (typically Audit Committee or Board)',
  'NED': 'Non-Executive Director: independent board member without operational role',
  'ToR': 'Terms of Reference: formal engagement scope document',
  'IBR': 'Incremental Borrowing Rate: rate a lessee would pay to borrow',
  'CAE': 'Chief Audit Executive: head of internal audit function',
  'ERM': 'Enterprise Risk Management: organisation-wide risk framework',
  'GRC': 'Governance, Risk & Compliance: integrated management approach',
};

export const SIMULATIONS = [
  // FIELDWORK
  {
    id: 'fw1', category: 'Fieldwork', location: 'Zurich, Switzerland',
    title: 'Client Delays Documentation',
    scenario: 'You are conducting fieldwork for a P2P audit at a Swiss pharmaceutical company. The procurement manager has been delaying submission of purchase order documentation for 5 business days. Your fieldwork deadline is in 3 days. The RACM requires testing 25 POs above CHF 50,000.',
    terms: ['P2P', 'RACM'],
    question: 'How do you handle the documentation delay?',
    options: [
      { text: 'Wait for the documents and extend the fieldwork deadline', feedback: 'Poor time management. Extending deadlines without escalation signals weak project control. The engagement timeline exists for a reason.', xp: 3, correct: false },
      { text: 'Escalate formally: send written request with deadline, copy the CAE, document in observation log, and prepare alternative procedures if documents are not received by tomorrow', feedback: 'Correct. This follows proper escalation protocol: documented request, appropriate escalation, contingency planning, and audit trail. Professional and firm.', xp: 20, correct: true },
      { text: 'Reduce the sample size to work with available documents', feedback: 'Compromises audit quality. Sample sizes are determined by risk assessment, not by convenience. Reducing samples without justification is a professional standards violation.', xp: 3, correct: false },
    ],
  },
  {
    id: 'fw2', category: 'Fieldwork', location: 'London, UK',
    title: 'Unexpected Finding During Testing',
    scenario: 'During ITGC testing at a London-based asset management firm, you discover that 3 developers have direct access to the production database without change management approval. The IT Director says this is "normal for a firm this size." Your RACM classified IT access controls as a key control.',
    terms: ['RACM'],
    question: 'The IT Director dismisses your finding. What do you do?',
    options: [
      { text: 'Accept the explanation since the IT Director has more technical knowledge than you', feedback: 'Never accept management representations as audit evidence for control effectiveness. The fact that it is "normal" does not make it controlled. This is a clear segregation of duties issue.', xp: 3, correct: false },
      { text: 'Document the finding factually, assess the risk of unauthorised changes, determine if compensating controls exist, and draft a CCER finding regardless of management pushback', feedback: 'Correct. Audit independence means documenting what you find, not what management wants to hear. Assess compensating controls (monitoring logs, code review processes) before finalising severity.', xp: 20, correct: true },
      { text: 'Flag it verbally to the Engagement Manager and move on to other testing areas', feedback: 'Verbal flagging without documentation violates audit standards. If it is not documented, it did not happen. Every observation must be formally recorded.', xp: 5, correct: false },
    ],
  },
  {
    id: 'fw3', category: 'Fieldwork', location: 'Paris, France',
    title: 'Sampling Exception Rate',
    scenario: 'You are testing revenue cut-off at a French luxury goods company. Your sample of 30 transactions includes 4 exceptions where revenue was recorded in the wrong period. The total value of exceptions is EUR 1.2M against total revenue of EUR 180M. The engagement manager asks if this is material.',
    terms: ['O2C'],
    question: 'How do you evaluate the 4 exceptions?',
    options: [
      { text: 'The exceptions are immaterial at 0.67% of revenue, so report as low severity', feedback: 'Materiality alone is insufficient. An exception rate of 13% (4/30) suggests a systemic cut-off control failure. You must project the error rate across the full population and assess whether the control is operating effectively.', xp: 5, correct: false },
      { text: 'Project the error across the full population, assess whether the control failure is systemic, evaluate the direction of errors (all overstatements vs mixed), and discuss with the partner whether additional procedures are needed', feedback: 'Correct. The 13% exception rate is significant regardless of dollar materiality. Error projection, pattern analysis (direction), and professional discussion about response are all required.', xp: 20, correct: true },
      { text: 'Request a larger sample of 60 items to get a clearer picture', feedback: 'Increasing the sample may be part of the response, but it should not be the first step. First, analyse the existing exceptions for patterns, project the error rate, and then determine if additional testing is needed and what kind.', xp: 8, correct: false },
    ],
  },

  // PROFESSIONALISM
  {
    id: 'pr1', category: 'Professionalism', location: 'Brussels, Belgium',
    title: 'Client Pressure on Findings',
    scenario: 'You are finalising an internal audit report for a Belgian bank. The Chief Risk Officer calls you directly and asks you to downgrade a "High" finding to "Medium" before the Audit Committee meeting next week. The finding relates to incomplete KYC documentation affecting 15% of new customer onboarding.',
    terms: ['CAE', 'TCWG'],
    question: 'The CRO is senior and influential. How do you respond?',
    options: [
      { text: 'Downgrade the finding since the CRO has better context about the bank\'s risk appetite', feedback: 'Independence failure. Internal audit severity ratings must be determined by the audit team based on evidence, not by management preferences. The CRO is the auditee, not the auditor.', xp: 3, correct: false },
      { text: 'Acknowledge the CRO\'s perspective, explain the rating criteria and evidence basis, offer to include their management response in the report, but maintain the rating based on audit evidence', feedback: 'Correct. Professional, respectful, but firm. You listen to their view, explain your methodology, give them space to respond formally in the report, but the rating stays evidence-based. If they escalate, route through the CAE to the Audit Committee.', xp: 20, correct: true },
      { text: 'Refuse without discussion and report the pressure to the Audit Committee immediately', feedback: 'While reporting pressure can be appropriate, immediately escalating without first having a professional conversation is unnecessarily confrontational. Start with dialogue before escalation.', xp: 8, correct: false },
    ],
  },
  {
    id: 'pr2', category: 'Professionalism', location: 'London, UK',
    title: 'Confidential Information Overheard',
    scenario: 'While waiting for a meeting at a client\'s London office, you overhear two directors discussing plans to terminate the external auditor relationship due to "asking too many questions about the CEO\'s expense claims." You are there as an internal audit consultant.',
    terms: ['TCWG'],
    question: 'What do you do with this information?',
    options: [
      { text: 'Ignore it since it relates to external audit, not your engagement', feedback: 'Incorrect. The conversation suggests potential governance issues (CEO expense irregularities) and interference with external audit independence. These are relevant to any assurance provider.', xp: 3, correct: false },
      { text: 'Document the observation factually (date, time, what was said without embellishment), report to your engagement leader, and assess whether it indicates governance or fraud risk factors that affect your own engagement scope', feedback: 'Correct. Factual documentation, proper escalation through your chain, and risk assessment of implications for your engagement. Do not confront the directors directly or investigate beyond your scope.', xp: 20, correct: true },
      { text: 'Approach the directors directly and ask for clarification', feedback: 'Inappropriate. You overheard a private conversation. Confronting the directors directly could compromise the information, create hostility, and put you in an awkward position without proper authorisation.', xp: 3, correct: false },
    ],
  },
  {
    id: 'pr3', category: 'Professionalism', location: 'Zurich, Switzerland',
    title: 'Team Member Performance Issue',
    scenario: 'You are the engagement manager on a 4-week internal audit in Zurich. One team member has been consistently late to client meetings, submitted incomplete working papers, and missed two deadlines. The senior associate has complained to you privately. The team member is known to be a strong performer normally.',
    terms: ['ToR'],
    question: 'How do you address the performance issue?',
    options: [
      { text: 'Document the issues and include them in the year-end performance review', feedback: 'Too late. Waiting until year-end means the current engagement suffers. Performance issues on live engagements must be addressed immediately.', xp: 3, correct: false },
      { text: 'Have a private, direct conversation: share specific observations (dates, examples), ask if something is affecting their work, agree on clear expectations for the remaining engagement, and follow up in writing', feedback: 'Correct. Address it promptly, privately, with specific examples (not vague feedback). Ask open questions first (there may be personal circumstances). Set clear expectations going forward. Written follow-up creates accountability.', xp: 20, correct: true },
      { text: 'Reassign their work to other team members to avoid delays', feedback: 'Avoids the problem rather than solving it. The team member does not improve, the workload unfairly shifts to others, and the root cause remains unaddressed.', xp: 5, correct: false },
    ],
  },

  // CLIENT MEETING
  {
    id: 'cm1', category: 'Client Meeting', location: 'London, UK',
    title: 'Hostile Audit Committee Member',
    scenario: 'You are presenting internal audit findings to the Audit Committee of a UK-listed company. One NED interrupts your presentation of a High-severity finding on treasury controls and says: "We have been operating this way for 20 years. I do not understand why internal audit is suddenly concerned."',
    terms: ['NED', 'TCWG'],
    question: 'How do you respond in the meeting?',
    options: [
      { text: 'Defer to the NED\'s experience and offer to revisit the finding', feedback: 'Undermines audit authority. If the finding is evidence-based, backing down in front of the Committee signals that audit ratings are negotiable under pressure.', xp: 3, correct: false },
      { text: 'Acknowledge the history respectfully, then redirect to the evidence: "I appreciate the context. Our finding is based on [specific evidence]. The regulatory environment has changed since [specific date/regulation]. We recommend [specific action] to align with current requirements."', feedback: 'Correct. Acknowledge without conceding. Redirect to evidence and regulatory context. Position the recommendation as forward-looking (aligning with current standards) rather than backward-looking (criticising past practice).', xp: 20, correct: true },
      { text: 'Read out the full finding again more slowly', feedback: 'Condescending. The NED understood the finding; they are challenging its validity. Repeating the same content does not address their concern. You need to respond to their actual objection.', xp: 3, correct: false },
    ],
  },
  {
    id: 'cm2', category: 'Client Meeting', location: 'Brussels, Belgium',
    title: 'Scope Discussion Gone Wrong',
    scenario: 'During a kick-off meeting for a GRC maturity assessment at a Belgian financial regulator, the client requests that you include a cyber security assessment in addition to the agreed GRC scope. Your team does not include cyber security specialists. The client implies this was "discussed informally" with your partner.',
    terms: ['ToR', 'GRC'],
    question: 'How do you handle the scope expansion request?',
    options: [
      { text: 'Agree to include cyber security to avoid losing the client', feedback: 'Accepting work outside your competency violates professional standards. Delivering a cyber assessment without specialists risks producing poor-quality output and reputational damage.', xp: 3, correct: false },
      { text: 'Thank them for the request, confirm that it was not in the signed ToR, commit to discussing with your partner, and propose two options: (a) separate cyber engagement with qualified team, or (b) high-level cyber risk identification within GRC scope with specialist follow-up', feedback: 'Correct. Professional, solution-oriented, honest about scope limitations. You do not say no; you redirect to what is possible while protecting quality.', xp: 20, correct: true },
      { text: 'Refuse and point to the signed Terms of Reference', feedback: 'Technically correct but commercially tone-deaf. Pointing to a contract in a kick-off meeting creates adversarial dynamics. Offer solutions, not just boundaries.', xp: 8, correct: false },
    ],
  },
  {
    id: 'cm3', category: 'Client Meeting', location: 'Paris, France',
    title: 'Client Disagrees with Methodology',
    scenario: 'You are presenting your audit approach to the CFO of a French industrial group. The CFO challenges your risk-based sampling methodology, saying: "I want you to test 100% of transactions above EUR 500K. That is what our previous auditors did." Your planned approach is to sample 25 items based on risk assessment.',
    terms: ['ISA 315', 'ISA 330'],
    question: 'How do you handle the methodological disagreement?',
    options: [
      { text: 'Switch to 100% testing above EUR 500K as the client requests', feedback: 'Audit methodology should be determined by the auditor based on risk assessment (ISA 315/330), not dictated by the client. Changing your approach on client demand compromises professional judgement.', xp: 3, correct: false },
      { text: 'Explain that your approach is risk-based per ISA 315, that sample size reflects the assessed risk level, that this is standard Big 4 methodology, and offer to present the risk assessment that justifies your sample design', feedback: 'Correct. Educate without condescending. Reference the standard, explain the rationale, and offer transparency by sharing your risk assessment. Most clients accept once they understand the logic.', xp: 20, correct: true },
      { text: 'Tell the CFO that you follow international standards and cannot change your approach', feedback: 'Factually correct but dismissive. The CFO may have legitimate concerns (past issues, regulatory expectations). Engage with the underlying concern rather than hiding behind standards.', xp: 8, correct: false },
    ],
  },

  // KICK-OFF
  {
    id: 'ko1', category: 'Kick-off Meeting', location: 'London, UK',
    title: 'Stakeholder Expectations Misaligned',
    scenario: 'You are running a kick-off for a controls maturity assessment at a UK insurer. The Head of Operations expects a detailed process reengineering plan. The CRO expects a risk register update. The CFO expects cost savings recommendations. Your ToR covers controls maturity assessment only.',
    terms: ['ToR', 'ERM'],
    question: 'Three stakeholders have three different expectations. How do you align them?',
    options: [
      { text: 'Promise to incorporate all three expectations to keep everyone happy', feedback: 'Scope inflation. Promising deliverables outside the ToR sets up the engagement for failure when you cannot deliver on all three fronts within the agreed timeline and budget.', xp: 3, correct: false },
      { text: 'Display the signed ToR on screen, walk through the agreed scope and deliverables, acknowledge each stakeholder\'s additional needs, and propose: "Our controls maturity assessment will naturally surface insights relevant to all three areas. We will flag specific items for follow-up workstreams."', feedback: 'Correct. Transparency about scope, validation against the signed document, and a bridge that connects their interests to your deliverables without over-promising. This is senior stakeholder management.', xp: 20, correct: true },
      { text: 'Defer to the most senior stakeholder and align to their expectations', feedback: 'Creates resentment from the other two stakeholders and may misalign the engagement from the agreed scope. All stakeholder views matter; alignment comes from the ToR, not hierarchy.', xp: 5, correct: false },
    ],
  },
  {
    id: 'ko2', category: 'Kick-off Meeting', location: 'Paris, France',
    title: 'Data Access Denied',
    scenario: 'At the kick-off of an internal audit at a French energy company, the IT department informs you that they cannot provide system access or data extracts due to "GDPR concerns." Your audit plan requires access to ERP transaction data for the past 12 months.',
    terms: ['ToR', 'RACM'],
    question: 'IT is blocking your data access. How do you resolve this?',
    options: [
      { text: 'Accept the limitation and use alternative procedures (interviews and walkthroughs only)', feedback: 'Insufficient. Interviews and walkthroughs cannot replace transaction-level testing for controls assurance. You would be issuing an opinion on incomplete evidence.', xp: 5, correct: false },
      { text: 'Reference the ToR which includes agreed data access, engage the CAE to escalate, propose anonymisation or pseudonymisation of personal data fields while retaining transaction data for testing, and document the delay in your engagement log', feedback: 'Correct. Use the contractual basis (ToR), escalate through proper channels (CAE), offer a GDPR-compliant solution (anonymisation), and document everything. Most IT departments cooperate once they see a workable solution.', xp: 20, correct: true },
      { text: 'Escalate directly to the CEO to override the IT department', feedback: 'Nuclear option too early. CEO escalation should be a last resort after intermediate steps have failed. Start with the CAE and a proposed technical solution before going to the top.', xp: 5, correct: false },
    ],
  },
  {
    id: 'ko3', category: 'Kick-off Meeting', location: 'Brussels, Belgium',
    title: 'Timeline Negotiation',
    scenario: 'The Audit Committee Chair wants your ERM maturity assessment completed in 4 weeks. Your standard methodology requires 8 weeks for this scope. The Chair says the board meeting is in 5 weeks and the report must be ready.',
    terms: ['ERM', 'CAE'],
    question: 'The timeline is half of what you need. How do you negotiate?',
    options: [
      { text: 'Commit to 4 weeks to secure the engagement', feedback: 'Committing to an unrealistic timeline risks poor quality, team burnout, and reputational damage when you inevitably miss deliverables or deliver shallow work.', xp: 3, correct: false },
      { text: 'Present options: (a) full scope in 8 weeks with interim update at week 4 for the board meeting, or (b) reduced scope (top 5 risk areas only) in 4 weeks with a Phase 2 for remaining areas. Let the Chair choose.', feedback: 'Correct. You do not say no; you present professionally structured alternatives that respect both the quality requirement and the business constraint. Giving the client a choice maintains the relationship while protecting standards.', xp: 20, correct: true },
      { text: 'Decline the engagement due to the impossible timeline', feedback: 'Commercially unnecessary. The timeline is the constraint, not the engagement itself. Declining without exploring alternatives leaves revenue on the table and damages the relationship.', xp: 5, correct: false },
    ],
  },
];
