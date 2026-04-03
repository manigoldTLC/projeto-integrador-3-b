import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useProjects } from '../context/ProjectsContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ProjectCard from '../components/ProjectCard'

function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t) }, [])

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 'var(--nav-height)',
      maxWidth: '100vw',
    }}>
      {/* Background orbs */}
      <div className="glow-orb" style={{ width: 600, height: 600, background: 'rgba(129,140,248,0.07)', top: -200, left: -200 }} />
      <div className="glow-orb" style={{ width: 400, height: 400, background: 'rgba(52,211,153,0.05)', bottom: -100, right: -100 }} />

      {/* Grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 760 }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px 6px 10px',
            background: 'var(--accent-dim)',
            border: '1px solid rgba(129,140,248,0.25)',
            borderRadius: 100,
            marginBottom: 32,
            opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(10px)',
            transition: 'opacity 0.5s 0.1s, transform 0.5s 0.1s',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-2)', display: 'inline-block', animation: 'pulse-glow 2s ease infinite' }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent-light)' }}>Disponível para projetos</span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(36px, 7vw, 76px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 28,
            wordBreak: 'break-word',
            opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.6s 0.2s, transform 0.6s 0.2s',
          }}>
            Criando
            <br />
            <span className="gradient-text">experiências</span>
            <br />
            digitais.
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.7,
            maxWidth: 520, marginBottom: 44, fontWeight: 300,
            opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.6s 0.35s, transform 0.6s 0.35s',
          }}>
            Desenvolvedor web especializado em interfaces modernas, animações fluidas e soluções de alta performance.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: 14, flexWrap: 'wrap',
            opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.6s 0.5s, transform 0.6s 0.5s',
          }}>
            <a href="#projetos" className="btn btn-primary btn-lg">
              Ver projetos →
            </a>
            <Link to="/contato" className="btn btn-ghost btn-lg">
              Fale comigo
            </Link>
          </div>
        </div>

        {/* Floating tech badges */}
        <div style={{
          position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: 12,
          opacity: loaded ? 1 : 0, transition: 'opacity 0.8s 0.7s',
        }} className="hide-mobile">
          {['React', 'TypeScript', 'Next.js', 'Node.js', 'Figma'].map((tech, i) => (
            <div key={tech} style={{
              padding: '8px 16px',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              fontSize: 13, fontWeight: 500, color: 'var(--text-muted)',
              animation: `float 3s ease-in-out ${i * 0.4}s infinite`,
              transform: 'translateX(0)',
            }}>
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: loaded ? 0.5 : 0, transition: 'opacity 1s 1s',
      }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{
          width: 1, height: 40, background: 'linear-gradient(to bottom, var(--text-muted), transparent)',
          animation: 'float 1.5s ease-in-out infinite',
        }} />
      </div>
    </section>
  )
}

function StatsSection() {
  const [ref, visible] = useScrollReveal()

  return (
    <div ref={ref} className={`reveal section-sm ${visible ? 'visible' : ''}`} id="stats">
      <div className="container">
        <div className="stats-strip">
          {[
            { value: '30+', label: 'Projetos entregues' },
            { value: '5+', label: 'Anos de experiência' },
            { value: '98%', label: 'Clientes satisfeitos' },
            { value: '15+', label: 'Tecnologias dominadas' },
          ].map(({ value, label }) => (
            <div key={label} className="stat-item">
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectsSection() {
  const { projects } = useProjects()
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [headerRef, headerVisible] = useScrollReveal()

  const categories = ['Todos', ...new Set(projects.map(p => p.category))]

  const filtered = activeFilter === 'Todos'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section className="section" id="projetos">
      <div className="container">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`reveal ${headerVisible ? 'visible' : ''}`}
          style={{ marginBottom: 48 }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                Portfólio
              </div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                Projetos em destaque
              </h2>
            </div>
            <Link to="/projetos" className="btn btn-ghost btn-sm">
              Ver todos →
            </Link>
          </div>

          {/* Filter tabs */}
          <div className="filter-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
                <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>
                  {cat === 'Todos' ? projects.length : projects.filter(p => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <div className="empty-title">Nenhum projeto ainda</div>
            <div className="empty-desc">Adicione seu primeiro projeto para começar a construir seu portfólio.</div>
            <Link to="/novo-projeto" className="btn btn-primary" style={{ marginTop: 8 }}>+ Adicionar projeto</Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 24,
          }}>
            {filtered.map((project, i) => (
              <AnimatedCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function AnimatedCard({ project, index }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`reveal reveal-d${Math.min(index % 3 + 1, 6)} ${visible ? 'visible' : ''}`}
    >
      <ProjectCard project={project} index={index} />
    </div>
  )
}

function CTASection() {
  const [ref, visible] = useScrollReveal()

  return (
    <section className="section">
      <div className="container">
        <div
          ref={ref}
          className={`reveal ${visible ? 'visible' : ''}`}
          style={{
            position: 'relative',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '72px 64px',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Orbs */}
          <div className="glow-orb" style={{ width: 300, height: 300, background: 'rgba(129,140,248,0.08)', top: -100, left: -100 }} />
          <div className="glow-orb" style={{ width: 200, height: 200, background: 'rgba(52,211,153,0.06)', bottom: -50, right: 50 }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 18 }}>
              Vamos trabalhar juntos?
            </h2>
            <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>
              Estou disponível para projetos freelance, consultorias e oportunidades de emprego.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contato" className="btn btn-primary btn-lg">
                Entrar em contato
              </Link>
              <Link to="/sobre" className="btn btn-ghost btn-lg">
                Saber mais sobre mim
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ProjectsSection />
      <CTASection />
    </main>
  )
}
