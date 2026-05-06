import { SectionHeader, Card, Tag, PrimaryButton, HomeButton } from '../components/ui';

const TIERS = [
  {
    name: 'Free', price: '$0', period: 'forever',
    desc: 'Explore the platform. No card required.',
    features: ['6 free AI prompts', 'Study System demo view', 'All 12 simulation scenarios', 'Weekly newsletter', 'Progress and XP tracking'],
    locked: ['Full prompt library', 'Toolkit templates', 'Full study editing'],
    cta: 'Get Started', primary: false,
  },
  {
    name: 'Pro', price: '$7', period: '/mo',
    desc: 'Core access to the full platform.',
    features: ['All 18 AI prompts', 'Full Study System (all papers)', 'All simulation scenarios', 'Priority support', '2 CV reviews per year'],
    locked: ['Risk Toolkit templates'],
    cta: 'Start Free Trial', primary: true,
    note: '7-day free trial. Cancel anytime.',
  },
  {
    name: 'Premium Toolkit', price: '$24', period: 'one-time',
    desc: 'Risk & Audit templates plus full access.',
    features: ['Everything in Pro', '8 Risk Toolkit templates', 'RACM + fieldwork procedures', 'Working paper templates', 'Reporting frameworks', 'Lifetime updates'],
    locked: [],
    cta: 'Get Toolkit', primary: false,
  },
];

export default function Pricing() {
  return (
    <div className="fade-in" style={{ maxWidth: 860, margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--t3)', letterSpacing: '.08em', marginBottom: 6 }}>PRICING</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, marginBottom: 4 }}>
          Priced for students and early professionals
        </h1>
        <p style={{ fontSize: 14, color: 'var(--t2)' }}>Start free. Upgrade when the tools prove their value.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {TIERS.map((tier, i) => (
          <Card
            key={i}
            style={{
              padding: 22, position: 'relative',
              borderColor: tier.primary ? 'var(--accent)' : 'var(--bdr)',
              boxShadow: tier.primary ? '0 0 0 1px var(--accent)' : 'none',
            }}
          >
            {tier.primary && (
              <div style={{
                position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600,
                padding: '2px 8px', borderRadius: 4, background: 'var(--accent)',
                color: '#fff', letterSpacing: '.05em',
              }}>
                BEST VALUE
              </div>
            )}

            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{tier.name}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 3 }}>
              <span style={{ fontSize: 30, fontWeight: 700 }}>{tier.price}</span>
              <span style={{ fontSize: 12, color: 'var(--t3)' }}>{tier.period}</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--t2)', marginBottom: 14 }}>{tier.desc}</p>
            {tier.note && <p style={{ fontSize: 10, color: 'var(--accent)', marginBottom: 6 }}>{tier.note}</p>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
              {tier.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', gap: 5, fontSize: 12 }}>
                  <span style={{ color: 'var(--green)', fontWeight: 700 }}>+</span>{f}
                </div>
              ))}
              {tier.locked.map((f, j) => (
                <div key={`l${j}`} style={{ display: 'flex', gap: 5, fontSize: 12, color: 'var(--t3)' }}>
                  <span>-</span>{f}
                </div>
              ))}
            </div>

            {tier.primary ? (
              <PrimaryButton style={{ width: '100%' }}>{tier.cta}</PrimaryButton>
            ) : (
              <button style={{
                width: '100%', padding: '10px 20px', borderRadius: 8,
                background: 'none', border: '1px solid var(--bdr)', color: 'var(--t2)',
                fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-display)', cursor: 'pointer',
              }}>
                {tier.cta}
              </button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
