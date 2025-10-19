import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Camera,
  MapPin,
  Compass,
  Calendar,
  FileText,
  Eye,
  Trash2,
  Plus,
  CheckCircle,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #F5F5F5;
  display: flex;
  flex-direction: column;
`

const TopBar = styled.div`
  background: ${props => props.theme.colors.primary.main};
  color: white;
  padding: 48px 16px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const BackButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
`

const AddButton = styled(motion.button)`
  background: ${props => props.theme.colors.secondary.main};
  border: none;
  color: #000;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ProjectInfo = styled.div`
  background: white;
  padding: 16px;
  border-bottom: 1px solid #E0E0E0;
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
  }
`

const InfoLabel = styled.span`
  color: #757575;
  min-width: 70px;
`

const InfoValue = styled.span`
  font-weight: 600;
  color: #212121;
  font-size: 0.8rem;
`

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`

const StatsCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-around;
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

const SectionTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: #424242;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`

const PhotoGrid = styled.div`
  display: grid;
  gap: 12px;
`

const PhotoCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 12px;
`

const PhotoNumber = styled.div`
  width: 36px;
  height: 36px;
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

const PhotoThumb = styled.div<{ $imageUrl?: string }>`
  width: 80px;
  height: 80px;
  background: ${props => props.$imageUrl ? `url(${props.$imageUrl})` : '#E0E0E0'};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #9E9E9E;
`

const PhotoInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const PhotoName = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const PhotoMeta = styled.div`
  font-size: 0.7rem;
  color: #757575;
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    flex-shrink: 0;
  }
`

const PhotoTags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`

const Tag = styled.span`
  background: #E3F2FD;
  color: ${props => props.theme.colors.primary.main};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`

const PhotoActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
`

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.primary.main};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    opacity: 0.6;
  }
`

const FloatingButton = styled(motion.button)`
  position: fixed;
  bottom: 80px;
  right: 16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary.main};
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
`

const BottomBar = styled.div`
  background: white;
  border-top: 1px solid #E0E0E0;
  padding: 16px;
  display: flex;
  gap: 12px;
`

const Button = styled(motion.button)`
  flex: 1;
  padding: 14px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`

const PrimaryButton = styled(Button)`
  background: ${props => props.theme.colors.primary.main};
  color: white;
`

const SecondaryButton = styled(Button)`
  background: white;
  color: ${props => props.theme.colors.primary.main};
  border: 2px solid ${props => props.theme.colors.primary.main};
`

interface Photo {
  id: number
  number: number
  name: string
  direction: string
  degrees: number
  gps: string
  timestamp: string
  imageUrl?: string
}

const samplePhotos: Photo[] = [
  {
    id: 1,
    number: 1,
    name: '前面道路(南東側)を撮影',
    direction: 'SE',
    degrees: 135,
    gps: '35.681236°N, 139.767125°E',
    timestamp: '2024-06-07 10:23',
    imageUrl: '/assets/photos/building-front.png',
  },
  {
    id: 2,
    number: 2,
    name: '調査物件を撮影',
    direction: 'E',
    degrees: 90,
    gps: '35.681240°N, 139.767130°E',
    timestamp: '2024-06-07 10:25',
  },
  {
    id: 3,
    number: 3,
    name: '境界付近(南西側)を撮影',
    direction: 'SW',
    degrees: 225,
    gps: '35.681230°N, 139.767115°E',
    timestamp: '2024-06-07 10:27',
  },
  {
    id: 4,
    number: 4,
    name: '調査物件を撮影',
    direction: 'N',
    degrees: 0,
    gps: '35.681245°N, 139.767120°E',
    timestamp: '2024-06-07 10:30',
  },
  {
    id: 5,
    number: 5,
    name: '境界付近(北東側)を撮影',
    direction: 'NE',
    degrees: 45,
    gps: '35.681250°N, 139.767135°E',
    timestamp: '2024-06-07 10:32',
  },
  {
    id: 6,
    number: 6,
    name: '調査物件を撮影',
    direction: 'W',
    degrees: 270,
    gps: '35.681235°N, 139.767110°E',
    timestamp: '2024-06-07 10:35',
  },
]

export default function PhotoListScreen() {
  const navigate = useNavigate()
  const [photos] = useState<Photo[]>(samplePhotos)

  const handlePreview = () => {
    alert('PDF プレビュー\n\n担保物件状況調査レポートを表示します')
  }

  const handleGenerate = () => {
    alert('PDF 生成完了\n\n担保物件状況調査.pdf を保存しました')
  }

  return (
    <Container>
      <TopBar>
        <BackButton
          onClick={() => navigate('/mobile/phase1')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={24} />
        </BackButton>
        <Title>撮影リスト</Title>
        <div style={{ width: '40px' }} />
      </TopBar>

      <ProjectInfo>
        <InfoRow>
          <Calendar size={14} />
          <InfoLabel>撮影日:</InfoLabel>
          <InfoValue>2024年6月7日</InfoValue>
        </InfoRow>
        <InfoRow>
          <MapPin size={14} />
          <InfoLabel>所在地:</InfoLabel>
          <InfoValue>兵庫県相生市山手2丁目73</InfoValue>
        </InfoRow>
      </ProjectInfo>

      <Content>
        <StatsCard>
          <StatItem>
            <StatValue>{photos.length}</StatValue>
            <StatLabel>撮影済み</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>6</StatValue>
            <StatLabel>推奨枚数</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>100%</StatValue>
            <StatLabel>完了率</StatLabel>
          </StatItem>
        </StatsCard>

        <SectionTitle>
          <Camera size={16} />
          撮影写真 ({photos.length}枚)
        </SectionTitle>

        <PhotoGrid>
          {photos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PhotoNumber>{photo.number}</PhotoNumber>
              <PhotoThumb $imageUrl={photo.imageUrl}>
                {!photo.imageUrl && <Camera size={32} />}
              </PhotoThumb>
              <PhotoInfo>
                <PhotoName>{photo.name}</PhotoName>
                <PhotoMeta>
                  <MapPin size={10} />
                  {photo.gps}
                </PhotoMeta>
                <PhotoTags>
                  <Tag>
                    <Compass size={10} />
                    {photo.direction} {photo.degrees}°
                  </Tag>
                  <Tag>
                    <Calendar size={10} />
                    {photo.timestamp}
                  </Tag>
                </PhotoTags>
              </PhotoInfo>
              <PhotoActions>
                <IconButton onClick={() => alert(`写真 ${photo.number} を表示`)}>
                  <Eye size={18} />
                </IconButton>
                <IconButton onClick={() => alert(`写真 ${photo.number} を削除`)}>
                  <Trash2 size={18} />
                </IconButton>
              </PhotoActions>
            </PhotoCard>
          ))}
        </PhotoGrid>

        <div style={{ height: '80px' }} />
      </Content>

      <FloatingButton
        onClick={() => navigate('/mobile/phase1/camera')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Plus size={28} />
      </FloatingButton>

      <BottomBar>
        <SecondaryButton
          onClick={handlePreview}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Eye size={18} />
          プレビュー
        </SecondaryButton>
        <PrimaryButton
          onClick={handleGenerate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FileText size={18} />
          PDF生成
        </PrimaryButton>
      </BottomBar>
    </Container>
  )
}
