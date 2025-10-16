import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Image as ImageIcon, FileText, Save, Download } from 'lucide-react'

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

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: 8px;
`

const Subtitle = styled.div`
  font-size: 0.875rem;
  color: #757575;
`

const PhotoList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`

const PhotoItem = styled(motion.div)<{ $isDragging?: boolean }>`
  background: #F5F5F5;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: grab;
  border: 2px solid ${props => props.$isDragging ? props.theme.colors.primary.main : 'transparent'};
  opacity: ${props => props.$isDragging ? 0.5 : 1};

  &:active {
    cursor: grabbing;
  }

  &:hover {
    background: #EEEEEE;
  }
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

const ToolbarTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
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

const MapMarker = styled(motion.div)<{ $x: number; $y: number }>`
  position: absolute;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  transform: translate(-50%, -100%);
  cursor: move;
  z-index: 10;
`

const MarkerPin = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.primary.main};
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 3px solid white;
`

const MarkerIcon = styled.div`
  transform: rotate(45deg);
  color: white;
  font-size: 0.75rem;
`

const MarkerLabel = styled.div`
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  pointer-events: none;
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

interface Photo {
  id: number
  name: string
  gps: string
  direction: string
}

interface Marker {
  id: number
  photoId: number
  x: number
  y: number
}

const samplePhotos: Photo[] = [
  { id: 1, name: '東側外壁_01.jpg', gps: '35.681°N, 139.767°E', direction: 'NE 45°' },
  { id: 2, name: '西側外壁_02.jpg', gps: '35.681°N, 139.767°E', direction: 'SW 225°' },
  { id: 3, name: '南側外壁_03.jpg', gps: '35.681°N, 139.767°E', direction: 'S 180°' },
]

export default function MapEditor() {
  const [photos] = useState<Photo[]>(samplePhotos)
  const [markers, setMarkers] = useState<Marker[]>([])
  const [draggedPhoto, setDraggedPhoto] = useState<number | null>(null)
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const handleDragStart = (photoId: number) => {
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

      setMarkers([...markers, {
        id: Date.now(),
        photoId: draggedPhoto,
        x,
        y,
      }])
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

  const handleSave = () => {
    alert(`報告書を保存しました\n配置されたマーカー: ${markers.length}個`)
  }

  const handleExport = () => {
    alert('PDF出力機能（フェーズ1: シンプル版）')
  }

  return (
    <Container>
      <Sidebar>
        <SidebarHeader>
          <Badge>📘 フェーズ1: シンプル版</Badge>
          <Title>写真一覧</Title>
          <Subtitle>ドラッグして地図に配置</Subtitle>
        </SidebarHeader>
        <PhotoList>
          {photos.map((photo) => (
            <PhotoItem
              key={photo.id}
              draggable
              onDragStart={() => handleDragStart(photo.id)}
              onDragEnd={handleDragEnd}
              $isDragging={draggedPhoto === photo.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PhotoThumb>
                <ImageIcon size={24} />
              </PhotoThumb>
              <PhotoInfo>
                <PhotoName>{photo.name}</PhotoName>
                <PhotoMeta>
                  <MapPin size={12} />
                  {photo.gps}
                </PhotoMeta>
                <PhotoMeta>方位: {photo.direction}</PhotoMeta>
              </PhotoInfo>
            </PhotoItem>
          ))}
        </PhotoList>
      </Sidebar>

      <MapContainer>
        <MapToolbar>
          <ToolbarTitle>
            <MapPin size={20} />
            地図エディタ
          </ToolbarTitle>
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
          <AnimatePresence>
            {markers.length === 0 && !isDraggingOver && (
              <DropZoneHint
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MapPin size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
                <div style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 8 }}>
                  写真をドラッグ&ドロップ
                </div>
                <div style={{ fontSize: '0.875rem' }}>
                  GPS情報から自動的に地図上に配置されます
                </div>
              </DropZoneHint>
            )}
          </AnimatePresence>

          {markers.map((marker) => {
            const photo = photos.find(p => p.id === marker.photoId)
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
                <MarkerPin>
                  <MarkerIcon>
                    <ImageIcon size={16} />
                  </MarkerIcon>
                </MarkerPin>
                <MarkerLabel>{photo?.name}</MarkerLabel>
              </MapMarker>
            )
          })}
        </MapView>
      </MapContainer>
    </Container>
  )
}
