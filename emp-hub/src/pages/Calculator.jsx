import { useState } from 'react'

export default function Calculator() {
    const [amount, setAmount] = useState('')
    const [rate, setRate] = useState('')
    const payout = amount && rate ? (Number(amount) * Number(rate) / 100).toFixed(2) : '0.00'

    return (
        <section className="section">
            <h2>Calculator</h2>
            <p>Quick, simple example. Replace with your real logic.</p>
            <div style={{display:'grid', gap:'10px', maxWidth:320}}>
                <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
                <input placeholder="Rate (%)" value={rate} onChange={e=>setRate(e.target.value)} />
                <div>Payout: <strong>${payout}</strong></div>
            </div>
        </section>
    )
}
