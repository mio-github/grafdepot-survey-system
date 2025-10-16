import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Save,
  Send,
  Users,
  Bot,
  MapPin,
  Image as ImageIcon,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  Sparkles,
  Navigation,
  Wand2,
  Download,
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

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FF9800;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 16px;
`

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: 8px;
`

const StatusCard = styled.div`
  background: #F5F5F5;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`

const StatusLabel = styled.div`
  font-size: 0.875rem;
  color: #757575;
  display: flex;
  align-items: center;
  gap: 8px;
`

const StatusValue = styled.div<{ $color?: string }>`
  font-weight: 600;
  color: ${props => props.$color || '#212121'};
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
`

const ToolSection = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`

const ToolCard = styled(motion.button)`
  width: 100%;
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`

const ToolHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`

const ToolIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const ToolTitle = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: #212121;
`

const ToolDesc = styled.div`
  font-size: 0.75rem;
  color: #757575;
  line-height: 1.4;
`

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Toolbar = styled.div`
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

const AIButton = styled(Button)`
  background: #FF9800;
  color: white;

  &:hover {
    background: #F57C00;
  }
`

const EditorArea = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
`

const MapPanel = styled.div`
  background: #FAFAFA;
  border-right: 1px solid #E0E0E0;
  position: relative;
  overflow: hidden;
`

const MapImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/assets/maps/sample-map.pdf.png');
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

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

const TextPanel = styled.div`
  background: white;
  padding: 24px;
  overflow-y: auto;
`

const Section = styled.div`
  margin-bottom: 32px;
`

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(0, 91, 172, 0.1);
  }
`

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`

const PhotoCard = styled.div`
  background: #F5F5F5;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
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

const PhotoLabel = styled.div`
  font-size: 0.75rem;
  color: #757575;
  font-weight: 600;
`

const AIPanel = styled(motion.div)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 380px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`

const AIPanelHeader = styled.div`
  background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
  color: white;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const AIPanelTitle = styled.div`
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`

const AIPanelContent = styled.div`
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
`

const AISuggestion = styled.div`
  background: #FFF3E0;
  border-left: 3px solid #FF9800;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 12px;
  font-size: 0.875rem;
  line-height: 1.6;
`

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`

export default function AdvancedReportEditor() {
  const navigate = useNavigate()
  const [showAI, setShowAI] = useState(false)
  const [report, setReport] = useState({
    summary: '兵庫県相生市山手2丁目73の担保物件について、現地調査を実施しました。',
    findings: '物件は住宅地に位置し、周辺環境は良好です。建物の外観に軽微な劣化が見られますが、構造上の問題はありません。',
    recommendations: '定期的なメンテナンスを推奨します。特に外壁のひび割れ部分については、経過観察が必要です。',
  })

  const tools = [
    {
      icon: <Wand2 size={20} />,
      color: '#FF9800',
      title: 'AI文章生成',
      desc: '写真と位置情報から報告文を自動生成',
      action: () => setShowAI(true),
    },
    {
      icon: <MapPin size={20} />,
      color: '#2196F3',
      title: '自動配置',
      desc: 'GPS情報で写真を地図に自動配置',
      action: () => alert('GPS情報に基づいて写真を自動配置しました'),
    },
    {
      icon: <Navigation size={20} />,
      color: '#4CAF50',
      title: '視線矢印自動生成',
      desc: '方位情報から視線矢印を自動作成',
      action: () => alert('方位情報に基づいて視線矢印を自動生成しました'),
    },
  ]

  const handleAISuggest = () => {
    setReport({
      ...report,
      summary: 'AI分析の結果、当該物件は良好な状態を維持していることが確認されました。前面道路の幅員は十分であり、アクセス性に問題はありません。',
    })
    alert('AI提案を適用しました')
  }

  return (
    <Container>
      <Sidebar>
        <SidebarHeader>
          <BackButton onClick={() => navigate('/')}>
            <ArrowLeft size={16} />
            ホームに戻る
          </BackButton>
          <Badge>
            <Sparkles size={14} />
            フェーズ2: 本稼働版
          </Badge>

          <Title>報告書作成支援</Title>

          <StatusCard>
            <StatusRow>
              <StatusLabel>
                <Clock size={16} />
                ステータス
              </StatusLabel>
              <StatusValue $color="#FF9800">
                <AlertCircle size={16} />
                作成中
              </StatusValue>
            </StatusRow>
            <StatusRow>
              <StatusLabel>
                <Users size={16} />
                作成者
              </StatusLabel>
              <StatusValue>山田 太郎</StatusValue>
            </StatusRow>
            <StatusRow>
              <StatusLabel>
                <CheckCircle size={16} />
                承認者
              </StatusLabel>
              <StatusValue>佐藤 花子</StatusValue>
            </StatusRow>
          </StatusCard>
        </SidebarHeader>

        <ToolSection>
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              onClick={tool.action}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ToolHeader>
                <ToolIcon $color={tool.color}>{tool.icon}</ToolIcon>
                <ToolTitle>{tool.title}</ToolTitle>
              </ToolHeader>
              <ToolDesc>{tool.desc}</ToolDesc>
            </ToolCard>
          ))}
        </ToolSection>
      </Sidebar>

      <MainContent>
        <Toolbar>
          <ToolbarLeft>
            <ToolbarTitle>
              <FileText size={20} />
              高度な報告書編集
            </ToolbarTitle>
          </ToolbarLeft>
          <ToolbarActions>
            <AIButton
              onClick={() => setShowAI(!showAI)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bot size={16} />
              AI支援
            </AIButton>
            <SecondaryButton
              onClick={() => alert('PDF出力')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              PDF出力
            </SecondaryButton>
            <SecondaryButton
              onClick={() => alert('承認依頼を送信しました')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={16} />
              承認依頼
            </SecondaryButton>
            <PrimaryButton
              onClick={() => alert('報告書を保存しました')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save size={16} />
              保存
            </PrimaryButton>
          </ToolbarActions>
        </Toolbar>

        <EditorArea>
          <MapPanel>
            <MapImage>
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
                  広域図（AI解析済み）
                </div>
                <div>
                  写真6枚配置、視線矢印3本設定
                </div>
              </div>
            </MapImage>
          </MapPanel>

          <TextPanel>
            <Section>
              <SectionTitle>
                <FileText size={18} />
                調査概要
              </SectionTitle>
              <TextArea
                value={report.summary}
                onChange={(e) => setReport({ ...report, summary: e.target.value })}
                placeholder="調査の概要を入力してください..."
              />
            </Section>

            <Section>
              <SectionTitle>
                <AlertCircle size={18} />
                調査所見
              </SectionTitle>
              <TextArea
                value={report.findings}
                onChange={(e) => setReport({ ...report, findings: e.target.value })}
                placeholder="調査で発見した事項を入力してください..."
              />
            </Section>

            <Section>
              <SectionTitle>
                <CheckCircle size={18} />
                提言・推奨事項
              </SectionTitle>
              <TextArea
                value={report.recommendations}
                onChange={(e) => setReport({ ...report, recommendations: e.target.value })}
                placeholder="提言や推奨事項を入力してください..."
              />
            </Section>

            <Section>
              <SectionTitle>
                <ImageIcon size={18} />
                添付写真
              </SectionTitle>
              <PhotoGrid>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <PhotoCard key={num}>
                    <PhotoThumb>
                      <ImageIcon size={24} />
                    </PhotoThumb>
                    <PhotoLabel>写真 {num}</PhotoLabel>
                  </PhotoCard>
                ))}
              </PhotoGrid>
            </Section>
          </TextPanel>
        </EditorArea>
      </MainContent>

      <AnimatePresence>
        {showAI && (
          <AIPanel
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <AIPanelHeader>
              <AIPanelTitle>
                <Bot size={20} />
                AI報告書支援
              </AIPanelTitle>
              <CloseButton onClick={() => setShowAI(false)}>
                ✕
              </CloseButton>
            </AIPanelHeader>
            <AIPanelContent>
              <AISuggestion>
                <strong>AI提案：</strong><br />
                写真解析の結果、建物外壁に軽微なひび割れが検出されました。構造上の問題ではありませんが、経過観察を推奨します。
              </AISuggestion>
              <AISuggestion>
                <strong>改善案：</strong><br />
                「調査概要」に前面道路の幅員情報（約6m）とアクセス性に関する記述を追加することを推奨します。
              </AISuggestion>
              <PrimaryButton
                onClick={handleAISuggest}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Wand2 size={16} />
                AI提案を適用
              </PrimaryButton>
            </AIPanelContent>
          </AIPanel>
        )}
      </AnimatePresence>
    </Container>
  )
}
