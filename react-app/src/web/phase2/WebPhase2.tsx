import { Routes, Route } from 'react-router-dom'
import EnhancedAIDashboard from './components/EnhancedAIDashboard'

export default function WebPhase2() {
  return (
    <Routes>
      <Route path="/" element={<EnhancedAIDashboard />} />
    </Routes>
  )
}
