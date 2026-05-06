import { useNavigate } from 'react-router-dom';
import { SectionHeader, Card, ProgressBar, PrimaryButton } from '../components/ui';
import { PROMPTS } from '../data/prompts';
import { ACCA_PAPERS } from '../data/papers';

export default function Dashboard({ xp, viewed, simDone, levels }) {
  const navigate = useNavigate();
  const lv = levels.slice().reverse().find((l) => xp >= l.min) || levels[0];
  const nx = levels[levels.indexOf(lv) + 1];
  const pct = nx ? Math.min(((xp - lv.min) / (nx.min - lv.min)) * 100, 100) : 100;

  return (
    <div className="fade-in" style={{ maxWidth: 880, margin: '0 auto', padding: '32px 20px' }}>
      <SectionHeader eyebrow="DASHBOARD" title="Welcome back" subtitle="Your Risk, GRC, and Finance learning hub." />

      {/* XP Bar */}
      <Card style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--accent)', background: 'rgba(30,73,226,.1)', padding: '3px 8px', borderRadius: 5 }}>
              Lv{levels.indexOf(lv) + 1}
            </span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{lv.name}</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--t3)' }}>
            {xp} / {nx?.min || 'MAX'} XP
          </span>
        </div>
        <ProgressBar value={pct} height={5} />
      </Card>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
        {[
          { l: 'Prompts', v: viewed.size },
          { l: 'Simulations', v: Object.keys(simDone).length },
          { l: 'Study Papers', v: ACCA_PAPERS.filter((p) => p.done > 0).length },
          { l: 'XP Total', v: xp },
        ].map((s, i) => (
          <Card key={i} style={{ padding: 14, textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{s.v}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--t3)', marginTop: 2 }}>{s.l}</div>
          </Card>
        ))}
      </div>

      {/* Onboarding */}
      <Card style={{ padding: 16, marginBottom: 24, borderColor: 'var(--accent)', borderLeftWidth: 3 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Recommended path</div>
            <div style={{ fontSize: 12, color: 'var(--t2)' }}>
              Try 3 free prompts &rarr; Explore Study System &rarr; Complete 1 simulation &rarr; Upgrade when ready
            </div>
          </div>
          <PrimaryButton onClick={() => navigate('/prompts')}>Start</PrimaryButton>
        </div>
      </Card>

      {/* Quick nav */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
          { l: 'AI Prompts', d: `${PROMPTS.length} with anti-hallucination`, p: '/prompts', c: 'var(--accent)' },
          { l: 'Study System', d: `${ACCA_PAPERS.length} ACCA papers`, p: '/study', c: 'var(--green)' },
          { l: 'Sim Lab', d: '12 professional scenarios', p: '/simlab', c: 'var(--pink)' },
        ].map((n, i) => (
          <Card key={i} onClick={() => navigate(n.p)} style={{ padding: 14, textAlign: 'left' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: n.c, marginBottom: 8 }} />
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{n.l}</div>
            <div style={{ fontSize: 11, color: 'var(--t3)' }}>{n.d}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
