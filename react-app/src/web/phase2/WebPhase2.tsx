import { Routes, Route } from 'react-router-dom'
import EnhancedAIDashboard from './components/EnhancedAIDashboard'
import AdvancedReportEditor from './components/AdvancedReportEditor'
import ApprovalFlow from './components/ApprovalFlow'
import Phase2Home from './components/Phase2Home'

export default function WebPhase2() {
  return (
    <Routes>
      <Route path="/" element={<Phase2Home />} />
      <Route path="/dashboard" element={<EnhancedAIDashboard />} />
      <Route path="/editor" element={<AdvancedReportEditor />} />
      <Route path="/approval" element={<ApprovalFlow />} />
    </Routes>
  )
}
