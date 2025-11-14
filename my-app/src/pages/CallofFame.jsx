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
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-yellow-400/20 hover:border-yellow-400 transition-all duration-300">
            <div className="flex justify-between items-start mb-5">
                <div>
                    <h3 className="text-xl font-bold text-yellow-400 mb-2">{call.name}</h3>
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        call.role === 'opener' 
                            ? 'bg-yellow-400 text-black' 
                            : 'bg-orange-500 text-black'
                    }`}>
                        {call.role}
                    </span>
                    <div className="text-gray-400 text-sm mt-2">{formattedDate}</div>
                </div>
            </div>

            <div className="mb-5">
                <h4 className="text-yellow-400 font-semibold mb-2">Why This Call Stands Out:</h4>
                <p className="text-gray-300 leading-relaxed text-sm">{call.whyBest}</p>
            </div>

            {call.audioUrl ? (
                <div className="mt-5 p-4 bg-black/50 border border-gray-700 rounded-lg">
                    <audio controls className="w-full">
                        <source src={call.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            ) : (
                <button 
                    onClick={() => alert('Audio file not yet uploaded for this call.')}
                    className="w-full mt-5 px-4 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-400/40 flex items-center justify-center gap-2"
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
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-gray-100 py-8 px-4">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-10">
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold mb-6 transition-transform hover:-translate-x-1"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Back to Portal
                </Link>
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-black text-yellow-400 mb-4">
                        🏆 Call of Fame
                    </h1>
                    <p className="text-xl text-gray-400">Celebrating Our Top Performers</p>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-8 py-3 rounded-lg font-bold transition-all ${
                            filter === 'all'
                                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/50'
                                : 'bg-gray-800 text-yellow-400 border-2 border-gray-700 hover:border-yellow-400/50'
                        }`}
                    >
                        All Calls
                    </button>
                    <button
                        onClick={() => setFilter('opener')}
                        className={`px-8 py-3 rounded-lg font-bold transition-all ${
                            filter === 'opener'
                                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/50'
                                : 'bg-gray-800 text-yellow-400 border-2 border-gray-700 hover:border-yellow-400/50'
                        }`}
                    >
                        Openers
                    </button>
                    <button
                        onClick={() => setFilter('closer')}
                        className={`px-8 py-3 rounded-lg font-bold transition-all ${
                            filter === 'closer'
                                ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/50'
                                : 'bg-gray-800 text-yellow-400 border-2 border-gray-700 hover:border-yellow-400/50'
                        }`}
                    >
                        Closers
                    </button>
                </div>
            </div>

            {/* Calls Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCalls.map(call => (
                        <CallCard key={call.id} call={call} />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 text-center text-gray-500">
                <p>&copy; 2025 Timeshare Help Center. All rights reserved.</p>
                <p className="text-sm italic mt-2">Showcasing excellence in customer service and sales performance</p>
            </div>
        </div>
    )
}
