import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, Check, X, AlertCircle } from 'lucide-react'

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

const Content = styled.div`
  max-width: 1400px;
`

const RoleSection = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`

const RoleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #E0E0E0;
`

const RoleTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #212121;
  display: flex;
  align-items: center;
  gap: 12px;
`

const RoleBadge = styled.span<{ $color: string }>`
  display: inline-block;
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 700;
  background: ${props => props.$color};
  color: white;
`

const RoleDescription = styled.p`
  font-size: 0.875rem;
  color: #757575;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`

const PermissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`

const PermissionCard = styled.div<{ $granted: boolean }>`
  background: ${props => props.$granted ? '#E8F5E9' : '#FFEBEE'};
  border: 2px solid ${props => props.$granted ? '#4CAF50' : '#F44336'};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 12px;
`

const PermissionIcon = styled.div<{ $granted: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$granted ? '#4CAF50' : '#F44336'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`

const PermissionInfo = styled.div`
  flex: 1;
`

const PermissionName = styled.div`
  font-weight: 700;
  color: #212121;
  margin-bottom: 4px;
  font-size: 0.875rem;
`

const PermissionDesc = styled.div`
  font-size: 0.75rem;
  color: #616161;
`

const InfoBox = styled.div`
  background: #FFF3E0;
  border: 2px solid #FFB74D;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  gap: 12px;
`

const InfoIcon = styled.div`
  color: #F57C00;
  flex-shrink: 0;
`

const InfoText = styled.div`
  font-size: 0.875rem;
  color: #E65100;
  line-height: 1.6;

  strong {
    font-weight: 700;
  }
`

const SaveButton = styled(motion.button)`
  background: #FF9800;
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2rem;

  &:hover {
    background: #F57C00;
  }
`

interface Permission {
  name: string
  description: string
  granted: boolean
}

interface RolePermissions {
  role: string
  label: string
  color: string
  description: string
  permissions: Permission[]
}

export default function PermissionManagement() {
  const [roles] = useState<RolePermissions[]>([
    {
      role: 'admin',
      label: '管理者',
      color: '#F44336',
      description: 'システム全体の管理権限を持つ最高権限ユーザー。全ての機能にアクセス可能です。',
      permissions: [
        { name: '報告書作成', description: '新規報告書の作成', granted: true },
        { name: '報告書編集', description: '既存報告書の編集', granted: true },
        { name: '報告書削除', description: '報告書の削除', granted: true },
        { name: '報告書承認', description: '報告書の承認・却下', granted: true },
        { name: 'ユーザー管理', description: 'ユーザーの追加・編集・削除', granted: true },
        { name: '権限管理', description: 'ロール・権限の設定', granted: true },
        { name: 'AI機能利用', description: 'AI報告書生成機能の利用', granted: true },
        { name: 'エクスポート', description: 'PDF・データエクスポート', granted: true },
      ],
    },
    {
      role: 'manager',
      label: 'マネージャー',
      color: '#FF9800',
      description: 'チーム管理と報告書の承認を行う中間管理者。メンバーの作業を監督します。',
      permissions: [
        { name: '報告書作成', description: '新規報告書の作成', granted: true },
        { name: '報告書編集', description: '既存報告書の編集', granted: true },
        { name: '報告書削除', description: '報告書の削除', granted: false },
        { name: '報告書承認', description: '報告書の承認・却下', granted: true },
        { name: 'ユーザー管理', description: 'ユーザーの追加・編集・削除', granted: false },
        { name: '権限管理', description: 'ロール・権限の設定', granted: false },
        { name: 'AI機能利用', description: 'AI報告書生成機能の利用', granted: true },
        { name: 'エクスポート', description: 'PDF・データエクスポート', granted: true },
      ],
    },
    {
      role: 'editor',
      label: '編集者',
      color: '#4CAF50',
      description: '報告書の作成・編集を行う一般ユーザー。日常的な報告書作成業務を担当します。',
      permissions: [
        { name: '報告書作成', description: '新規報告書の作成', granted: true },
        { name: '報告書編集', description: '既存報告書の編集', granted: true },
        { name: '報告書削除', description: '報告書の削除', granted: false },
        { name: '報告書承認', description: '報告書の承認・却下', granted: false },
        { name: 'ユーザー管理', description: 'ユーザーの追加・編集・削除', granted: false },
        { name: '権限管理', description: 'ロール・権限の設定', granted: false },
        { name: 'AI機能利用', description: 'AI報告書生成機能の利用', granted: true },
        { name: 'エクスポート', description: 'PDF・データエクスポート', granted: true },
      ],
    },
    {
      role: 'viewer',
      label: '閲覧者',
      color: '#2196F3',
      description: '報告書の閲覧のみ可能な制限ユーザー。編集や承認の権限はありません。',
      permissions: [
        { name: '報告書作成', description: '新規報告書の作成', granted: false },
        { name: '報告書編集', description: '既存報告書の編集', granted: false },
        { name: '報告書削除', description: '報告書の削除', granted: false },
        { name: '報告書承認', description: '報告書の承認・却下', granted: false },
        { name: 'ユーザー管理', description: 'ユーザーの追加・編集・削除', granted: false },
        { name: '権限管理', description: 'ロール・権限の設定', granted: false },
        { name: 'AI機能利用', description: 'AI報告書生成機能の利用', granted: false },
        { name: 'エクスポート', description: 'PDF・データエクスポート', granted: true },
      ],
    },
  ])

  const handleSave = () => {
    alert('権限設定を保存しました')
  }

  return (
    <Container>
      <Header>
        <BackButton to="/web/phase2">
          <ArrowLeft size={16} />
          戻る
        </BackButton>
        <Title>
          <Shield size={36} />
          権限管理
        </Title>
        <Subtitle>
          ロールごとの権限設定を管理します
        </Subtitle>
      </Header>

      <Content>
        <InfoBox>
          <InfoIcon>
            <AlertCircle size={24} />
          </InfoIcon>
          <InfoText>
            <strong>権限管理について：</strong><br />
            各ロール（管理者・マネージャー・編集者・閲覧者）に対して、システム内での操作権限を設定できます。
            権限の変更は既存ユーザーにも即座に反映されますので、慎重に設定してください。
          </InfoText>
        </InfoBox>

        {roles.map((roleData, index) => (
          <RoleSection
            key={roleData.role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <RoleHeader>
              <RoleTitle>
                <Shield size={28} />
                {roleData.label}
                <RoleBadge $color={roleData.color}>
                  {roleData.role.toUpperCase()}
                </RoleBadge>
              </RoleTitle>
            </RoleHeader>

            <RoleDescription>{roleData.description}</RoleDescription>

            <PermissionGrid>
              {roleData.permissions.map((permission, idx) => (
                <PermissionCard key={idx} $granted={permission.granted}>
                  <PermissionIcon $granted={permission.granted}>
                    {permission.granted ? <Check size={20} /> : <X size={20} />}
                  </PermissionIcon>
                  <PermissionInfo>
                    <PermissionName>{permission.name}</PermissionName>
                    <PermissionDesc>{permission.description}</PermissionDesc>
                  </PermissionInfo>
                </PermissionCard>
              ))}
            </PermissionGrid>
          </RoleSection>
        ))}

        <SaveButton
          onClick={handleSave}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Shield size={20} />
          権限設定を保存
        </SaveButton>
      </Content>
    </Container>
  )
}
