import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  XCircle,
  User,
  FileText,
  AlertCircle,
  Send,
  MessageSquare,
} from 'lucide-react'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #FAFAFA;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  background: ${props => props.theme.colors.primary.main};
  color: white;
  padding: 48px 16px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BackButton = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
`

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`

const StatusBar = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`

const StatusLabel = styled.div`
  font-size: 0.875rem;
  color: #757575;
  font-weight: 600;
`

const StatusValue = styled.div<{ $color?: string }>`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.$color || '#212121'};
  display: flex;
  align-items: center;
  gap: 4px;
`

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ReportCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`

const ReportTitle = styled.div`
  font-weight: 700;
  font-size: 0.875rem;
  color: #212121;
  margin-bottom: 4px;
`

const ReportMeta = styled.div`
  font-size: 0.75rem;
  color: #757575;
  display: flex;
  align-items: center;
  gap: 4px;
`

const StatusBadge = styled.div<{ $status: 'pending' | 'approved' | 'rejected' }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  background: ${props =>
    props.$status === 'approved' ? '#4CAF50' :
    props.$status === 'rejected' ? '#F44336' :
    '#FF9800'
  };
  color: white;
`

const ReportContent = styled.div`
  font-size: 0.875rem;
  color: #424242;
  line-height: 1.5;
  margin-bottom: 12px;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`

const Button = styled(motion.button)`
  flex: 1;
  padding: 10px;
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

const ApproveButton = styled(Button)`
  background: #4CAF50;
  color: white;
`

const RejectButton = styled(Button)`
  background: white;
  color: #F44336;
  border: 2px solid #F44336;
`

const CommentButton = styled(Button)`
  background: white;
  color: ${props => props.theme.colors.primary.main};
  border: 2px solid ${props => props.theme.colors.primary.main};
`

export default function ApprovalScreen() {
  const reports = [
    {
      id: 1,
      title: '兵庫県相生市山手2丁目73 現地調査報告',
      author: '田中太郎',
      date: '2024年6月7日',
      status: 'pending' as const,
      content: '物件は住宅地に位置し、周辺環境は良好です。建物の外観に軽微な劣化が見られます。',
    },
    {
      id: 2,
      title: '神戸市中央区港島 担保物件調査',
      author: '佐藤花子',
      date: '2024年6月5日',
      status: 'approved' as const,
      content: '商業地区に位置し、アクセス良好。建物は築10年で状態良好。',
    },
    {
      id: 3,
      title: '姫路市飾磨区 物件調査レポート',
      author: '鈴木一郎',
      date: '2024年6月3日',
      status: 'rejected' as const,
      content: '工業地帯に隣接。騒音レベルが高く、再調査が必要。',
    },
  ]

  const handleApprove = (id: number) => {
    alert(`報告書 #${id} を承認しました`)
  }

  const handleReject = (id: number) => {
    alert(`報告書 #${id} を差し戻しました`)
  }

  const handleComment = (id: number) => {
    alert(`報告書 #${id} にコメントを追加`)
  }

  return (
    <Container>
      <Header>
        <BackButton to="/mobile/phase2">
          <ArrowLeft size={24} />
        </BackButton>
        <Title>承認フロー</Title>
        <div style={{ width: '24px' }} />
      </Header>

      <Content>
        <StatusBar>
          <StatusRow>
            <StatusLabel>承認待ち:</StatusLabel>
            <StatusValue $color="#FF9800">
              <Clock size={16} />
              1件
            </StatusValue>
          </StatusRow>
          <StatusRow>
            <StatusLabel>承認済み:</StatusLabel>
            <StatusValue $color="#4CAF50">
              <CheckCircle size={16} />
              1件
            </StatusValue>
          </StatusRow>
          <StatusRow>
            <StatusLabel>差し戻し:</StatusLabel>
            <StatusValue $color="#F44336">
              <XCircle size={16} />
              1件
            </StatusValue>
          </StatusRow>
        </StatusBar>

        <SectionTitle>
          <FileText size={20} />
          報告書一覧
        </SectionTitle>

        {reports.map((report, index) => (
          <ReportCard
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ReportHeader>
              <div>
                <ReportTitle>{report.title}</ReportTitle>
                <ReportMeta>
                  <User size={12} />
                  {report.author} · {report.date}
                </ReportMeta>
              </div>
              <StatusBadge $status={report.status}>
                {report.status === 'pending' ? '承認待ち' :
                 report.status === 'approved' ? '承認済み' :
                 '差し戻し'}
              </StatusBadge>
            </ReportHeader>

            <ReportContent>{report.content}</ReportContent>

            {report.status === 'pending' && (
              <ActionButtons>
                <ApproveButton
                  onClick={() => handleApprove(report.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CheckCircle size={16} />
                  承認
                </ApproveButton>
                <RejectButton
                  onClick={() => handleReject(report.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <XCircle size={16} />
                  差し戻し
                </RejectButton>
              </ActionButtons>
            )}

            {report.status === 'approved' && (
              <ActionButtons>
                <CommentButton
                  onClick={() => handleComment(report.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageSquare size={16} />
                  コメント
                </CommentButton>
              </ActionButtons>
            )}

            {report.status === 'rejected' && (
              <ActionButtons>
                <CommentButton
                  onClick={() => handleComment(report.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AlertCircle size={16} />
                  差し戻し理由を確認
                </CommentButton>
              </ActionButtons>
            )}
          </ReportCard>
        ))}
      </Content>
    </Container>
  )
}
