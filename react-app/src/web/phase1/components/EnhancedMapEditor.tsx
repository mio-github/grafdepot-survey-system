import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Image as ImageIcon,
  FileText,
  Save,
  Download,
  Compass,
  Calendar,
  Home,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  Eye,
  Trash2,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Navigation,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #F5F5F5;
`

const Sidebar = styled.div`
  width: 320px;
  background: white;
  border-right: 1px solid #E0E0E0;
  display: flex;
  flex-direction: column;
`

const SidebarHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #E0E0E0;
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.primary.main};
  font-weight: 600;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 16px;
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }
`

const ProjectInfo = styled.div`
  background: #F5F5F5;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.875rem;

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    color: ${props => props.theme.colors.primary.main};
    flex-shrink: 0;
  }
`

const InfoLabel = styled.span`
  color: #757575;
  min-width: 70px;
`

const InfoValue = styled.span`
  font-weight: 600;
  color: #212121;
`

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: 8px;
`

const Subtitle = styled.div`
  font-size: 0.875rem;
  color: #757575;
  margin-bottom: 16px;
`

const Badge = styled.div`
  display: inline-block;
  background: #005BAC;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 16px;
`

const PhotoList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`

const PhotoItem = styled(motion.div)<{ $isDragging?: boolean; $isPlaced?: boolean }>`
  background: ${props => props.$isPlaced ? '#E8F5E9' : '#F5F5F5'};
  border: 2px solid ${props => {
    if (props.$isDragging) return props.theme.colors.primary.main
    if (props.$isPlaced) return '#4CAF50'
    return 'transparent'
  }};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  cursor: ${props => props.$isPlaced ? 'not-allowed' : 'grab'};
  opacity: ${props => props.$isDragging ? 0.5 : props.$isPlaced ? 0.6 : 1};

  &:active {
    cursor: ${props => props.$isPlaced ? 'not-allowed' : 'grabbing'};
  }

  &:hover {
    background: ${props => props.$isPlaced ? '#E8F5E9' : '#EEEEEE'};
  }
`

const PhotoItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
`

const PhotoNumber = styled.div`
  width: 32px;
  height: 32px;
  background: ${props => props.theme.colors.primary.main};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
`

const PhotoThumb = styled.div`
  width: 60px;
  height: 60px;
  background: #E0E0E0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #9E9E9E;
`

const PhotoInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const PhotoName = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const PhotoMeta = styled.div`
  font-size: 0.75rem;
  color: #757575;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 2px;
`

const PhotoDirection = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #E3F2FD;
  color: ${props => props.theme.colors.primary.main};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
`

const StatusBadge = styled.div`
  display: inline-block;
  background: #4CAF50;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-top: 8px;
`

const MapContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const MapToolbar = styled.div`
  background: white;
  border-bottom: 1px solid #E0E0E0;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const ToolbarTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ModeToggle = styled.div`
  display: flex;
  gap: 8px;
  background: #F5F5F5;
  padding: 4px;
  border-radius: 8px;
`

const ModeButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? 'white' : 'transparent'};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: ${props => props.$active ? props.theme.colors.primary.main : '#757575'};
  font-weight: ${props => props.$active ? 600 : 400};
  font-size: 0.875rem;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$active ? 'white' : '#EEEEEE'};
  }
`

const ZoomControls = styled.div`
  display: flex;
  gap: 8px;
  background: #F5F5F5;
  padding: 4px;
  border-radius: 8px;
`

const ZoomButton = styled.button`
  background: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.primary.main};

  &:hover {
    background: #E3F2FD;
  }
`

const ToolbarActions = styled.div`
  display: flex;
  gap: 12px;
`

const Button = styled(motion.button)`
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
`

const PrimaryButton = styled(Button)`
  background: ${props => props.theme.colors.primary.main};
  color: white;

  &:hover {
    background: ${props => props.theme.colors.primary.dark};
  }
`

const SecondaryButton = styled(Button)`
  background: white;
  color: ${props => props.theme.colors.primary.main};
  border: 2px solid ${props => props.theme.colors.primary.main};

  &:hover {
    background: #F5F5F5;
  }
`

const MapView = styled.div`
  flex: 1;
  background: #E8F5E9;
  position: relative;
  overflow: hidden;
`

const MapImage = styled.div`
  width: 100%;
  height: 100%;
  background: #FAFAFA;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: #9E9E9E;

  /* 実際の図面を背景に表示 - 大きめに */
  background-image: url('/assets/maps/sample-map.pdf.png');
  background-size: 85%;
  background-position: center;
  background-repeat: no-repeat;

  /* グリッド overlay for marker positioning */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }
`

const MapOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`

const MapStreet = styled.div<{ $horizontal?: boolean; $position: number }>`
  position: absolute;
  background: #E0E0E0;

  ${props => props.$horizontal ? `
    left: 0;
    right: 0;
    top: ${props.$position}%;
    height: 3px;
  ` : `
    top: 0;
    bottom: 0;
    left: ${props.$position}%;
    width: 3px;
  `}
`

const MapBuilding = styled.div<{ $x: number; $y: number; $width: number; $height: number; $color: string }>`
  position: absolute;
  left: ${props => props.$x}%;
  top: ${props => props.$y}%;
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
  background: ${props => props.$color};
  border: 1px solid rgba(0, 0, 0, 0.1);
`

const MapLabel = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  left: ${props => props.$x}%;
  top: ${props => props.$y}%;
  font-size: 0.7rem;
  color: #757575;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 6px;
  border-radius: 3px;
  pointer-events: none;
`

const MapMarker = styled(motion.div)<{ $x: number; $y: number }>`
  position: absolute;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  transform: translate(-50%, -100%);
  cursor: move;
  z-index: 10;
`

const MarkerPin = styled.div<{ $number: number }>`
  width: 44px;
  height: 44px;
  background: ${props => props.theme.colors.primary.main};
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 3px solid white;
  position: relative;
`

const MarkerNumber = styled.div`
  transform: rotate(45deg);
  color: white;
  font-weight: 700;
  font-size: 1rem;
`

const MarkerLabel = styled.div`
  position: absolute;
  bottom: -28px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  white-space: nowrap;
  pointer-events: none;
  font-weight: 600;
`

const MarkerActions = styled.div`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;

  ${MarkerPin}:hover & {
    opacity: 1;
  }
`

const MarkerActionButton = styled.button`
  background: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transform: rotate(45deg);

  svg {
    transform: rotate(-45deg);
  }

  &:hover {
    background: #F5F5F5;
  }
`

const ViewArrow = styled(motion.div)<{ $x: number; $y: number; $angle: number; $length: number }>`
  position: absolute;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  width: ${props => props.$length}px;
  height: 3px;
  background: #FF5722;
  transform-origin: left center;
  transform: rotate(${props => props.$angle}deg);
  cursor: move;
  z-index: 5;

  &::before {
    content: '';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 12px solid #FF5722;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: #FF5722;
    border-radius: 50%;
    border: 2px solid white;
  }
`

const ArrowActions = styled.div`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;

  ${ViewArrow}:hover & {
    opacity: 1;
  }
`

const ArrowActionButton = styled.button`
  background: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  color: #FF5722;

  &:hover {
    background: #F5F5F5;
  }
`

const DropZoneHint = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #757575;
  pointer-events: none;
`

const StatsBar = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const StatItem = styled.div`
  text-align: center;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary.main};
`

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #757575;
  margin-top: 4px;
`

interface Photo {
  id: number
  number: number
  name: string
  direction: string
  degrees: number
  gps: string
  description: string
}

interface Marker {
  id: number
  photoId: number
  x: number
  y: number
}

interface Arrow {
  id: number
  photoId: number
  x: number
  y: number
  angle: number
  length: number
}

// 実際のサンプルデータから作成
const samplePhotos: Photo[] = [
  { id: 1, number: 1, name: '前面道路(南東側)', direction: 'SE', degrees: 135, gps: '35.681236°N, 139.767125°E', description: '前面道路(南東側)を撮影' },
  { id: 2, number: 2, name: '調査物件_正面', direction: 'E', degrees: 90, gps: '35.681240°N, 139.767130°E', description: '調査物件を撮影' },
  { id: 3, number: 3, name: '境界付近(南西側)', direction: 'SW', degrees: 225, gps: '35.681230°N, 139.767115°E', description: '境界付近(南西側)を撮影' },
  { id: 4, number: 4, name: '調査物件_側面', direction: 'N', degrees: 0, gps: '35.681245°N, 139.767120°E', description: '調査物件を撮影' },
  { id: 5, number: 5, name: '境界付近(北東側)', direction: 'NE', degrees: 45, gps: '35.681250°N, 139.767135°E', description: '境界付近(北東側)を撮影' },
  { id: 6, number: 6, name: '調査物件_全景', direction: 'W', degrees: 270, gps: '35.681235°N, 139.767110°E', description: '調査物件を撮影' },
]

export default function EnhancedMapEditor() {
  const navigate = useNavigate()
  const [photos] = useState<Photo[]>(samplePhotos)
  const [mode, setMode] = useState<'marker' | 'arrow'>('marker')

  // 初期マーカー（3つ配置済み）
  const [markers, setMarkers] = useState<Marker[]>([
    { id: 1, photoId: 1, x: 450, y: 380 },
    { id: 2, photoId: 2, x: 620, y: 320 },
    { id: 3, photoId: 4, x: 550, y: 250 },
  ])

  // 初期矢印（1つ配置済み）
  const [arrows, setArrows] = useState<Arrow[]>([
    { id: 1, photoId: 1, x: 450, y: 380, angle: -45, length: 100 },
  ])

  const [draggedPhoto, setDraggedPhoto] = useState<number | null>(null)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [zoom, setZoom] = useState(100)

  const handleDragStart = (photoId: number) => {
    // 既に配置されている写真はドラッグ不可
    if (markers.some(m => m.photoId === photoId)) return
    setDraggedPhoto(photoId)
  }

  const handleDragEnd = () => {
    setDraggedPhoto(null)
    setIsDraggingOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(false)

    if (draggedPhoto !== null) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (mode === 'marker') {
        setMarkers([...markers, {
          id: Date.now(),
          photoId: draggedPhoto,
          x,
          y,
        }])
      } else {
        // 矢印モード：視線矢印を追加
        const photo = photos.find(p => p.id === draggedPhoto)
        const angle = photo ? photo.degrees - 90 : 0 // 方位を矢印の角度に変換
        setArrows([...arrows, {
          id: Date.now(),
          photoId: draggedPhoto,
          x,
          y,
          angle,
          length: 120,
        }])
      }
    }

    setDraggedPhoto(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }

  const handleDragLeave = () => {
    setIsDraggingOver(false)
  }

  const handleRemoveMarker = (markerId: number) => {
    setMarkers(markers.filter(m => m.id !== markerId))
  }

  const handleRemoveArrow = (arrowId: number) => {
    setArrows(arrows.filter(a => a.id !== arrowId))
  }

  const handleSave = () => {
    alert(`報告書を保存しました\n\n配置済み写真: ${markers.length}/${photos.length}枚\n配置済み矢印: ${arrows.length}本`)
  }

  const handleExport = () => {
    alert('PDF出力\n\n地図と写真を含む報告書を生成します')
  }

  const isPhotoPlaced = (photoId: number) => markers.some(m => m.photoId === photoId)

  return (
    <Container>
      <Sidebar>
        <SidebarHeader>
          <BackButton onClick={() => navigate('/')}>
            <ArrowLeft size={16} />
            ホームに戻る
          </BackButton>
          <Badge style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={14} />
            フェーズ1: シンプル版
          </Badge>

          <ProjectInfo>
            <InfoRow>
              <Calendar size={16} />
              <InfoLabel>撮影日:</InfoLabel>
              <InfoValue>2024年6月7日</InfoValue>
            </InfoRow>
            <InfoRow>
              <Home size={16} />
              <InfoLabel>所在地:</InfoLabel>
              <InfoValue>兵庫県相生市山手2丁目73</InfoValue>
            </InfoRow>
            <InfoRow>
              <ImageIcon size={16} />
              <InfoLabel>写真数:</InfoLabel>
              <InfoValue>{markers.length}/{photos.length}枚配置</InfoValue>
            </InfoRow>
          </ProjectInfo>

          <Title>写真一覧</Title>
          <Subtitle>地図または視線矢印をドラッグ</Subtitle>
        </SidebarHeader>

        <PhotoList>
          {photos.map((photo) => {
            const placed = isPhotoPlaced(photo.id)
            return (
              <PhotoItem
                key={photo.id}
                draggable={!placed}
                onDragStart={() => handleDragStart(photo.id)}
                onDragEnd={handleDragEnd}
                $isDragging={draggedPhoto === photo.id}
                $isPlaced={placed}
                whileHover={!placed ? { scale: 1.02 } : {}}
                whileTap={!placed ? { scale: 0.98 } : {}}
              >
                <PhotoItemHeader>
                  <PhotoNumber>{photo.number}</PhotoNumber>
                  <PhotoThumb>
                    <ImageIcon size={24} />
                  </PhotoThumb>
                  <PhotoInfo>
                    <PhotoName>{photo.name}</PhotoName>
                    <PhotoMeta>{photo.description}</PhotoMeta>
                  </PhotoInfo>
                </PhotoItemHeader>
                <PhotoMeta>
                  <MapPin size={12} />
                  {photo.gps}
                </PhotoMeta>
                <PhotoDirection>
                  <Compass size={12} />
                  {photo.direction} {photo.degrees}°
                </PhotoDirection>
                {placed && (
                  <StatusBadge style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                    <CheckCircle size={12} />
                    配置済み
                  </StatusBadge>
                )}
              </PhotoItem>
            )
          })}
        </PhotoList>
      </Sidebar>

      <MapContainer>
        <MapToolbar>
          <ToolbarLeft>
            <ToolbarTitle>
              <FileText size={20} />
              報告書エディタ
            </ToolbarTitle>
            <ModeToggle>
              <ModeButton $active={mode === 'marker'} onClick={() => setMode('marker')}>
                <MapPin size={16} />
                写真配置
              </ModeButton>
              <ModeButton $active={mode === 'arrow'} onClick={() => setMode('arrow')}>
                <Navigation size={16} />
                視線矢印
              </ModeButton>
            </ModeToggle>
            <ZoomControls>
              <ZoomButton onClick={() => setZoom(Math.min(zoom + 10, 200))}>
                <ZoomIn size={16} />
              </ZoomButton>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, padding: '0 8px' }}>
                {zoom}%
              </span>
              <ZoomButton onClick={() => setZoom(Math.max(zoom - 10, 50))}>
                <ZoomOut size={16} />
              </ZoomButton>
            </ZoomControls>
          </ToolbarLeft>
          <ToolbarActions>
            <SecondaryButton
              onClick={handleExport}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              PDF出力
            </SecondaryButton>
            <PrimaryButton
              onClick={handleSave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save size={16} />
              保存
            </PrimaryButton>
          </ToolbarActions>
        </MapToolbar>

        <MapView
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <MapImage>
            <MapOverlay>
              {/* 実際の図面を表示中 */}
            </MapOverlay>

            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              color: '#757575',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{ fontWeight: 600, marginBottom: '4px', color: '#212121' }}>
                広域図（PDFより抽出）
              </div>
              <div>
                兵庫県相生市山手2丁目73付近
              </div>
            </div>
          </MapImage>

          <AnimatePresence>
            {markers.length === 0 && !isDraggingOver && (
              <DropZoneHint
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MapPin size={64} style={{ marginBottom: 16, opacity: 0.2 }} />
                <div style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 8 }}>
                  写真をドラッグ & ドロップ
                </div>
                <div style={{ fontSize: '0.875rem' }}>
                  GPS情報に基づき、撮影場所にマーカーを配置してください
                </div>
              </DropZoneHint>
            )}
          </AnimatePresence>

          {markers.map((marker) => {
            const photo = photos.find(p => p.id === marker.photoId)
            if (!photo) return null

            return (
              <MapMarker
                key={marker.id}
                $x={marker.x}
                $y={marker.y}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                drag
                dragMomentum={false}
              >
                <MarkerPin $number={photo.number}>
                  <MarkerActions>
                    <MarkerActionButton onClick={() => alert(`写真 ${photo.number}: ${photo.name}`)}>
                      <Eye size={14} />
                    </MarkerActionButton>
                    <MarkerActionButton onClick={() => handleRemoveMarker(marker.id)}>
                      <Trash2 size={14} />
                    </MarkerActionButton>
                  </MarkerActions>
                  <MarkerNumber>{photo.number}</MarkerNumber>
                </MarkerPin>
                <MarkerLabel>
                  {photo.number}. {photo.name}
                </MarkerLabel>
              </MapMarker>
            )
          })}

          {arrows.map((arrow) => {
            const photo = photos.find(p => p.id === arrow.photoId)
            if (!photo) return null

            return (
              <ViewArrow
                key={arrow.id}
                $x={arrow.x}
                $y={arrow.y}
                $angle={arrow.angle}
                $length={arrow.length}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                drag
                dragMomentum={false}
              >
                <ArrowActions>
                  <ArrowActionButton onClick={() => handleRemoveArrow(arrow.id)}>
                    <Trash2 size={14} />
                  </ArrowActionButton>
                </ArrowActions>
              </ViewArrow>
            )
          })}

          <StatsBar>
            <StatItem>
              <StatValue>{markers.length}</StatValue>
              <StatLabel>写真配置</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{arrows.length}</StatValue>
              <StatLabel>視線矢印</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{photos.length}</StatValue>
              <StatLabel>総写真数</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{Math.round((markers.length / photos.length) * 100)}%</StatValue>
              <StatLabel>完了率</StatLabel>
            </StatItem>
          </StatsBar>
        </MapView>
      </MapContainer>
    </Container>
  )
}
