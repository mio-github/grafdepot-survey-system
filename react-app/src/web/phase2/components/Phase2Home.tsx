import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bot,
  FileText,
  Users,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Workflow,
  Wand2,
} from 'lucide-react'

const Container = styled.div`
  min-height: 100vh;
  background: #F5F5F5;
  padding: 2rem;
`

const Header = styled.div`
  margin-bottom: 3rem;
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

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FF9800;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 24px;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
`

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #757575;
  max-width: 800px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1400px;
`

const FeatureCard = styled(motion(Link))`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    border-color: #FF9800;
  }
`

const IconWrapper = styled.div<{ $color: string }>`
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1.5rem;
`

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #212121;
  margin-bottom: 12px;
`

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #757575;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const FeatureItem = styled.li`
  font-size: 0.875rem;
  color: #212121;
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '✓';
    color: #FF9800;
    font-weight: 700;
    font-size: 1rem;
  }
`

const VersionBadge = styled.div`
  display: inline-block;
  background: #FF9800;
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-left: 8px;
`

export default function Phase2Home() {
  const navigate = useNavigate()

  const features = [
    {
      to: '/web/phase2/editor',
      icon: <FileText size={36} />,
      color: '#005BAC',
      title: '報告書編集',
      description: '複数人で協力して報告書を作成。地図への写真配置や視線矢印の設定が可能です。',
      items: [
        '写真配置（GPS連動）',
        '視線矢印配置',
        'リアルタイム保存',
      ],
    },
    {
      to: '/web/phase2/approval',
      icon: <Users size={36} />,
      color: '#FF9800',
      title: '承認フロー管理',
      description: 'グループでの報告書共有と、段階的な承認プロセスを管理します。',
      items: [
        '多段階承認フロー',
        'コメント・差し戻し機能',
        '報告書ステータス管理',
      ],
    },
  ]

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          <ArrowLeft size={16} />
          ホームに戻る
        </BackButton>
        <Badge>
          <Sparkles size={16} />
          フェーズ2: チーム利用
        </Badge>
        <Title>
          <TrendingUp size={40} />
          Web管理画面
          <VersionBadge>本稼働バージョン</VersionBadge>
        </Title>
        <Subtitle>
          チームでの協働作業と承認フローに対応。複数人で効率的に報告書を作成できます
        </Subtitle>
      </Header>

      <Grid>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            to={feature.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <IconWrapper $color={feature.color}>
              {feature.icon}
            </IconWrapper>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
            <FeatureList>
              {feature.items.map((item, i) => (
                <FeatureItem key={i}>{item}</FeatureItem>
              ))}
            </FeatureList>
          </FeatureCard>
        ))}
      </Grid>
    </Container>
  )
}
