import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contato', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { isAdmin, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 'var(--nav-height)',
      display: 'flex', alignItems: 'center',
      background: scrolled ? 'rgba(8, 8, 15, 0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff',
            boxShadow: '0 0 20px rgba(129,140,248,0.35)',
          }}>P</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Portfólio
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {publicLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: isActive ? 'var(--accent-light)' : 'var(--text-muted)',
                background: isActive ? 'var(--accent-dim)' : 'transparent',
                transition: 'all 0.18s',
                textDecoration: 'none',
              })}
            >
              {label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/gerenciamento"
              style={({ isActive }) => ({
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: isActive ? 'var(--accent-light)' : 'var(--text-muted)',
                background: isActive ? 'var(--accent-dim)' : 'transparent',
                transition: 'all 0.18s',
                textDecoration: 'none',
              })}
            >
              Admin
            </NavLink>
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {isAdmin ? (
            <>
              <Link to="/novo-projeto" className="btn btn-primary btn-sm">+ Novo projeto</Link>
              <button className="btn btn-ghost btn-sm" onClick={logout}>Sair</button>
            </>
          ) : (
            null
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="hide-desktop"
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 9, width: 38, height: 38, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, flexShrink: 0 }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{ display: 'block', height: 1.5, borderRadius: 2, background: 'var(--text-muted)', width: i === 1 ? 14 : 20 }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(14,14,24,0.97)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          padding: '16px 24px 24px',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {publicLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                padding: '12px 16px', borderRadius: 10, fontSize: 15, fontWeight: 500,
                color: isActive ? 'var(--accent-light)' : 'var(--text-muted)',
                background: isActive ? 'var(--accent-dim)' : 'transparent',
                textDecoration: 'none',
              })}
            >
              {label}
            </NavLink>
          ))}
          {isAdmin && (
            <>
              <NavLink to="/gerenciamento" style={({ isActive }) => ({ padding: '12px 16px', borderRadius: 10, fontSize: 15, fontWeight: 500, color: isActive ? 'var(--accent-light)' : 'var(--text-muted)', background: isActive ? 'var(--accent-dim)' : 'transparent', textDecoration: 'none' })}>
                Gerenciar
              </NavLink>
              <Link to="/novo-projeto" className="btn btn-primary" style={{ marginTop: 8 }}>+ Novo projeto</Link>
              <button className="btn btn-ghost" style={{ marginTop: 6 }} onClick={logout}>Sair da conta admin</button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
