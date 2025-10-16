# グラフデポ 現地調査報告システム - React版

React + TypeScript + Framer Motion で構築したモダンでスタイリッシュなアプリケーション

## 🚀 クイックスタート

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ブラウザが自動で開き、http://localhost:3000 で起動します
```

## 📁 プロジェクト構造

```
react-app/
├── src/
│   ├── mobile/           # スマホアプリ
│   │   ├── phase1/       # フェーズ1: MVP
│   │   └── phase2/       # フェーズ2: フル機能
│   ├── web/              # Web管理システム
│   │   ├── phase1/       # フェーズ1: MVP
│   │   └── phase2/       # フェーズ2: フル機能
│   ├── shared/           # 共通コンポーネント
│   │   ├── theme.ts      # デザインテーマ
│   │   └── GlobalStyle.ts
│   ├── pages/            # ページコンポーネント
│   │   └── HomePage.tsx  # ランディングページ
│   ├── App.tsx           # ルーティング
│   └── main.tsx          # エントリーポイント
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🎨 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - 型安全性
- **Vite** - 超高速ビルドツール
- **Styled Components** - CSS-in-JS
- **Framer Motion** - スムーズなアニメーション
- **React Router** - ルーティング
- **Lucide React** - アイコン

## 📱 フェーズ1 vs フェーズ2

### フェーズ1: MVP (シンプル・単一ユーザー)
- 単一ユーザーでの報告書作成に特化
- GPS/方位の自動記録
- 地図への自動プロット
- 基本的なPDF出力
- **グループ管理・承認フローなし**

### フェーズ2: フル機能
- フェーズ1の全機能
- グループ管理
- 承認フロー
- プロジェクト単位での管理
- AI画像解析
- データ分析ダッシュボード

## 🛠️ 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# モバイルアプリを直接開く
npm run dev:mobile

# Web管理画面を直接開く
npm run dev:web

# 本番ビルド
npm run build

# プレビュー
npm run preview

# Lint
npm run lint
```

## 🎯 デザインシステム

### カラーパレット

```typescript
primary: {
  main: '#005BAC',    // ブルー
  light: '#0070D6',
  dark: '#003D73',
}
secondary: {
  main: '#FFC400',    // イエロー
  dark: '#E6B000',
}
```

### スペーシング

8pxグリッドシステム:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px

## 📂 開発ガイド

### 新しいページの追加

1. `src/pages/` または対応するフォルダに `.tsx` ファイルを作成
2. `src/App.tsx` にルートを追加
3. Styled Componentsでスタイリング

### テーマの使用

```typescript
import styled from 'styled-components'

const Button = styled.button`
  background: ${props => props.theme.colors.primary.main};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
`
```

### アニメーションの追加

```typescript
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  コンテンツ
</motion.div>
```

## 🔗 ルーティング

- `/` - ホームページ
- `/mobile/phase1` - スマホアプリ フェーズ1
- `/mobile/phase2` - スマホアプリ フェーズ2
- `/web/phase1` - Web管理画面 フェーズ1
- `/web/phase2` - Web管理画面 フェーズ2

## 📝 今後の実装予定

### フェーズ1
- [x] ホームページ
- [x] デザインシステム
- [ ] カメラ画面（GPS/方位表示）
- [ ] 地図編集画面（ドラッグ&ドロップ）
- [ ] PDF出力機能

### フェーズ2
- [ ] グループ管理画面
- [ ] 承認フローシステム
- [ ] プロジェクト管理
- [ ] AI画像解析ダッシュボード
- [ ] データ分析機能

## 🤝 貢献

このプロジェクトは株式会社グラフデポ様専用です。

## 📄 ライセンス

Proprietary - 無断転載・複製を禁止
