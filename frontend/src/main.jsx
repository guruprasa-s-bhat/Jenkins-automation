import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Activity,
  CheckCircle2,
  CircleDot,
  Clock3,
  Code2,
  Database,
  GitBranch,
  Package,
  ShieldCheck,
  Server,
  Terminal,
  Users,
  Boxes
} from 'lucide-react'
import './styles.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [health, setHealth] = useState(null)
  const [services, setServices] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/health`).then(r => r.json()),
      fetch(`${API_URL}/api/services`).then(r => r.json())
    ])
      .then(([healthData, serviceData]) => {
        setHealth(healthData)
        setServices(serviceData.services)
      })
      .catch(() => setError('Backend is not reachable. Start the Node API on port 5000.'))
  }, [])

  const stats = [
    { label: 'Services', value: services.length || '—', icon: Boxes },
    { label: 'API Status', value: health?.status === 'ok' ? 'Healthy' : '—', icon: Activity },
    { label: 'Build', value: 'Passing', icon: CheckCircle2 },
    { label: 'Security', value: 'Ready', icon: ShieldCheck }
  ]

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><Terminal size={20} /></div>
          <div>
            <strong>DevFlow</strong>
            <span>CI/CD Dashboard</span>
          </div>
        </div>

        <nav>
          <a className="active"><Activity size={18} /> Overview</a>
          <a><GitBranch size={18} /> Pipelines</a>
          <a><Package size={18} /> Artifacts</a>
          <a><ShieldCheck size={18} /> Security</a>
          <a><Server size={18} /> Environments</a>
        </nav>

        <div className="sidebar-card">
          <div className="mini-icon"><Code2 size={18} /></div>
          <strong>Learning Project</strong>
          <p>React + Node + Docker + Jenkins</p>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">LOCAL ENVIRONMENT</p>
            <h1>DevOps Dashboard</h1>
            <p className="subtitle">A small application for learning real CI/CD workflows.</p>
          </div>
          <div className="status-pill">
            <span className="pulse"></span>
            Pipeline environment online
          </div>
        </header>

        <section className="stats">
          {stats.map(({ label, value, icon: Icon }) => (
            <div className="stat-card" key={label}>
              <div className="stat-icon"><Icon size={19} /></div>
              <div>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            </div>
          ))}
        </section>

        <section className="grid">
          <div className="panel wide">
            <div className="panel-head">
              <div>
                <h2>Deployment Pipeline</h2>
                <p>What Jenkins will automate later</p>
              </div>
              <span className="tag">LEARNING</span>
            </div>

            <div className="pipeline">
              {['Git Checkout', 'Tests', 'Trivy Scan', 'Docker Build', 'Docker Hub', 'Deploy'].map((step, i) => (
                <div className="pipeline-step" key={step}>
                  <div className={`step-dot ${i < 2 ? 'done' : ''}`}>
                    {i < 2 ? <CheckCircle2 size={16} /> : <CircleDot size={16} />}
                  </div>
                  <div>
                    <strong>{step}</strong>
                    <span>{i < 2 ? 'Completed' : 'Planned stage'}</span>
                  </div>
                  {i < 5 && <div className="connector"></div>}
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <div>
                <h2>API Health</h2>
                <p>Live response from Node</p>
              </div>
              <Activity size={20} />
            </div>
            <div className="health-box">
              <div className={`health-dot ${health?.status === 'ok' ? 'healthy' : ''}`}></div>
              <div>
                <strong>{health?.status === 'ok' ? 'Backend healthy' : 'Waiting for backend'}</strong>
                <span>{health?.service || 'Node API'} · {health?.version || 'v1'}</span>
              </div>
            </div>
            {error && <p className="error">{error}</p>}
          </div>

          <div className="panel">
            <div className="panel-head">
              <div>
                <h2>Services</h2>
                <p>Backend service catalog</p>
              </div>
              <Database size={20} />
            </div>
            <div className="service-list">
              {(services.length ? services : [
                { name: 'user-service', status: 'waiting' },
                { name: 'order-service', status: 'waiting' },
                { name: 'api-service', status: 'waiting' }
              ]).map(service => (
                <div className="service-row" key={service.name}>
                  <div className="service-name">
                    <span className="service-dot"></span>
                    <strong>{service.name}</strong>
                  </div>
                  <span className="service-status">{service.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel wide">
            <div className="panel-head">
              <div>
                <h2>Learning Roadmap</h2>
                <p>This application will grow with your Jenkins project.</p>
              </div>
              <Clock3 size={20} />
            </div>
            <div className="roadmap">
              <div className="roadmap-item complete"><span>01</span><div><strong>React + Node</strong><small>Application foundation</small></div></div>
              <div className="roadmap-item"><span>02</span><div><strong>Docker</strong><small>Two images + Compose</small></div></div>
              <div className="roadmap-item"><span>03</span><div><strong>Jenkins</strong><small>Automated CI pipeline</small></div></div>
              <div className="roadmap-item"><span>04</span><div><strong>Security</strong><small>Trivy + SonarQube</small></div></div>
              <div className="roadmap-item"><span>05</span><div><strong>Cloud</strong><small>Azure deployment later</small></div></div>
            </div>
          </div>
        </section>

        <footer>
          <Users size={15} /> Built as a DevOps learning project
        </footer>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)