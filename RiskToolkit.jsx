import { useState } from 'react';
import { SectionHeader, Card, Tag, PrimaryButton, HomeButton, BackButton } from '../components/ui';
import { TOOLKIT_ITEMS } from '../data/toolkit';

const tierColor = { free: 'var(--green)', pro: 'var(--accent)', toolkit: 'var(--pink)' };

function RiskMatrix() {
  const L = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'];
  const I = ['Negligible', 'Minor', 'Moderate', 'Significant', 'Severe'];
  const getColor = (l, i) => {
    const score = (l + 1) * (i + 1);
    if (score >= 20) return '#DC2626';
    if (score >= 10) return '#D97706';
    if (score >= 5) return '#EAB308';
    return '#059669';
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
        <thead>
          <tr>
            <th style={{ padding: 8, background: 'var(--s2)', border: '1px solid var(--bdr)', textAlign: 'left' }}>L / I</th>
            {I.map((imp, i) => (
              <th key={i} style={{ padding: 8, background: 'var(--s2)', border: '1px solid var(--bdr)', textAlign: 'center', fontSize: 10 }}>{imp}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {L.map((lik, li) => (
            <tr key={li}>
              <td style={{ padding: 8, border: '1px solid var(--bdr)', fontWeight: 600, fontSize: 10 }}>{lik}</td>
              {I.map((_, ii) => {
                const score = (li + 1) * (ii + 1);
                return (
                  <td key={ii} style={{ padding: 8, border: '1px solid var(--bdr)', textAlign: 'center', background: `${getColor(li, ii)}18`, color: getColor(li, ii), fontWeight: 600 }}>
                    {score}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 10, color: 'var(--t3)' }}>
        {[{ c: '#DC2626', l: 'Critical (20-25)' }, { c: '#D97706', l: 'High (10-19)' }, { c: '#EAB308', l: 'Medium (5-9)' }, { c: '#059669', l: 'Low (1-4)' }].map((z) => (
          <div key={z.l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: z.c }} />{z.l}
          </div>
        ))}
      </div>
    </div>
  );
}

function DataTable({ headers, rows }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 11 }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{ padding: '8px 10px', background: 'var(--primary)', color: '#fff', border: '1px solid var(--bdr)', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600 }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: '6px 10px', border: '1px solid var(--bdr)', background: ri % 2 === 0 ? 'var(--s2)' : 'var(--s1)', fontSize: 11, color: 'var(--t2)' }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function RiskToolkit({ onPaywall }) {
  const [openItem, setOpenItem] = useState(null);

  const renderContent = (item) => {
    const c = item.content;
    if (c.type === 'locked') return (
      <div style={{ textAlign: 'center', padding: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Premium content</p>
        <p style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 12 }}>{item.desc}</p>
        <PrimaryButton onClick={onPaywall}>Unlock Toolkit</PrimaryButton>
      </div>
    );
    if (c.type === 'matrix') return <RiskMatrix />;
    if (c.type === 'table') return <DataTable headers={c.headers} rows={c.rows} />;
    if (c.type === 'checklist') return (
      <div>
        {c.items.map((ci, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--bdr)', fontSize: 12 }}>
            <span style={{ color: 'var(--t1)' }}>{ci.item}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--t3)' }}>{ci.owner}</span>
          </div>
        ))}
      </div>
    );
    return null;
  };

  if (openItem) {
    const item = TOOLKIT_ITEMS.find((t) => t.id === openItem);
    if (!item) return null;
    const isLocked = item.content.type === 'locked';

    return (
      <div className="fade-in" style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>
        <BackButton />
        <SectionHeader eyebrow={item.tier.toUpperCase()} title={item.title} subtitle={item.desc} />
        <Card style={{ padding: 20 }}>
          {isLocked ? renderContent(item) : renderContent(item)}
        </Card>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth: 880, margin: '0 auto', padding: '32px 20px' }}>
      <SectionHeader
        eyebrow="RISK & AUDIT TOOLKIT"
        title="Big 4-aligned consulting templates"
        subtitle="8 components covering the internal audit lifecycle. Click any item to view."
        right={<HomeButton />}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {TOOLKIT_ITEMS.map((item) => {
          const isLocked = item.tier === 'toolkit';
          return (
            <Card
              key={item.id}
              onClick={() => isLocked ? onPaywall() : setOpenItem(item.id)}
              style={{ padding: 16, opacity: isLocked ? 0.8 : 1 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{item.title}</span>
                    <Tag color={tierColor[item.tier]}>{item.tier.toUpperCase()}</Tag>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.45 }}>{item.desc}</p>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: isLocked ? 'var(--pink)' : 'var(--accent)' }}>
                  {isLocked ? 'Locked' : 'View'}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
