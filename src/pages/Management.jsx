import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProjects } from '../context/ProjectsContext'
import { useToast } from '../components/Toast'

const statusClass = {
  'Concluído': 'badge-concluido',
  'Em andamento': 'badge-andamento',
  'Planejamento': 'badge-planejamento',
  'Pausado': 'badge-pausado',
}

function DeleteModal({ project, onCancel, onConfirm }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--danger-dim)', border: '1px solid rgba(248,113,113,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>
            🗑
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Excluir projeto</h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Tem certeza que deseja excluir{' '}
            <strong style={{ color: 'var(--text)' }}>{project.title}</strong>?
            {' '}Essa ação não pode ser desfeita.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
          <button className="btn btn-danger" onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  )
}

export default function Management() {
  const { projects, deleteProject } = useProjects()
  const toast = useToast()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [sortBy, setSortBy] = useState('createdAt')

  const statuses = ['Todos', 'Concluído', 'Em andamento', 'Planejamento', 'Pausado']

  const filtered = projects
    .filter(p => {
      const q = search.toLowerCase()
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.tags || []).some(t => t.toLowerCase().includes(q))
      const matchStatus = statusFilter === 'Todos' || p.status === statusFilter
      return matchSearch && matchStatus
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'status') return a.status.localeCompare(b.status)
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

  const handleDelete = () => {
    if (!deleteTarget) return
    deleteProject(deleteTarget.id)
    toast.success(`"${deleteTarget.title}" excluído com sucesso`)
    setDeleteTarget(null)
  }

  const formatDate = (iso) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <main style={{ paddingTop: 'var(--nav-height)', paddingBottom: 80, minHeight: '100vh' }}>
      <div className="container">

        {/* Page header */}
        <div style={{ paddingTop: 48, paddingBottom: 40, borderBottom: '1px solid var(--border)', marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Administração</div>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10 }}>
                Gerenciar Projetos
              </h1>
              <p style={{ fontSize: 15, color: 'var(--text-muted)' }}>
                {projects.length} projeto{projects.length !== 1 ? 's' : ''} cadastrado{projects.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Filters bar */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 24 }}>
          {/* Search */}
          <div className="search-wrap" style={{ flex: 1, minWidth: 220 }}>
            <span className="search-icon" style={{ fontSize: 16 }}>🔍</span>
            <input
              className="form-input"
              placeholder="Buscar por título, categoria ou tecnologia..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {/* Status filter */}
          <select
            className="form-select"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ width: 180 }}
          >
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>

          {/* Sort */}
          <select
            className="form-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{ width: 170 }}
          >
            <option value="createdAt">Mais recentes</option>
            <option value="title">Título A-Z</option>
            <option value="status">Status</option>
          </select>
        </div>

        {/* Summary chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {['Concluído', 'Em andamento', 'Planejamento', 'Pausado'].map(s => {
            const count = projects.filter(p => p.status === s).length
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(statusFilter === s ? 'Todos' : s)}
                className={`badge ${statusClass[s]}`}
                style={{ cursor: 'pointer', border: '1px solid transparent', transition: 'all 0.18s', height: 28, padding: '0 12px', fontSize: 12 }}
              >
                {s} ({count})
              </button>
            )
          })}
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="empty-state" style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <div className="empty-icon">{search ? '🔍' : '📂'}</div>
            <div className="empty-title">{search ? 'Nenhum resultado' : 'Nenhum projeto ainda'}</div>
            <div className="empty-desc">
              {search ? `Nenhum projeto encontrado para "${search}".` : 'Comece adicionando seu primeiro projeto ao portfólio.'}
            </div>
            {!search && (
              <Link to="/novo-projeto" className="btn btn-primary" style={{ marginTop: 8 }}>
                + Adicionar projeto
              </Link>
            )}
          </div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Projeto</th>
                  <th>Categoria</th>
                  <th>Status</th>
                  <th className="hide-mobile">Tecnologias</th>
                  <th className="hide-mobile">Ano</th>
                  <th className="hide-mobile">Criado em</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(project => (
                  <tr key={project.id}>
                    {/* Project */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {project.image ? (
                          <img src={project.image} alt="" className="thumb" />
                        ) : (
                          <div className="thumb-placeholder">🖥</div>
                        )}
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14, marginBottom: 2 }}>
                            {project.title}
                          </div>
                          {project.featured && (
                            <span style={{ fontSize: 11, color: 'var(--accent-2)', fontWeight: 600 }}>★ Destaque</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{project.category}</span>
                    </td>

                    {/* Status */}
                    <td>
                      <span className={`badge ${statusClass[project.status] || 'badge-planejamento'}`}>
                        {project.status}
                      </span>
                    </td>

                    {/* Tags */}
                    <td className="hide-mobile">
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                        {(project.tags || []).slice(0, 2).map(t => (
                          <span key={t} className="tag" style={{ fontSize: 11, height: 22, padding: '0 8px' }}>{t}</span>
                        ))}
                        {(project.tags || []).length > 2 && (
                          <span className="tag" style={{ fontSize: 11, height: 22, padding: '0 8px' }}>+{project.tags.length - 2}</span>
                        )}
                      </div>
                    </td>

                    {/* Year */}
                    <td className="hide-mobile">
                      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{project.year || '—'}</span>
                    </td>

                    {/* Date */}
                    <td className="hide-mobile">
                      <span style={{ fontSize: 13, color: 'var(--text-faint)' }}>{formatDate(project.createdAt)}</span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost btn-icon btn-sm"
                            title="Ver ao vivo"
                          >
                            ↗
                          </a>
                        )}
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => navigate(`/editar/${project.id}`)}
                          title="Editar"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteTarget(project)}
                          title="Excluir"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ padding: '14px 18px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-2)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-faint)' }}>
                {filtered.length} de {projects.length} projeto{projects.length !== 1 ? 's' : ''}
              </span>
              {search && (
                <button className="btn btn-ghost btn-sm" onClick={() => setSearch('')}>
                  Limpar busca
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {deleteTarget && (
        <DeleteModal
          project={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </main>
  )
}
