import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import { Camera, MapPin, Compass, Upload, ArrowLeft, FileText, Image as ImageIcon, Smartphone, BookOpen } from 'lucide-react'
import CameraScreen from './components/CameraScreen'
import EditorScreen from './components/EditorScreen'
import PhotoListScreen from './components/PhotoListScreen'

const Container = styled.div`
  min-height: 100vh;
  background: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const DeviceFrame = styled(motion.div)`
  width: 375px;
  height: 812px;
  background: #000;
  border-radius: 40px;
  padding: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  position: relative;
`

const Notch = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 30px;
  background: #000;
  border-radius: 0 0 20px 20px;
  z-index: 1000;
`

const Screen = styled.div`
  width: 100%;
  height: 100%;
  background: #F5F5F5;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  background: ${props => props.theme.colors.primary.main};
  color: white;
  padding: 48px 16px 16px;
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Content = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
`

const FeatureGrid = styled.div`
  display: grid;
  gap: 1rem;
`

const FeatureCard = styled(motion.div)<{ $clickable?: boolean }>`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: all 0.2s;

  &:hover {
    ${props => props.$clickable && `
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    `}
  }
`

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background: #E3F2FD;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary.main};
`

const BackButton = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: ${props => props.theme.colors.primary.main};
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`

function MobilePhase1Home() {
  const navigate = useNavigate()

  const features = [
    {
      icon: <Camera size={24} />,
      title: '写真撮影',
      desc: 'GPS・方位情報を自動記録',
      action: () => navigate('/mobile/phase1/camera')
    },
    {
      icon: <ImageIcon size={24} />,
      title: '撮影リスト',
      desc: '写真一覧・PDF生成',
      action: () => navigate('/mobile/phase1/photos')
    },
    {
      icon: <FileText size={24} />,
      title: '報告書編集',
      desc: 'シンプルな編集インターフェース',
      action: () => navigate('/mobile/phase1/editor')
    },
    {
      icon: <Upload size={24} />,
      title: 'クラウド同期',
      desc: 'リアルタイムでデータ送信',
      action: null
    },
  ]

  return (
    <Container>
      <BackButton to="/">
        <ArrowLeft size={24} />
      </BackButton>

      <DeviceFrame
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Notch />
        <Screen>
          <Header>
            <Smartphone size={24} />
            <Title>スマホアプリ - Phase 1</Title>
            <div style={{ width: '24px' }} />
          </Header>

          <Content>
            <div style={{
              background: '#005BAC',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '1rem',
              fontWeight: 600,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <BookOpen size={18} />
              フェーズ1: 単身利用
            </div>

            <FeatureGrid>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  $clickable={!!feature.action}
                  onClick={feature.action || undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IconWrapper>{feature.icon}</IconWrapper>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>{feature.title}</div>
                    <div style={{ fontSize: '0.875rem', color: '#757575' }}>{feature.desc}</div>
                  </div>
                </FeatureCard>
              ))}
            </FeatureGrid>

            <div style={{
              marginTop: '2rem',
              padding: '1rem',
              background: '#E3F2FD',
              borderRadius: '8px',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              border: '1px solid #90CAF9'
            }}>
              <strong style={{ color: '#005BAC' }}>フェーズ1の特徴：単身での利用</strong><br/>
              個人での現地調査と報告書作成に最適化。シンプルで使いやすい機能に特化しています。
            </div>
          </Content>
        </Screen>
      </DeviceFrame>
    </Container>
  )
}

export default function MobilePhase1() {
  return (
    <Routes>
      <Route path="/" element={<MobilePhase1Home />} />
      <Route path="/camera" element={
        <Container>
          <DeviceFrame
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Notch />
            <Screen>
              <CameraScreen />
            </Screen>
          </DeviceFrame>
        </Container>
      } />
      <Route path="/photos" element={
        <Container>
          <DeviceFrame
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Notch />
            <Screen>
              <PhotoListScreen />
            </Screen>
          </DeviceFrame>
        </Container>
      } />
      <Route path="/editor" element={
        <Container>
          <DeviceFrame
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Notch />
            <Screen>
              <EditorScreen />
            </Screen>
          </DeviceFrame>
        </Container>
      } />
    </Routes>
  )
}
