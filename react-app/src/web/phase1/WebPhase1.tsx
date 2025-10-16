import { Routes, Route } from 'react-router-dom'
import EnhancedMapEditor from './components/EnhancedMapEditor'

export default function WebPhase1() {
  return (
    <Routes>
      <Route path="/" element={<EnhancedMapEditor />} />
    </Routes>
  )
}
