import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Save,
  Eye,
  Edit3,
  Bold,
  Italic,
  List,
  Image as ImageIcon,
  MapPin,
  Calendar,
  User,
  Settings,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #FAFAFA;
  display: flex;
  flex-direction: column;
`

const TopBar = styled.div`
  background: white;
  color: ${props => props.theme.colors.primary.main};
  padding: 48px 16px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`

const TopBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
`

const BackButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.primary.main};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`

const IconButton = styled(motion.button)<{ $active?: boolean }>`
  background: ${props => props.$active ? props.theme.colors.primary.main : 'transparent'};
  border: 1px solid ${props => props.theme.colors.primary.main};
  color: ${props => props.$active ? 'white' : props.theme.colors.primary.main};
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
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
  text-align: center;
`

const TabBar = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 16px;
`

const Tab = styled(motion.button)<{ $active: boolean }>`
  background: transparent;
  border: none;
  color: ${props => props.$active ? props.theme.colors.primary.main : '#9E9E9E'};
  cursor: pointer;
  padding: 12px 4px;
  font-weight: 600;
  font-size: 0.875rem;
  border-bottom: 2px solid ${props => props.$active ? props.theme.colors.primary.main : 'transparent'};
  transition: all 0.2s;
`

const StatusBar = styled(motion.div)`
  background: #E3F2FD;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: ${props => props.theme.colors.primary.dark};
`

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`

const FormattingToolbar = styled.div`
  background: white;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 16px;
  display: flex;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow-x: auto;
`

const ToolButton = styled(motion.button)<{ $active?: boolean }>`
  background: ${props => props.$active ? '#E3F2FD' : 'transparent'};
  border: none;
  color: ${props => props.$active ? props.theme.colors.primary.main : '#757575'};
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  white-space: nowrap;
  min-width: 40px;
  justify-content: center;
`

const Section = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const SectionTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #424242;
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
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary.main}15;
  }
`

const RichTextArea = styled.div`
  width: 100%;
  padding: 12px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 0.875rem;
  min-height: 150px;
  background: white;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary.main}15;
  }
`

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 12px;
`

const ImageCard = styled(motion.div)`
  aspect-ratio: 1;
  background: #F5F5F5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9E9E9E;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
  }
`

const AddImageButton = styled(ImageCard)`
  background: #E3F2FD;
  color: ${props => props.theme.colors.primary.main};
  border: 2px dashed ${props => props.theme.colors.primary.main};
`

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 12px;
`

const MetaCard = styled.div`
  background: #F5F5F5;
  padding: 12px;
  border-radius: 8px;
`

const MetaLabel = styled.div`
  font-size: 0.75rem;
  color: #757575;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`

const MetaValue = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Courier New', monospace;
`

const Badge = styled.div`
  display: inline-block;
  background: #FF9800;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 16px;
`

const FeatureBadge = styled.div`
  background: #FFF3E0;
  border: 1px solid #FFB74D;
  color: #E65100;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  line-height: 1.5;
  margin-top: 16px;

  strong {
    display: block;
    margin-bottom: 4px;
  }
`

export default function AdvancedEditor() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'edit' | 'preview'>('edit')
  const [title, setTitle] = useState('')
  const [autoSaving, setAutoSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date>(new Date())

  // Simulate auto-save
  useEffect(() => {
    if (title) {
      setAutoSaving(true)
      const timer = setTimeout(() => {
        setAutoSaving(false)
        setLastSaved(new Date())
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [title])

  const handleSave = () => {
    alert('報告書を保存しました（フェーズ2: チーム編集機能）')
  }

  return (
    <EditorContainer>
      <TopBar>
        <TopBarContent>
          <BackButton
            onClick={() => navigate('/mobile/phase2')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft size={24} />
          </BackButton>
          <Title>チーム編集</Title>
          <ActionButtons>
            <IconButton
              $active={mode === 'preview'}
              onClick={() => setMode(mode === 'edit' ? 'preview' : 'edit')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {mode === 'edit' ? <Eye size={18} /> : <Edit3 size={18} />}
            </IconButton>
            <SaveButton
              onClick={handleSave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save size={16} />
              保存
            </SaveButton>
          </ActionButtons>
        </TopBarContent>

        <TabBar>
          <Tab $active={true}>基本情報</Tab>
          <Tab $active={false}>詳細</Tab>
          <Tab $active={false}>承認</Tab>
        </TabBar>
      </TopBar>

      <AnimatePresence mode="wait">
        {autoSaving ? (
          <StatusBar
            key="saving"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <StatusItem>
              <Clock size={14} />
              自動保存中...
            </StatusItem>
          </StatusBar>
        ) : (
          <StatusBar
            key="saved"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <StatusItem>
              <CheckCircle size={14} />
              最終保存: {lastSaved.toLocaleTimeString()}
            </StatusItem>
            <StatusItem>
              <User size={14} />
              担当: 田中太郎
            </StatusItem>
          </StatusBar>
        )}
      </AnimatePresence>

      <Content>
        <Badge style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} />
          フェーズ2: チーム編集機能
        </Badge>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SectionTitle>報告書タイトル</SectionTitle>
          <Input
            type="text"
            placeholder="タイトルを入力"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionHeader>
            <SectionTitle>
              <ImageIcon size={16} />
              写真ギャラリー
            </SectionTitle>
            <IconButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Settings size={16} />
            </IconButton>
          </SectionHeader>
          <ImageGallery>
            <ImageCard whileHover={{ scale: 1.05 }}>
              <ImageIcon size={24} />
            </ImageCard>
            <ImageCard whileHover={{ scale: 1.05 }}>
              <ImageIcon size={24} />
            </ImageCard>
            <AddImageButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              + 追加
            </AddImageButton>
          </ImageGallery>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SectionTitle>本文（リッチテキスト編集）</SectionTitle>
          <FormattingToolbar>
            <ToolButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Bold size={16} />
            </ToolButton>
            <ToolButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Italic size={16} />
            </ToolButton>
            <ToolButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <List size={16} />
            </ToolButton>
            <ToolButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              見出し
            </ToolButton>
            <ToolButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              引用
            </ToolButton>
          </FormattingToolbar>
          <RichTextArea contentEditable suppressContentEditableWarning>
            調査内容や所見を入力してください...
          </RichTextArea>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SectionTitle>
            <MapPin size={16} />
            位置・日時情報
          </SectionTitle>
          <MetaGrid>
            <MetaCard>
              <MetaLabel>
                <MapPin size={12} />
                緯度
              </MetaLabel>
              <MetaValue>35.681236°</MetaValue>
            </MetaCard>
            <MetaCard>
              <MetaLabel>
                <MapPin size={12} />
                経度
              </MetaLabel>
              <MetaValue>139.767125°</MetaValue>
            </MetaCard>
            <MetaCard>
              <MetaLabel>
                <Calendar size={12} />
                調査日
              </MetaLabel>
              <MetaValue>2025-10-16</MetaValue>
            </MetaCard>
            <MetaCard>
              <MetaLabel>
                <Clock size={12} />
                時刻
              </MetaLabel>
              <MetaValue>14:30</MetaValue>
            </MetaCard>
          </MetaGrid>
        </Section>

        <FeatureBadge style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <Sparkles size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>フェーズ2の高度な機能</strong><br />
            リッチテキスト編集、自動保存、プレビューモード、タブ切替、画像ギャラリー、承認フロー連携など、より使いやすく高機能なエディタです。
          </div>
        </FeatureBadge>
      </Content>
    </EditorContainer>
  )
}
