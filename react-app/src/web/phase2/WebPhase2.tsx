import { Routes, Route } from 'react-router-dom'
import AdvancedReportEditor from './components/AdvancedReportEditor'
import ApprovalFlow from './components/ApprovalFlow'
import Phase2Home from './components/Phase2Home'
import AIReportGenerator from './components/AIReportGenerator'
import UserManagement from './components/UserManagement'
import PermissionManagement from './components/PermissionManagement'

export default function WebPhase2() {
  return (
    <Routes>
      <Route path="/" element={<Phase2Home />} />
      <Route path="/editor" element={<AdvancedReportEditor />} />
      <Route path="/ai-generator" element={<AIReportGenerator />} />
      <Route path="/approval" element={<ApprovalFlow />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/permissions" element={<PermissionManagement />} />
    </Routes>
  )
}
