import { NavLink, useNavigate } from 'react-router-dom';

export function Navbar({ xp, isDark, setIsDark, levels }) {
  const lv = levels.slice().reverse().find((l) => xp >= l.min) || levels[0];
  const navigate = useNavigate();

  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/prompts', label: 'Prompts' },
    { to: '/study', label: 'Study System' },
    { to: '/toolkit', label: 'Toolkit' },
    { to: '/simlab', label: 'Sim Lab' },
    { to: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'var(--bg)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--bdr)',
        padding: '0 20px', height: 52,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
    >
      <button
        onClick={() => navigate('/')}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--t1)', letterSpacing: '.02em' }}>
          RAFAY ASHRAF
        </span>
        <span style={{ fontSize: 11, color: 'var(--t3)' }}>ACCA</span>
        <span style={{ width: 16, height: 2, background: 'var(--accent)' }} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            style={({ isActive }) => ({
              background: isActive ? 'var(--s2)' : 'none',
              border: 'none', textDecoration: 'none',
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
              color: isActive ? 'var(--t1)' : 'var(--t3)',
              padding: '5px 10px', borderRadius: 6, transition: 'all .15s',
            })}
          >
            {l.label}
          </NavLink>
        ))}

        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            background: 'none', border: '1px solid var(--bdr)', borderRadius: 6,
            padding: '4px 8px', fontSize: 11, color: 'var(--t2)', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', marginLeft: 8,
          }}
        >
          {isDark ? 'Light' : 'Dark'}
        </button>

        {xp > 0 && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--sky)', marginLeft: 8, fontWeight: 500 }}>
            {xp} XP
          </span>
        )}
      </div>
    </nav>
  );
}

export function ProgressBar({ value, color, height = 4 }) {
  return (
    <div style={{ height, background: 'var(--s2)', borderRadius: 4, overflow: 'hidden' }}>
      <div
        style={{
          height: '100%', borderRadius: 4, width: `${Math.min(value, 100)}%`,
          transition: 'width 0.5s ease',
          background: color || 'linear-gradient(90deg, var(--accent), var(--sky))',
        }}
      />
    </div>
  );
}

export function PaywallModal({ onClose }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        className="pop-in"
        style={{
          background: 'var(--s1)', border: '1px solid var(--bdr)', borderRadius: 14,
          padding: 28, maxWidth: 380, width: '90%', textAlign: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '.08em', marginBottom: 10 }}>
          UPGRADE REQUIRED
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--t1)', marginBottom: 8 }}>
          Unlock this content
        </h2>
        <p style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.6, marginBottom: 20 }}>
          Available with Pro ($7/mo) or Premium Toolkit ($24 one-time).
        </p>
        <button
          style={{
            width: '100%', padding: '10px 20px', borderRadius: 8, border: 'none',
            background: 'var(--accent)', color: '#fff', fontSize: 13, fontWeight: 600,
            fontFamily: 'var(--font-display)', cursor: 'pointer', marginBottom: 8,
          }}
        >
          Start 7-Day Free Trial
        </button>
        <button
          onClick={onClose}
          style={{
            width: '100%', padding: '10px 20px', borderRadius: 8,
            background: 'none', border: '1px solid var(--bdr)', color: 'var(--t2)',
            fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-display)', cursor: 'pointer',
          }}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}

export function Tooltip({ term, definition, children }) {
  if (!definition) return <span>{children || term}</span>;
  return (
    <span style={{ position: 'relative', display: 'inline-block' }} className="tooltip-wrap">
      <span style={{ borderBottom: '1px dashed var(--accent)', cursor: 'help' }}>
        {children || term}
      </span>
      <span
        className="tooltip-popup"
        style={{
          display: 'none', position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%',
          transform: 'translateX(-50%)', background: 'var(--s1)', border: '1px solid var(--bdr)',
          borderRadius: 8, padding: '10px 14px', fontSize: 12, color: 'var(--t2)',
          width: 260, zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,.15)',
          lineHeight: 1.5, whiteSpace: 'normal',
        }}
      >
        <strong style={{ color: 'var(--t1)', display: 'block', marginBottom: 4 }}>{term}</strong>
        {definition}
      </span>
      <style>{`.tooltip-wrap:hover .tooltip-popup { display: block !important; }`}</style>
    </span>
  );
}

export function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        background: 'none', border: '1px solid var(--bdr)', borderRadius: 6,
        padding: '5px 12px', fontSize: 11, color: 'var(--t2)', cursor: 'pointer',
        fontFamily: 'var(--font-body)', marginBottom: 16,
      }}
    >
      &larr; Back
    </button>
  );
}

export function HomeButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/')}
      style={{
        background: 'none', border: '1px solid var(--bdr)', borderRadius: 6,
        padding: '4px 10px', fontSize: 11, color: 'var(--t3)', cursor: 'pointer',
        fontFamily: 'var(--font-body)',
      }}
    >
      Home
    </button>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, right }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--t3)', letterSpacing: '.08em', marginBottom: 6 }}>
          {eyebrow}
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: 'var(--t2)' }}>{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function Card({ children, onClick, style = {}, active = false }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--s1)', border: `1px solid ${active ? 'var(--accent)' : 'var(--bdr)'}`,
        borderRadius: 10, transition: 'border-color .15s, box-shadow .15s',
        cursor: onClick ? 'pointer' : 'default', ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Tag({ children, color }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500,
        padding: '3px 8px', borderRadius: 4, letterSpacing: '.03em',
        color: color || 'var(--t3)', background: `${color || 'var(--t3)'}12`,
      }}
    >
      {children}
    </span>
  );
}

export function PrimaryButton({ children, onClick, style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
        background: 'var(--accent)', color: '#fff', fontSize: 13, fontWeight: 600,
        fontFamily: 'var(--font-display)', transition: 'opacity .15s', ...style,
      }}
    >
      {children}
    </button>
  );
}
