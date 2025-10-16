import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`

const AIResultCard = styled(motion.div)`
  background: #F5F5F5;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ImagePreview = styled.div`
  aspect-ratio: 4/3;
  background: #E0E0E0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9E9E9E;
`

const AIResultTitle = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
`

const AITagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const AITag = styled.span<{ $type: 'good' | 'warning' | 'info' }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    switch (props.$type) {
      case 'good': return '#E8F5E9'
      case 'warning': return '#FFF3E0'
      case 'info': return '#E3F2FD'
    }
  }};
  color: ${props => {
    switch (props.$type) {
      case 'good': return '#2E7D32'
      case 'warning': return '#E65100'
      case 'info': return '#005BAC'
    }
  }};
`

const ApprovalFlow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
`

const ApprovalStep = styled.div<{ $status: 'completed' | 'current' | 'pending' }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 24px;
    left: 60%;
    width: 80%;
    height: 2px;
    background: ${props => props.$status === 'completed' ? '#4CAF50' : '#E0E0E0'};
  }

  &:last-child::after {
    display: none;
  }
`

const StepIcon = styled.div<{ $status: 'completed' | 'current' | 'pending' }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => {
    switch (props.$status) {
      case 'completed': return '#4CAF50'
      case 'current': return '#005BAC'
      case 'pending': return '#E0E0E0'
    }
  }};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`

const StepLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
`

export default function AIDashboard() {
  const [selectedTab] = useState('dashboard')

  const aiResults = [
    {
      id: 1,
      name: '東側外壁_01.jpg',
      tags: [
        { label: 'ひび割れ検出', type: 'warning' as const },
        { label: '鉄筋露出なし', type: 'good' as const },
      ],
    },
    {
      id: 2,
      name: '西側外壁_02.jpg',
      tags: [
        { label: '異常なし', type: 'good' as const },
        { label: '表面劣化軽度', type: 'info' as const },
      ],
    },
    {
      id: 3,
      name: '南側外壁_03.jpg',
      tags: [
        { label: '要注意箇所', type: 'warning' as const },
        { label: '再調査推奨', type: 'info' as const },
      ],
    },
  ]

  return (
    <Container>
      <TopBar>
        <TopBarContent>
          <Title>
            <Sparkles size={28} />
            AI画像解析ダッシュボード
          </Title>
          <Badge>
            <Sparkles size={14} />
            フェーズ2: フル機能版
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
              <StatsTitle>解析済み写真</StatsTitle>
              <IconWrapper $color="#005BAC">
                <ImageIcon size={24} />
              </IconWrapper>
            </StatsHeader>
            <StatsValue>247</StatsValue>
            <StatsTrend $positive>
              <TrendingUp size={16} />
              +18% vs 先月
            </StatsTrend>
          </StatsCard>

          <StatsCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatsHeader>
              <StatsTitle>要注意箇所</StatsTitle>
              <IconWrapper $color="#FF9800">
                <AlertTriangle size={24} />
              </IconWrapper>
            </StatsHeader>
            <StatsValue>12</StatsValue>
            <StatsTrend $positive={false}>
              <TrendingUp size={16} />
              +3件 今週
            </StatsTrend>
          </StatsCard>

          <StatsCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatsHeader>
              <StatsTitle>完了報告書</StatsTitle>
              <IconWrapper $color="#4CAF50">
                <CheckCircle size={24} />
              </IconWrapper>
            </StatsHeader>
            <StatsValue>89</StatsValue>
            <StatsTrend $positive>
              <TrendingUp size={16} />
              承認率 95%
            </StatsTrend>
          </StatsCard>

          <StatsCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatsHeader>
              <StatsTitle>チームメンバー</StatsTitle>
              <IconWrapper $color="#9C27B0">
                <Users size={24} />
              </IconWrapper>
            </StatsHeader>
            <StatsValue>24</StatsValue>
            <StatsTrend $positive>
              <Clock size={16} />
              稼働率 87%
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
              AI画像解析結果
            </SectionTitle>
            <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <BarChart3 size={16} />
              詳細レポート
            </Button>
          </SectionHeader>
          <AIAnalysisGrid>
            {aiResults.map((result, index) => (
              <AIResultCard
                key={result.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <ImagePreview>
                  <ImageIcon size={32} />
                </ImagePreview>
                <AIResultTitle>{result.name}</AIResultTitle>
                <AITagGrid>
                  {result.tags.map((tag, idx) => (
                    <AITag key={idx} $type={tag.type}>
                      {tag.label}
                    </AITag>
                  ))}
                </AITagGrid>
              </AIResultCard>
            ))}
          </AIAnalysisGrid>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <SectionHeader>
            <SectionTitle>
              <FileText size={20} />
              承認フロー
            </SectionTitle>
            <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              全て表示
            </Button>
          </SectionHeader>
          <ApprovalFlow>
            <ApprovalStep $status="completed">
              <StepIcon $status="completed">
                <CheckCircle size={24} />
              </StepIcon>
              <StepLabel>作成</StepLabel>
            </ApprovalStep>
            <ApprovalStep $status="completed">
              <StepIcon $status="completed">
                <CheckCircle size={24} />
              </StepIcon>
              <StepLabel>レビュー</StepLabel>
            </ApprovalStep>
            <ApprovalStep $status="current">
              <StepIcon $status="current">
                <Clock size={24} />
              </StepIcon>
              <StepLabel>承認待ち</StepLabel>
            </ApprovalStep>
            <ApprovalStep $status="pending">
              <StepIcon $status="pending">
                <FileText size={24} />
              </StepIcon>
              <StepLabel>完了</StepLabel>
            </ApprovalStep>
          </ApprovalFlow>
        </Section>

        <div style={{
          background: '#FFF3E0',
          border: '1px solid #FFB74D',
          borderRadius: '12px',
          padding: '20px',
          fontSize: '0.875rem',
          lineHeight: 1.6,
        }}>
          <strong style={{ color: '#E65100', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={16} />
            フェーズ2の高度な機能
          </strong>
          AI画像解析による自動欠陥検出、グループ管理、承認フローシステム、データ分析ダッシュボードなど、より予算をかけた高度な機能を実装。報告書作成の効率が大幅に向上します。
        </div>
      </Content>
    </Container>
  )
}
