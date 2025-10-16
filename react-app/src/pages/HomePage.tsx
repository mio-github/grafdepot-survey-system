import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Smartphone, Monitor, Rocket, TrendingUp, Building2 } from 'lucide-react'

const Container = styled.div`
  min-height: 100vh;
  background: #F5F5F5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const Card = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: 3rem;
  max-width: 1200px;
  width: 100%;
  box-shadow: ${props => props.theme.shadows.xl};
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.neutral.textSecondary};
  text-align: center;
  margin-bottom: 3rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`

const NavCard = styled(Link)`
  background: ${props => props.theme.colors.neutral.bg};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: all ${props => props.theme.transitions.fast};
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.primary.main};
  }
`

const IconWrapper = styled.div<{ $color: string }>`
  width: 64px;
  height: 64px;
  border-radius: ${props => props.theme.borderRadius.round};
  background: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.neutral.text};
`

const Badge = styled.span<{ $color: string }>`
  background: ${props => props.$color};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
`

export default function HomePage() {
  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>
          <Building2 size={32} />
          グラフデポ 現地調査報告システム
        </Title>
        <Subtitle>React版 - スタイリッシュ & インタラクティブ</Subtitle>

        <Grid>
          <NavCard to="/mobile/phase1">
            <IconWrapper $color="#005BAC">
              <Smartphone size={32} />
            </IconWrapper>
            <CardTitle>スマホアプリ</CardTitle>
            <Badge $color="#005BAC">フェーズ1: 単身利用</Badge>
            <p style={{ fontSize: '0.875rem', color: '#757575', textAlign: 'center' }}>
              GPS・方位自動記録<br/>
              写真撮影・アップロード
            </p>
          </NavCard>

          <NavCard to="/web/phase1">
            <IconWrapper $color="#005BAC">
              <Monitor size={32} />
            </IconWrapper>
            <CardTitle>Web管理画面</CardTitle>
            <Badge $color="#005BAC">フェーズ1: 単身利用</Badge>
            <p style={{ fontSize: '0.875rem', color: '#757575', textAlign: 'center' }}>
              地図自動プロット<br/>
              ドラッグ&ドロップ編集
            </p>
          </NavCard>

          <NavCard to="/mobile/phase2">
            <IconWrapper $color="#FF9800">
              <Rocket size={32} />
            </IconWrapper>
            <CardTitle>スマホアプリ Pro</CardTitle>
            <Badge $color="#FF9800">フェーズ2: チーム利用</Badge>
            <p style={{ fontSize: '0.875rem', color: '#757575', textAlign: 'center' }}>
              AR撮影ガイド<br/>
              音声メモ・チェックリスト
            </p>
          </NavCard>

          <NavCard to="/web/phase2">
            <IconWrapper $color="#FF9800">
              <TrendingUp size={32} />
            </IconWrapper>
            <CardTitle>Web管理画面 Pro</CardTitle>
            <Badge $color="#FF9800">フェーズ2: チーム利用</Badge>
            <p style={{ fontSize: '0.875rem', color: '#757575', textAlign: 'center' }}>
              複数人での報告書編集<br/>
              グループ管理・承認フロー
            </p>
          </NavCard>
        </Grid>

        <div style={{ textAlign: 'center', color: '#757575', fontSize: '0.875rem' }}>
          <p>各カードをクリックして、モックアプリケーションを体験できます</p>
        </div>
      </Card>
    </Container>
  )
}
