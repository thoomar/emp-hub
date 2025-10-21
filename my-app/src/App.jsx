import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CallofFame from './pages/CallofFame.jsx'
import Calculator from './pages/Calculator.jsx'
import Commissions from './pages/Commissions.jsx'
import KnowledgeBase from './pages/KnowledgeBase.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/leaderboard" element={<CallofFame />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/commissions" element={<Commissions />} />
      <Route path="/knowledge" element={<KnowledgeBase />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
