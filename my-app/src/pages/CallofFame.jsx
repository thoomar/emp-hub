import { useEffect, useState } from 'react'

export default function CallofFame() {
  const [heroes, setHeroes] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/call-of-fame')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => setHeroes(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Call of Fame</h1>
      <ul>
        {heroes.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    </div>
  )
}
