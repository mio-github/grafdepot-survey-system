import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  Users,
  FileText,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Image as ImageIcon,
  Camera,
  MapPin,
  Home,
  Eye,
  Download,
  Filter,
  Search,
} from 'lucide-react'

const Container = styled.div`
  min-height: 100vh;
  background: #F5F5F5;
  display: flex;
  flex-direction: column;
`

const TopBar = styled.div`
  background: white;
  border-bottom: 1px solid #E0E0E0;
  padding: 24px 32px;
`

const TopBarContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary.main};
  display: flex;
  align-items: center;
  gap: 12px;
`

const Badge = styled.span`
  background: #FF9800;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #F5F5F5;
  padding: 10px 16px;
  border-radius: 8px;
  flex: 1;
  max-width: 400px;
  margin: 0 24px;
`

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.875rem;

  &:focus {
    outline: none;
  }
`

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 8px;
  border: 2px solid ${props => props.theme.colors.primary.main};
  background: white;
  color: ${props => props.theme.colors.primary.main};
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background: #F5F5F5;
  }
`

const Content = styled.div`
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 32px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`

const StatsCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const StatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const StatsTitle = styled.div`
  font-size: 0.875rem;
  color: #757575;
  font-weight: 600;
`

const StatsValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary.main};
`

const StatsTrend = styled.div<{ $positive?: boolean }>`
  font-size: 0.875rem;
  color: ${props => props.$positive ? '#4CAF50' : '#F44336'};
  display: flex;
  align-items: center;
  gap: 4px;
`

const IconWrapper = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.$color}15;
  color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Section = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`

const Button = styled(motion.button)`
  padding: 10px 16px;
  border-radius: 8px;
  border: 2px solid ${props => props.theme.colors.primary.main};
  background: white;
  color: ${props => props.theme.colors.primary.main};
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: #F5F5F5;
  }
`

const AIAnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`

const AIResultCard = styled(motion.div)`
  background: white;
  border: 2px solid #E0E0E0;
  border-radius: 12px;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`

const ImagePreview = styled.div`
  aspect-ratio: 4/3;
  background: #E0E0E0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9E9E9E;
  position: relative;
`

const AIBadge = styled.div<{ $severity: 'high' | 'medium' | 'low' }>`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  background: ${props => {
    switch (props.$severity) {
      case 'high': return '#F44336'
      case 'medium': return '#FF9800'
      case 'low': return '#4CAF50'
    }
  }};
  color: white;
`

const CardContent = styled.div`
  padding: 16px;
`

const PhotoInfo = styled.div`
  margin-bottom: 12px;
`

const PhotoNumber = styled.div`
  display: inline-block;
  background: ${props => props.theme.colors.primary.main};
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 8px;
`

const PhotoName = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 4px;
`

const PhotoMeta = styled.div`
  font-size: 0.75rem;
  color: #757575;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 2px;
`

const AIResultTitle = styled.div`
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 12px;
  color: ${props => props.theme.colors.primary.main};
`

const AITagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const AITag = styled.span<{ $type: 'error' | 'warning' | 'success' | 'info' }>`
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${props => {
    switch (props.$type) {
      case 'error': return '#FFEBEE'
      case 'warning': return '#FFF3E0'
      case 'success': return '#E8F5E9'
      case 'info': return '#E3F2FD'
    }
  }};
  color: ${props => {
    switch (props.$type) {
      case 'error': return '#C62828'
      case 'warning': return '#E65100'
      case 'success': return '#2E7D32'
      case 'info': return '#005BAC'
    }
  }};
`

const DetailedAnalysis = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: #F5F5F5;
  border-radius: 8px;
  font-size: 0.75rem;
  line-height: 1.5;
`

interface AIResult {
  id: number
  photoNumber: number
  name: string
  location: string
  direction: string
  severity: 'high' | 'medium' | 'low'
  findings: Array<{
    type: 'error' | 'warning' | 'success' | 'info'
    label: string
    confidence: number
  }>
  analysis: string
}

const aiResults: AIResult[] = [
  {
    id: 1,
    photoNumber: 1,
    name: '前面道路(南東側)',
    location: '兵庫県相生市山手2丁目73',
    direction: 'SE 135°',
    severity: 'low',
    findings: [
      { type: 'success', label: '道路状態良好', confidence: 98 },
      { type: 'info', label: '幅員4.5m', confidence: 95 },
    ],
    analysis: '前面道路の状態は良好。舗装の劣化は見られません。',
  },
  {
    id: 2,
    photoNumber: 2,
    name: '調査物件_正面',
    location: '兵庫県相生市山手2丁目73',
    direction: 'E 90°',
    severity: 'medium',
    findings: [
      { type: 'warning', label: 'ひび割れ検出', confidence: 87 },
      { type: 'success', label: '鉄筋露出なし', confidence: 99 },
      { type: 'info', label: '築年数推定15年', confidence: 82 },
    ],
    analysis: '外壁に軽微なひび割れを検出。構造的な問題はなし。経過観察が推奨されます。',
  },
  {
    id: 3,
    photoNumber: 3,
    name: '境界付近(南西側)',
    location: '兵庫県相生市山手2丁目73',
    direction: 'SW 225°',
    severity: 'low',
    findings: [
      { type: 'success', label: '境界明確', confidence: 96 },
      { type: 'info', label: 'ブロック塀設置', confidence: 98 },
    ],
    analysis: '境界は明確で、隣地との境界標も確認できます。',
  },
  {
    id: 4,
    photoNumber: 4,
    name: '調査物件_側面',
    location: '兵庫県相生市山手2丁目73',
    direction: 'N 0°',
    severity: 'medium',
    findings: [
      { type: 'warning', label: '表面劣化検出', confidence: 91 },
      { type: 'info', label: '雨樋の劣化', confidence: 85 },
    ],
    analysis: '北側外壁に表面劣化を検出。塗装の更新を推奨します。',
  },
  {
    id: 5,
    photoNumber: 5,
    name: '境界付近(北東側)',
    location: '兵庫県相生市山手2丁目73',
    direction: 'NE 45°',
    severity: 'high',
    findings: [
      { type: 'error', label: '崖地近接', confidence: 94 },
      { type: 'warning', label: '擁壁要確認', confidence: 88 },
      { type: 'warning', label: '土砂流出リスク', confidence: 76 },
    ],
    analysis: '崖地に近接しており、擁壁の状態確認が必要です。豪雨時の土砂流出リスクに注意。',
  },
  {
    id: 6,
    photoNumber: 6,
    name: '調査物件_全景',
    location: '兵庫県相生市山手2丁目73',
    direction: 'W 270°',
    severity: 'low',
    findings: [
      { type: 'success', label: '全体状態良好', confidence: 92 },
      { type: 'info', label: '日照良好', confidence: 89 },
    ],
    analysis: '物件全体の状態は良好。日照条件も問題ありません。',
  },
]

export default function EnhancedAIDashboard() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredResults = aiResults.filter(result => {
    const matchesFilter = selectedFilter === 'all' || result.severity === selectedFilter
    const matchesSearch = result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const highSeverityCount = aiResults.filter(r => r.severity === 'high').length
  const mediumSeverityCount = aiResults.filter(r => r.severity === 'medium').length
  const lowSeverityCount = aiResults.filter(r => r.severity === 'low').length

  return (
    <Container>
      <TopBar>
        <TopBarContent>
          <Title>
            <Sparkles size={28} />
            AI画像解析ダッシュボード
          </Title>
          <SearchBar>
            <Search size={18} color="#757575" />
            <SearchInput
              placeholder="写真を検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBar>
          <Badge>
            <Sparkles size={14} />
            フェーズ2: 本稼働版（AI解析）
          </Badge>
        </TopBarContent>
      </TopBar>

      <Content>
        <Grid>
          <StatsCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatsHeader>
              <StatsTitle>解析完了</StatsTitle>
              <IconWrapper $color="#005BAC">
                <ImageIcon size={24} />
              </IconWrapper>
            </StatsHeader>
            <StatsValue>{aiResults.length}/6</StatsValue>
            <StatsTrend $positive>
              <CheckCircle size={16} />
              100%完了
            </StatsTrend>
          </StatsCard>

          <StatsCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatsHeader>
              <StatsTitle>要注意</StatsTitle>
              <IconWrapper $color="#F44336">
                <AlertTriangle size={24} />
              </IconWrapper>
            </StatsHeader>
            <StatsValue>{highSeverityCount}</StatsValue>
            <StatsTrend $positive={false}>
              即時対応推奨
            </StatsTrend>
          </StatsCard>

          <StatsCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatsHeader>
              <StatsTitle>要確認</StatsTitle>
              <IconWrapper $color="#FF9800">
                <Clock size={24} />
              </IconWrapper>
            </StatsHeader>
            <StatsValue>{mediumSeverityCount}</StatsValue>
            <StatsTrend>
              経過観察推奨
            </StatsTrend>
          </StatsCard>

          <StatsCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatsHeader>
              <StatsTitle>良好</StatsTitle>
              <IconWrapper $color="#4CAF50">
                <CheckCircle size={24} />
              </IconWrapper>
            </StatsHeader>
            <StatsValue>{lowSeverityCount}</StatsValue>
            <StatsTrend $positive>
              問題なし
            </StatsTrend>
          </StatsCard>
        </Grid>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SectionHeader>
            <SectionTitle>
              <Sparkles size={20} />
              AI画像解析結果 ({filteredResults.length}件)
            </SectionTitle>
            <div style={{ display: 'flex', gap: '12px' }}>
              <FilterButton onClick={() => setSelectedFilter('all')}>
                <Filter size={16} />
                全て ({aiResults.length})
              </FilterButton>
              <FilterButton onClick={() => setSelectedFilter('high')}>
                高 ({highSeverityCount})
              </FilterButton>
              <FilterButton onClick={() => setSelectedFilter('medium')}>
                中 ({mediumSeverityCount})
              </FilterButton>
              <FilterButton onClick={() => setSelectedFilter('low')}>
                低 ({lowSeverityCount})
              </FilterButton>
              <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Download size={16} />
                レポート出力
              </Button>
            </div>
          </SectionHeader>

          <AIAnalysisGrid>
            <AnimatePresence>
              {filteredResults.map((result, index) => (
                <AIResultCard
                  key={result.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => alert(`写真 ${result.photoNumber} の詳細を表示`)}
                >
                  <ImagePreview>
                    <Camera size={48} />
                    <AIBadge $severity={result.severity}>
                      {result.severity === 'high' ? '要注意' : result.severity === 'medium' ? '要確認' : '良好'}
                    </AIBadge>
                  </ImagePreview>
                  <CardContent>
                    <PhotoInfo>
                      <PhotoNumber>写真 {result.photoNumber}</PhotoNumber>
                      <PhotoName>{result.name}</PhotoName>
                      <PhotoMeta>
                        <MapPin size={12} />
                        {result.location}
                      </PhotoMeta>
                      <PhotoMeta>
                        <Compass size={12} />
                        {result.direction}
                      </PhotoMeta>
                    </PhotoInfo>

                    <AIResultTitle>検出結果</AIResultTitle>
                    <AITagGrid>
                      {result.findings.map((finding, idx) => (
                        <AITag key={idx} $type={finding.type}>
                          {finding.label}
                          <span style={{ opacity: 0.7, marginLeft: '4px', fontSize: '0.7rem' }}>
                            {finding.confidence}%
                          </span>
                        </AITag>
                      ))}
                    </AITagGrid>

                    <DetailedAnalysis>
                      <strong>AI分析：</strong> {result.analysis}
                    </DetailedAnalysis>
                  </CardContent>
                </AIResultCard>
              ))}
            </AnimatePresence>
          </AIAnalysisGrid>
        </Section>
      </Content>
    </Container>
  )
}
