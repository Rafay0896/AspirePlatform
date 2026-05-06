import { useState } from 'react';
import { SectionHeader, Card, Tag, ProgressBar, PrimaryButton, HomeButton } from '../components/ui';
import { ACCA_PAPERS, ICAP_PAPERS, CHECKLIST_ITEMS, CHEATSHEETS } from '../data/papers';

export default function StudySystem() {
  const [track, setTrack] = useState(null);
  const [levelFilter, setLevelFilter] = useState('all');
  const [checks, setChecks] = useState(CHECKLIST_ITEMS);
  const [expandedPaper, setExpandedPaper] = useState(null);
  const [showCheat, setShowCheat] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  // Track selection screen
  if (!track) {
    return (
      <div className="fade-in" style={{ maxWidth: 500, margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
        <SectionHeader eyebrow="STUDY SYSTEM" title="Select your qualification track" subtitle="Choose your exam body to load the relevant syllabus." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20 }}>
          {[
            { id: 'acca', label: 'ACCA', sub: 'Association of Chartered Certified Accountants', active: true },
            { id: 'icap', label: 'ICAP', sub: 'Institute of Chartered Accountants of Pakistan', active: true },
            { id: 'degree', label: "Bachelor's / Master's", sub: 'Coming soon', active: false },
          ].map((t) => (
            <Card
              key={t.id}
              onClick={t.active ? () => setTrack(t.id) : undefined}
              style={{ padding: 16, textAlign: 'left', opacity: t.active ? 1 : 0.5 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--t3)' }}>{t.sub}</div>
                </div>
                {!t.active && <Tag>Soon</Tag>}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const papers = track === 'acca' ? ACCA_PAPERS : ICAP_PAPERS;
  const levels = track === 'acca' ? ['AK', 'AS', 'SP'] : ['CFAP', 'MSA'];
  const levelLabels = track === 'acca'
    ? { AK: 'Applied Knowledge', AS: 'Applied Skills', SP: 'Strategic' }
    : { CFAP: 'CFAP', MSA: 'MSA' };

  const filtered = levelFilter === 'all' ? papers : papers.filter((p) => p.level === levelFilter);
  const totalCh = papers.reduce((a, p) => a + p.ch, 0);
  const totalDone = papers.reduce((a, p) => a + p.done, 0);
  const overallPct = totalCh > 0 ? Math.round((totalDone / totalCh) * 100) : 0;
  const checkDone = checks.filter((c) => c.done).length;

  return (
    <div className="fade-in" style={{ maxWidth: 880, margin: '0 auto', padding: '32px 20px' }}>
      <SectionHeader
        eyebrow={`STUDY SYSTEM — ${track.toUpperCase()}`}
        title="Exam preparation engine"
        subtitle="Demo view active. Full editing unlocks with Pro."
        right={
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setShowHelp(!showHelp)} style={{ background: 'none', border: '1px solid var(--bdr)', borderRadius: 6, padding: '5px 10px', fontSize: 11, color: 'var(--t2)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              {showHelp ? 'Hide help' : 'How to use'}
            </button>
            <button onClick={() => setTrack(null)} style={{ background: 'none', border: '1px solid var(--bdr)', borderRadius: 6, padding: '5px 10px', fontSize: 11, color: 'var(--t2)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              Change track
            </button>
            <HomeButton />
          </div>
        }
      />

      {/* How to use */}
      {showHelp && (
        <Card style={{ padding: 16, marginBottom: 14, borderColor: 'var(--accent)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>How the Study System works</div>
          <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.7 }}>
            <strong>Confidence (0-5):</strong> Self-assessed confidence per paper. 0 = not started, 5 = exam-ready.<br />
            <strong>Progress bar:</strong> Chapters completed out of total. Click any paper to expand topics.<br />
            <strong>Mock score:</strong> Your latest mock percentage. Target 60%+ for readiness.<br />
            <strong>Checklist:</strong> Complete all items before sitting the exam.
          </div>
        </Card>
      )}

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14 }}>
        {[
          { l: 'Papers', v: papers.length },
          { l: 'Chapters', v: `${totalDone}/${totalCh}` },
          { l: 'Progress', v: `${overallPct}%` },
          { l: 'Checklist', v: `${checkDone}/${checks.length}` },
        ].map((s, i) => (
          <Card key={i} style={{ padding: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{s.v}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--t3)' }}>{s.l}</div>
          </Card>
        ))}
      </div>

      {/* Progress */}
      <Card style={{ padding: 14, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>Overall Progress</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--t2)' }}>{overallPct}%</span>
        </div>
        <ProgressBar value={overallPct} height={6} color="linear-gradient(90deg, var(--green), var(--sky))" />
      </Card>

      {/* Checklist */}
      <Card style={{ padding: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Pre-Exam Checklist</div>
        {checks.map((c) => (
          <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', fontSize: 12, color: c.done ? 'var(--t1)' : 'var(--t2)', cursor: 'pointer' }}>
            <input type="checkbox" checked={c.done} onChange={() => setChecks(checks.map((x) => x.id === c.id ? { ...x, done: !x.done } : x))} />
            <span style={{ textDecoration: c.done ? 'line-through' : 'none' }}>{c.text}</span>
          </label>
        ))}
      </Card>

      {/* Level filter */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        <button onClick={() => setLevelFilter('all')} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '5px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', background: levelFilter === 'all' ? 'var(--accent)' : 'var(--s2)', color: levelFilter === 'all' ? '#fff' : 'var(--t2)' }}>
          All
        </button>
        {levels.map((l) => (
          <button key={l} onClick={() => setLevelFilter(l)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '5px 10px', borderRadius: 6, border: 'none', cursor: 'pointer', background: levelFilter === l ? 'var(--accent)' : 'var(--s2)', color: levelFilter === l ? '#fff' : 'var(--t2)' }}>
            {levelLabels[l] || l}
          </button>
        ))}
      </div>

      {/* Papers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
        {filtered.map((paper) => {
          const pp = paper.ch > 0 ? Math.round((paper.done / paper.ch) * 100) : 0;
          const isExpanded = expandedPaper === paper.code;
          return (
            <div key={paper.code}>
              <Card onClick={() => setExpandedPaper(isExpanded ? null : paper.code)} style={{ padding: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 70px 60px 50px 20px', alignItems: 'center', gap: 10 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--accent)' }}>{paper.code}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 3 }}>{paper.name}</div>
                    <ProgressBar value={pp} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    {paper.conf > 0 ? (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: paper.conf >= 4 ? 'var(--green)' : paper.conf >= 2 ? 'var(--amber)' : 'var(--red)' }}>
                        {paper.conf}/5
                      </span>
                    ) : <span style={{ fontSize: 10, color: 'var(--t3)' }}>--</span>}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--t2)', textAlign: 'center' }}>{paper.done}/{paper.ch}</div>
                  <div style={{ textAlign: 'center' }}>
                    {paper.mock !== null ? (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: paper.mock >= 50 ? 'var(--green)' : 'var(--red)' }}>{paper.mock}%</span>
                    ) : <span style={{ fontSize: 10, color: 'var(--t3)' }}>--</span>}
                  </div>
                  <span style={{ fontSize: 10, color: 'var(--t3)' }}>{isExpanded ? '\u25BC' : '\u25B6'}</span>
                </div>
              </Card>
              {isExpanded && paper.topics.length > 0 && (
                <div style={{ padding: '8px 0 8px 60px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {paper.topics.map((topic, i) => (
                    <div key={i} style={{ fontSize: 11, color: i < paper.done ? 'var(--green)' : 'var(--t3)', padding: '3px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, width: 16 }}>{i < paper.done ? '+' : '-'}</span>
                      {topic}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Cheatsheets */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--t3)', letterSpacing: '.08em', marginBottom: 6, marginTop: 18 }}>CHEATSHEETS</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {CHEATSHEETS.map((cs, i) => (
          <Card key={i}>
            <button onClick={() => setShowCheat(showCheat === i ? null : i)} style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--t1)' }}>{cs.title}</span>
              <span style={{ fontSize: 10, color: 'var(--t3)' }}>{showCheat === i ? 'Hide' : 'Show'}</span>
            </button>
            {showCheat === i && (
              <div style={{ padding: '0 12px 12px', borderTop: '1px solid var(--bdr)', paddingTop: 10 }}>
                {cs.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 11, color: 'var(--t2)', padding: '3px 0 3px 10px', borderLeft: '2px solid var(--accent)', marginBottom: 3, lineHeight: 1.4 }}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
