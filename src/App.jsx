import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ProjectsProvider } from './context/ProjectsContext'
import { AuthProvider, ProtectedRoute } from './context/AuthContext'
import { ToastProvider } from './components/Toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Management from './pages/Management'
import ProjectForm from './pages/ProjectForm'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import AdminLogin from './pages/AdminLogin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/gerenciamento" element={<ProtectedRoute><Management /></ProtectedRoute>} />
        <Route path="/novo-projeto" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
        <Route path="/editar/:id" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

function NotFound() {
  return (
    <main style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '40px 24px' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 96, fontWeight: 800, color: 'var(--text-faint)', marginBottom: 16 }}>404</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 700, marginBottom: 14 }}>Página não encontrada</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>A página que você procura não existe ou foi movida.</p>
        <a href="/" className="btn btn-primary">← Voltar ao início</a>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <ToastProvider>
            <Layout />
          </ToastProvider>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
