import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Camera, MapPin, Compass, Navigation, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CameraContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  position: relative;
  overflow: hidden;
`

const CameraView = styled.div`
  width: 100%;
  height: 100%;
  background: #2c3e50;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.2);
`

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 48px 16px 16px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`

const BackButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

const GPSIndicator = styled(motion.div)`
  position: absolute;
  top: 80px;
  left: 16px;
  right: 16px;
  background: rgba(0, 91, 172, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px 16px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`

const GPSRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`

const Label = styled.div`
  font-size: 0.75rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 4px;
`

const Value = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Courier New', monospace;
`

const CompassOverlay = styled(motion.div)`
  position: absolute;
  bottom: 180px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
`

const CompassArrow = styled(motion.div)`
  position: absolute;
  top: 10px;
  color: #FFC400;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
`

const Direction = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 4px;
`

const Degrees = styled.div`
  font-size: 0.875rem;
  opacity: 0.8;
  font-family: 'Courier New', monospace;
`

const CaptureButton = styled(motion.button)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: white;
  border: 4px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.primary.main};

  &:active {
    transform: translateX(-50%) scale(0.9);
  }
`

const CaptureFlash = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  pointer-events: none;
`

const MiniMap = styled(motion.div)`
  position: absolute;
  bottom: 130px;
  right: 16px;
  width: 140px;
  height: 140px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
`

const MapView = styled.div`
  width: 100%;
  height: 100%;
  background: #F5F5F5;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 地図のグリッド線を表現 */
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
`

const MapMarker = styled(motion.div)`
  width: 14px;
  height: 14px;
  background: #005BAC;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 2;
`

const MapDirectionIndicator = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 16px solid #FFC400;
  transform-origin: 50% 70%;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  z-index: 1;
`

const SuccessMessage = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  padding: 24px 32px;
  border-radius: 16px;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 1000;
`

// Simulate GPS coordinates
const generateGPS = () => {
  const baseLat = 35.6812 // Tokyo base
  const baseLng = 139.7671
  return {
    latitude: baseLat + (Math.random() - 0.5) * 0.01,
    longitude: baseLng + (Math.random() - 0.5) * 0.01,
  }
}

// Compass directions
const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

export default function CameraScreen() {
  const navigate = useNavigate()
  const [gps, setGps] = useState(generateGPS())
  const [compass, setCompass] = useState({ degrees: 45, direction: 'NE' })
  const [showFlash, setShowFlash] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Simulate compass movement
  useEffect(() => {
    const interval = setInterval(() => {
      const degrees = Math.floor(Math.random() * 360)
      const dirIndex = Math.floor(degrees / 45)
      setCompass({
        degrees,
        direction: directions[dirIndex],
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Update GPS occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      setGps(generateGPS())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleCapture = () => {
    setShowFlash(true)
    setTimeout(() => setShowFlash(false), 100)

    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      // In real app, would navigate to photo list
    }, 1500)
  }

  return (
    <CameraContainer>
      <CameraView>
        <Camera size={80} style={{ opacity: 0.2 }} />
      </CameraView>

      <TopBar>
        <BackButton
          onClick={() => navigate('/mobile/phase1')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={20} />
        </BackButton>
        <div style={{ color: 'white', fontSize: '0.875rem', fontWeight: 600 }}>
          カメラ
        </div>
        <div style={{ width: '40px' }} />
      </TopBar>

      <GPSIndicator
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GPSRow>
          <Label>
            <MapPin size={14} />
            緯度
          </Label>
          <Value>{gps.latitude.toFixed(6)}°</Value>
        </GPSRow>
        <GPSRow>
          <Label>
            <Navigation size={14} />
            経度
          </Label>
          <Value>{gps.longitude.toFixed(6)}°</Value>
        </GPSRow>
      </GPSIndicator>

      <CompassOverlay
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CompassArrow
          animate={{ rotate: compass.degrees }}
          transition={{ duration: 0.5 }}
        >
          <Navigation size={24} />
        </CompassArrow>
        <Direction>{compass.direction}</Direction>
        <Degrees>{compass.degrees}°</Degrees>
      </CompassOverlay>

      <MiniMap
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <MapView>
          {/* 撮影方向を示す矢印 */}
          <MapDirectionIndicator
            animate={{
              rotate: compass.degrees - 180, // コンパス方向に合わせて回転
            }}
            transition={{
              duration: 0.5,
            }}
          />
          {/* 現在位置マーカー */}
          <MapMarker
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </MapView>
      </MiniMap>

      <CaptureButton
        onClick={handleCapture}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Camera size={32} />
      </CaptureButton>

      <AnimatePresence>
        {showFlash && (
          <CaptureFlash
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <SuccessMessage
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle size={32} style={{ marginBottom: '8px' }} />
            写真を保存しました<br />
            <span style={{ fontSize: '0.875rem', opacity: 0.8, marginTop: '8px', display: 'block' }}>
              GPS・方位情報を記録
            </span>
          </SuccessMessage>
        )}
      </AnimatePresence>
    </CameraContainer>
  )
}
