import { useState, useEffect } from 'react';
import { SectionHeader, Card, Tag, PrimaryButton, HomeButton, BackButton, Tooltip } from '../components/ui';
import { SIMULATIONS, TOOLTIPS } from '../data/simulations';

const SIM_CATEGORIES = ['Fieldwork', 'Professionalism', 'Client Meeting', 'Kick-off Meeting'];

function ScenarioText({ text }) {
  const words = text.split(/(\s+)/);
  return (
    <span>
      {words.map((word, i) => {
        const clean = word.replace(/[^A-Za-z0-9\s]/g, '').trim();
        if (TOOLTIPS[clean]) {
          return <Tooltip key={i} term={clean} definition={TOOLTIPS[clean]}>{word}</Tooltip>;
        }
        return <span key={i}>{word}</span>;
      })}
    </span>
  );
}

export default function SimulationLab({ addXp, simDone, setSimDone }) {
  const [activeCat, setActiveCat] = useState(null);
  const [activeSim, setActiveSim] = useState(null);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [xpGained, setXpGained] = useState(null);

  const handleAnswer = (simId, idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const sim = SIMULATIONS.find((s) => s.id === simId);
    const xpVal = sim.options[idx].xp;
    addXp(xpVal);
    setSimDone((prev) => ({ ...prev, [simId]: idx }));
    setXpGained(xpVal);
    setTimeout(() => setXpGained(null), 2000);
  };

  // Category view
  if (!activeCat) {
    return (
      <div className="fade-in" style={{ maxWidth: 780, margin: '0 auto', padding: '32px 20px' }}>
        <SectionHeader
          eyebrow="SIMULATION LAB"
          title="Professional decision scenarios"
          subtitle="4 categories, 3 free scenarios each. Earn XP based on decision quality."
          right={<HomeButton />}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {SIM_CATEGORIES.map((cat) => {
            const sims = SIMULATIONS.filter((s) => s.category === cat);
            const done = sims.filter((s) => simDone[s.id] !== undefined).length;
            return (
              <Card key={cat} onClick={() => setActiveCat(cat)} style={{ padding: 18 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{cat}</div>
                <div style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 8 }}>{sims.length} scenarios</div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {sims.map((s) => (
                    <div key={s.id} style={{ width: 8, height: 8, borderRadius: '50%', background: simDone[s.id] !== undefined ? 'var(--green)' : 'var(--s3)' }} />
                  ))}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--t3)', marginTop: 6 }}>
                  {done}/{sims.length} completed
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Scenario list
  if (!activeSim) {
    const sims = SIMULATIONS.filter((s) => s.category === activeCat);
    return (
      <div className="fade-in" style={{ maxWidth: 780, margin: '0 auto', padding: '32px 20px' }}>
        <button onClick={() => setActiveCat(null)} style={{ background: 'none', border: '1px solid var(--bdr)', borderRadius: 6, padding: '5px 12px', fontSize: 11, color: 'var(--t2)', cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: 16 }}>
          &larr; All categories
        </button>
        <SectionHeader eyebrow={activeCat.toUpperCase()} title={`${activeCat} Scenarios`} subtitle={`${sims.length} scenarios. All free.`} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {sims.map((sim) => (
            <Card
              key={sim.id}
              onClick={() => { setActiveSim(sim.id); setSelected(null); setAnswered(false); }}
              style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(30,73,226,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--accent)', flexShrink: 0 }}>
                {sim.id.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{sim.title}</span>
                  <Tag color="var(--t3)">{sim.location}</Tag>
                  {simDone[sim.id] !== undefined && <Tag color="var(--green)">Done</Tag>}
                </div>
                <p style={{ fontSize: 11, color: 'var(--t2)', lineHeight: 1.45 }}>{sim.scenario.slice(0, 120)}...</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Active scenario
  const sim = SIMULATIONS.find((s) => s.id === activeSim);
  if (!sim) return null;

  return (
    <div className="fade-in" style={{ maxWidth: 780, margin: '0 auto', padding: '32px 20px' }}>
      <button
        onClick={() => { setActiveSim(null); setSelected(null); setAnswered(false); }}
        style={{ background: 'none', border: '1px solid var(--bdr)', borderRadius: 6, padding: '5px 12px', fontSize: 11, color: 'var(--t2)', cursor: 'pointer', fontFamily: 'var(--font-body)', marginBottom: 16 }}
      >
        &larr; Back to {activeCat}
      </button>

      {/* XP animation */}
      {xpGained !== null && (
        <div className="xp-pulse" style={{ position: 'fixed', top: 60, right: 20, zIndex: 300, fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: 'var(--accent)' }}>
          +{xpGained} XP
        </div>
      )}

      {/* Scenario card */}
      <Card style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>
            {sim.id.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{sim.title}</div>
            <div style={{ fontSize: 10, color: 'var(--t3)' }}>{sim.location}</div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.6 }}>
          <ScenarioText text={sim.scenario} />
        </p>
      </Card>

      {/* Decision */}
      <Card active style={{ padding: 18 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '.08em', marginBottom: 6 }}>DECISION POINT</div>
        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 14, lineHeight: 1.4 }}>{sim.question}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {sim.options.map((opt, i) => {
            const isSel = selected === i;
            const showFb = answered && isSel;
            return (
              <div key={i}>
                <button
                  onClick={() => handleAnswer(activeSim, i)}
                  style={{
                    width: '100%', textAlign: 'left', padding: 12, borderRadius: 8,
                    cursor: answered ? 'default' : 'pointer',
                    background: showFb ? (opt.correct ? 'rgba(5,150,105,.06)' : 'rgba(220,38,38,.06)') : 'var(--s2)',
                    border: `1px solid ${showFb ? (opt.correct ? 'var(--green)' : 'var(--red)') : 'var(--bdr)'}`,
                    fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--t1)',
                    transition: 'all .15s', opacity: answered && !isSel ? 0.35 : 1,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{opt.text}</span>
                    {showFb && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: opt.correct ? 'var(--green)' : 'var(--red)' }}>
                        +{opt.xp} XP
                      </span>
                    )}
                  </div>
                </button>
                {showFb && (
                  <div style={{ padding: '8px 12px', fontSize: 11, color: 'var(--t2)', lineHeight: 1.5, borderLeft: `2px solid ${opt.correct ? 'var(--green)' : 'var(--red)'}`, marginTop: 3, marginLeft: 6 }}>
                    {opt.feedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
