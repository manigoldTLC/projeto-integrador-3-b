import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useToast } from '../components/Toast'

function InfoCard({ icon, title, value, href, delay }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`reveal reveal-d${delay} ${visible ? 'visible' : ''}`}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        display: 'flex', flexDirection: 'column', gap: 12,
        transition: 'border-color 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-dim)', border: '1px solid rgba(129,140,248,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{title}</div>
        {href ? (
          <a href={href} style={{ fontSize: 15, fontWeight: 500, color: 'var(--accent-light)', textDecoration: 'none' }}
            onMouseEnter={e => e.target.style.textDecoration = 'underline'}
            onMouseLeave={e => e.target.style.textDecoration = 'none'}
          >{value}</a>
        ) : (
          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>{value}</div>
        )}
      </div>
    </div>
  )
}

export default function Contact() {
  const toast = useToast()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [heroRef, heroVisible] = useScrollReveal()

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); if (errors[k]) setErrors(e => ({ ...e, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Nome obrigatório'
    if (!form.email.trim()) e.email = 'E-mail obrigatório'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'E-mail inválido'
    if (!form.subject.trim()) e.subject = 'Assunto obrigatório'
    if (!form.message.trim() || form.message.trim().length < 20) e.message = 'Mensagem muito curta (mínimo 20 caracteres)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSending(true)
    await new Promise(r => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
    toast.success('Mensagem enviada com sucesso!')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <main style={{ paddingTop: 'var(--nav-height)', paddingBottom: 80 }}>
      <div className="container">

        {/* Hero */}
        <div
          ref={heroRef}
          className={`reveal ${heroVisible ? 'visible' : ''}`}
          style={{ paddingTop: 64, paddingBottom: 64, maxWidth: 600 }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Contato</div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 20 }}>
            Vamos conversar
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300 }}>
            Tem um projeto em mente, uma ideia para desenvolver ou quer apenas bater um papo?
            Estou disponível e responderei em até 24 horas.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}>

          {/* Form */}
          <div>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '60px 40px', background: 'var(--surface)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--success-dim)', border: '1px solid rgba(52,211,153,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>✓</div>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700 }}>Mensagem enviada!</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.6, maxWidth: 340 }}>
                  Obrigado pelo contato. Retornarei em breve!
                </p>
                <button className="btn btn-ghost" style={{ marginTop: 8 }} onClick={() => setSent(false)}>
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Nome *</label>
                    <input className="form-input" placeholder="Seu nome completo" value={form.name} onChange={e => set('name', e.target.value)} style={errors.name ? { borderColor: 'var(--danger)' } : {}} />
                    {errors.name && <span style={{ fontSize: 12, color: 'var(--danger)' }}>{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">E-mail *</label>
                    <input className="form-input" type="email" placeholder="seu@email.com" value={form.email} onChange={e => set('email', e.target.value)} style={errors.email ? { borderColor: 'var(--danger)' } : {}} />
                    {errors.email && <span style={{ fontSize: 12, color: 'var(--danger)' }}>{errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Assunto *</label>
                  <input className="form-input" placeholder="Como posso te ajudar?" value={form.subject} onChange={e => set('subject', e.target.value)} style={errors.subject ? { borderColor: 'var(--danger)' } : {}} />
                  {errors.subject && <span style={{ fontSize: 12, color: 'var(--danger)' }}>{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Mensagem *</label>
                  <textarea className="form-textarea" placeholder="Descreva seu projeto ou dúvida em detalhes..." rows={6} value={form.message} onChange={e => set('message', e.target.value)} style={errors.message ? { borderColor: 'var(--danger)' } : {}} />
                  {errors.message && <span style={{ fontSize: 12, color: 'var(--danger)' }}>{errors.message}</span>}
                </div>

                {/* Subject chips */}
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-faint)', marginBottom: 10 }}>Sugestões de assunto:</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['Projeto freelance', 'Consultoria', 'Parceria', 'Orçamento', 'Outro'].map(s => (
                      <button key={s} type="button"
                        onClick={() => set('subject', s)}
                        style={{
                          height: 30, padding: '0 14px', borderRadius: 8, fontSize: 12,
                          fontWeight: 500, cursor: 'pointer', transition: 'all 0.18s',
                          border: '1px solid var(--border)',
                          background: form.subject === s ? 'var(--accent-dim)' : 'var(--surface-2)',
                          color: form.subject === s ? 'var(--accent-light)' : 'var(--text-muted)',
                          borderColor: form.subject === s ? 'rgba(129,140,248,0.35)' : 'var(--border)',
                        }}
                      >{s}</button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" disabled={sending} style={{ alignSelf: 'flex-start', opacity: sending ? 0.7 : 1 }}>
                  {sending ? 'Enviando...' : 'Enviar mensagem →'}
                </button>
              </form>
            )}
          </div>

          {/* Info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <InfoCard icon="📧" title="E-mail" value="ola@portfolio.dev" href="mailto:ola@portfolio.dev" delay={1} />
            <InfoCard icon="💼" title="LinkedIn" value="linkedin.com/in/portfolio" href="https://linkedin.com" delay={2} />
            <InfoCard icon="🐙" title="GitHub" value="github.com/portfolio" href="https://github.com" delay={3} />
            <InfoCard icon="📍" title="Localização" value="Brasil · Remoto" delay={4} />
            <InfoCard icon="⏱" title="Disponibilidade" value="Resposta em até 24h" delay={5} />

            {/* Status */}
            <div style={{
              padding: '16px 20px',
              background: 'var(--success-dim)',
              border: '1px solid rgba(52,211,153,0.2)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--success)', display: 'block', animation: 'pulse-glow 2s ease infinite' }} />
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--success)' }}>Disponível para projetos</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 840px) {
          main > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
