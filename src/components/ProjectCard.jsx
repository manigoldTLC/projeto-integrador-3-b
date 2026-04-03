import { useState } from 'react'
import { Link } from 'react-router-dom'

const statusClass = {
  'Concluído': 'badge-concluido',
  'Em andamento': 'badge-andamento',
  'Planejamento': 'badge-planejamento',
  'Pausado': 'badge-pausado',
}

export default function ProjectCard({ project, index = 0 }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        cursor: 'pointer',
        transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s, border-color 0.3s',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(129,140,248,0.15)' : 'var(--shadow-sm)',
        borderColor: hovered ? 'rgba(129,140,248,0.25)' : 'var(--border)',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 220, overflow: 'hidden', background: 'var(--surface-3)' }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, opacity: 0.2 }}>
            🖥
          </div>
        )}

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(8,8,15,0.9) 0%, rgba(8,8,15,0.2) 60%, transparent 100%)',
        }} />

        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(129,140,248,0.08)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }} />

        {/* Status badge on image */}
        <div style={{ position: 'absolute', top: 14, left: 14 }}>
          <span className={`badge ${statusClass[project.status] || 'badge-planejamento'}`}>
            {project.status}
          </span>
        </div>

        {/* Featured */}
        {project.featured && (
          <div style={{ position: 'absolute', top: 14, right: 14 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              height: 24, padding: '0 10px', borderRadius: 6,
              background: 'rgba(52, 211, 153, 0.15)',
              border: '1px solid rgba(52, 211, 153, 0.25)',
              fontSize: 11, fontWeight: 600, color: 'var(--accent-2)',
            }}>
              ★ Destaque
            </span>
          </div>
        )}

        {/* Links on hover */}
        <div style={{
          position: 'absolute', bottom: 14, right: 14,
          display: 'flex', gap: 8,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.25s, transform 0.25s',
        }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                width: 34, height: 34, borderRadius: 9,
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, color: '#fff',
                transition: 'background 0.2s',
                textDecoration: 'none',
              }}
              title="Ver ao vivo"
            >
              ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                width: 34, height: 34, borderRadius: 9,
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, color: '#fff',
                transition: 'background 0.2s',
                textDecoration: 'none',
              }}
              title="Ver código"
            >
              {'</>'}
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
              {project.category} · {project.year}
            </div>
            <h3 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--text)',
              lineHeight: 1.3,
              transition: 'color 0.2s',
              ...(hovered ? { color: 'var(--accent-light)' } : {}),
            }}>
              {project.title}
            </h3>
          </div>
        </div>

        <p style={{
          fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          marginBottom: 16,
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {(project.tags || []).slice(0, 4).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
          {(project.tags || []).length > 4 && (
            <span className="tag">+{project.tags.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  )
}
