import { useEffect, useMemo, useState } from 'react'

const METRICS = [
    { value: 'revenue', label: 'Revenue' },
    { value: 'deals',   label: 'Deals' },
    { value: 'calls',   label: 'Calls Duration' },
]

export default function CallofFame() {
    const [metric, setMetric] = useState('revenue')
    const [period, setPeriod] = useState('this_month')
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false
        async function load() {
            try {
                setLoading(true)
                setError(null)
                const q = new URLSearchParams({ metric, period })
                const r = await fetch(`/api/leaderboard?${q.toString()}`, {
                    headers: { 'Accept': 'application/json' },
                })
                const json = await r.json()
                if (!cancelled) {
                    setRows(Array.isArray(json?.data) ? json.data : [])
                }
            } catch (e) {
                if (!cancelled) setError(String(e))
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        load()
        return () => { cancelled = true }
    }, [metric, period])

    const title = useMemo(() => {
        const m = METRICS.find(m => m.value === metric)?.label ?? metric
        return `Call of Fame — ${m}`
    }, [metric])

    return (
        <div className="cof">
            <h1>{title}</h1>

            <div className="controls" style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                <label>
                    Metric:{' '}
                    <select value={metric} onChange={e => setMetric(e.target.value)}>
                        {METRICS.map(m => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Period:{' '}
                    <select value={period} onChange={e => setPeriod(e.target.value)}>
                        <option value="this_month">This month</option>
                        <option value="last_month">Last month</option>
                        <option value="this_quarter">This quarter</option>
                    </select>
                </label>
            </div>

            {loading && <p>Loading…</p>}
            {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}

            {!loading && !error && (
                <div style={{ overflowX: 'auto' }}>
                    <table className="table" cellPadding="8">
                        <thead>
                        <tr>
                            <th style={{ textAlign: 'left' }}>#</th>
                            <th style={{ textAlign: 'left' }}>User</th>
                            <th style={{ textAlign: 'right' }}>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map((r, i) => (
                            <tr key={r.userId ?? i}>
                                <td>{i + 1}</td>
                                <td>{r.name ?? r.userId ?? 'Unknown'}</td>
                                <td style={{ textAlign: 'right' }}>
                                    {metric === 'revenue'
                                        ? Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(r.score ?? 0)
                                        : r.score ?? 0}
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 && (
                            <tr><td colSpan="3" style={{ opacity: 0.7 }}>No data</td></tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
