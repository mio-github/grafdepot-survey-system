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
  background-image: url('/assets/photos/building-front.png');
  background-size: cover;
  background-position: center;
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
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`

const Label = styled.div`
  font-size: 0.65rem;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 40px;
`

const Value = styled.div`
  font-size: 0.75rem;
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
  font-family: 'Courier New', monospace;
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
  border: 4px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.primary.main};
  z-index: 20;

  &:active {
    transform: translateX(-50%) scale(0.9);
  }
`

const Phase2Notice = styled(motion.div)`
  position: absolute;
  bottom: 140px;
  left: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  padding: 10px 12px;
  color: #000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.08);
  z-index: 10;
  max-width: 180px;
`

const NoticeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid #E0E0E0;
`

const NoticeCaption = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  color: #212121;
`

const Phase2Badge = styled.div`
  font-size: 0.55rem;
  font-weight: 600;
  padding: 2px 6px;
  background: #E3F2FD;
  color: #1976D2;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`

const NoticeStats = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
`

const StatBadge = styled.div<{ $variant: 'completed' | 'pending' }>`
  flex: 1;
  text-align: center;
  padding: 4px 6px;
  border-radius: 4px;
  background: ${props => props.$variant === 'completed' ? '#E3F2FD' : '#FFF8E1'};
  border: 1px solid ${props => props.$variant === 'completed' ? '#90CAF9' : '#FFE082'};
`

const StatNumber = styled.div<{ $variant: 'completed' | 'pending' }>`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${props => props.$variant === 'completed' ? '#1976D2' : '#FFA000'};
`

const StatLabel = styled.div`
  font-size: 0.55rem;
  color: #616161;
  margin-top: 2px;
`

const NoticeList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.6rem;
  line-height: 1.4;
  color: #757575;
`

const NoticeItem = styled.li`
  margin-bottom: 2px;

  &:last-child {
    margin-bottom: 0;
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

  /* 実際の地図画像を表示 */
  background-image: url('/assets/maps/sample01-map.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const MapMarker = styled(motion.div)`
  width: 14px;
  height: 14px;
  background: #005BAC;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  position: absolute;
  z-index: 2;
`

const MapTargetMarker = styled(motion.div)`
  width: 24px;
  height: 24px;
  background: #FF3B30;
  border-radius: 50% 50% 50% 0;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  position: absolute;
  transform: rotate(-45deg);
  z-index: 3;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
  }
`

const MapDirectionIndicator = styled(motion.div)`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 16px solid #FFC400;
  transform-origin: 50% 70%;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  z-index: 1;
`

const NorthIndicator = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 10;
`

const NorthArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 12px solid #FF3B30;
  position: relative;

  &::after {
    content: 'N';
    position: absolute;
    top: 14px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.625rem;
    font-weight: 700;
    color: #212121;
  }
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

const DirectionGuide = styled(motion.div)`
  position: absolute;
  bottom: 140px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 87, 34, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 16px 24px;
  color: white;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  z-index: 10;
`

const DirectionArrow = styled(motion.div)`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.625rem;
    color: rgba(255, 255, 255, 0.9);
  }
`

const DirectionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const DirectionLabel = styled.div`
  font-size: 0.7rem;
  opacity: 0.85;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const DirectionValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
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
  max-width: 60%;

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

const Thumbnail = styled(motion.div)<{ $isRecent?: boolean }>`
  min-width: 60px;
  height: 60px;
  background: ${props => props.$isRecent ? '#4CAF50' : '#2c3e50'};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.625rem;
  padding: 4px;
  cursor: pointer;
  border: 2px solid ${props => props.$isRecent ? '#FFC400' : 'transparent'};

  &:active {
    transform: scale(0.95);
  }
`

const ThumbnailNumber = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 2px;
`

const ThumbnailTime = styled.div`
  font-size: 0.625rem;
  opacity: 0.8;
`

const PhotoGuide = styled(motion.div)`
  position: absolute;
  top: 200px;
  left: 16px;
  right: 16px;
  background: rgba(255, 193, 7, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px 16px;
  color: #000;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  z-index: 15;
`

const GuideTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
`

const GuideText = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
`

const PhotoCounter = styled(motion.div)`
  position: absolute;
  top: 260px;
  right: 16px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 8px 12px;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  z-index: 15;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`

const CounterValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #FFC400;
`

const CounterLabel = styled.div`
  font-size: 0.625rem;
  opacity: 0.8;
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

// 撮影済み写真の型定義
interface CapturedPhoto {
  id: number
  time: string
  gps: { latitude: number; longitude: number }
  direction: string
}

// フェーズ2: 推奨撮影ポイントの定義
/*
interface RecommendedPoint {
  name: string
  direction: string
  degrees: number
  description: string
}

const recommendedPoints: RecommendedPoint[] = [
  { name: '前面道路', direction: 'SE', degrees: 135, description: '南東側から前面道路を撮影' },
  { name: '調査物件正面', direction: 'E', degrees: 90, description: '東側から物件を撮影' },
  { name: '境界付近', direction: 'SW', degrees: 225, description: '南西側の境界を撮影' },
  { name: '調査物件側面', direction: 'N', degrees: 0, description: '北側から物件を撮影' },
  { name: '境界付近', direction: 'NE', degrees: 45, description: '北東側の境界を撮影' },
  { name: '調査物件背面', direction: 'W', degrees: 270, description: '西側から物件を撮影' },
]
*/

export default function CameraScreen() {
  const navigate = useNavigate()
  const [gps, setGps] = useState(generateGPS())
  const [compass, setCompass] = useState({ degrees: 45, direction: 'NE' })
  const [showFlash, setShowFlash] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [capturedPhotos, setCapturedPhotos] = useState<CapturedPhoto[]>([])

  // 調査対象地への方向を計算（デモ用に固定値）
  const targetDirection = 135 // 南東方向
  const targetDistance = 50 // 50m（デモ）

  // フェーズ2: 推奨枚数と残り枚数
  /*
  const recommendedCount = 6
  const remainingCount = Math.max(0, recommendedCount - capturedPhotos.length)

  // 次に推奨される撮影ポイント
  const nextRecommendedPoint = capturedPhotos.length < recommendedPoints.length
    ? recommendedPoints[capturedPhotos.length]
    : null
  */

  // 現在の方角と調査対象地への方向の差分
  const directionDiff = ((targetDirection - compass.degrees + 360) % 360)

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

    // 撮影した写真を追加
    const newPhoto: CapturedPhoto = {
      id: Date.now(),
      time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
      gps,
      direction: compass.direction,
    }
    setCapturedPhotos(prev => [newPhoto, ...prev])

    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
    }, 1500)
  }

  return (
    <CameraContainer>
      <CameraView>
        {/* 実際の施設写真を背景として表示 */}
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

      {/* 情報パネル: GPS + コンパス */}
      <InfoPanel
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GPSIndicator>
          <GPSRow>
            <Label>
              <MapPin size={12} />
              緯度
            </Label>
            <Value>{gps.latitude.toFixed(6)}°</Value>
          </GPSRow>
          <GPSRow>
            <Label>
              <Navigation size={12} />
              経度
            </Label>
            <Value>{gps.longitude.toFixed(6)}°</Value>
          </GPSRow>
        </GPSIndicator>
        <CompassCard>
          <CompassDirection>{compass.direction}</CompassDirection>
          <CompassDegrees>{compass.degrees}°</CompassDegrees>
        </CompassCard>
      </InfoPanel>

      {/* 調査対象地への方向ガイド */}
      <DirectionGuide
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DirectionArrow
          animate={{ rotate: directionDiff }}
          transition={{ duration: 0.3 }}
        >
          <Navigation size={28} color="white" />
        </DirectionArrow>
        <DirectionText>
          <DirectionLabel>Target</DirectionLabel>
          <DirectionValue>{targetDistance}m</DirectionValue>
        </DirectionText>
      </DirectionGuide>

      {/* フェーズ2: 撮影ガイド表示 */}
      {/*
      {nextRecommendedPoint && (
        <PhotoGuide
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <GuideTitle>
            <Camera size={14} />
            次の撮影ポイント
          </GuideTitle>
          <GuideText>{nextRecommendedPoint.description}</GuideText>
        </PhotoGuide>
      )}
      */}

      {/* フェーズ2: 撮影枚数カウンター */}
      {/*
      <PhotoCounter
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <CounterValue>{remainingCount}</CounterValue>
        <CounterLabel>残り枚数</CounterLabel>
      </PhotoCounter>
      */}

      <MiniMap
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <MapView>
          {/* 北を示す方位マーク */}
          <NorthIndicator>
            <NorthArrow />
          </NorthIndicator>
          {/* 撮影方向を示す矢印 */}
          <MapDirectionIndicator
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              rotate: compass.degrees - 180, // コンパス方向に合わせて回転
            }}
            transition={{
              duration: 0.5,
            }}
          />
          {/* 現在位置マーカー (地図上の南東位置) */}
          <MapMarker
            style={{
              left: '65%',
              top: '75%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          {/* 調査対象施設マーカー (地図の中央やや上) */}
          <MapTargetMarker
            style={{
              left: '45%',
              top: '60%',
              transform: 'translate(-50%, -100%) rotate(-45deg)',
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
            }}
          />
        </MapView>
      </MiniMap>

      {/* 撮影進捗表示 */}
      <Phase2Notice
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <NoticeHeader>
          <NoticeCaption>撮影進捗</NoticeCaption>
          <Phase2Badge>Phase 2</Phase2Badge>
        </NoticeHeader>
        <NoticeStats>
          <StatBadge $variant="completed">
            <StatNumber $variant="completed">{capturedPhotos.length}</StatNumber>
            <StatLabel>撮像済</StatLabel>
          </StatBadge>
          <StatBadge $variant="pending">
            <StatNumber $variant="pending">{6 - capturedPhotos.length}</StatNumber>
            <StatLabel>残予定</StatLabel>
          </StatBadge>
        </NoticeStats>
        <NoticeList>
          <NoticeItem>推奨: 計6枚</NoticeItem>
          {capturedPhotos.length < 6 && (
            <>
              <NoticeItem>・前面道路</NoticeItem>
              <NoticeItem>・調査物件</NoticeItem>
              <NoticeItem>・境界付近</NoticeItem>
            </>
          )}
          {capturedPhotos.length === 6 && (
            <NoticeItem>✓ 推奨枚数達成</NoticeItem>
          )}
        </NoticeList>
      </Phase2Notice>

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
