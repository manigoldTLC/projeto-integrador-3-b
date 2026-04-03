import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'portfolio_projects'

const defaultProjects = [
  {
    id: '1',
    title: 'E-commerce Dashboard',
    description: 'Painel administrativo completo para gerenciamento de e-commerce com análises em tempo real, gestão de estoque e relatórios detalhados.',
    category: 'Dashboard',
    tags: ['React', 'TypeScript', 'Chart.js', 'TailwindCSS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    status: 'Concluído',
    featured: true,
    year: '2024',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'App de Finanças Pessoais',
    description: 'Aplicativo web para controle financeiro pessoal com categorização automática de gastos, metas e relatórios mensais.',
    category: 'Aplicativo Web',
    tags: ['Vue.js', 'Firebase', 'PWA', 'D3.js'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    status: 'Concluído',
    featured: true,
    year: '2024',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Landing Page SaaS',
    description: 'Landing page de alta conversão para produto SaaS com animações, integração de formulário e A/B testing.',
    category: 'Landing Page',
    tags: ['Next.js', 'Framer Motion', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    status: 'Concluído',
    featured: false,
    year: '2023',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Sistema de Agendamentos',
    description: 'Plataforma completa de agendamentos online com calendário inteligente, notificações e painel multi-usuário.',
    category: 'Aplicativo Web',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    status: 'Em andamento',
    featured: true,
    year: '2024',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Blog Técnico',
    description: 'Blog técnico com CMS headless, SEO otimizado, busca full-text e suporte a Markdown e MDX.',
    category: 'Blog',
    tags: ['Next.js', 'Contentful', 'Algolia'],
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    status: 'Concluído',
    featured: false,
    year: '2023',
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Design System UI',
    description: 'Biblioteca de componentes reutilizáveis com documentação interativa, temas customizáveis e tokens de design.',
    category: 'Design System',
    tags: ['React', 'Storybook', 'Rollup', 'CSS Variables'],
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    status: 'Planejamento',
    featured: false,
    year: '2024',
    createdAt: new Date().toISOString(),
  },
]

const ProjectsContext = createContext(null)

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : defaultProjects
    } catch {
      return defaultProjects
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    } catch {
      console.warn('localStorage indisponível')
    }
  }, [projects])

  const addProject = useCallback((data) => {
    const project = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setProjects(prev => [project, ...prev])
    return project
  }, [])

  const updateProject = useCallback((id, data) => {
    setProjects(prev =>
      prev.map(p => p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p)
    )
  }, [])

  const deleteProject = useCallback((id) => {
    setProjects(prev => prev.filter(p => p.id !== id))
  }, [])

  const getProject = useCallback((id) => {
    return projects.find(p => p.id === id) || null
  }, [projects])

  const clearAll = useCallback(() => {
    setProjects([])
  }, [])

  const value = { projects, addProject, updateProject, deleteProject, getProject, clearAll }

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}

export function useProjects() {
  const ctx = useContext(ProjectsContext)
  if (!ctx) throw new Error('useProjects must be used within ProjectsProvider')
  return ctx
}

export const CATEGORIES = [
  'Dashboard', 'Aplicativo Web', 'Landing Page', 'E-commerce',
  'Blog', 'Design System', 'Mobile', 'API / Backend', 'Outro'
]

export const STATUSES = ['Concluído', 'Em andamento', 'Planejamento', 'Pausado']
