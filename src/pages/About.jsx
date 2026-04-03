import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

const skills = [
  { group: 'Frontend', items: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'Prisma'] },
  { group: 'Banco de dados', items: ['PostgreSQL', 'MongoDB', 'Firebase', 'Supabase'] },
  { group: 'Ferramentas', items: ['Git', 'Docker', 'Figma', 'Vercel', 'AWS', 'Storybook'] },
]

const experience = [
  { year: '2024', role: 'Desenvolvedor Frontend Sênior', company: 'Freelance', desc: 'Projetos para startups e empresas consolidadas, com foco em performance e experiência do usuário.' },
  { year: '2022', role: 'Desenvolvedor Fullstack', company: 'Agência Digital', desc: 'Desenvolvimento de plataformas SaaS, e-commerces e dashboards para clientes nacionais e internacionais.' },
  { year: '2020', role: 'Desenvolvedor Frontend Pleno', company: 'Startup de Fintech', desc: 'Construção do produto principal do zero, liderando a equipe de frontend com React e TypeScript.' },
  { year: '2018', role: 'Desenvolvedor Junior', company: 'Software House', desc: 'Início da carreira, aprendendo boas práticas, metodologias ágeis e desenvolvimento de sistemas web.' },
]

function Section({ children, delay = 1 }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div ref={ref} className={`reveal reveal-d${delay} ${visible ? 'visible' : ''}`}>
      {children}
    </div>
  )
}

export default function About() {
  const [heroRef, heroVisible] = useScrollReveal()

  return (
    <main style={{ paddingTop: 'var(--nav-height)', paddingBottom: 80 }}>
      <div className="container">

        {/* Hero */}
        <div style={{ paddingTop: 64, paddingBottom: 72 }}>
          <div
            ref={heroRef}
            className={`reveal ${heroVisible ? 'visible' : ''}`}
            style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Sobre mim</div>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 24, lineHeight: 1.1 }}>
                Olá, eu sou um{' '}
                <span className="gradient-text">desenvolvedor</span>{' '}
                apaixonado.
              </h1>
              <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300, maxWidth: 560, marginBottom: 16 }}>
                Com mais de 5 anos de experiência em desenvolvimento web, foco em criar produtos digitais que unem estética refinada com alta performance. Acredito que o código bem escrito é uma forma de arte.
              </p>
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300, maxWidth: 560 }}>
                Trabalho com equipes multidisciplinares e clientes individuais, sempre com o objetivo de entregar soluções que fazem diferença real no negócio.
              </p>
              <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
                <Link to="/contato" className="btn btn-primary">Fale comigo</Link>
              </div>
            </div>

            {/* Avatar */}
            <div className="hide-mobile" style={{
              width: 200, height: 200, borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(135deg, var(--surface-3) 0%, var(--surface-2) 100%)',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 80,
              position: 'relative',
              flexShrink: 0,
            }}>
              <span>👨‍💻</span>
              <div className="glow-orb" style={{ width: 150, height: 150, background: 'rgba(129,140,248,0.1)', top: -30, right: -30 }} />
            </div>
          </div>
        </div>

        {/* Skills */}
        <Section>
          <div style={{ marginBottom: 64 }}>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Habilidades</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em' }}>Stack tecnológica</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {skills.map(({ group, items }) => (
                <div key={group} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '22px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>{group}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {items.map(skill => (
                      <span key={skill} className="tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Experience timeline */}
        <Section delay={2}>
          <div>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Carreira</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em' }}>Experiência profissional</h2>
            </div>
            <div style={{ position: 'relative', paddingLeft: 32 }}>
              {/* Line */}
              <div style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 1, background: 'var(--border)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {experience.map((exp, i) => (
                  <div key={i} style={{ position: 'relative', paddingBottom: 36 }}>
                    {/* Dot */}
                    <div style={{
                      position: 'absolute', left: -32,
                      width: 14, height: 14, borderRadius: '50%',
                      background: i === 0 ? 'var(--accent)' : 'var(--surface-3)',
                      border: `2px solid ${i === 0 ? 'var(--accent)' : 'var(--border)'}`,
                      top: 4,
                      boxShadow: i === 0 ? '0 0 12px rgba(129,140,248,0.5)' : 'none',
                    }} />
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{exp.role}</span>
                          {i === 0 && <span style={{ fontSize: 11, fontWeight: 600, background: 'var(--accent-dim)', color: 'var(--accent-light)', padding: '2px 10px', borderRadius: 6, border: '1px solid rgba(129,140,248,0.25)' }}>Atual</span>}
                        </div>
                        <div style={{ fontSize: 14, color: 'var(--accent-light)', fontWeight: 500, marginBottom: 8 }}>{exp.company} · {exp.year}</div>
                        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{exp.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Values */}
        <Section delay={3}>
          <div style={{ marginTop: 24 }}>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Valores</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em' }}>Como trabalho</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {[
                { icon: '🎯', title: 'Foco no resultado', desc: 'Cada linha de código existe para resolver um problema real. Qualidade acima de quantidade.' },
                { icon: '🤝', title: 'Comunicação clara', desc: 'Mantenho o cliente informado em todas as etapas, sem surpresas e com total transparência.' },
                { icon: '⚡', title: 'Performance', desc: 'Sites rápidos convertem mais e retêm usuários. Performance não é opcional, é fundamento.' },
                { icon: '♻️', title: 'Código limpo', desc: 'Escrevo código legível, testável e manutenível. O próximo dev que ler vai agradecer.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ padding: '24px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{icon}</div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 700, marginBottom: 10, color: 'var(--text)' }}>{title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

      </div>
    </main>
  )
}
