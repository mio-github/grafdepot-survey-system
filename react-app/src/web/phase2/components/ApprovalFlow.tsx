import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
  Users,
  CheckCircle,
  Clock,
  XCircle,
  ArrowRight,
  FileText,
  Calendar,
  MessageSquare,
  Send,
  ArrowLeft,
  Sparkles,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  min-height: 100vh;
  background: #F5F5F5;
  padding: 2rem;
`

const Header = styled.div`
  margin-bottom: 2rem;
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

const Title = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary.main};
  display: flex;
  align-items: center;
  gap: 12px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
`

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 8px;
`

const FlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FlowStep = styled.div<{ $status: 'pending' | 'approved' | 'rejected' | 'current' }>`
  background: ${props => {
    if (props.$status === 'approved') return '#E8F5E9'
    if (props.$status === 'rejected') return '#FFEBEE'
    if (props.$status === 'current') return '#E3F2FD'
    return '#F5F5F5'
  }};
  border-left: 4px solid ${props => {
    if (props.$status === 'approved') return '#4CAF50'
    if (props.$status === 'rejected') return '#F44336'
    if (props.$status === 'current') return '#2196F3'
    return '#E0E0E0'
  }};
  border-radius: 8px;
  padding: 1.5rem;
  position: relative;
`

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`

const StepInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const StepIcon = styled.div<{ $status: 'pending' | 'approved' | 'rejected' | 'current' }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => {
    if (props.$status === 'approved') return '#4CAF50'
    if (props.$status === 'rejected') return '#F44336'
    if (props.$status === 'current') return '#2196F3'
    return '#E0E0E0'
  }};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StepDetails = styled.div``

const StepTitle = styled.div`
  font-weight: 700;
  font-size: 1rem;
  color: #212121;
  margin-bottom: 4px;
`

const StepMeta = styled.div`
  font-size: 0.875rem;
  color: #757575;
  display: flex;
  align-items: center;
  gap: 8px;
`

const StatusBadge = styled.div<{ $status: 'pending' | 'approved' | 'rejected' | 'current' }>`
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    if (props.$status === 'approved') return '#4CAF50'
    if (props.$status === 'rejected') return '#F44336'
    if (props.$status === 'current') return '#2196F3'
    return '#9E9E9E'
  }};
  color: white;
`

const StepComment = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 6px;
  font-size: 0.875rem;
  color: #757575;
`

const ReportList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ReportCard = styled(motion.div)`
  background: #F5F5F5;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #EEEEEE;
    transform: translateY(-2px);
  }
`

const ReportHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

const ReportTitle = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: #212121;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ReportMeta = styled.div`
  font-size: 0.75rem;
  color: #757575;
  display: flex;
  align-items: center;
  gap: 12px;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #E0E0E0;
`

const Button = styled(motion.button)`
  padding: 10px 20px;
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

const ApproveButton = styled(Button)`
  background: #4CAF50;
  color: white;
  flex: 1;

  &:hover {
    background: #45A049;
  }
`

const RejectButton = styled(Button)`
  background: #F44336;
  color: white;
  flex: 1;

  &:hover {
    background: #E53935;
  }
`

const CommentBox = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  margin-top: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(0, 91, 172, 0.1);
  }
`

interface FlowStepData {
  id: number
  title: string
  approver: string
  status: 'pending' | 'approved' | 'rejected' | 'current'
  date?: string
  comment?: string
}

export default function ApprovalFlow() {
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
  const [flowSteps, setFlowSteps] = useState<FlowStepData[]>([
    {
      id: 1,
      title: '調査員による作成',
      approver: '山田 太郎',
      status: 'approved',
      date: '2024-06-07 14:30',
      comment: '現地調査を完了し、報告書を作成しました。',
    },
    {
      id: 2,
      title: '主任による確認',
      approver: '佐藤 花子',
      status: 'current',
      date: '2024-06-07 15:00',
    },
    {
      id: 3,
      title: '部長による最終承認',
      approver: '鈴木 一郎',
      status: 'pending',
    },
  ])

  const handleApprove = () => {
    const updatedSteps = flowSteps.map(step => {
      if (step.status === 'current') {
        return {
          ...step,
          status: 'approved' as const,
          comment: comment || '承認しました。',
          date: new Date().toLocaleString('ja-JP'),
        }
      }
      if (step.status === 'pending') {
        const prevApproved = flowSteps.find(s => s.id === step.id - 1)?.status === 'current'
        return prevApproved ? { ...step, status: 'current' as const } : step
      }
      return step
    })
    setFlowSteps(updatedSteps)
    setComment('')
    alert('承認しました')
  }

  const handleReject = () => {
    const updatedSteps = flowSteps.map(step =>
      step.status === 'current'
        ? {
            ...step,
            status: 'rejected' as const,
            comment: comment || '差し戻しました。',
            date: new Date().toLocaleString('ja-JP'),
          }
        : step
    )
    setFlowSteps(updatedSteps)
    setComment('')
    alert('差し戻しました')
  }

  const reports = [
    {
      id: 1,
      title: '兵庫県相生市山手2丁目73 担保物件状況調査',
      creator: '山田 太郎',
      date: '2024-06-07',
      status: 'current',
    },
    {
      id: 2,
      title: '大阪府吹田市千里山 不動産評価調査',
      creator: '田中 次郎',
      date: '2024-06-06',
      status: 'approved',
    },
    {
      id: 3,
      title: '京都府京都市左京区 建物状況調査',
      creator: '伊藤 三郎',
      date: '2024-06-05',
      status: 'pending',
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
          <Sparkles size={14} />
          フェーズ2: 本稼働版
        </Badge>
        <Title>
          <Users size={32} />
          承認フロー管理
        </Title>
      </Header>

      <Grid>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardTitle>
            <ArrowRight size={20} />
            承認フロー
          </CardTitle>

          <FlowContainer>
            {flowSteps.map((step, index) => (
              <FlowStep key={step.id} $status={step.status}>
                <StepHeader>
                  <StepInfo>
                    <StepIcon $status={step.status}>
                      {step.status === 'approved' && <CheckCircle size={20} />}
                      {step.status === 'rejected' && <XCircle size={20} />}
                      {step.status === 'current' && <Clock size={20} />}
                      {step.status === 'pending' && <Clock size={20} />}
                    </StepIcon>
                    <StepDetails>
                      <StepTitle>{step.title}</StepTitle>
                      <StepMeta>
                        <Users size={14} />
                        {step.approver}
                        {step.date && (
                          <>
                            <Calendar size={14} />
                            {step.date}
                          </>
                        )}
                      </StepMeta>
                    </StepDetails>
                  </StepInfo>
                  <StatusBadge $status={step.status}>
                    {step.status === 'approved' && '承認済み'}
                    {step.status === 'rejected' && '差し戻し'}
                    {step.status === 'current' && '承認待ち'}
                    {step.status === 'pending' && '未処理'}
                  </StatusBadge>
                </StepHeader>
                {step.comment && (
                  <StepComment>
                    <MessageSquare size={14} style={{ display: 'inline', marginRight: '8px' }} />
                    {step.comment}
                  </StepComment>
                )}
              </FlowStep>
            ))}
          </FlowContainer>

          {flowSteps.some(step => step.status === 'current') && (
            <>
              <CommentBox
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="コメントを入力してください..."
              />
              <ActionButtons>
                <RejectButton
                  onClick={handleReject}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <XCircle size={16} />
                  差し戻し
                </RejectButton>
                <ApproveButton
                  onClick={handleApprove}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CheckCircle size={16} />
                  承認
                </ApproveButton>
              </ActionButtons>
            </>
          )}
        </Card>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardTitle>
            <FileText size={20} />
            報告書一覧
          </CardTitle>

          <ReportList>
            {reports.map((report) => (
              <ReportCard
                key={report.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ReportHeader>
                  <ReportTitle>
                    <FileText size={16} />
                    {report.title}
                  </ReportTitle>
                  <StatusBadge $status={report.status as any}>
                    {report.status === 'current' && '承認待ち'}
                    {report.status === 'approved' && '承認済み'}
                    {report.status === 'pending' && '未処理'}
                  </StatusBadge>
                </ReportHeader>
                <ReportMeta>
                  <span>
                    <Users size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {report.creator}
                  </span>
                  <span>
                    <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {report.date}
                  </span>
                </ReportMeta>
              </ReportCard>
            ))}
          </ReportList>
        </Card>
      </Grid>
    </Container>
  )
}
