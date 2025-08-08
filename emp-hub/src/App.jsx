import { Link, Routes, Route, NavLink } from 'react-router-dom'
import KnowledgeBase from './pages/KnowledgeBase.jsx'
import CallofFame from './pages/CallofFame.jsx'
import Calculator from './pages/Calculator.jsx'
import Commissions from './pages/Commissions.jsx'

function Shell({ children }) {
    return (
        <div className="app">
            <header className="header">
                <div className="brand">
                    <span className="bolt">⚡</span>
                    <span>EMP Hub</span>
                </div>
                <nav className="nav">
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/knowledge">Knowledge Base</NavLink>
                    <NavLink to="/leaderboard">Leaderboard</NavLink>
                    <NavLink to="/calculator">Calculator</NavLink>
                    <NavLink to="/commissions">Commissions</NavLink>
                </nav>
            </header>
            <main className="main">{children}</main>
            <footer className="footer">
                © {new Date().getFullYear()} EMP Hub — Republic Financial Services
            </footer>
        </div>
    )
}

function Home() {
    const cards = [
        { title: 'Knowledge Base', to: '/knowledge', desc: 'Docs, SOPs, onboarding, and FAQs.' },
        { title: 'Call of Fame', to: '/leaderboard', desc: 'Top performers and team stats.' },
        { title: 'Calculator', to: '/calculator', desc: 'Quick quote & payout calculators.' },
        { title: 'Commissions', to: '/commissions', desc: 'Statements and payout schedule.' },
    ]

    return (
        <section className="home">
            <h1>Welcome</h1>
            <p className="subtitle">Select a section to get started.</p>
            <div className="grid">
                {cards.map((c) => (
                    <Link key={c.to} to={c.to} className="card">
                        <div className="card-title">{c.title}</div>
                        <div className="card-desc">{c.desc}</div>
                        <div className="card-cta">Open →</div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default function App() {
    return (
        <Shell>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/knowledge" element={<KnowledgeBase />} />
                <Route path="/leaderboard" element={<CallofFame />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/commissions" element={<Commissions />} />
            </Routes>
        </Shell>
    )
}
