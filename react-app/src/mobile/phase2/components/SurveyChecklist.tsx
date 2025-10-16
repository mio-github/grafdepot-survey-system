import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
  CheckSquare,
  Square,
  ArrowLeft,
  Camera,
  FileText,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #F5F5F5;
`

const Header = styled.div`
  background: ${props => props.theme.colors.primary.main};
  color: white;
  padding: 48px 16px 24px;
`

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`

const BackButton = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  flex: 1;
`

const ProgressBar = styled.div`
  background: rgba(255, 255, 255, 0.3);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`

const ProgressFill = styled(motion.div)<{ $progress: number }>`
  background: white;
  height: 100%;
  width: ${props => props.$progress}%;
  border-radius: 4px;
`

const ProgressText = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
`

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`

const CategorySection = styled.div`
  margin-bottom: 24px;
`

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`

const CategoryIcon = styled.div<{ $color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const CategoryTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #212121;
  flex: 1;
`

const CategoryBadge = styled.div<{ $completed: boolean }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => props.$completed ? '#4CAF50' : '#FF9800'};
  color: white;
`

const ChecklistItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ChecklistItem = styled(motion.div)<{ $checked: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  opacity: ${props => props.$checked ? 0.7 : 1};
  border: 2px solid ${props => props.$checked ? '#4CAF50' : 'transparent'};

  &:active {
    transform: scale(0.98);
  }
`

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const Checkbox = styled.div<{ $checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 2px solid ${props => props.$checked ? '#4CAF50' : '#E0E0E0'};
  background: ${props => props.$checked ? '#4CAF50' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`

const ItemText = styled.div<{ $checked: boolean }>`
  flex: 1;
  font-size: 0.875rem;
  color: ${props => props.$checked ? '#757575' : '#212121'};
  text-decoration: ${props => props.$checked ? 'line-through' : 'none'};
`

const ItemNote = styled.div`
  font-size: 0.75rem;
  color: #757575;
  margin-top: 4px;
  padding-left: 36px;
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
  background: #F5F5F5;
  color: ${props => props.theme.colors.primary.main};
`

interface ChecklistItemData {
  id: number
  text: string
  note?: string
  checked: boolean
}

interface Category {
  id: number
  title: string
  icon: React.ReactNode
  color: string
  items: ChecklistItemData[]
}

export default function SurveyChecklist() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      title: '撮影項目',
      icon: <Camera size={18} />,
      color: '#2196F3',
      items: [
        { id: 1, text: '前面道路（南東側）', note: 'SE方向、約5m', checked: true },
        { id: 2, text: '調査物件_正面', note: 'E方向、約10m', checked: true },
        { id: 3, text: '境界付近（南西側）', note: 'SW方向', checked: false },
        { id: 4, text: '調査物件_側面', note: 'N方向', checked: false },
        { id: 5, text: '境界付近（北東側）', note: 'NE方向', checked: false },
        { id: 6, text: '調査物件_全景', note: 'W方向、約15m', checked: false },
      ],
    },
    {
      id: 2,
      title: '確認項目',
      icon: <FileText size={18} />,
      color: '#4CAF50',
      items: [
        { id: 7, text: '建物の外観状態', checked: true },
        { id: 8, text: 'ひび割れ・劣化の有無', checked: false },
        { id: 9, text: '前面道路の幅員', checked: false },
        { id: 10, text: '隣地との境界確認', checked: false },
      ],
    },
    {
      id: 3,
      title: '注意事項',
      icon: <AlertTriangle size={18} />,
      color: '#FF9800',
      items: [
        { id: 11, text: '安全確認（交通量・足場）', checked: true },
        { id: 12, text: '周辺住民への配慮', checked: false },
        { id: 13, text: '天候・照明条件の確認', checked: false },
      ],
    },
  ])

  const toggleItem = (categoryId: number, itemId: number) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map(item =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : cat
      )
    )
  }

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0)
  const completedItems = categories.reduce(
    (sum, cat) => sum + cat.items.filter(item => item.checked).length,
    0
  )
  const progress = Math.round((completedItems / totalItems) * 100)

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton to="/mobile/phase2">
            <ArrowLeft size={24} />
          </BackButton>
          <Title>調査チェックリスト</Title>
          <div style={{ width: '40px' }} />
        </HeaderTop>
        <ProgressBar>
          <ProgressFill
            $progress={progress}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </ProgressBar>
        <ProgressText>
          {completedItems} / {totalItems} 完了 ({progress}%)
        </ProgressText>
      </Header>

      <Content>
        {categories.map(category => {
          const categoryCompleted = category.items.every(item => item.checked)
          const categoryProgress = category.items.filter(item => item.checked).length

          return (
            <CategorySection key={category.id}>
              <CategoryHeader>
                <CategoryIcon $color={category.color}>{category.icon}</CategoryIcon>
                <CategoryTitle>{category.title}</CategoryTitle>
                <CategoryBadge $completed={categoryCompleted}>
                  {categoryProgress}/{category.items.length}
                </CategoryBadge>
              </CategoryHeader>
              <ChecklistItems>
                {category.items.map(item => (
                  <ChecklistItem
                    key={item.id}
                    $checked={item.checked}
                    onClick={() => toggleItem(category.id, item.id)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ItemContent>
                      <Checkbox $checked={item.checked}>
                        {item.checked ? <CheckSquare size={16} /> : <Square size={16} />}
                      </Checkbox>
                      <div style={{ flex: 1 }}>
                        <ItemText $checked={item.checked}>{item.text}</ItemText>
                        {item.note && <ItemNote>{item.note}</ItemNote>}
                      </div>
                    </ItemContent>
                  </ChecklistItem>
                ))}
              </ChecklistItems>
            </CategorySection>
          )
        })}
      </Content>

      <BottomBar>
        <SecondaryButton whileTap={{ scale: 0.95 }}>
          <FileText size={18} />
          メモ追加
        </SecondaryButton>
        <PrimaryButton whileTap={{ scale: 0.95 }}>
          <CheckCircle size={18} />
          完了報告
        </PrimaryButton>
      </BottomBar>
    </Container>
  )
}
