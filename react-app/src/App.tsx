import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from '@shared/theme'
import { GlobalStyle } from '@shared/GlobalStyle'
import HomePage from './pages/HomePage'
import MobilePhase1 from './mobile/phase1/MobilePhase1'
import MobilePhase2 from './mobile/phase2/MobilePhase2'
import WebPhase1 from './web/phase1/WebPhase1'
import WebPhase2 from './web/phase2/WebPhase2'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mobile/phase1/*" element={<MobilePhase1 />} />
          <Route path="/mobile/phase2/*" element={<MobilePhase2 />} />
          <Route path="/web/phase1/*" element={<WebPhase1 />} />
          <Route path="/web/phase2/*" element={<WebPhase2 />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
