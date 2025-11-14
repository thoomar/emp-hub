import { useState } from 'react'
import { Link } from 'react-router-dom'

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
        <div className="bg-[#2a2a2a] border border-[#333] rounded-xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(255,215,0,0.2)] hover:border-[#ffd700] hover:-translate-y-1 transition-all duration-300">
            <div className="mb-5">
                <h3 className="text-2xl text-[#ffd700] mb-2 font-bold">{call.name}</h3>
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    call.role === 'opener' 
                        ? 'bg-[#ffd700] text-[#0a0a0a]' 
                        : 'bg-[#ff9800] text-[#0a0a0a]'
                }`}>
                    {call.role}
                </span>
                <div className="text-[#999] text-sm mt-1">{formattedDate}</div>
            </div>

            <div className="my-5">
                <h4 className="text-[#ffd700] font-semibold mb-2">Why This Call Stands Out:</h4>
                <p className="text-[#ccc] leading-relaxed text-[0.95rem]">{call.whyBest}</p>
            </div>

            {call.audioUrl ? (
                <div className="mt-5 p-4 bg-[#1a1a1a] border border-[#333] rounded-xl">
                    <audio controls className="w-full h-10 rounded-lg">
                        <source src={call.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            ) : (
                <button 
                    onClick={() => alert('Audio file not yet uploaded for this call.')}
                    className="w-full px-3 py-3 bg-[#ffd700] hover:bg-[#ffed4e] text-[#0a0a0a] font-semibold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(255,215,0,0.4)] flex items-center justify-center gap-2.5 text-base"
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
        <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: '#1a1a1a', minHeight: '100vh', color: '#e0e0e0' }}>
            {/* Header */}
            <header className="bg-[#0a0a0a] border-b-2 border-[#333] shadow-[0_4px_20px_rgba(0,0,0,0.5)] py-8 mb-10">
                <div className="max-w-[1200px] mx-auto px-5 text-center">
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-[#ffd700] no-underline font-medium mb-4 hover:-translate-x-1 transition-transform"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Back to Portal
                    </Link>
                    <h1 className="text-5xl font-extrabold text-[#ffd700] mb-2.5">
                        🏆 Call of Fame
                    </h1>
                    <p className="text-lg text-[#999] font-normal">Celebrating Our Top Performers</p>
                </div>
            </header>

            {/* Filters */}
            <section className="mb-10">
                <div className="max-w-[1200px] mx-auto px-5">
                    <div className="flex justify-center gap-4 flex-wrap">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-8 py-3 border-2 rounded-lg font-semibold transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)] ${
                                filter === 'all'
                                    ? 'bg-[#ffd700] text-[#0a0a0a] border-[#ffd700]'
                                    : 'bg-[#0a0a0a] text-[#ffd700] border-[#333] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]'
                            }`}
                        >
                            All Calls
                        </button>
                        <button
                            onClick={() => setFilter('opener')}
                            className={`px-8 py-3 border-2 rounded-lg font-semibold transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)] ${
                                filter === 'opener'
                                    ? 'bg-[#ffd700] text-[#0a0a0a] border-[#ffd700]'
                                    : 'bg-[#0a0a0a] text-[#ffd700] border-[#333] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]'
                            }`}
                        >
                            Openers
                        </button>
                        <button
                            onClick={() => setFilter('closer')}
                            className={`px-8 py-3 border-2 rounded-lg font-semibold transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)] ${
                                filter === 'closer'
                                    ? 'bg-[#ffd700] text-[#0a0a0a] border-[#ffd700]'
                                    : 'bg-[#0a0a0a] text-[#ffd700] border-[#333] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]'
                            }`}
                        >
                            Closers
                        </button>
                    </div>
                </div>
            </section>

            {/* Calls Grid */}
            <section className="pb-16">
                <div className="max-w-[1200px] mx-auto px-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCalls.map(call => (
                            <CallCard key={call.id} call={call} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0a0a0a] border-t-2 border-[#333] py-8 text-center mt-16">
                <div className="max-w-[1200px] mx-auto px-5">
                    <p className="text-[#999] my-1">&copy; 2025 Timeshare Help Center. All rights reserved.</p>
                    <p className="text-[#999] text-sm italic mt-1">Showcasing excellence in customer service and sales performance</p>
                </div>
            </footer>
        </div>
    )
}
