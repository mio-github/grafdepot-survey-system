import { useEffect, useRef, useState } from 'react'
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

const MAP_IMAGE_WIDTH = 1768
const MAP_IMAGE_HEIGHT = 1166
const TARGET_IMAGE_COORD = { x: 727, y: 755 } // 調査対象地の座標（画像ピクセル基準）
const ARROW_TIP_OFFSET = 32 // 矢印の先端オフセット（調査対象地の手前で矢印を止める）

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

  /* sample01-map.pngを背景に表示 */
  background-image: url('/assets/maps/sample01-map.png');
  background-size: contain;
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

const TargetMarker = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  top: ${props => props.$y}px;
  left: ${props => props.$x}px;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  pointer-events: none;
  z-index: 5;

  /* 赤い十字マーク */
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: #FF0000;
    box-shadow: 0 0 8px rgba(255, 0, 0, 0.5);
  }

  /* 縦線 */
  &::before {
    top: 0;
    left: 50%;
    width: 3px;
    height: 100%;
    transform: translateX(-50%);
  }

  /* 横線 */
  &::after {
    top: 50%;
    left: 0;
    width: 100%;
    height: 3px;
    transform: translateY(-50%);
  }
`

const TargetLabel = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  top: ${props => props.$y}px;
  left: ${props => props.$x}px;
  transform: translate(-50%, calc(-50% + 24px));
  background: rgba(255, 0, 0, 0.9);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  white-space: nowrap;
  pointer-events: none;
  z-index: 5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
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

const ViewArrow = styled(motion.div)<{ $x: number; $y: number; $angle: number; $length: number; $isActive?: boolean }>`
  position: absolute;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  width: ${props => props.$length}px;
  height: 20px; /* クリックしやすいように高さを増やす */
  cursor: ${props => props.$isActive ? 'grabbing' : 'grab'};
  z-index: 15;
  transition: box-shadow 0.2s ease;

  /* デバッグ用: 矢印の領域を可視化 */
  background: ${props => props.$isActive ? 'rgba(255, 87, 34, 0.1)' : 'transparent'};

  /* 矢印の線（疑似要素の前に配置） */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 3px;
    background: #FF5722;
    transform: translateY(-50%);
    pointer-events: none;
  }

  /* 矢印の先端（三角形） */
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(12px, -50%); /* 三角形を線の右端に配置 */
    width: 0;
    height: 0;
    border-left: 12px solid #FF5722;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    pointer-events: none;
  }
`

/* 矢印の始点マーカー（円形） */
const ArrowStartMarker = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: #FF5722;
  border-radius: 50%;
  border: 2px solid white;
  pointer-events: none;
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
  const mapViewRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [photos] = useState<Photo[]>(samplePhotos)
  const [mode, setMode] = useState<'marker' | 'arrow'>('marker')
  const [targetPosition, setTargetPosition] = useState<{ x: number; y: number } | null>(TARGET_IMAGE_COORD)
  const [activeArrowId, setActiveArrowId] = useState<number | null>(null)
  const rotatingArrowIdRef = useRef<number | null>(null)
  const pointerMoveListenerRef = useRef<((event: PointerEvent) => void) | null>(null)
  const pointerUpListenerRef = useRef<((event: PointerEvent) => void) | null>(null)

  useEffect(() => {
    const updateTargetPosition = () => {
      if (!mapRef.current) return
      const rect = mapRef.current.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const scale = Math.min(rect.width / MAP_IMAGE_WIDTH, rect.height / MAP_IMAGE_HEIGHT)
      const renderedWidth = MAP_IMAGE_WIDTH * scale
      const renderedHeight = MAP_IMAGE_HEIGHT * scale
      const offsetX = (rect.width - renderedWidth) / 2
      const offsetY = (rect.height - renderedHeight) / 2

      setTargetPosition({
        x: offsetX + TARGET_IMAGE_COORD.x * scale,
        y: offsetY + TARGET_IMAGE_COORD.y * scale,
      })

      // 初期マーカーをビューポート座標に変換（初回のみ）
      setMarkers(prev => {
        if (prev.length > 0) return prev
        return initialMarkersImageCoords.map(marker => ({
          ...marker,
          x: offsetX + marker.x * scale,
          y: offsetY + marker.y * scale,
        }))
      })
    }

    updateTargetPosition()

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateTargetPosition) : null
    if (resizeObserver && mapRef.current) {
      resizeObserver.observe(mapRef.current)
    }

    window.addEventListener('resize', updateTargetPosition)

    return () => {
      window.removeEventListener('resize', updateTargetPosition)
      resizeObserver?.disconnect()
    }
  }, [])

  useEffect(() => {
    return () => {
      if (pointerMoveListenerRef.current) {
        window.removeEventListener('pointermove', pointerMoveListenerRef.current)
      }
      if (pointerUpListenerRef.current) {
        window.removeEventListener('pointerup', pointerUpListenerRef.current)
        window.removeEventListener('pointercancel', pointerUpListenerRef.current)
      }
    }
  }, [])

  // 初期マーカー（画像座標系で定義）
  const initialMarkersImageCoords = [
    { id: 1, photoId: 1, x: 530, y: 900 },  // 写真1: 前面道路(南東側) - ターゲットの南側
    { id: 2, photoId: 2, x: 900, y: 430 },  // 写真2: 調査物件_正面 - ターゲットの北東側
    { id: 4, photoId: 4, x: 900, y: 570 },  // 写真4: 調査物件_側面 - ターゲットの東側
  ]

  const [markers, setMarkers] = useState<Marker[]>([])
  const [arrows, setArrows] = useState<Arrow[]>([])

  const calculateAngleToTarget = (markerX: number, markerY: number, targetPos: { x: number; y: number } | null): number => {
    // マーカーから調査対象地への角度を計算（ビューポート座標系で計算）
    if (!targetPos) return 0
    const dx = targetPos.x - markerX
    const dy = targetPos.y - markerY
    const angle = Math.atan2(dy, dx) * (180 / Math.PI)
    console.log(`Marker (${markerX}, ${markerY}) -> Target (${targetPos.x}, ${targetPos.y}): dx=${dx}, dy=${dy}, angle=${angle.toFixed(1)}°`)
    return angle
  }

  const calculateArrowLength = (markerX: number, markerY: number): number => {
    // 矢印の長さを短く固定（方向だけを示す）
    return 60
  }

  const [draggedPhoto, setDraggedPhoto] = useState<number | null>(null)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [clickedPosition, setClickedPosition] = useState<{ x: number; y: number } | null>(null)

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
        setMarkers(prev => [...prev, {
          id: Date.now(),
          photoId: draggedPhoto,
          x,
          y,
      }])
    } else {
      // 矢印モード：視線矢印を追加
      const angle = calculateAngleToTarget(x, y, targetPosition)
      const length = calculateArrowLength(x, y)
      setArrows(prev => {
        const existingIndex = prev.findIndex(a => a.photoId === draggedPhoto)
        if (existingIndex >= 0) {
          const updated = [...prev]
          const current = updated[existingIndex]
          updated[existingIndex] = {
            ...current,
            x,
            y,
            angle,
            length,
          }
          return updated
        }

        return [...prev, {
          id: Date.now(),
          photoId: draggedPhoto,
          x,
          y,
          angle,
          length,
        }]
      })
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

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // ドラッグ中はクリックイベントを無視
    if (draggedPhoto !== null || !mapRef.current) return

    const rect = mapRef.current.getBoundingClientRect()
    const containerX = e.clientX - rect.left
    const containerY = e.clientY - rect.top

    // 背景画像のスケールとオフセットを計算
    const scale = Math.min(rect.width / MAP_IMAGE_WIDTH, rect.height / MAP_IMAGE_HEIGHT)
    const renderedWidth = MAP_IMAGE_WIDTH * scale
    const renderedHeight = MAP_IMAGE_HEIGHT * scale
    const offsetX = (rect.width - renderedWidth) / 2
    const offsetY = (rect.height - renderedHeight) / 2

    // 画像上の座標に変換
    const imageX = (containerX - offsetX) / scale
    const imageY = (containerY - offsetY) / scale

    setClickedPosition({ x: imageX, y: imageY })
  }

  const updateArrowAngle = (arrowId: number, clientX: number, clientY: number) => {
    const mapRect = mapViewRef.current?.getBoundingClientRect()
    if (!mapRect) return

    const pointerX = clientX - mapRect.left
    const pointerY = clientY - mapRect.top

    setArrows(prev =>
      prev.map(arrow => {
        if (arrow.id !== arrowId) return arrow
        const angle = Math.atan2(pointerY - arrow.y, pointerX - arrow.x) * (180 / Math.PI)
        return { ...arrow, angle }
      }),
    )
  }

  const handleArrowPointerDown = (arrowId: number) => (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) return

    event.preventDefault()
    event.stopPropagation()

    if (pointerMoveListenerRef.current) {
      window.removeEventListener('pointermove', pointerMoveListenerRef.current)
      pointerMoveListenerRef.current = null
    }

    if (pointerUpListenerRef.current) {
      window.removeEventListener('pointerup', pointerUpListenerRef.current)
      window.removeEventListener('pointercancel', pointerUpListenerRef.current)
      pointerUpListenerRef.current = null
    }

    rotatingArrowIdRef.current = arrowId
    setActiveArrowId(arrowId)
    updateArrowAngle(arrowId, event.clientX, event.clientY)

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (rotatingArrowIdRef.current !== arrowId) return
      moveEvent.preventDefault()
      updateArrowAngle(arrowId, moveEvent.clientX, moveEvent.clientY)
    }

    const handlePointerUp = () => {
      rotatingArrowIdRef.current = null
      setActiveArrowId(null)

      if (pointerMoveListenerRef.current) {
        window.removeEventListener('pointermove', pointerMoveListenerRef.current)
        pointerMoveListenerRef.current = null
      }

      if (pointerUpListenerRef.current) {
        window.removeEventListener('pointerup', pointerUpListenerRef.current)
        window.removeEventListener('pointercancel', pointerUpListenerRef.current)
        pointerUpListenerRef.current = null
      }
    }

    pointerMoveListenerRef.current = handlePointerMove
    pointerUpListenerRef.current = handlePointerUp

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)
  }

  const handleMarkerDrag = (markerId: number, event: any, info: any) => {
    setMarkers(prevMarkers =>
      prevMarkers.map(marker => {
        if (marker.id !== markerId) return marker
        return {
          ...marker,
          x: marker.x + info.delta.x,
          y: marker.y + info.delta.y,
        }
      }),
    )
  }

  const handleRemoveMarker = (markerId: number) => {
    setMarkers(prevMarkers => {
      const markerToRemove = prevMarkers.find(m => m.id === markerId)
      if (!markerToRemove) return prevMarkers
      setArrows(prevArrows => prevArrows.filter(a => a.photoId !== markerToRemove.photoId))
      return prevMarkers.filter(m => m.id !== markerId)
    })
  }

  useEffect(() => {
    if (!targetPosition) return

    setArrows(prevArrows => {
      const existingByPhoto = new Map<number, Arrow>()
      prevArrows.forEach(arrow => {
        if (!existingByPhoto.has(arrow.photoId)) {
          existingByPhoto.set(arrow.photoId, arrow)
        }
      })

      const recalculated = markers.map(marker => {
        const previous = existingByPhoto.get(marker.photoId)
        // 初期角度は調査対象地を向く角度を計算（ユーザーがドラッグで変更した場合はその角度を保持）
        const angle = previous?.angle ?? calculateAngleToTarget(marker.x, marker.y, targetPosition)
        const length = previous?.length ?? calculateArrowLength(marker.x, marker.y)
        return {
          id: previous?.id ?? marker.id,
          photoId: marker.photoId,
          x: marker.x,
          y: marker.y,
          angle,
          length,
        }
      })

      if (recalculated.length === prevArrows.length) {
        const unchanged = recalculated.every(next => {
          const prev = prevArrows.find(a => a.photoId === next.photoId)
          if (!prev) return false
          return (
            Math.abs(prev.x - next.x) < 0.001 &&
            Math.abs(prev.y - next.y) < 0.001 &&
            Math.abs(prev.angle - next.angle) < 0.001 &&
            Math.abs(prev.length - next.length) < 0.001
          )
        })

        if (unchanged) {
          return prevArrows
        }
      }

      return recalculated
    })
  }, [markers, targetPosition])

  const handleRemoveArrow = (arrowId: number) => {
    setArrows(prev => prev.filter(a => a.id !== arrowId))
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
            フェーズ1: 単身利用
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
          <Subtitle>写真は地図へドラッグ、矢印はドラッグして自由に回転できます</Subtitle>
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
          ref={mapViewRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <MapImage ref={mapRef} onClick={handleMapClick}>
            <MapOverlay>
              {targetPosition && (
                <>
                  <TargetMarker $x={targetPosition.x} $y={targetPosition.y} />
                  <TargetLabel $x={targetPosition.x} $y={targetPosition.y}>
                    株式会社グラフデポ
                  </TargetLabel>
                </>
              )}
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
                詳細図（拡大表示）
              </div>
              <div>
                兵庫県相生市山手2丁目73付近
              </div>
              <div style={{ marginTop: '8px', fontSize: '0.7rem', color: '#005BAC', fontWeight: 600 }}>
                ● 対象物件の位置を中心に表示
              </div>
            </div>

            {clickedPosition && (
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(0, 91, 172, 0.95)',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                fontFamily: 'monospace',
              }}>
                クリック位置: X={Math.round(clickedPosition.x)}, Y={Math.round(clickedPosition.y)}
              </div>
            )}
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
                onDrag={(event, info) => handleMarkerDrag(marker.id, event, info)}
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
                $isActive={activeArrowId === arrow.id}
                initial={{ scale: 0, opacity: 0, rotate: arrow.angle }}
                animate={{ scale: 1, opacity: 1, rotate: arrow.angle }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onPointerDown={handleArrowPointerDown(arrow.id)}
                style={{ transformOrigin: '0 50%' }}
              >
                <ArrowStartMarker />
                {/* デバッグ用：角度を表示 */}
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  left: '0',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}>
                  {arrow.angle.toFixed(1)}°
                </div>
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
