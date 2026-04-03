import { useState } from 'react'
import { useProjects } from '../context/ProjectsContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ProjectCard from '../components/ProjectCard'

function AnimatedCard({ project, index }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div ref={ref} className={`reveal reveal-d${Math.min((index % 3) + 1, 6)} ${visible ? 'visible' : ''}`}>
      <ProjectCard project={project} index={index} />
    </div>
  )
}

export default function Projects() {
  const { projects } = useProjects()
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [activeStatus, setActiveStatus] = useState('Todos')
  const [search, setSearch] = useState('')
  const [heroRef, heroVisible] = useScrollReveal()

  const categories = ['Todos', ...new Set(projects.map(p => p.category))]
  const statuses = ['Todos', 'Concluído', 'Em andamento', 'Planejamento', 'Pausado']

  const filtered = projects.filter(p => {
    const q = search.toLowerCase()
    const matchCat = activeFilter === 'Todos' || p.category === activeFilter
    const matchStatus = activeStatus === 'Todos' || p.status === activeStatus
    const matchSearch = !q || p.title.toLowerCase().includes(q) || (p.tags || []).some(t => t.toLowerCase().includes(q))
    return matchCat && matchStatus && matchSearch
  })

  return (
    <main style={{ paddingTop: 'var(--nav-height)', paddingBottom: 80, minHeight: '100vh' }}>
      <div className="container">
        {/* Hero */}
        <div
          ref={heroRef}
          className={`reveal ${heroVisible ? 'visible' : ''}`}
          style={{ paddingTop: 64, paddingBottom: 56 }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
            Portfólio
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 18 }}>
            Todos os projetos
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: 520, marginBottom: 36 }}>
            Uma coleção completa de projetos desenvolvidos ao longo da minha carreira — de landing pages a aplicações web complexas.
          </p>

          {/* Search */}
          <div className="search-wrap" style={{ maxWidth: 420 }}>
            <span className="search-icon" style={{ fontSize: 15 }}>🔍</span>
            <input
              className="form-input"
              placeholder="Buscar por título ou tecnologia..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Categoria</div>
            <div className="filter-tabs">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ width: 1, height: 40, background: 'var(--border)', margin: '0 4px' }} className="hide-mobile" />

          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Status</div>
            <div className="filter-tabs">
              {statuses.map(s => (
                <button
                  key={s}
                  className={`filter-tab ${activeStatus === s ? 'active' : ''}`}
                  onClick={() => setActiveStatus(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            {filtered.length} projeto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
            {(activeFilter !== 'Todos' || activeStatus !== 'Todos' || search) && (
              <button
                onClick={() => { setActiveFilter('Todos'); setActiveStatus('Todos'); setSearch('') }}
                style={{ marginLeft: 12, fontSize: 12, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Limpar filtros
              </button>
            )}
          </span>
          <span style={{ fontSize: 13, color: 'var(--text-faint)' }}>
            {projects.filter(p => p.featured).length} em destaque
          </span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <div className="empty-title">Nenhum projeto encontrado</div>
            <div className="empty-desc">Tente ajustar os filtros ou a busca para encontrar o que procura.</div>
            <button
              className="btn btn-ghost"
              style={{ marginTop: 8 }}
              onClick={() => { setActiveFilter('Todos'); setActiveStatus('Todos'); setSearch('') }}
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {filtered.map((project, i) => (
              <AnimatedCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
