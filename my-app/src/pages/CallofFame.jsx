import { useState } from 'react'
import { Link } from 'react-router-dom'
import './CallofFame.css'

// Sample calls data - replace with your actual data
const callsData = [
    {
        id: 1,
        name: "Opener Call #1",
        role: "opener",
        date: "2025-01-15",
        whyBest: "Perfect opening hook that immediately established rapport. Used the prospect's name naturally, acknowledged their concerns upfront, and transitioned seamlessly to value proposition within 90 seconds.",
        audioUrl: "calls/107339_1195835_3043653544_401831_4441_1760740804_097.mp3"
    },
    {
        id: 2,
        name: "Closer Call #1",
        role: "closer",
        date: "2025-01-12",
        whyBest: "Masterful objection handling. When the prospect said 'I need to think about it,' agent identified the real concern (spouse approval), addressed it directly, and closed with a trial offer that eliminated risk.",
        audioUrl: ""
    },
    {
        id: 3,
        name: "Opener Call #2",
        role: "opener",
        date: "2025-01-10",
        whyBest: "Exceptional questioning technique. Asked open-ended questions that uncovered the prospect's pain points naturally. Built trust through active listening and mirrored the prospect's language perfectly.",
        audioUrl: ""
    },
    {
        id: 4,
        name: "Closer Call #2",
        role: "closer",
        date: "2025-01-08",
        whyBest: "Created urgency without pressure. Explained limited-time offer genuinely, backed it with real constraints, and used scarcity ethically. Prospect felt grateful for the opportunity rather than pressured.",
        audioUrl: ""
    },
    {
        id: 5,
        name: "Opener Call #3",
        role: "opener",
        date: "2025-01-05",
        whyBest: "Turned a cold call into a warm conversation. Handled initial resistance with humor and empathy, found common ground quickly, and secured appointment commitment in under 5 minutes.",
        audioUrl: ""
    },
    {
        id: 6,
        name: "Closer Call #3",
        role: "closer",
        date: "2025-01-03",
        whyBest: "Perfect balance of features and benefits. Didn't just list what we offer - painted a vivid picture of the prospect's life after solving their timeshare problem. Emotional connection sealed the deal.",
        audioUrl: ""
    }
]

function CallCard({ call }) {
    const formattedDate = new Date(call.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })

    return (
        <div className="call-of-fame-card">
            <div className="call-of-fame-card-header">
                <h3 className="call-of-fame-card-title">{call.name}</h3>
                <span className={`call-of-fame-card-role ${call.role}`}>
                    {call.role}
                </span>
                <div className="call-of-fame-card-date">{formattedDate}</div>
            </div>

            <div className="call-of-fame-card-description">
                <h4>Why This Call Stands Out:</h4>
                <p>{call.whyBest}</p>
            </div>

            {call.audioUrl ? (
                <div className="call-of-fame-audio-player">
                    <audio controls>
                        <source src={call.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            ) : (
                <button 
                    onClick={() => alert('Audio file not yet uploaded for this call.')}
                    className="call-of-fame-play-button"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    Listen to Call
                </button>
            )}
        </div>
    )
}

export default function CallofFame() {
    const [filter, setFilter] = useState('all')

    const filteredCalls = callsData.filter(call => {
        if (filter === 'all') return true
        return call.role === filter
    })

    return (
        <div className="call-of-fame-container">
            {/* Header */}
            <header className="call-of-fame-header">
                <div className="call-of-fame-header-content">
                    <Link to="/" className="call-of-fame-back-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Back to Portal
                    </Link>
                    <h1 className="call-of-fame-title">
                        🏆 Call of Fame
                    </h1>
                    <p className="call-of-fame-tagline">Celebrating Our Top Performers</p>
                </div>
            </header>

            {/* Filters */}
            <section className="call-of-fame-filters">
                <div className="call-of-fame-filters-container">
                    <div className="call-of-fame-filter-tabs">
                        <button
                            onClick={() => setFilter('all')}
                            className={`call-of-fame-filter-btn ${filter === 'all' ? 'active' : ''}`}
                        >
                            All Calls
                        </button>
                        <button
                            onClick={() => setFilter('opener')}
                            className={`call-of-fame-filter-btn ${filter === 'opener' ? 'active' : ''}`}
                        >
                            Openers
                        </button>
                        <button
                            onClick={() => setFilter('closer')}
                            className={`call-of-fame-filter-btn ${filter === 'closer' ? 'active' : ''}`}
                        >
                            Closers
                        </button>
                    </div>
                </div>
            </section>

            {/* Calls Grid */}
            <section className="call-of-fame-calls-section">
                <div className="call-of-fame-calls-container">
                    <div className="call-of-fame-calls-grid">
                        {filteredCalls.map(call => (
                            <CallCard key={call.id} call={call} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="call-of-fame-footer">
                <div className="call-of-fame-footer-container">
                    <p>&copy; 2025 Timeshare Help Center. All rights reserved.</p>
                    <p className="call-of-fame-footer-note">Showcasing excellence in customer service and sales performance</p>
                </div>
            </footer>
        </div>
    )
}
