import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)',
      padding: '48px 0 32px',
      marginTop: 'auto',
      overflow: 'hidden',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 48, alignItems: 'start' }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
              }}>P</div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>Portfólio</span>
            </Link>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 260 }}>
              Desenvolvedor web focado em experiências digitais modernas e de alta performance.
            </p>
          </div>

          {/* Pages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>Páginas</span>
            {[['/', 'Home'], ['/sobre', 'Sobre'], ['/faq', 'FAQ'], ['/contato', 'Contato']].map(([to, label]) => (
              <Link key={to} to={to} style={{ fontSize: 13, color: 'var(--text-muted)', transition: 'color 0.18s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >{label}</Link>
            ))}
          </div>

          {/* Social */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>Social</span>
            {[['GitHub', 'https://github.com'], ['LinkedIn', 'https://linkedin.com']].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 13, color: 'var(--text-muted)', transition: 'color 0.18s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => e.target.style.color = 'var(--accent-light)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >{label} ↗</a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--text-faint)' }}>© {year} Portfólio. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  )
}
