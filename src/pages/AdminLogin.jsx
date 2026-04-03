import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const { login, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/gerenciamento'

  const [form, setForm] = useState({ user: '', pass: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAdmin) {
    navigate(from, { replace: true })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    const ok = login(form.user, form.pass)
    setLoading(false)
    if (ok) {
      navigate(from, { replace: true })
    } else {
      setError('Usuário ou senha incorretos.')
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div className="glow-orb" style={{ width: 400, height: 400, background: 'rgba(129,140,248,0.06)', top: -100, left: -100 }} />
      <div className="glow-orb" style={{ width: 300, height: 300, background: 'rgba(52,211,153,0.04)', bottom: -80, right: -80 }} />

      <div style={{ width: '100%', maxWidth: 380, position: 'relative', zIndex: 1 }}>
        {/* Back link */}
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)', marginBottom: 32, textDecoration: 'none' }}>
          ← Voltar ao site
        </Link>

        {/* Card */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '36px 32px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#fff' }}>P</div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, color: 'var(--text)' }}>Portfólio</span>
          </div>

          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Acesso restrito</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 28, lineHeight: 1.6 }}>
            Esta área é exclusiva para administradores.
          </p>

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Usuário</label>
              <input
                className="form-input"
                placeholder="admin"
                value={form.user}
                onChange={e => { setForm(f => ({ ...f, user: e.target.value })); setError('') }}
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Senha</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
                value={form.pass}
                onChange={e => { setForm(f => ({ ...f, pass: e.target.value })); setError('') }}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div style={{ padding: '11px 14px', background: 'var(--danger-dim)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 'var(--radius)', fontSize: 13, color: 'var(--danger)' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ marginTop: 4, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Verificando...' : 'Entrar →'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
