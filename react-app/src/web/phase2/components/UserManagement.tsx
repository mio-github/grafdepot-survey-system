import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Users, UserPlus, Edit2, Trash2, Shield, Mail, Phone } from 'lucide-react'

const Container = styled.div`
  min-height: 100vh;
  background: #F5F5F5;
  padding: 2rem;
`

const Header = styled.div`
  margin-bottom: 2rem;
`

const BackButton = styled(Link)`
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
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Title = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: #757575;
`

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const AddButton = styled(motion.button)`
  background: #FF9800;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;

  &:hover {
    background: #F57C00;
  }
`

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
`

const UserCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #005BAC 0%, #0277BD 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
`

const UserInfo = styled.div`
  flex: 1;
`

const UserName = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #212121;
  margin-bottom: 4px;
`

const RoleBadge = styled.span<{ $role: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  background: ${props =>
    props.$role === 'admin' ? '#F44336' :
    props.$role === 'manager' ? '#FF9800' :
    props.$role === 'editor' ? '#4CAF50' : '#2196F3'
  };
  color: white;
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 1rem;
  padding: 12px 0;
  border-top: 1px solid #E0E0E0;
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #616161;
`

const Actions = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #E0E0E0;
`

const ActionButton = styled(motion.button)<{ $color?: string }>`
  flex: 1;
  background: ${props => props.$color || '#E0E0E0'};
  color: ${props => props.$color ? 'white' : '#616161'};
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    opacity: 0.8;
  }
`

const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 1400px;
`

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: 4px;
`

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #757575;
`

export default function UserManagement() {
  const [users] = useState([
    {
      id: 1,
      name: '田中太郎',
      email: 'tanaka@example.com',
      phone: '090-1234-5678',
      role: 'admin',
      reports: 42,
    },
    {
      id: 2,
      name: '佐藤花子',
      email: 'sato@example.com',
      phone: '090-2345-6789',
      role: 'manager',
      reports: 38,
    },
    {
      id: 3,
      name: '鈴木次郎',
      email: 'suzuki@example.com',
      phone: '090-3456-7890',
      role: 'editor',
      reports: 25,
    },
    {
      id: 4,
      name: '高橋美咲',
      email: 'takahashi@example.com',
      phone: '090-4567-8901',
      role: 'viewer',
      reports: 0,
    },
    {
      id: 5,
      name: '伊藤健一',
      email: 'ito@example.com',
      phone: '090-5678-9012',
      role: 'editor',
      reports: 31,
    },
    {
      id: 6,
      name: '渡辺さくら',
      email: 'watanabe@example.com',
      phone: '090-6789-0123',
      role: 'manager',
      reports: 29,
    },
  ])

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    managers: users.filter(u => u.role === 'manager').length,
    editors: users.filter(u => u.role === 'editor').length,
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return '管理者'
      case 'manager': return 'マネージャー'
      case 'editor': return '編集者'
      case 'viewer': return '閲覧者'
      default: return role
    }
  }

  const handleEdit = (userId: number) => {
    alert(`ユーザー ${userId} の編集画面を開きます`)
  }

  const handleDelete = (userId: number) => {
    if (confirm('このユーザーを削除してもよろしいですか？')) {
      alert(`ユーザー ${userId} を削除しました`)
    }
  }

  const handleAddUser = () => {
    alert('新規ユーザー追加画面を開きます')
  }

  return (
    <Container>
      <Header>
        <BackButton to="/web/phase2">
          <ArrowLeft size={16} />
          戻る
        </BackButton>
        <Title>
          <Users size={36} />
          ユーザー管理
        </Title>
        <Subtitle>
          チームメンバーの追加・編集・権限管理を行います
        </Subtitle>
      </Header>

      <StatsBar>
        <StatCard>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>総ユーザー数</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.admins}</StatValue>
          <StatLabel>管理者</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.managers}</StatValue>
          <StatLabel>マネージャー</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.editors}</StatValue>
          <StatLabel>編集者</StatLabel>
        </StatCard>
      </StatsBar>

      <ActionBar>
        <div />
        <AddButton
          onClick={handleAddUser}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <UserPlus size={18} />
          新規ユーザー追加
        </AddButton>
      </ActionBar>

      <UserGrid>
        {users.map((user, index) => (
          <UserCard
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <UserHeader>
              <Avatar>{user.name.charAt(0)}</Avatar>
              <UserInfo>
                <UserName>{user.name}</UserName>
                <RoleBadge $role={user.role}>
                  {getRoleLabel(user.role)}
                </RoleBadge>
              </UserInfo>
            </UserHeader>

            <ContactInfo>
              <ContactItem>
                <Mail size={16} />
                {user.email}
              </ContactItem>
              <ContactItem>
                <Phone size={16} />
                {user.phone}
              </ContactItem>
              <ContactItem>
                <Shield size={16} />
                作成報告書: {user.reports}件
              </ContactItem>
            </ContactInfo>

            <Actions>
              <ActionButton
                $color="#005BAC"
                onClick={() => handleEdit(user.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Edit2 size={16} />
                編集
              </ActionButton>
              <ActionButton
                $color="#F44336"
                onClick={() => handleDelete(user.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 size={16} />
                削除
              </ActionButton>
            </Actions>
          </UserCard>
        ))}
      </UserGrid>
    </Container>
  )
}
