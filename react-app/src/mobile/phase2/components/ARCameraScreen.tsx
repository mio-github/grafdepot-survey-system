import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Camera, MapPin, Compass, Navigation, CheckCircle, Ruler, Scan, AlertCircle } from 'lucide-react'
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
  background-image: url('/assets/photos/building-front.png');
  background-size: cover;
  background-position: center;
`

// AR専用のオーバーレイグリッド
const ARGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(33, 150, 243, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(33, 150, 243, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  opacity: 0.3;
`

// AR中心マーカー
const ARCrosshair = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border: 2px solid #2196F3;
  border-radius: 50%;
  pointer-events: none;
  z-index: 5;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: #2196F3;
  }

  &::before {
    top: 50%;
    left: 10px;
    right: 10px;
    height: 2px;
    transform: translateY(-50%);
  }

  &::after {
    left: 50%;
    top: 10px;
    bottom: 10px;
    width: 2px;
    transform: translateX(-50%);
  }
`

// 3D風のターゲットマーカー
const ARTargetMarker = styled(motion.div)`
  position: absolute;
  bottom: 40%;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  z-index: 15;
`

const MarkerRing = styled(motion.div)<{ $delay: number }>`
  position: absolute;
  inset: 0;
  border: 3px solid #2196F3;
  border-radius: 50%;
  opacity: 0.6;
`

const MarkerCore = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, #2196F3 0%, rgba(33, 150, 243, 0.3) 70%);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(33, 150, 243, 0.8);
`

const MarkerIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.2rem;
`

// 3D距離表示
const DistanceIndicator = styled(motion.div)`
  position: absolute;
  bottom: 45%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(33, 150, 243, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 8px 20px;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  box-shadow: 0 4px 20px rgba(33, 150, 243, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.3);
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 8px;
`

// AR測定ライン
const MeasurementLine = styled(motion.svg)`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
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

const Title = styled.div`
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
`

const ARModeIndicator = styled.div`
  background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
  padding: 6px 12px;
  border-radius: 20px;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.4);
`

const InfoPanel = styled(motion.div)`
  position: absolute;
  top: 80px;
  left: 16px;
  right: 16px;
  display: flex;
  gap: 12px;
  z-index: 15;
`

const GPSIndicator = styled.div`
  flex: 1;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 10px 12px;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`

const GPSRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  font-size: 0.7rem;

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    flex-shrink: 0;
  }
`

const GPSValue = styled.span`
  font-weight: 600;
  font-family: 'Courier New', monospace;
`

const CompassCard = styled.div`
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 10px;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
`

const CompassDirection = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 2px;
`

const CompassDegrees = styled.div`
  font-size: 0.7rem;
  opacity: 0.8;
`

const MiniMap = styled(motion.div)`
  position: absolute;
  top: 220px;
  right: 16px;
  width: 120px;
  height: 120px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 10;
`

const MapView = styled.div`
  width: 100%;
  height: 100%;
  background: #F5F5F5;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/assets/maps/sample01-map.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const CurrentLocationMarker = styled(motion.div)`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: #2196F3;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`

const TargetLocationMarker = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: #FF5722;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`

const NorthIndicator = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: 700;
  color: #F44336;
  border: 1px solid #F44336;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`

// AR専用の撮影進捗表示（よりコンパクト）
const ARProgressBadge = styled(motion.div)`
  position: absolute;
  bottom: 140px;
  left: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  padding: 8px 12px;
  color: #000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.08);
  z-index: 10;
  max-width: 140px;
`

const ProgressHeader = styled.div`
  font-size: 0.65rem;
  font-weight: 600;
  color: #757575;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`

const ProgressStats = styled.div`
  display: flex;
  gap: 6px;
`

const StatBadge = styled.div<{ $variant: 'completed' | 'pending' }>`
  flex: 1;
  text-align: center;
  padding: 4px;
  border-radius: 4px;
  background: ${props => props.$variant === 'completed' ? '#E3F2FD' : '#FFF8E1'};
  border: 1px solid ${props => props.$variant === 'completed' ? '#90CAF9' : '#FFE082'};
`

const StatNumber = styled.div<{ $variant: 'completed' | 'pending' }>`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${props => props.$variant === 'completed' ? '#1976D2' : '#FFA000'};
`

const StatLabel = styled.div`
  font-size: 0.5rem;
  color: #616161;
`

// AR専用の推奨撮影ポイント表示
const RecommendedPoints = styled(motion.div)`
  position: absolute;
  bottom: 140px;
  right: 16px;
  background: rgba(255, 152, 0, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  padding: 8px 12px;
  color: white;
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 10;
  max-width: 160px;
`

const RecommendTitle = styled.div`
  font-size: 0.65rem;
  font-weight: 600;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`

const RecommendList = styled.div`
  font-size: 0.6rem;
  line-height: 1.4;
`

const RecommendItem = styled.div`
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '→';
    font-weight: 700;
  }
`

const CaptureButton = styled(motion.button)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: white;
  border: 4px solid rgba(33, 150, 243, 0.5);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 40px rgba(33, 150, 243, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1976D2;
  z-index: 100;

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
  z-index: 1000;
`

const PhotoThumbnails = styled(motion.div)`
  position: absolute;
  bottom: 100px;
  left: 16px;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 8px 10px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  z-index: 10;
  max-height: 70px;
  max-width: 40%;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
`

const Thumbnail = styled(motion.div)<{ $isRecent: boolean }>`
  width: 50px;
  height: 50px;
  background: ${props => props.theme.colors.primary.main};
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  position: relative;
  border: ${props => props.$isRecent ? '2px solid #4CAF50' : '2px solid transparent'};
  box-shadow: ${props => props.$isRecent ? '0 0 12px rgba(76, 175, 80, 0.6)' : '0 2px 4px rgba(0, 0, 0, 0.3)'};
`

const ThumbnailNumber = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1;
`

const ThumbnailTime = styled.div`
  font-size: 0.5rem;
  opacity: 0.8;
  margin-top: 2px;
`

interface CapturedPhoto {
  id: number
  number: number
  time: string
  direction: string
}

export default function ARCameraScreen() {
  const navigate = useNavigate()
  const [currentGPS, setCurrentGPS] = useState({ lat: 35.678754, lng: 139.770594 })
  const [currentDirection, setCurrentDirection] = useState(139)
  const [showFlash, setShowFlash] = useState(false)
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhoto[]>([])
  const [distance, setDistance] = useState(50)

  // GPS・方位のシミュレーション
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDirection(prev => (prev + 1) % 360)
      setDistance(prev => Math.max(10, prev - 0.5))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const getDirectionLabel = (degrees: number) => {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    return dirs[Math.round(degrees / 45) % 8]
  }

  const handleCapture = () => {
    setShowFlash(true)
    setTimeout(() => setShowFlash(false), 200)

    const newPhoto: CapturedPhoto = {
      id: Date.now(),
      number: capturedPhotos.length + 1,
      time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
      direction: getDirectionLabel(currentDirection)
    }
    setCapturedPhotos(prev => [newPhoto, ...prev])
  }

  return (
    <CameraContainer>
      <CameraView>
        {/* AR Grid */}
        <ARGrid />

        {/* AR Crosshair */}
        <ARCrosshair
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* AR Target Marker with 3D effect */}
        <ARTargetMarker>
          <MarkerRing
            $delay={0}
            animate={{
              scale: [1, 1.5],
              opacity: [0.6, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          <MarkerRing
            $delay={0.5}
            animate={{
              scale: [1, 1.5],
              opacity: [0.6, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5
            }}
          />
          <MarkerCore>
            <MarkerIcon>📍</MarkerIcon>
          </MarkerCore>
        </ARTargetMarker>

        {/* Distance Indicator */}
        <DistanceIndicator
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Ruler size={20} />
          {distance.toFixed(0)}m
        </DistanceIndicator>

        {/* AR Measurement Lines */}
        <MeasurementLine width="100%" height="100%">
          <motion.line
            x1="50%"
            y1="50%"
            x2="50%"
            y2="40%"
            stroke="#2196F3"
            strokeWidth="2"
            strokeDasharray="5,5"
            animate={{
              strokeDashoffset: [0, -10]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </MeasurementLine>
      </CameraView>

      <TopBar>
        <BackButton
          onClick={() => navigate('/mobile/phase1')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={20} />
        </BackButton>
        <Title>AR カメラ</Title>
        <ARModeIndicator>
          <Scan size={12} />
          AR MODE
        </ARModeIndicator>
      </TopBar>

      <InfoPanel
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GPSIndicator>
          <GPSRow>
            <MapPin size={12} />
            <span>緯度:</span>
            <GPSValue>{currentGPS.lat.toFixed(6)}°</GPSValue>
          </GPSRow>
          <GPSRow>
            <Navigation size={12} />
            <span>経度:</span>
            <GPSValue>{currentGPS.lng.toFixed(6)}°</GPSValue>
          </GPSRow>
        </GPSIndicator>

        <CompassCard>
          <CompassDirection>{getDirectionLabel(currentDirection)}</CompassDirection>
          <CompassDegrees>{currentDirection.toFixed(0)}°</CompassDegrees>
        </CompassCard>
      </InfoPanel>

      <MiniMap
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MapView>
          <NorthIndicator>N</NorthIndicator>
          <TargetLocationMarker />
          <CurrentLocationMarker
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
            }}
          />
        </MapView>
      </MiniMap>

      {/* AR Progress Badge */}
      <ARProgressBadge
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ProgressHeader>
          <CheckCircle size={10} />
          撮影進捗
        </ProgressHeader>
        <ProgressStats>
          <StatBadge $variant="completed">
            <StatNumber $variant="completed">{capturedPhotos.length}</StatNumber>
            <StatLabel>済</StatLabel>
          </StatBadge>
          <StatBadge $variant="pending">
            <StatNumber $variant="pending">{6 - capturedPhotos.length}</StatNumber>
            <StatLabel>残</StatLabel>
          </StatBadge>
        </ProgressStats>
      </ARProgressBadge>

      {/* Recommended Points */}
      <RecommendedPoints
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <RecommendTitle>
          <AlertCircle size={10} />
          推奨撮影
        </RecommendTitle>
        <RecommendList>
          <RecommendItem>前面道路</RecommendItem>
          <RecommendItem>調査物件</RecommendItem>
          <RecommendItem>境界付近</RecommendItem>
        </RecommendList>
      </RecommendedPoints>

      {capturedPhotos.length > 0 && (
        <PhotoThumbnails
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {capturedPhotos.map((photo, index) => (
            <Thumbnail
              key={photo.id}
              $isRecent={index === 0}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert(`写真 ${capturedPhotos.length - index} を表示`)}
            >
              <ThumbnailNumber>{capturedPhotos.length - index}</ThumbnailNumber>
              <ThumbnailTime>{photo.time}</ThumbnailTime>
              <div style={{ fontSize: '0.5rem', marginTop: '2px' }}>{photo.direction}</div>
            </Thumbnail>
          ))}
        </PhotoThumbnails>
      )}

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
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </CameraContainer>
  )
}
