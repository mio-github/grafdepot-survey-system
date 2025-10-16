import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, MapPin, Calendar, Image as ImageIcon, BookOpen, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const EditorContainer = styled.div`
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

const SaveButton = styled(motion.button)`
  background: ${props => props.theme.colors.secondary.main};
  border: none;
  color: #000;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 6px;
`

const Title = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
`

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`

const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`

const SectionTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #757575;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
  }
`

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: #F5F5F5;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`

const InfoLabel = styled.div`
  color: #757575;
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 80px;
`

const InfoValue = styled.div`
  font-weight: 600;
  font-family: 'Courier New', monospace;
  color: #212121;
`

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 12px;
`

const PhotoCard = styled.div`
  aspect-ratio: 1;
  background: #E0E0E0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9E9E9E;
  position: relative;
  overflow: hidden;
`

const PhotoPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
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

export default function EditorScreen() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSave = () => {
    // In real app, would save to backend
    alert('報告書を保存しました')
  }

  return (
    <EditorContainer>
      <TopBar>
        <BackButton
          onClick={() => navigate('/mobile/phase1')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={24} />
        </BackButton>
        <Title>報告書編集</Title>
        <SaveButton
          onClick={handleSave}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Save size={16} />
          保存
        </SaveButton>
      </TopBar>

      <Badge style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <BookOpen size={14} />
        フェーズ1: シンプル編集
      </Badge>

      <Content>

        <Section>
          <SectionTitle>基本情報</SectionTitle>
          <Input
            type="text"
            placeholder="報告書タイトルを入力"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Section>

        <Section>
          <SectionTitle>
            <MapPin size={16} />
            位置情報
          </SectionTitle>
          <InfoRow>
            <InfoLabel>緯度</InfoLabel>
            <InfoValue>35.681236°</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>経度</InfoLabel>
            <InfoValue>139.767125°</InfoValue>
          </InfoRow>
        </Section>

        <Section>
          <SectionTitle>
            <Calendar size={16} />
            調査日時
          </SectionTitle>
          <InfoRow>
            <InfoValue>2025-10-16 14:30</InfoValue>
          </InfoRow>
        </Section>

        <Section>
          <SectionTitle>
            <ImageIcon size={16} />
            写真（{0}枚）
          </SectionTitle>
          <PhotoGrid>
            <PhotoCard>
              <PhotoPlaceholder>
                <ImageIcon size={24} />
                写真なし
              </PhotoPlaceholder>
            </PhotoCard>
            <PhotoCard>
              <PhotoPlaceholder>
                <ImageIcon size={24} />
                写真なし
              </PhotoPlaceholder>
            </PhotoCard>
          </PhotoGrid>
        </Section>

        <Section>
          <SectionTitle>メモ・所見</SectionTitle>
          <TextArea
            placeholder="調査内容や気づいた点を入力してください"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Section>

        <div style={{
          padding: '12px',
          background: '#FFF3E0',
          borderRadius: '8px',
          fontSize: '0.75rem',
          lineHeight: 1.5,
          color: '#E65100',
          marginTop: '8px'
        }}>
          <strong>📌 フェーズ1の編集機能</strong><br />
          シンプルな入力フォームで基本的な報告書作成が可能です。フェーズ2では、リッチテキスト編集、ドラッグ&ドロップ、リアルタイムプレビューなど高度な機能を追加予定。
        </div>
      </Content>
    </EditorContainer>
  )
}
