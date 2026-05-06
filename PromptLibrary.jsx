import { useState } from 'react';
import { SectionHeader, Card, Tag, PrimaryButton, HomeButton } from '../components/ui';
import { PROMPTS, CATEGORIES } from '../data/prompts';

export default function PromptLibrary({ onView, viewed, onPaywall }) {
  const [cat, setCat] = useState('all');
  const [open, setOpen] = useState(null);
  const [copied, setCopied] = useState(null);

  const filtered = cat === 'all' ? PROMPTS : PROMPTS.filter((p) => p.cat === cat);

  const handleCopy = (text, id) => {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fade-in" style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 20px' }}>
      <SectionHeader
        eyebrow="AI PROMPT LIBRARY"
        title={`${PROMPTS.length} prompts for Risk, GRC, Audit & Finance`}
        subtitle="Anti-hallucination constraints and self-validation built in. +2 XP per prompt explored."
        right={<HomeButton />}
      />

      {/* Filters */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 18 }}>
        <button
          onClick={() => { setCat('all'); setOpen(null); }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
            padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer',
            background: cat === 'all' ? 'var(--accent)' : 'var(--s2)',
            color: cat === 'all' ? '#fff' : 'var(--t2)',
          }}
        >
          All ({PROMPTS.length})
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => { setCat(c.id); setOpen(null); }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
              padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer',
              background: cat === c.id ? c.color : 'var(--s2)',
              color: cat === c.id ? '#fff' : 'var(--t2)',
            }}
          >
            {c.label} ({PROMPTS.filter((p) => p.cat === c.id).length})
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 8 }}>
        {filtered.map((p) => {
          const c = CATEGORIES.find((x) => x.id === p.cat);
          const isOpen = open === p.id;

          return (
            <Card
              key={p.id}
              active={isOpen}
              onClick={() => {
                setOpen(isOpen ? null : p.id);
                if (!isOpen) onView(p.id);
              }}
              style={{ padding: 16 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <Tag color={c?.color}>{c?.label}</Tag>
                <div style={{ display: 'flex', gap: 3 }}>
                  <Tag color={p.tag === 'Premium' ? 'var(--pink)' : 'var(--sky)'}>{p.tag}</Tag>
                  <Tag color={p.free ? 'var(--green)' : 'var(--t3)'}>{p.free ? 'FREE' : 'PRO'}</Tag>
                </div>
              </div>
              <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontSize: 11, color: 'var(--t3)', lineHeight: 1.4 }}>{p.use}</p>

              {isOpen && (
                <div style={{ marginTop: 10 }} onClick={(e) => e.stopPropagation()}>
                  {p.free ? (
                    <div>
                      <pre
                        style={{
                          fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.5,
                          whiteSpace: 'pre-wrap', color: 'var(--t2)', background: 'var(--bg)',
                          border: '1px solid var(--bdr)', borderRadius: 8, padding: 12, marginBottom: 6,
                        }}
                      >
                        {p.prompt}
                      </pre>
                      {p.why && (
                        <details style={{ marginBottom: 6 }}>
                          <summary style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 500, cursor: 'pointer', listStyle: 'none' }}>
                            &#9654; Why this works
                          </summary>
                          <p style={{ fontSize: 11, color: 'var(--t2)', lineHeight: 1.5, marginTop: 4, paddingLeft: 10, borderLeft: '2px solid var(--accent)' }}>
                            {p.why}
                          </p>
                        </details>
                      )}
                      <PrimaryButton onClick={() => handleCopy(p.prompt, p.id)} style={{ width: '100%', fontSize: 12 }}>
                        {copied === p.id ? 'Copied!' : 'Copy Prompt'}
                      </PrimaryButton>
                    </div>
                  ) : (
                    <div style={{ background: 'var(--s2)', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                      <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 3 }}>Pro content</p>
                      <p style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 10 }}>{p.use}</p>
                      <PrimaryButton onClick={onPaywall}>Unlock</PrimaryButton>
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
