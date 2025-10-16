import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Camera, Crosshair, Navigation, MapPin, Eye, EyeOff } from 'lucide-react'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
  position: relative;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 48px 16px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7), transparent);
  z-index: 10;
`

const BackButton = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: white;
`

const CameraView = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Viewfinder = styled.div`
  position: absolute;
  inset: 20%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
  }

  &::before {
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    transform: translateX(-50%);
  }

  &::after {
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    transform: translateY(-50%);
  }
`

const InfoOverlay = styled.div`
  position: absolute;
  top: 100px;
  left: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const InfoCard = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 8px;
`

const InfoLabel = styled.span`
  opacity: 0.8;
`

const InfoValue = styled.span`
  font-weight: 700;
`

const BottomControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 16px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
`

const ShutterButton = styled(motion.button)`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: white;
  border: 4px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.primary.main};
`

const TeamBadge = styled.div`
  position: absolute;
  top: 100px;
  right: 16px;
  background: #FF9800;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
`

const ARMarker = styled(motion.div)<{ $x: number; $y: number }>`
  position: absolute;
  left: ${props => props.$x}%;
  top: ${props => props.$y}%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(156, 39, 176, 0.2);
  border: 3px solid #9C27B0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const ARMarkerInner = styled(motion.div)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #9C27B0;
`

const ARLabel = styled(motion.div)`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.65rem;
  white-space: nowrap;
  font-weight: 600;
`

const ARToggle = styled(motion.button)`
  position: absolute;
  top: 100px;
  left: 16px;
  background: rgba(156, 39, 176, 0.9);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(10px);
`

export default function CameraScreen() {
  const [showAR, setShowAR] = useState(true)

  const previousPhotos = [
    { id: 1, label: '正面外観', x: 30, y: 40, time: '10:23' },
    { id: 2, label: '側面', x: 65, y: 35, time: '10:25' },
    { id: 3, label: '周辺環境', x: 50, y: 60, time: '10:28' },
  ]

  const handleCapture = () => {
    alert('写真を撮影しました（チームメンバーと共有されます）')
  }

  return (
    <Container>
      <Header>
        <BackButton to="/mobile/phase2">
          <ArrowLeft size={24} />
        </BackButton>
        <Title>写真撮影</Title>
        <div style={{ width: '40px' }} />
      </Header>

      <CameraView>
        <Crosshair size={48} color="rgba(255, 255, 255, 0.5)" />
        <Viewfinder />

        <InfoOverlay>
          <InfoCard>
            <MapPin size={16} />
            <InfoLabel>位置:</InfoLabel>
            <InfoValue>34.8086° N, 134.4897° E</InfoValue>
          </InfoCard>
          <InfoCard>
            <Navigation size={16} />
            <InfoLabel>方位:</InfoLabel>
            <InfoValue>北東 (45°)</InfoValue>
          </InfoCard>
        </InfoOverlay>

        <ARToggle
          onClick={() => setShowAR(!showAR)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showAR ? <Eye size={16} /> : <EyeOff size={16} />}
          AR {showAR ? 'ON' : 'OFF'}
        </ARToggle>

        <TeamBadge>
          <Camera size={14} />
          チーム撮影
        </TeamBadge>

        <AnimatePresence>
          {showAR && previousPhotos.map((photo) => (
            <ARMarker
              key={photo.id}
              $x={photo.x}
              $y={photo.y}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: photo.id * 0.1 }}
            >
              <ARMarkerInner
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <ARLabel
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: photo.id * 0.1 + 0.2 }}
              >
                {photo.label} ({photo.time})
              </ARLabel>
            </ARMarker>
          ))}
        </AnimatePresence>
      </CameraView>

      <BottomControls>
        <ShutterButton
          onClick={handleCapture}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Camera size={32} />
        </ShutterButton>
      </BottomControls>
    </Container>
  )
}
