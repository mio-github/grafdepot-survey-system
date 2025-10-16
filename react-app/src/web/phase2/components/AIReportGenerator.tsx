import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Wand2,
  Sparkles,
  Image as ImageIcon,
  FileText,
  CheckCircle,
  Loader,
  RefreshCw,
  Download,
  Edit3,
  TrendingUp,
  AlertCircle,
  MapPin,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
  background: #9C27B0;
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

const Content = styled.div`
  max-width: 1400px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`

const Panel = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`

const PanelTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #212121;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 12px;
`

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const PhotoCard = styled.div`
  background: #F5F5F5;
  border-radius: 8px;
  padding: 12px;
  position: relative;
`

const PhotoThumb = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  background: #E0E0E0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  color: #9E9E9E;
`

const PhotoInfo = styled.div`
  font-size: 0.75rem;
  color: #757575;
  display: flex;
  align-items: center;
  gap: 4px;
`

const AIBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #9C27B0;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
`

const GenerateButton = styled(motion.button)`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 1rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ReportSection = styled.div`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ReportText = styled(motion.div)`
  background: #F5F5F5;
  border-radius: 8px;
  padding: 16px;
  font-size: 0.875rem;
  line-height: 1.8;
  color: #212121;
  position: relative;
  min-height: 100px;
`

const LoadingOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  gap: 12px;
`

const LoadingText = styled.div`
  font-size: 0.875rem;
  color: #9C27B0;
  font-weight: 600;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 1rem;
`

const Button = styled(motion.button)`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
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

const AIInsight = styled(motion.div)`
  background: linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%);
  border-left: 4px solid #9C27B0;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`

const InsightTitle = styled.div`
  font-weight: 700;
  color: #6A1B9A;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
`

const InsightText = styled.div`
  font-size: 0.875rem;
  color: #4A148C;
  line-height: 1.6;
`

export default function AIReportGenerator() {
  const navigate = useNavigate()
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [report, setReport] = useState({
    summary: '',
    findings: '',
    recommendations: '',
  })

  const photos = [
    { id: 1, location: '正面外観', gps: '34.8086° N, 134.4897° E' },
    { id: 2, location: '側面', gps: '34.8086° N, 134.4898° E' },
    { id: 3, location: '周辺環境', gps: '34.8085° N, 134.4897° E' },
    { id: 4, location: '内部状況', gps: '34.8086° N, 134.4897° E' },
  ]

  const handleGenerate = () => {
    setGenerating(true)

    // AIによる生成をシミュレート
    setTimeout(() => {
      setReport({
        summary: '兵庫県相生市山手2丁目73に所在する本物件について、2024年6月7日に現地調査を実施しました。物件は閑静な住宅地に位置し、周辺環境は良好です。建物は木造2階建てで、築年数は約25年と推定されます。',
        findings: '【外観】建物外壁に経年劣化による色褪せが見られますが、構造上の重大な問題は確認されませんでした。屋根瓦の一部にずれが見られます。【周辺環境】閑静な住宅街に位置し、日当たり良好。最寄り駅まで徒歩15分、商業施設へのアクセスも良好です。騒音等の環境問題は特に見られません。【内部】内装は概ね良好な状態を保っています。水回りに軽微な劣化が見られますが、使用には問題ありません。',
        recommendations: '【メンテナンス提案】屋根瓦のずれについては、雨漏りのリスクがあるため早期の補修を推奨します。外壁については、美観維持のため3年以内の再塗装を検討されることをお勧めします。【総合評価】立地条件、建物状態ともに良好であり、適切なメンテナンスを実施することで長期的な利用が可能と判断されます。担保価値としても十分な水準にあると評価できます。',
      })
      setGenerating(false)
      setGenerated(true)
    }, 3000)
  }

  const handleRegenerate = () => {
    setGenerated(false)
    handleGenerate()
  }

  const handleEdit = () => {
    alert('報告書編集画面に移動します')
  }

  const handleExport = () => {
    alert('報告書をPDF形式でエクスポートしました')
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/web/phase2')}>
          <ArrowLeft size={16} />
          Phase2ホームに戻る
        </BackButton>
        <Badge>
          <Sparkles size={16} />
          AI機能（Phase2専用）
        </Badge>
        <Title>
          <Wand2 size={40} />
          AI報告書生成
        </Title>
        <Subtitle>
          撮影した写真とGPS情報を基に、AIが報告書を自動生成します
        </Subtitle>
      </Header>

      <Content>
        <Panel>
          <PanelTitle>
            <ImageIcon size={24} />
            撮影データ
          </PanelTitle>

          <PhotoGrid>
            {photos.map((photo) => (
              <PhotoCard key={photo.id}>
                <AIBadge>
                  <Sparkles size={10} />
                  AI解析済
                </AIBadge>
                <PhotoThumb>
                  <ImageIcon size={32} />
                </PhotoThumb>
                <PhotoInfo>
                  <MapPin size={12} />
                  {photo.location}
                </PhotoInfo>
                <PhotoInfo style={{ fontSize: '0.65rem', marginTop: '4px' }}>
                  {photo.gps}
                </PhotoInfo>
              </PhotoCard>
            ))}
          </PhotoGrid>

          <GenerateButton
            onClick={handleGenerate}
            disabled={generating || generated}
            whileHover={{ scale: generating || generated ? 1 : 1.02 }}
            whileTap={{ scale: generating || generated ? 1 : 0.98 }}
          >
            {generating ? (
              <>
                <Loader size={20} className="spin" />
                AIが報告書を生成中...
              </>
            ) : generated ? (
              <>
                <CheckCircle size={20} />
                生成完了
              </>
            ) : (
              <>
                <Wand2 size={20} />
                AI報告書を生成
              </>
            )}
          </GenerateButton>

          {generated && (
            <SecondaryButton
              onClick={handleRegenerate}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw size={16} />
              再生成
            </SecondaryButton>
          )}
        </Panel>

        <Panel>
          <PanelTitle>
            <FileText size={24} />
            生成された報告書
          </PanelTitle>

          {generated && (
            <AIInsight
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <InsightTitle>
                <TrendingUp size={16} />
                AI分析結果
              </InsightTitle>
              <InsightText>
                4枚の写真を解析し、建物状態・周辺環境・立地条件を総合的に評価しました。
                全体的に良好な状態ですが、一部メンテナンスが必要な箇所を検出しています。
              </InsightText>
            </AIInsight>
          )}

          <ReportSection>
            <SectionTitle>
              <FileText size={18} />
              調査概要
            </SectionTitle>
            <ReportText
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {generated ? report.summary : '報告書を生成してください...'}
              <AnimatePresence>
                {generating && (
                  <LoadingOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader size={32} color="#9C27B0" className="spin" />
                    <LoadingText>AIが文章を生成中...</LoadingText>
                  </LoadingOverlay>
                )}
              </AnimatePresence>
            </ReportText>
          </ReportSection>

          <ReportSection>
            <SectionTitle>
              <AlertCircle size={18} />
              調査所見
            </SectionTitle>
            <ReportText
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {generated ? report.findings : '報告書を生成してください...'}
              <AnimatePresence>
                {generating && (
                  <LoadingOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader size={32} color="#9C27B0" className="spin" />
                    <LoadingText>写真を解析中...</LoadingText>
                  </LoadingOverlay>
                )}
              </AnimatePresence>
            </ReportText>
          </ReportSection>

          <ReportSection>
            <SectionTitle>
              <CheckCircle size={18} />
              提言・推奨事項
            </SectionTitle>
            <ReportText
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {generated ? report.recommendations : '報告書を生成してください...'}
              <AnimatePresence>
                {generating && (
                  <LoadingOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader size={32} color="#9C27B0" className="spin" />
                    <LoadingText>推奨事項を作成中...</LoadingText>
                  </LoadingOverlay>
                )}
              </AnimatePresence>
            </ReportText>
          </ReportSection>

          {generated && (
            <ActionButtons>
              <PrimaryButton
                onClick={handleEdit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Edit3 size={16} />
                編集する
              </PrimaryButton>
              <SecondaryButton
                onClick={handleExport}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={16} />
                PDF出力
              </SecondaryButton>
            </ActionButtons>
          )}
        </Panel>
      </Content>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </Container>
  )
}
