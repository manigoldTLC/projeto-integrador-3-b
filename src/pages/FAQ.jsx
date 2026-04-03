import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

const faqs = [
  {
    category: 'Sobre o trabalho',
    items: [
      {
        q: 'Quais tipos de projetos você desenvolve?',
        a: 'Desenvolvo uma ampla gama de projetos web: sites institucionais, landing pages de alta conversão, dashboards e painéis administrativos, aplicações web completas (SPA e SSR), e-commerces, blogs e portfólios. Trabalho principalmente com React, Next.js e Vue.js no frontend, e Node.js no backend.'
      },
      {
        q: 'Você trabalha com projetos remotos?',
        a: 'Sim! Trabalho 100% de forma remota e já colaborei com clientes em diversas partes do Brasil e do mundo. Utilizo ferramentas como Slack, Notion, Linear e Figma para manter a comunicação e organização impecáveis.'
      },
      {
        q: 'Qual é o prazo médio para entrega de um projeto?',
        a: 'Depende muito da complexidade. Uma landing page simples leva de 1 a 2 semanas, enquanto um aplicativo web completo pode levar de 4 a 12 semanas ou mais. Sempre faço uma análise detalhada antes de comprometer um prazo, e priorizo a qualidade sobre a velocidade.'
      },
      {
        q: 'Você trabalha com design ou apenas desenvolvimento?',
        a: 'Meu foco principal é desenvolvimento, mas tenho experiência com Figma e consigo criar interfaces do zero. Para projetos maiores, prefiro trabalhar com um designer dedicado para garantir o melhor resultado. Se você já tem um design pronto, ótimo — se não, podemos conversar sobre as opções.'
      },
    ]
  },
  {
    category: 'Tecnologias',
    items: [
      {
        q: 'Quais tecnologias você domina?',
        a: 'No frontend: React, Next.js, Vue.js, TypeScript, TailwindCSS e Framer Motion. No backend: Node.js, Express, e APIs REST/GraphQL. Para banco de dados: PostgreSQL, MongoDB e Firebase. Para infra e deploy: Vercel, Netlify, Docker e AWS.'
      },
      {
        q: 'Você desenvolve para mobile também?',
        a: 'Sim! Todos os meus projetos são desenvolvidos com design responsivo e mobile-first. Para apps nativos, trabalho com React Native para projetos que precisam estar nas lojas (iOS e Android).'
      },
      {
        q: 'É possível usar uma tecnologia específica que não está na sua lista?',
        a: 'Provavelmente sim. Tenho facilidade para aprender novas ferramentas e frameworks. Deixe-me saber o que você precisa e avaliamos juntos se faz sentido para o projeto.'
      },
    ]
  },
  {
    category: 'Processo e pagamento',
    items: [
      {
        q: 'Como funciona o processo de desenvolvimento?',
        a: 'Começo com uma reunião de descoberta para entender o projeto. Depois, envio uma proposta detalhada com escopo, prazo e orçamento. Após aprovação, trabalho em sprints curtos com entregas frequentes para manter você sempre atualizado. Cada etapa é validada antes de avançar.'
      },
      {
        q: 'Como é feito o pagamento?',
        a: 'Geralmente divido em: 30% na assinatura do contrato, 40% na metade do projeto (aprovação do design/estrutura) e 30% na entrega final. Para projetos menores, aceito pagamento integral no início. Aceito transferência bancária, PIX e cartão de crédito.'
      },
      {
        q: 'Você oferece suporte após a entrega?',
        a: 'Sim! Incluo 30 dias de suporte gratuito após a entrega para corrigir eventuais bugs. Após esse período, ofereço planos de manutenção mensais para quem precisa de suporte contínuo, atualizações e melhorias.'
      },
      {
        q: 'O código é meu após a entrega?',
        a: 'Absolutamente. Após o pagamento completo, você recebe todos os direitos sobre o código desenvolvido. Entrego o código via repositório GitHub e todas as credenciais e acessos necessários.'
      },
    ]
  },
]

function AccordionItem({ question, answer, index }) {
  const [open, setOpen] = useState(false)
  const [ref, visible] = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`accordion-item reveal reveal-d${(index % 4) + 1} ${visible ? 'visible' : ''}`}
    >
      <button className="accordion-trigger" onClick={() => setOpen(o => !o)}>
        <span>{question}</span>
        <span className={`accordion-icon ${open ? 'open' : ''}`}>+</span>
      </button>
      <div
        className="accordion-body"
        style={{ maxHeight: open ? 500 : 0 }}
      >
        <div className="accordion-content">{answer}</div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [heroRef, heroVisible] = useScrollReveal()

  return (
    <main style={{ paddingTop: 'var(--nav-height)', paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 800 }}>

        {/* Hero */}
        <div
          ref={heroRef}
          className={`reveal ${heroVisible ? 'visible' : ''}`}
          style={{ paddingTop: 64, paddingBottom: 64 }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>FAQ</div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 20 }}>
            Perguntas frequentes
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300, maxWidth: 540 }}>
            Encontre respostas para as dúvidas mais comuns. Não encontrou o que procurava?{' '}
            <Link to="/contato" style={{ color: 'var(--accent-light)', textDecoration: 'underline' }}>Entre em contato</Link>.
          </p>
        </div>

        {/* FAQ sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
          {faqs.map(section => (
            <div key={section.category}>
              <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{section.category}</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                <span style={{ fontSize: 12, color: 'var(--text-faint)', fontWeight: 600 }}>{section.items.length} perguntas</span>
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '0 24px' }}>
                {section.items.map((item, i) => (
                  <AccordionItem key={i} question={item.q} answer={item.a} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 72, textAlign: 'center', padding: '56px 40px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 700, marginBottom: 14 }}>
            Ainda tem dúvidas?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
            Me mande uma mensagem e responderei em até 24 horas.
          </p>
          <Link to="/contato" className="btn btn-primary btn-lg">
            Entrar em contato
          </Link>
        </div>
      </div>
    </main>
  )
}
