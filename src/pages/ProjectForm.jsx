import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useProjects, CATEGORIES, STATUSES } from '../context/ProjectsContext'
import { useToast } from '../components/Toast'

const EMPTY = {
  title: '',
  description: '',
  category: 'Aplicativo Web',
  tags: '',
  image: '',
  liveUrl: '',
  githubUrl: '',
  status: 'Em andamento',
  featured: false,
  year: new Date().getFullYear().toString(),
}

export default function ProjectForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { addProject, updateProject, getProject } = useProjects()
  const toast = useToast()

  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (isEdit) {
      const project = getProject(id)
      if (!project) { toast.error('Projeto não encontrado'); navigate('/gerenciamento'); return }
      setForm({ ...EMPTY, ...project, tags: '' })
      setTagInput((project.tags || []).join(', '))
    }
  }, [id])

  const set = (key, value) => {
    setForm(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'O título é obrigatório'
    if (!form.description.trim()) e.description = 'A descrição é obrigatória'
    if (form.description.trim().length < 20) e.description = 'A descrição deve ter ao menos 20 caracteres'
    if (form.image && !isValidUrl(form.image)) e.image = 'URL da imagem inválida'
    if (form.liveUrl && !isValidUrl(form.liveUrl)) e.liveUrl = 'URL inválida'
    if (form.githubUrl && !isValidUrl(form.githubUrl)) e.githubUrl = 'URL inválida'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const isValidUrl = (str) => {
    try { new URL(str); return true } catch { return false }
  }

  const parseTags = (raw) =>
    raw.split(',').map(t => t.trim()).filter(Boolean)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)

    await new Promise(r => setTimeout(r, 400)) // simulate async

    const data = { ...form, tags: parseTags(tagInput) }

    if (isEdit) {
      updateProject(id, data)
      toast.success('Projeto atualizado com sucesso!')
    } else {
      addProject(data)
      toast.success('Projeto adicionado com sucesso!')
    }
    navigate('/gerenciamento')
  }

  const Field = ({ label, name, hint, children }) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {children}
      {errors[name] && <span style={{ fontSize: 12, color: 'var(--danger)' }}>{errors[name]}</span>}
      {hint && !errors[name] && <span className="form-hint">{hint}</span>}
    </div>
  )

  const tags = parseTags(tagInput)

  return (
    <main style={{ paddingTop: 'var(--nav-height)', paddingBottom: 80, minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 780 }}>

        {/* Header */}
        <div style={{ paddingTop: 48, paddingBottom: 36, borderBottom: '1px solid var(--border)', marginBottom: 40 }}>
          <Link to="/gerenciamento" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)', marginBottom: 20, textDecoration: 'none' }}>
            ← Voltar ao gerenciamento
          </Link>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>
            {isEdit ? 'Editar Projeto' : 'Novo Projeto'}
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-muted)' }}>
            {isEdit ? 'Atualize as informações do projeto.' : 'Preencha as informações para adicionar ao portfólio.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Basic info */}
            <section>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent-dim)', border: '1px solid rgba(129,140,248,0.2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>1</span>
                Informações básicas
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Field label="Título do projeto *" name="title">
                  <input
                    className="form-input"
                    placeholder="Ex: Dashboard de Analytics"
                    value={form.title}
                    onChange={e => set('title', e.target.value)}
                    style={errors.title ? { borderColor: 'var(--danger)' } : {}}
                  />
                </Field>

                <Field label="Descrição *" name="description" hint="Descreva o projeto, seus objetivos e principais funcionalidades.">
                  <textarea
                    className="form-textarea"
                    placeholder="Uma descrição clara e objetiva do projeto..."
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                    style={errors.description ? { borderColor: 'var(--danger)' } : {}}
                    rows={4}
                  />
                </Field>

                <div className="form-grid-2">
                  <Field label="Categoria" name="category">
                    <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Ano" name="year">
                    <input
                      className="form-input"
                      placeholder="2024"
                      value={form.year}
                      onChange={e => set('year', e.target.value)}
                    />
                  </Field>
                </div>

                <Field label="Status" name="status">
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {STATUSES.map(s => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => set('status', s)}
                        style={{
                          height: 36, padding: '0 16px', borderRadius: 9, fontSize: 13, fontWeight: 500,
                          border: '1px solid',
                          cursor: 'pointer', transition: 'all 0.18s',
                          ...(form.status === s
                            ? { background: 'var(--accent-dim)', borderColor: 'rgba(129,140,248,0.4)', color: 'var(--accent-light)' }
                            : { background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text-muted)' })
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            </section>

            {/* Divider */}
            <div className="divider" />

            {/* Media & Links */}
            <section>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent-dim)', border: '1px solid rgba(129,140,248,0.2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>2</span>
                Mídia e links
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Field label="URL da imagem" name="image" hint="Cole a URL de uma imagem (Unsplash, Imgur, etc.)">
                  <input
                    className="form-input"
                    placeholder="https://images.unsplash.com/..."
                    value={form.image}
                    onChange={e => set('image', e.target.value)}
                    style={errors.image ? { borderColor: 'var(--danger)' } : {}}
                  />
                </Field>

                {/* Image preview */}
                {form.image && (
                  <div className={`img-preview ${form.image ? 'has-img' : ''}`}>
                    <img
                      src={form.image}
                      alt="Preview"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  </div>
                )}

                <div className="form-grid-2">
                  <Field label="URL do projeto (ao vivo)" name="liveUrl">
                    <input
                      className="form-input"
                      placeholder="https://meu-projeto.com"
                      value={form.liveUrl}
                      onChange={e => set('liveUrl', e.target.value)}
                      style={errors.liveUrl ? { borderColor: 'var(--danger)' } : {}}
                    />
                  </Field>
                  <Field label="URL do GitHub" name="githubUrl">
                    <input
                      className="form-input"
                      placeholder="https://github.com/user/repo"
                      value={form.githubUrl}
                      onChange={e => set('githubUrl', e.target.value)}
                      style={errors.githubUrl ? { borderColor: 'var(--danger)' } : {}}
                    />
                  </Field>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="divider" />

            {/* Tags & options */}
            <section>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent-dim)', border: '1px solid rgba(129,140,248,0.2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>3</span>
                Tecnologias e opções
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Field label="Tecnologias usadas" name="tags" hint="Separe as tecnologias por vírgula.">
                  <input
                    className="form-input"
                    placeholder="React, TypeScript, Node.js, PostgreSQL"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                  />
                </Field>

                {/* Tags preview */}
                {tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                )}

                {/* Featured toggle */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', marginBottom: 4 }}>Projeto em destaque ★</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Aparece com destaque na home e na listagem.</div>
                  </div>
                  <label className="toggle-wrap" style={{ cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={form.featured}
                      onChange={e => set('featured', e.target.checked)}
                    />
                    <div className="toggle" />
                  </label>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end', paddingTop: 8 }}>
              <Link to="/gerenciamento" className="btn btn-ghost">
                Cancelar
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
                style={{ minWidth: 160, opacity: saving ? 0.7 : 1 }}
              >
                {saving ? 'Salvando...' : isEdit ? '✓ Salvar alterações' : '+ Adicionar projeto'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
