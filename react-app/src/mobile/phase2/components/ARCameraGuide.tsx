import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Camera,
  Navigation,
  MapPin,
  CheckCircle,
  ArrowLeft,
  Crosshair,
  Maximize2,
  Info,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #000;
`

const Header = styled.div`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 48px 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`

const BackButton = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  flex: 1;
  text-align: center;
`

const CameraView = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const AROverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`

const ARGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;

  @keyframes gridMove {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 50px 50px;
    }
  }
`

const ARTarget = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border: 3px solid #00E676;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(0, 230, 118, 0.5);

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 3px solid #00E676;
  }

  &::before {
    top: -3px;
    left: -3px;
    border-right: none;
    border-bottom: none;
  }

  &::after {
    bottom: -3px;
    right: -3px;
    border-left: none;
    border-top: none;
  }
`

const ARCorner1 = styled.div`
  position: absolute;
  top: -3px;
  right: -3px;
  width: 20px;
  height: 20px;
  border: 3px solid #00E676;
  border-left: none;
  border-bottom: none;
`

const ARCorner2 = styled.div`
  position: absolute;
  bottom: -3px;
  left: -3px;
  width: 20px;
  height: 20px;
  border: 3px solid #00E676;
  border-right: none;
  border-top: none;
`

const ARLabel = styled(motion.div)`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 230, 118, 0.9);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
`

const InfoPanel = styled.div`
  position: absolute;
  top: 100px;
  left: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 16px;
  color: white;
`

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`

const InfoIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`

const InfoText = styled.div`
  flex: 1;
`

const InfoLabel = styled.div`
  font-size: 0.75rem;
  opacity: 0.8;
  margin-bottom: 2px;
`

const InfoValue = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
`

const BottomPanel = styled.div`
  background: rgba(0, 0, 0, 0.9);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const GuideText = styled.div`
  color: white;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.6;
`

const CaptureButton = styled(motion.button)`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #00E676;
  border: 6px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  align-self: center;
  box-shadow: 0 4px 12px rgba(0, 230, 118, 0.4);
`

const SuccessOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: rgba(0, 230, 118, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 20;
`

const SuccessIcon = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: white;
  color: #00E676;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`

const SuccessText = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 8px;
`

const SuccessDesc = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
`

export default function ARCameraGuide() {
  const [captured, setCaptured] = useState(false)
  const [photoData] = useState({
    location: '前面道路（南東側）',
    direction: 'SE',
    degrees: 135,
    gps: '35.681236°N, 139.767125°E',
    distance: '約5m',
  })

  const handleCapture = () => {
    setCaptured(true)
    setTimeout(() => setCaptured(false), 2000)
  }

  return (
    <Container>
      <Header>
        <BackButton to="/mobile/phase2">
          <ArrowLeft size={24} />
        </BackButton>
        <Title>チーム撮影管理</Title>
        <div style={{ width: '40px' }} />
      </Header>

      <CameraView>
        <ARGrid />

        <AROverlay>
          <ARTarget
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Crosshair size={40} color="#00E676" />
            <ARCorner1 />
            <ARCorner2 />
            <ARLabel
              animate={{
                y: [-2, 2, -2],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {photoData.location}
            </ARLabel>
          </ARTarget>

          <InfoPanel>
            <InfoRow>
              <InfoIcon>
                <Navigation size={18} />
              </InfoIcon>
              <InfoText>
                <InfoLabel>撮影方向</InfoLabel>
                <InfoValue>{photoData.direction} {photoData.degrees}°</InfoValue>
              </InfoText>
            </InfoRow>
            <InfoRow>
              <InfoIcon>
                <MapPin size={18} />
              </InfoIcon>
              <InfoText>
                <InfoLabel>GPS座標</InfoLabel>
                <InfoValue>{photoData.gps}</InfoValue>
              </InfoText>
            </InfoRow>
            <InfoRow>
              <InfoIcon>
                <Maximize2 size={18} />
              </InfoIcon>
              <InfoText>
                <InfoLabel>推奨距離</InfoLabel>
                <InfoValue>{photoData.distance}</InfoValue>
              </InfoText>
            </InfoRow>
          </InfoPanel>
        </AROverlay>

        <AnimatePresence>
          {captured && (
            <SuccessOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SuccessIcon
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <CheckCircle size={48} />
              </SuccessIcon>
              <SuccessText>撮影完了！</SuccessText>
              <SuccessDesc>GPS・方位情報を自動記録しました</SuccessDesc>
            </SuccessOverlay>
          )}
        </AnimatePresence>
      </CameraView>

      <BottomPanel>
        <GuideText>
          <Info size={16} style={{ display: 'inline', marginRight: '8px' }} />
          緑色のフレームに対象物を収めて撮影してください
        </GuideText>
        <CaptureButton
          onClick={handleCapture}
          whileTap={{ scale: 0.9 }}
        >
          <Camera size={32} color="white" />
        </CaptureButton>
      </BottomPanel>
    </Container>
  )
}
